import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { startFixture } from '../fixtures/server.js';
import { fixtureConfig } from '../fixtures/config.js';
import { personas } from '../src/personas.js';
import { runAudit } from '../src/runner.js';
import type { AuditConfig, AuditReport } from '../src/schema.js';
import type { RunOptions } from '../src/runner.js';

async function isolatedRun(options: Omit<RunOptions, 'outputDir'>, select?: (config: AuditConfig) => void): Promise<AuditReport> {
  const temporaryRoot = path.resolve(tmpdir());
  const outputDir = await mkdtemp(path.join(temporaryRoot, 'hvac-audit-runner-test-'));
  const fixture = await startFixture();
  // A deterministic synthetic test never imports an operator's authenticated session.
  const previousAuth = process.env.HVAC_AUTH_STATE;
  delete process.env.HVAC_AUTH_STATE;
  try {
    const config = fixtureConfig(fixture.baseUrl);
    config.captureScreenshots = false;
    select?.(config);
    return await runAudit(config, personas, { ...options, outputDir, fast: true });
  } finally {
    if (previousAuth === undefined) delete process.env.HVAC_AUTH_STATE;
    else process.env.HVAC_AUTH_STATE = previousAuth;
    await fixture.close();
    // Only remove the specific fresh test output directory, never a computed parent.
    assert.equal(path.dirname(path.resolve(outputDir)), temporaryRoot);
    assert.ok(path.basename(outputDir).startsWith('hvac-audit-runner-test-'));
    await rm(outputDir, { recursive: true, force: true });
  }
}

test('full fixture run covers every persona and separates real completion, deliberate failure and scope', { timeout: 120_000 }, async () => {
  const report = await isolatedRun({ mode: 'scripted' });
  assert.equal(report.results.length, 16);
  assert.deepEqual(new Set(report.results.map(result => result.personaId)), new Set(personas.map(persona => persona.id)));
  const statuses = report.results.reduce<Record<string, number>>((counts, result) => {
    counts[result.status] = (counts[result.status] ?? 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(statuses, { failed: 3, completed: 10, unsupported: 3 });
  assert.equal(report.results.some(result => result.status === 'blocked'), false);
  for (const result of report.results) {
    const evidenceIds = new Set(result.evidence.map(evidence => evidence.id));
    for (const finding of result.findings) for (const id of finding.evidenceIds) assert.ok(evidenceIds.has(id), `Missing evidence ${id}`);
    if (result.journeyId === 'setup-resume') {
      assert.equal(result.status, 'failed');
      assert.ok(result.findings.some(finding => finding.rule === 'completion-condition'));
      assert.ok(result.evidence.some(evidence => evidence.kind === 'assertion' && evidence.summary.includes('not observed')));
    } else if (result.journeyId === 'product-fit') {
      assert.equal(result.status, 'unsupported');
      assert.ok(result.findings.some(finding => finding.rule === 'product-scope' && finding.scope === 'opportunity'));
    } else {
      assert.equal(result.status, 'completed');
      assert.ok(result.evidence.some(evidence => evidence.kind === 'assertion' && evidence.summary === 'Configured visible completion condition observed'));
    }
  }
  const typoRuns = report.results.filter(result => result.journeyId === 'pricing-recovery');
  assert.equal(typoRuns.length, 4);
  assert.ok(typoRuns.every(result => result.evidence.some(evidence => evidence.summary === 'Deliberate synthetic typo before correction')));
  assert.ok(report.results.flatMap(result => result.findings).some(finding => finding.rule === 'target-size'));
  assert.ok(report.results.flatMap(result => result.findings).some(finding => finding.rule === 'jargon-configuration-matrix'));
});

test('agent rejects an unknown reference without executing or claiming completion', { timeout: 30_000 }, async () => {
  const report = await isolatedRun({
    mode: 'agent', persona: 'operations-hawk', journey: 'pricing-recovery',
    planner: async () => ({ action: 'click', ref: 'e999', value: null, rationale: 'Synthetic well-formed but unobserved reference safety test.' }),
  });
  assert.equal(report.results.length, 1);
  const result = report.results[0];
  assert.equal(result.status, 'blocked');
  assert.match(result.reason, /unknown or sensitive element reference/i);
  assert.equal(result.stepCount, 0);
  assert.ok(result.evidence.some(evidence => evidence.kind === 'error'));
});

test('agent done response cannot override a missing visible success condition', { timeout: 30_000 }, async () => {
  const report = await isolatedRun({
    mode: 'agent', persona: 'operations-hawk', journey: 'pricing-recovery',
    planner: async () => ({ action: 'done', ref: null, value: null, rationale: 'Synthetic premature completion claim.' }),
  });
  assert.equal(report.results.length, 1);
  const result = report.results[0];
  assert.equal(result.status, 'failed');
  assert.equal(result.stepCount, 0);
  assert.ok(result.findings.some(finding => finding.rule === 'completion-condition'));
  assert.ok(result.evidence.some(evidence => evidence.kind === 'assertion' && evidence.summary.includes('not observed')));
});

test('agent executes approved observed controls and verifies real completion', { timeout: 30_000 }, async () => {
  const sequence = [
    { name: 'Good tier price', action: 'fill', value: '6500' },
    { name: 'Better tier price', action: 'fill', value: '7800' },
    { name: 'Save price draft', action: 'click', value: null },
  ] as const;
  let plannerCalls = 0;
  const report = await isolatedRun({
    mode: 'agent', persona: 'operations-hawk', journey: 'pricing-recovery',
    planner: async input => {
      const step = sequence[input.history.length];
      assert.ok(step, 'No extra action should be needed after the saved-state assertion.');
      const matches = input.observation.controls.filter(control => control.name === step.name && !control.sensitive);
      assert.equal(matches.length, 1, `Expected one observed approved control: ${step.name}`);
      plannerCalls++;
      return { action: step.action, ref: matches[0].ref, value: step.value, rationale: `Use the observed ${step.name} control in the synthetic draft.` };
    },
  });
  assert.equal(report.results.length, 1);
  assert.equal(plannerCalls, 3);
  const result = report.results[0];
  assert.equal(result.status, 'completed');
  assert.equal(result.stepCount, 3);
  assert.ok(result.evidence.some(evidence => evidence.kind === 'assertion' && evidence.summary === 'Configured visible completion condition observed'));
  assert.equal(result.findings.some(finding => finding.rule === 'completion-condition'), false);
});
