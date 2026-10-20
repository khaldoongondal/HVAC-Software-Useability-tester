import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import path from 'node:path';
import { observe } from '../src/observe.js';
import { redact, safeUrl, validateAuthPath } from '../src/privacy.js';

test('common sensitive text and all URL query values are redacted', () => {
  const output = redact('owner@example.invalid +1 613-555-0100 sk-notarealcredential https://test.invalid/setup?secret=private');
  assert.ok(!output.includes('owner@')); assert.ok(!output.includes('613')); assert.ok(!output.includes('notareal')); assert.ok(!output.includes('secret='));
  assert.equal(safeUrl('https://demo.invalid/setup?secret=x#hash'), 'https://demo.invalid/setup');
});
test('authentication state rejects relative, project and OneDrive paths', () => {
  assert.throws(() => validateAuthPath('state.json', process.cwd()));
  assert.throws(() => validateAuthPath(path.join(process.cwd(), 'state.json'), process.cwd()));
  assert.throws(() => validateAuthPath(path.resolve('OneDrive', 'state.json'), path.resolve('different')));
});
test('selector redaction covers snapshots and controls without collecting field values', async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setContent('<main><h1>Public task</h1><div data-private>Secret Name</div><table><tr><td>Private Address</td></tr></table><label for="n">Company</label><input id="n" value="Hidden input value"><button>Continue</button></main>');
    const observation = await observe(page, ['table']);
    const output = JSON.stringify(observation);
    assert.ok(output.includes('Public task')); assert.ok(output.includes('Continue'));
    assert.ok(!output.includes('Secret Name')); assert.ok(!output.includes('Private Address')); assert.ok(!output.includes('Hidden input value'));
  } finally { await browser.close(); }
});
