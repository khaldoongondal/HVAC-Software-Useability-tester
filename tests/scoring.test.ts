import assert from 'node:assert/strict';
import test from 'node:test';
import type { AuditReport, Finding, JourneyResult } from '../src/schema.js';
import { scoreReport } from '../src/scoring.js';

function report(results?: JourneyResult[]): AuditReport {
  return {
    schemaVersion: '1.0', runId: 'test-run', createdAt: '2026-10-20T12:00:00Z', target: 'http://127.0.0.1:4317',
    environment: 'fixture', mode: 'scripted', seed: 42, sourceRevision: 'test', limitations: [],
    personas: [{ id: 'owner', name: 'Synthetic owner', age: 51, profile: 'Fictional owner', business: 'Fictional HVAC', techLiteracy: 'low', goals: ['Configure prices'], context: ['Between service calls'], viewport: { width: 390, height: 844 }, touch: true, typingDelayMs: 10, thinkDelayMs: 100, networkLatencyMs: 0, downloadKbps: 1000, targetSizePx: 44, patienceSteps: 10 }],
    results: results ?? [result()],
  };
}

function result(overrides: Partial<JourneyResult> = {}): JourneyResult {
  return {
    personaId: 'owner', journeyId: 'setup', journeyName: 'Configure a price book', status: 'completed', reason: 'Expected confirmation observed',
    elapsedMs: 9000, injectedDelayMs: 1000, stepCount: 4, budgetSeconds: 10,
    evidence: [{ id: 'confirmation', kind: 'assertion', summary: 'Saved confirmation visible', url: 'http://127.0.0.1:4317/setup', timestamp: '2026-10-20T12:00:09Z' }], findings: [], ...overrides,
  };
}

function finding(overrides: Partial<Finding> = {}): Finding {
  return { id: 'small-control', rule: 'small-target', title: 'Small save control', detail: 'Save control was smaller than the configured target.', dimension: 'cognitive', severity: 'high', confidence: 'measured', scope: 'in-scope', evidenceIds: ['confirmation'], recommendation: { section: 'Layout & Structural Rearrangements', change: 'Increase the control hit area within existing design tokens.' }, ...overrides };
}

test('no configured results or no assessed evidence produces null, never a fabricated perfect score', () => {
  for (const input of [report([]), report([result({ evidence: [] })]), report([result({ status: 'blocked' })])]) {
    const summary = scoreReport(input);
    assert.equal(summary.total, null);
    assert.deepEqual(summary.dimensions, { time: null, cognitive: null, language: null, recovery: null });
    assert.equal(summary.coverage.completionRate, null);
    assert.equal(summary.coverage.assessed, 0);
    assert.equal(summary.coverage.partial, true);
  }
});

test('coverage excludes blocked, not-run, unsupported and evidence-free cases; failed evidence-backed cases remain visible', () => {
  const input = report([
    result(), result({ journeyId: 'failure', status: 'failed', findings: [finding({ dimension: 'recovery' })] }),
    result({ journeyId: 'blocked', status: 'blocked' }), result({ journeyId: 'pending', status: 'not-run' }),
    result({ journeyId: 'outside', status: 'unsupported' }), result({ journeyId: 'empty', evidence: [] }),
  ]);
  const summary = scoreReport(input);
  assert.equal(summary.coverage.assessed, 2);
  assert.equal(summary.coverage.excluded, 4);
  assert.equal(summary.coverage.percent, 33.3);
  assert.equal(summary.coverage.completionRate, 50);
  assert.equal(summary.coverage.partial, true);
  assert.equal(summary.dimensions.recovery, 87.5);
  assert.equal(summary.total, 96.9);
});

test('time subtracts injected delays, clamps at zero and applies budget overrun exactly once', () => {
  const input = report([result({ elapsedMs: 30000, injectedDelayMs: 10000, findings: [finding({ dimension: 'time', severity: 'critical' })] })]);
  const summary = scoreReport(input);
  assert.equal(summary.assessments[0].adjustedElapsedMs, 20000);
  assert.equal(summary.dimensions.time, 50);
  assert.equal(summary.total, 85);
  assert.deepEqual(summary.assessments[0].appliedFindingIds, []);
  assert.equal(scoreReport(report([result({ elapsedMs: 100, injectedDelayMs: 500 })])).dimensions.time, 100);
  assert.equal(scoreReport(report([result({ elapsedMs: 50000, injectedDelayMs: 0 })])).dimensions.time, 0);
});

test('the strongest repeated rule is applied once per persona/journey, including cross-dimension duplicates', () => {
  const input = report([result({ findings: [
    finding({ id: 'first', severity: 'high' }), finding({ id: 'second', severity: 'critical' }),
    finding({ id: 'third', severity: 'low', dimension: 'recovery' }),
  ] })]);
  const summary = scoreReport(input);
  assert.equal(summary.dimensions.cognitive, 60);
  assert.equal(summary.dimensions.recovery, 100);
  assert.equal(summary.total, 90);
  assert.deepEqual(summary.assessments[0].appliedFindingIds, ['second']);
});

test('hypotheses and opportunities never penalize the rubric or suppress a supported lower-severity finding', () => {
  const summary = scoreReport(report([result({ findings: [
    finding({ id: 'hypothesis', confidence: 'hypothesis', severity: 'critical' }),
    finding({ id: 'opportunity', scope: 'opportunity', severity: 'critical' }),
    finding({ id: 'measured', severity: 'low' }),
  ] })]));
  assert.equal(summary.total, 98.8);
  assert.deepEqual(summary.assessments[0].appliedFindingIds, ['measured']);
  assert.equal(scoreReport(report([result({ findings: [finding({ confidence: 'hypothesis' })] })])).total, 100);
});

test('failed status does not add a second penalty and per-dimension scores cannot go negative', () => {
  assert.equal(scoreReport(report([result({ status: 'failed' })])).total, 100);
  assert.equal(scoreReport(report([result({ status: 'failed' })])).coverage.completionRate, 0);
  const findings = Array.from({ length: 5 }, (_, index) => finding({ id: `issue-${index}`, rule: `rule-${index}`, severity: 'critical' }));
  assert.equal(scoreReport(report([result({ findings })])).dimensions.cognitive, 0);
});

test('evidence IDs must resolve inside the finding own result, including unscored hypotheses', () => {
  const input = report([result({ findings: [finding({ confidence: 'hypothesis', evidenceIds: ['foreign'] })] }), result({ journeyId: 'other', evidence: [{ id: 'foreign', kind: 'snapshot', summary: 'Other surface', url: '', timestamp: '' }] })]);
  assert.throws(() => scoreReport(input), /references missing evidence foreign/);
});

test('duplicate case, persona, finding and evidence identities are rejected rather than inflating scores', () => {
  assert.throws(() => scoreReport(report([result(), result()])), /Duplicate persona\/journey/);
  const duplicatePersona = report();
  duplicatePersona.personas.push(duplicatePersona.personas[0]);
  assert.throws(() => scoreReport(duplicatePersona), /Duplicate persona ID/);
  assert.throws(() => scoreReport(report([result({ findings: [finding(), finding()] })])), /Duplicate finding ID/);
  const duplicateEvidence = result();
  duplicateEvidence.evidence.push(duplicateEvidence.evidence[0]);
  assert.throws(() => scoreReport(report([duplicateEvidence])), /Duplicate evidence ID/);
});

test('inspect-only observations have no meaningful time budget and cannot count unverified journeys as completed', () => {
  const input = report([result({ status: 'not-run', reason: 'Inspected only; journey completion unverified', findings: [finding()] })]);
  input.mode = 'inspect';
  const summary = scoreReport(input);
  assert.equal(summary.total, null);
  assert.equal(summary.coverage.completionRate, null);
  // A caller cannot turn a page observation into completion acceptance by labeling it completed.
  input.results[0].status = 'completed';
  assert.equal(scoreReport(input).total, null);
  assert.equal(scoreReport(input).coverage.completionRate, null);
  assert.equal(scoreReport(input).coverage.partial, true);
});
