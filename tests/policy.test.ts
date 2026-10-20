import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ConfigSchema, DecisionSchema } from '../src/schema.js';
import { fixtureConfig } from '../fixtures/config.js';
import { assertInteraction, assertNavigation, requestAllowed, validatePolicy } from '../src/policy.js';

test('configuration rejects unknown authority and overlong model values', () => {
  assert.throws(() => ConfigSchema.parse({ ...fixtureConfig('http://127.0.0.1:9876'), disableSafety: true }));
  assert.equal(DecisionSchema.safeParse({ action: 'fill', ref: 'e1', value: 'a'.repeat(2001), rationale: '' }).success, false);
  assert.equal(DecisionSchema.safeParse({ action: 'click', ref: 'e1"] body', value: null, rationale: '' }).success, false);
});
test('fixture cannot target live sites or navigate to an unapproved path', () => {
  assert.throws(() => validatePolicy(fixtureConfig('https://app.leadder.io')));
  const config = fixtureConfig('http://127.0.0.1:9876');
  assert.throws(() => assertNavigation('https://evil.example/setup', config));
  assert.throws(() => assertNavigation('/delete', config));
  config.journeys[0].path = '/setup?token=private';
  assert.throws(() => validatePolicy(config));
});
test('write methods require an exact staging/fixture endpoint and production forbids interactions', () => {
  const config = fixtureConfig('http://127.0.0.1:9876');
  assert.equal(requestAllowed(`${config.baseUrl}/api/save`, 'POST', false, config), false);
  config.mutationPaths = ['/api/save'];
  assert.equal(requestAllowed(`${config.baseUrl}/api/save`, 'POST', false, config), true);
  assert.equal(requestAllowed(`${config.baseUrl}/api/save-other`, 'POST', false, config), false);
  assert.equal(requestAllowed('http://127.0.0.1:9877/api/save', 'POST', false, config), false);
  config.environment = 'production';
  assert.throws(() => validatePolicy(config));
  assert.throws(() => assertInteraction(config));
  assert.equal(requestAllowed(`${config.baseUrl}/api/save`, 'POST', false, config), false);
});
test('staging requires a designated isolated tenant', () => {
  const config = fixtureConfig('http://127.0.0.1:9876'); config.environment = 'staging'; config.isolatedTenant = '';
  assert.throws(() => validatePolicy(config));
});
