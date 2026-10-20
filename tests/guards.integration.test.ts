import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import path from 'node:path';
import { runAudit } from '../src/runner.js';
import { personas } from '../src/personas.js';
import { fixtureConfig } from '../fixtures/config.js';
import { startFixture } from '../fixtures/server.js';

const options = { outputDir: path.resolve('artifacts/guard-tests'), fast: true, persona: 'operations-hawk', journey: 'pricing-recovery' };
test('preexisting success and duplicate identities cannot manufacture a completed task', async () => {
  const fixture = await startFixture();
  try {
    const config = fixtureConfig(fixture.baseUrl); config.captureScreenshots = false;
    const journey = config.journeys.find(j => j.id === 'pricing-recovery')!;
    journey.success = { by: 'role', role: 'heading', value: 'Configuration Matrix' }; delete journey.expectedText;
    let calls = 0;
    const report = await runAudit(config, personas, { ...options, mode: 'agent', planner: async () => { calls++; return { action: 'done', ref: null, value: null, rationale: '' }; } });
    assert.equal(report.results[0].status, 'blocked'); assert.equal(calls, 0);
    assert.match(report.results[0].reason, /already present/);
    await assert.rejects(runAudit(config, [personas[0], personas[0]], options), /unique/);
    await assert.rejects(runAudit(config, [{ ...personas[0], id: '../../escape' }], options));
  } finally { await fixture.close(); }
});

test('hard execution deadline stops work without awarding completion', async () => {
  const fixture = await startFixture();
  try {
    const config = fixtureConfig(fixture.baseUrl); config.captureScreenshots = false;
    config.journeys.find(j => j.id === 'pricing-recovery')!.budgetSeconds = 0.01;
    const start = performance.now();
    const report = await runAudit(config, personas, options);
    assert.equal(report.results[0].status, 'blocked'); assert.ok(performance.now() - start < 10000);
  } finally { await fixture.close(); }
});

test('real browser blocks unapproved POST before server receives it, including late requests', async () => {
  let writes = 0;
  const server = createServer((request, response) => {
    if (request.method === 'POST') writes++;
    response.setHeader('Content-Type', 'text/html');
    response.end('<h1>Ready</h1><script>setTimeout(()=>fetch("/write",{method:"POST"}).catch(()=>{}),50)</script>');
  });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address(); assert.ok(address && typeof address !== 'string');
  try {
    const config = fixtureConfig(`http://127.0.0.1:${address.port}`); config.captureScreenshots = false;
    const journey = config.journeys.find(j => j.id === 'pricing-recovery')!;
    journey.actions = []; journey.success = { by: 'role', role: 'heading', value: 'Ready' }; delete journey.expectedText;
    const report = await runAudit(config, personas, options);
    assert.equal(writes, 0); assert.equal(report.results[0].status, 'blocked');
    assert.ok(report.results[0].evidence.some(e => e.kind === 'network' && e.summary.includes('POST')));
  } finally { await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); }
});
