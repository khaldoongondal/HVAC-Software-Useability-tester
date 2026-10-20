import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import { Section, type AuditReport } from '../src/schema.js';
import { writeReport } from '../src/report.js';

function report(): AuditReport {
  return {
    schemaVersion: '1.0', runId: 'report-test', createdAt: '2026-10-20T12:00:00Z', target: 'http://127.0.0.1:4317', environment: 'fixture', mode: 'scripted', seed: 42, sourceRevision: 'test', limitations: ['Synthetic fixture only.'],
    personas: [{ id: 'owner', name: 'Fictional owner', age: 51, profile: 'Synthetic test persona', business: 'Fictional HVAC', techLiteracy: 'low', goals: ['Save a price'], context: ['In a service van'], viewport: { width: 390, height: 844 }, touch: true, typingDelayMs: 10, thinkDelayMs: 100, networkLatencyMs: 0, downloadKbps: 1000, targetSizePx: 44, patienceSteps: 10 }],
    results: [{ personaId: 'owner', journeyId: 'setup', journeyName: 'Save a price', status: 'completed', reason: 'Confirmation visible', elapsedMs: 5000, injectedDelayMs: 1000, stepCount: 2, budgetSeconds: 20,
      evidence: [
        { id: 'before', kind: 'snapshot', summary: 'Label observed', url: 'http://127.0.0.1:4317/setup', timestamp: '2026-10-20T12:00:01Z', details: 'Original interface text' },
        { id: 'after', kind: 'assertion', summary: 'Saved confirmation observed', url: 'http://127.0.0.1:4317/setup', timestamp: '2026-10-20T12:00:05Z' },
      ], findings: [{ id: 'copy', rule: 'unclear-label', title: 'Unclear price label', detail: 'The visible label does not identify installation scope.', dimension: 'language', severity: 'medium', confidence: 'heuristic', scope: 'in-scope', evidenceIds: ['before', 'after'], recommendation: { section: 'Trade-Specific Microcopy Rewrites', change: 'Clarify the existing field label.', before: 'Amount', after: 'Installed equipment price' } }] }],
  };
}

async function withDirectory(run: (directory: string) => Promise<void>): Promise<void> {
  const directory = await mkdtemp(join(tmpdir(), 'hvac-report-'));
  try { await run(directory); } finally { await rm(directory, { recursive: true, force: true }); }
}

test('writes complete strict JSON, all exact optimization headings and every finding evidence reference', async () => {
  await withDirectory(async directory => {
    const input = report();
    await writeReport(input, directory);
    const json = JSON.parse(await readFile(join(directory, 'report.json'), 'utf8'));
    const markdown = await readFile(join(directory, 'report.md'), 'utf8');
    const html = await readFile(join(directory, 'report.html'), 'utf8');
    assert.deepEqual(json, input);
    for (const section of Section.options) {
      assert.ok(markdown.includes(`### ${section}`));
      assert.ok(html.includes(section.replace(/&/g, '&amp;')));
    }
    assert.match(html, /SYNTHETIC FIXTURE DEMONSTRATION/);
    assert.match(html, /not the deployed LeadQuote application/);
    assert.match(markdown, /Before \| After \(proposed, untested\)/);
    for (const evidence of input.results[0].evidence) {
      assert.ok(markdown.includes(`**${evidence.id}**`));
      assert.ok(html.includes(`<strong>${evidence.id}</strong>`));
      assert.ok(html.includes(evidence.summary));
    }
    assert.match(html, /Supporting evidence \(2\)/);
    assert.match(html, /not a validated human usability measure/);
    assert.match(html, /branding, colors, typography, logo, and design tokens/);
    assert.doesNotMatch(html, /<script[^>]+src=|<link[^>]+href=|<img /);
  });
});

test('untrusted HTML, script terminators, quotes and links remain literal report data', async () => {
  await withDirectory(async directory => {
    const input = report();
    const payload = '</script><script>globalThis.injected=true</script><img src=x onerror="alert(1)">';
    input.personas[0].name = payload;
    input.target = 'javascript:alert(1)';
    input.results[0].findings[0].title = payload;
    input.results[0].findings[0].detail = payload;
    input.results[0].findings[0].recommendation.after = payload;
    input.results[0].evidence[0].details = payload;
    input.results[0].evidence[0].url = 'javascript:alert(1)';
    input.results[0].evidence[0].screenshot = '" onerror="alert(1)';
    await writeReport(input, directory);
    const html = await readFile(join(directory, 'report.html'), 'utf8');
    const markdown = await readFile(join(directory, 'report.md'), 'utf8');
    assert.equal((html.match(/<script>/g) ?? []).length, 1);
    assert.equal((html.match(/<\/script>/g) ?? []).length, 1);
    assert.ok(!html.includes(payload));
    assert.ok(html.includes('&lt;/script&gt;&lt;script&gt;globalThis.injected=true&lt;/script&gt;'));
    assert.doesNotMatch(html, /<img|href="javascript:/);
    assert.ok(!markdown.includes(payload));
    assert.ok(markdown.includes('&lt;script&gt;'));
    assert.equal(JSON.parse(await readFile(join(directory, 'report.json'), 'utf8')).results[0].findings[0].title, payload);
  });
});

test('rejects dangling evidence before writing any report artifacts', async () => {
  await withDirectory(async directory => {
    const input = report();
    input.results[0].findings[0].evidenceIds.push('not-recorded');
    await assert.rejects(writeReport(input, directory), /references missing evidence not-recorded/);
    await assert.rejects(stat(join(directory, 'report.json')), { code: 'ENOENT' });
    await assert.rejects(stat(join(directory, 'report.html')), { code: 'ENOENT' });
  });
});

test('only runner-shaped local screenshot paths become links', async () => {
  await withDirectory(async directory => {
    const input = report();
    input.results[0].evidence[0].screenshot = 'screenshots/mobile-dispatcher-setup-01.png';
    input.results[0].evidence[1].screenshot = 'screenshots/../../private.png';
    await writeReport(input, directory);
    const html = await readFile(join(directory, 'report.html'), 'utf8');
    const markdown = await readFile(join(directory, 'report.md'), 'utf8');
    assert.match(html, /href="screenshots\/mobile-dispatcher-setup-01\.png"/);
    assert.ok(markdown.includes('[screenshots/mobile-dispatcher-setup-01.png](screenshots/mobile-dispatcher-setup-01.png)'));
    assert.ok(html.includes('screenshots/../../private.png'));
    assert.doesNotMatch(html, /href="screenshots\/\.\./);
    assert.ok(!markdown.includes('](screenshots/../../private.png)'));
    input.results[0].evidence[0].screenshot = 'https://example.com/tracker.png';
    input.results[0].evidence[1].screenshot = 'C:/private/screenshot.png';
    await writeReport(input, directory);
    const second = await readFile(join(directory, 'report.html'), 'utf8');
    assert.doesNotMatch(second, /href="https:|href="C:/);
  });
});

test('zero coverage has explicit no-score and no-completion labels while retaining observed unscored findings', async () => {
  await withDirectory(async directory => {
    const input = report();
    input.environment = 'production';
    input.mode = 'inspect';
    input.results[0].status = 'not-run';
    input.results[0].reason = 'Inspected only; no journey completion verified';
    await writeReport(input, directory);
    const html = await readFile(join(directory, 'report.html'), 'utf8');
    assert.match(html, /PRODUCTION INSPECTION/);
    assert.match(html, /Partial engineering score<\/span><strong>Not assessed/);
    assert.match(html, /Task completion<\/span><strong>Not assessed/);
    assert.match(html, /Unscored: case not assessed/);
    assert.match(html, /Unclear price label/);
    assert.match(html, /0 \/ 1/);
  });
});

test('offline filters combine search, persona, severity and dimension and announce the visible count', async () => {
  await withDirectory(async directory => {
    await writeReport(report(), directory);
    const html = await readFile(join(directory, 'report.html'), 'utf8');
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1);
    type Control = { value: string; callbacks: Record<string, () => void>; addEventListener: (type: string, callback: () => void) => void };
    const control = (): Control => ({ value: '', callbacks: {}, addEventListener(type, callback) { this.callbacks[type] = callback; } });
    const controls = { search: control(), persona: control(), severity: control(), dimension: control() };
    const count = { textContent: '' };
    const empty = { hidden: true };
    const cards = [
      { hidden: false, dataset: { search: 'price label installation', persona: 'owner', severity: 'medium', dimension: 'language' } },
      { hidden: false, dataset: { search: 'save control', persona: 'manager', severity: 'high', dimension: 'cognitive' } },
    ];
    const document = { getElementById: (id: string) => id === 'finding-count' ? count : id === 'no-matches' ? empty : controls[id as keyof typeof controls], querySelectorAll: () => cards };
    runInNewContext(scripts[0][1], { document }, { timeout: 1000 });
    controls.search.value = 'PRICE';
    controls.search.callbacks.input();
    assert.deepEqual(cards.map(card => card.hidden), [false, true]);
    assert.equal(count.textContent, '1 of 2 findings shown');
    controls.severity.value = 'high';
    controls.severity.callbacks.change();
    assert.deepEqual(cards.map(card => card.hidden), [true, true]);
    assert.equal(empty.hidden, false);
    controls.search.value = '';
    controls.persona.value = 'manager';
    controls.dimension.value = 'cognitive';
    controls.dimension.callbacks.change();
    assert.deepEqual(cards.map(card => card.hidden), [true, false]);
    assert.equal(empty.hidden, true);
  });
});
