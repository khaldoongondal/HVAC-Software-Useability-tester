import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium, type Page } from 'playwright';
import { blueprintFindings, inspectBlueprint } from '../src/blueprint.js';
import { FindingSchema } from '../src/schema.js';

async function withPage(html: string, check: (page: Page) => Promise<void>) {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 400, height: 800 } });
    await page.route('**/*', route => route.abort());
    await page.setContent(html);
    await check(page);
  } finally { await browser.close(); }
}

test('blueprint measures flagged DOM conditions with page-specific evidence and no private content', async () => {
  await withPage(`<!doctype html><html><head><meta name="viewport" content="width=device-width,user-scalable=no,maximum-scale=1"><style>
    body{margin:0;font:16px/1.5 sans-serif}p{line-height:1.1;letter-spacing:-.3px}.wide{width:700px;height:20px}video{width:40px;height:30px}
    </style></head><body><div class="wide">Synthetic layout</div><p>PRIVATE-CONTENT-MARKER must never leave the scanner.</p>
    <form><label for="required">Company contact</label><input id="required" required value="SECRET-VALUE-MARKER"><label for="optional">Notes</label><input id="optional"></form>
    <button tabindex="3">Continue</button><video autoplay></video><progress value="1" max="3"></progress><div role="status">Step one</div></body></html>`, async page => {
    const before = await page.content();
    const signals = await inspectBlueprint(page);
    assert.equal(await page.content(), before, 'Inspection must not change DOM attributes or content.');
    assert.equal(signals.viewport.width, 400);
    assert.ok(signals.viewport.horizontalOverflowPx >= 300);
    assert.equal(signals.zoomRestrictedByMeta, true);
    assert.equal(signals.paragraphs.tightLineHeightCount, 1);
    assert.equal(signals.paragraphs.negativeLetterSpacingCount, 1);
    assert.equal(signals.forms.visibleInputCount, 2);
    assert.equal(signals.forms.requiredWithoutLocalCueCount, 1);
    assert.equal(signals.forms.optionalWithoutLocalCueCount, 1);
    assert.equal(signals.unmutedAutoplayDeclarationCount, 1);
    assert.equal(signals.positiveTabIndexCount, 1);
    assert.equal(signals.visibleProgressCount, 1);
    assert.equal(signals.declaredLiveRegionCount, 1);
    const findings = blueprintFindings(signals, 'metric-1');
    assert.equal(findings.length, 7);
    findings.forEach(finding => {
      FindingSchema.parse(finding);
      assert.deepEqual(finding.evidenceIds, ['metric-1']);
      assert.match(finding.detail, /Blueprint pp?\./);
      assert.equal(finding.confidence, 'heuristic');
      assert.notEqual(finding.dimension, 'time');
      assert.match(finding.recommendation.change, /design tokens/);
    });
    assert.doesNotMatch(JSON.stringify({ signals, findings }), /PRIVATE-CONTENT-MARKER|SECRET-VALUE-MARKER|Company contact/);
    for (const value of Object.values(signals.timing)) assert.ok(value === null || (Number.isFinite(value) && value >= 0));
  });
});

test('clean controls and excluded private nodes do not generate blueprint findings', async () => {
  await withPage(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>
    body{margin:0;font:16px/1.5 sans-serif}p{line-height:1.5;letter-spacing:normal}.private{position:absolute;left:0;top:0;width:900px}.private p{line-height:1;letter-spacing:-1px}
    </style></head><body><p>Readable instructions.</p><form><label for="a">Business name (required)</label><input id="a" required><label for="b">Notes (optional)</label><input id="b"></form>
    <button tabindex="0">Continue</button><video autoplay muted></video><div class="private"><p>PRIVATE LABEL</p><input required><video autoplay></video><button tabindex="5">Hidden from audit</button></div>
    <div data-private><p style="line-height:1;letter-spacing:-1px">SECRET MARKER</p><audio autoplay></audio></div>
    <div hidden><p style="line-height:1">Not visible</p></div></body></html>`, async page => {
    const signals = await inspectBlueprint(page, ['.private']);
    assert.equal(signals.viewport.horizontalOverflowPx, 0, 'Excluded overflow must not create a public finding.');
    assert.equal(signals.paragraphs.visibleCount, 1);
    assert.equal(signals.forms.visibleInputCount, 2);
    assert.equal(signals.unmutedAutoplayDeclarationCount, 0);
    assert.equal(signals.positiveTabIndexCount, 0);
    assert.deepEqual(blueprintFindings(signals, 'metric-clean'), []);
    const delayed = { ...signals, timing: { responseStartMs: 3000, domContentLoadedMs: 8000, loadEventMs: 9000, firstPaintMs: 2000, firstContentfulPaintMs: 4000 } };
    assert.deepEqual(blueprintFindings(delayed, 'metric-slow'), [], 'Navigation/paint values do not create a speed or CWV pass/fail gate.');
  });
});

test('internally scrollable content is not mistaken for page overflow and metadata detects max-scale alone', async () => {
  await withPage('<!doctype html><html><head><meta name="viewport" content="width=device-width,maximum-scale=1"></head><body style="margin:0"><div style="width:350px;overflow:auto"><div style="width:900px;height:40px">Scrollable table placeholder</div></div></body></html>', async page => {
    const signals = await inspectBlueprint(page);
    assert.equal(signals.viewport.horizontalOverflowPx, 0);
    assert.equal(signals.zoomRestrictedByMeta, true);
    assert.deepEqual(blueprintFindings(signals, 'metric-scroll').map(finding => finding.rule), ['blueprint-zoom-meta']);
  });
});
