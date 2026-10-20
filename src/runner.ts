import { chromium, type Browser, type Locator, type Page } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { ActionSchema, ConfigSchema, DecisionSchema, PersonaSchema, ReportSchema, type Action, type AuditConfig, type AuditReport, type Evidence, type Finding, type Journey, type JourneyResult, type Persona, type Target } from './schema.js';
import { assertInteraction, assertNavigation, PolicyError, requestAllowed, validatePolicy } from './policy.js';
import { observe, type Observation } from './observe.js';
import { redact, safeUrl, validateAuthPath } from './privacy.js';
import { createPlanner, type Planner } from './planner.js';
import { inspectBlueprint, blueprintFindings } from './blueprint.js';

export interface RunOptions { mode?: 'scripted' | 'agent' | 'inspect'; outputDir: string; headed?: boolean; fast?: boolean; persona?: string; journey?: string; planner?: Planner; }

export function locate(page: Page, target: Target): Locator {
  switch (target.by) {
    case 'role': return page.getByRole((target.role || 'button') as Parameters<Page['getByRole']>[0], { name: target.value, exact: true });
    case 'label': return page.getByLabel(target.value, { exact: true });
    case 'text': return page.getByText(target.value, { exact: true });
    case 'testId': return page.getByTestId(target.value);
  }
}
function seeded(seed: number): () => number {
  let value = seed >>> 0;
  return () => { value = (1664525 * value + 1013904223) >>> 0; return value / 4294967296; };
}
function makeFinding(id: string, rule: string, title: string, detail: string, dimension: Finding['dimension'], severity: Finding['severity'], evidenceId: string, change: string, section: Finding['recommendation']['section']): Finding {
  return { id, rule, title, detail, dimension, severity, confidence: 'heuristic', scope: 'in-scope', evidenceIds: [evidenceId], recommendation: { section, change } };
}

export function inspectObservation(observation: Observation, persona: Persona, evidenceId: string): Finding[] {
  const findings: Finding[] = [];
  const small = observation.controls.filter(c => c.width < persona.targetSizePx || c.height < persona.targetSizePx);
  if (small.length) findings.push(makeFinding(`${evidenceId}-targets`, 'target-size', 'Controls may be difficult to hit in this context', `${small.length} visible controls are smaller than the synthetic ${persona.targetSizePx}px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: ${small.slice(0, 5).map(c => `${c.name || c.role} (${c.width}×${c.height})`).join('; ')}.`, 'cognitive', persona.touch ? 'high' : 'low', evidenceId, 'Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.', 'Layout & Structural Rearrangements'));
  const terms: [RegExp, string, string][] = [
    [/\bconfiguration matrix\b/i, 'Configuration Matrix', 'Your equipment and prices'],
    [/\bdatabase record\b/i, 'Database Record', 'Enquiry details'],
    [/\bwebhook\b/i, 'Webhook', 'Send leads to your CRM (advanced connection)'],
    [/\bpayload\b/i, 'Payload', 'Information sent'],
    [/\bmutation\b/i, 'Mutation', 'Save changes']
  ];
  for (const [pattern, before, after] of terms) if (pattern.test(observation.text)) {
    const finding = makeFinding(`${evidenceId}-jargon-${findings.length}`, `jargon-${before.toLowerCase().replace(/ /g, '-')}`, `Review trade language: ${before}`, `The page contains “${before}”. Check the surrounding task context with owners; an advanced integration label may be appropriate.`, 'language', 'low', evidenceId, 'Use task language in the primary flow; retain precise technical terms in optional help.', 'Trade-Specific Microcopy Rewrites');
    finding.recommendation.before = before; finding.recommendation.after = after; findings.push(finding);
  }
  if (observation.controls.filter(c => c.role === 'textbox').length > 10) findings.push(makeFinding(`${evidenceId}-fields`, 'form-density', 'Many inputs are visible at once', 'More than ten visible input controls can increase scanning and memory demands. Review whether all are needed for this task; this is not a measured cognitive-load score.', 'cognitive', 'medium', evidenceId, 'Group fields by the owner’s current task, retain progress and defer optional details. Verify that any removed field is genuinely unnecessary.', 'Eliminated Steps'));
  return findings;
}

async function runJourney(browser: Browser, config: AuditConfig, persona: Persona, journey: Journey, options: RunOptions, planner?: Planner): Promise<JourneyResult> {
  const mode = config.environment === 'production' ? 'inspect' : (options.mode || 'scripted');
  const result: JourneyResult = { personaId: persona.id, journeyId: journey.id, journeyName: journey.name, status: 'not-run', reason: '', elapsedMs: 0, injectedDelayMs: 0, stepCount: 0, budgetSeconds: journey.budgetSeconds, evidence: [], findings: [] };
  const start = performance.now();
  const rng = seeded(config.seed + [...`${persona.id}/${journey.id}`].reduce((a, c) => a + c.charCodeAt(0), 0));
  const auth = config.environment === 'fixture' ? undefined : process.env.HVAC_AUTH_STATE;
  const context = await browser.newContext({ viewport: persona.viewport, isMobile: persona.touch, hasTouch: persona.touch, colorScheme: 'dark', reducedMotion: 'reduce', serviceWorkers: 'block', acceptDownloads: false, ...(auth ? { storageState: validateAuthPath(auth, process.cwd()) } : {}) });
  const page = await context.newPage();
  page.setDefaultTimeout(4000);
  page.setDefaultNavigationTimeout(12000);
  let blocked = false;
  let timedOut = false;
  // Allow over-budget observations while bounding every journey to at most 2 minutes.
  const deadline = start + Math.min(journey.budgetSeconds * 3000, 120000);
  const deadlineTimer = setTimeout(() => { timedOut = true; void context.close().catch(() => undefined); }, Math.max(1, deadline - performance.now()));
  const addEvidence = (kind: Evidence['kind'], summary: string, details?: string): Evidence => {
    const item: Evidence = { id: `${persona.id}-${journey.id}-e${result.evidence.length + 1}`, kind, summary: redact(summary), timestamp: new Date().toISOString(), url: safeUrl(page.url()), ...(details ? { details: redact(details) } : {}) };
    result.evidence.push(item); return item;
  };
  const pause = async (ms: number) => { const begin = performance.now(); await page.waitForTimeout(ms); result.injectedDelayMs += performance.now() - begin; };
  const mask = () => [page.locator('input,textarea,[contenteditable=true],[data-sensitive]'), ...config.redactSelectors.map(s => page.locator(s))];
  const capture = async (summary: string): Promise<Observation> => {
    const observation = await observe(page, config.redactSelectors);
    const evidence = addEvidence('snapshot', summary, JSON.stringify(observation));
    if (config.captureScreenshots) {
      const file = `screenshots/${evidence.id}.png`;
      await page.screenshot({ path: path.join(options.outputDir, file), fullPage: false, mask: mask(), animations: 'disabled' });
      evidence.screenshot = file;
    }
    result.findings.push(...inspectObservation(observation, persona, evidence.id));
    const blueprint = await inspectBlueprint(page, config.redactSelectors);
    const metric = addEvidence('metric', 'Blueprint: current-view layout, form cues, interaction declarations and lab timing', JSON.stringify(blueprint));
    result.findings.push(...blueprintFindings(blueprint, metric.id));
    return observation;
  };
  const success = async () => {
    const target = locate(page, journey.success);
    if (await target.count() !== 1 || !await target.isVisible()) return false;
    return !journey.expectedText || (await target.innerText()).includes(journey.expectedText);
  };
  const perform = async (action: Action, override?: Locator) => {
    action = ActionSchema.parse(action);
    assertInteraction(config);
    if (blocked) throw new PolicyError('A blocked request invalidated this journey; inspect the network evidence.');
    const control = override || (action.target ? locate(page, action.target) : undefined);
    if (['click', 'fill', 'press', 'check', 'select', 'typo'].includes(action.type)) {
      if (!control || await control.count() !== 1) throw new Error('Action target must resolve to exactly one control. Refresh the task selectors; no guessed fallback was attempted.');
      if (await control.getAttribute('type') === 'password' || /password|secret|token|api.?key|credit.?card/i.test((await control.getAttribute('aria-label') || '') + (action.target?.value || ''))) throw new PolicyError('Credential fields are outside the audit scope.');
    }
    addEvidence('action', `${action.type}: ${action.target?.value || 'observed control'}`, action.note);
    const think = options.fast ? 0 : Math.round(persona.thinkDelayMs * (0.8 + rng() * 0.4));
    await pause(think);
    switch (action.type) {
      case 'click': await control!.click(); break;
      case 'check': await control!.check(); break;
      case 'select': await control!.selectOption({ label: action.value || '' }); break;
      case 'press':
        if (!['Tab', 'Shift+Tab', 'Escape', 'ArrowDown', 'ArrowUp', 'Space', 'Enter'].includes(action.value || '')) throw new PolicyError('Unsupported keyboard action.');
        await control!.press(action.value!); break;
      case 'fill': case 'typo': {
        const value = action.value || '';
        await control!.fill('');
        const delay = options.fast ? 0 : persona.typingDelayMs;
        const typingStart = performance.now();
        await control!.pressSequentially(action.type === 'typo' ? `${value}x` : value, { delay });
        result.injectedDelayMs += Math.min(performance.now() - typingStart, delay * (value.length + (action.type === 'typo' ? 1 : 0)));
        if (action.type === 'typo') { await control!.press('Tab'); await capture('Deliberate synthetic typo before correction'); await control!.fill(value); await control!.press('Tab'); }
        break;
      }
      case 'wait': await pause(options.fast ? Math.min(action.durationMs || 200, 50) : action.durationMs || 200); break;
      case 'reload': await page.reload({ waitUntil: 'domcontentloaded' }); break;
      case 'interrupt': await pause(options.fast ? 10 : action.durationMs || 1000); await page.reload({ waitUntil: 'domcontentloaded' }); break;
      case 'misclick': {
        // Never click an arbitrary nearby control. Only explicit fixture-owned neutral surface.
        if (config.environment !== 'fixture') throw new PolicyError('Misclick injection is fixture-only.');
        const neutral = page.getByTestId('safe-misclick-zone');
        if (await neutral.count() !== 1) throw new PolicyError('Fixture has no safe misclick surface.');
        await neutral.click(); break;
      }
    }
    result.stepCount++;
    assertNavigation(page.url(), config);
    await capture(`After action ${result.stepCount}`);
  };
  try {
    await context.route('**/*', async route => {
      const request = route.request();
      if (!requestAllowed(request.url(), request.method(), request.isNavigationRequest(), config)) {
        blocked = true; addEvidence('network', `Blocked ${request.method()} ${safeUrl(request.url())}`); await route.abort('blockedbyclient');
      } else await route.continue();
    });
    await context.routeWebSocket('**/*', ws => { blocked = true; addEvidence('network', 'WebSocket blocked by the audit policy'); ws.close(); });
    context.on('page', popup => { if (popup !== page) { blocked = true; addEvidence('network', 'Unexpected popup blocked'); void popup.close(); } });
    page.on('dialog', dialog => { void dialog.dismiss(); });
    page.on('download', download => { blocked = true; void download.cancel(); });
    page.on('pageerror', () => addEvidence('error', 'The page raised a JavaScript error; raw error text omitted for privacy.'));
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: options.fast ? 0 : persona.networkLatencyMs, downloadThroughput: persona.downloadKbps * 1024 / 8, uploadThroughput: persona.downloadKbps * 1024 / 16 });
    await page.goto(new URL(journey.path, config.baseUrl).href, { waitUntil: 'domcontentloaded' });
    assertNavigation(page.url(), config);
    await capture('Initial visible page');
    if (mode !== 'inspect' && (mode === 'agent' || journey.actions.length > 0) && await success()) throw new PolicyError('The success condition is already present before interaction. Start from a clean state or use a transition-specific assertion.');
    if (mode === 'inspect') {
      const expectedPage = await success();
      result.status = blocked || !expectedPage ? 'blocked' : 'not-run'; result.reason = blocked || !expectedPage ? 'The expected page could not be verified within inspection policy. Authentication, network prerequisites or a stale selector may be responsible.' : 'Page inspected only. No owner journey completion, form operation or save was tested.';
    } else if (mode === 'agent') {
      const history: string[] = [];
      const limit = Math.min(journey.maxSteps, persona.patienceSteps);
      for (let step = 0; step < limit; step++) {
        if (await success()) break;
        const observation = await observe(page, config.redactSelectors);
        const screen = config.captureScreenshots ? (await page.screenshot({ mask: mask(), animations: 'disabled' })).toString('base64') : undefined;
        const remainingMs = Math.max(1, deadline - performance.now());
        let plannerTimer: NodeJS.Timeout | undefined;
        let decision;
        try {
          decision = DecisionSchema.parse(await Promise.race([
            planner!({ persona, journey, observation, history, screenshotBase64: screen, remainingMs }),
            new Promise<never>((_, reject) => { plannerTimer = setTimeout(() => reject(new PolicyError('Journey time budget exhausted.')), remainingMs); })
          ]));
        } finally { if (plannerTimer) clearTimeout(plannerTimer); }
        addEvidence('action', `Planner: ${decision.action}`, decision.rationale);
        if (decision.action === 'blocked') throw new PolicyError('Planner could not continue within the approved controls.');
        if (decision.action === 'done') break;
        if (decision.action === 'wait') { await perform({ type: 'wait', durationMs: 500 }); continue; }
        if (!decision.ref || !observation.controls.some(c => c.ref === decision.ref && !c.sensitive)) throw new PolicyError('Planner returned an unknown or sensitive element reference.');
        const selected = page.locator(`[data-hvac-ref="${decision.ref}"]`);
        let approved = false;
        for (const target of journey.allowedControls) {
          const candidate = locate(page, target);
          if (await candidate.count() === 1 && await candidate.getAttribute('data-hvac-ref') === decision.ref) approved = true;
        }
        if (!approved) throw new PolicyError('Planner selected a control outside the scenario allowlist.');
        if (decision.action === 'press' && decision.value === 'Enter') throw new PolicyError('Agent Enter submission is disabled; use an explicitly allowlisted button.');
        await perform({ type: decision.action, value: decision.value || undefined }, selected);
        history.push(`${decision.action} ${decision.ref}: ${redact(decision.rationale)}`);
      }
    } else {
      for (const action of journey.actions) {
        if (result.stepCount >= Math.min(journey.maxSteps, persona.patienceSteps)) throw new PolicyError('Configured step/patience budget exhausted.');
        await perform(action);
      }
    }
    if (mode !== 'inspect') {
      // Wait on a bounded visible condition, never infer success from a click or model claim.
      await locate(page, journey.success).waitFor({ state: 'visible', timeout: 2500 }).catch(() => undefined);
      const passed = await success();
      const evidence = addEvidence('assertion', passed ? 'Configured visible completion condition observed' : 'Configured visible completion condition not observed', `${journey.success.by}: ${journey.success.value}`);
      result.status = blocked ? 'blocked' : journey.scope === 'exploratory' ? 'unsupported' : passed ? 'completed' : 'failed';
      result.reason = blocked ? 'Network containment prevented full execution; inspect network evidence.' : journey.scope === 'exploratory' ? 'Exploratory product-scope question, excluded from usability scoring.' : passed ? 'The configured visible condition passed. Provider delivery and hidden backend state are not certified.' : 'The configured visible condition did not pass.';
      if (!passed && !blocked && journey.scope === 'supported') result.findings.push(makeFinding(`${evidence.id}-completion`, 'completion-condition', 'The task did not reach its visible completion condition', 'The scenario finished without its configured success state. Check the replay evidence and verify the selector is current before assigning this to the product.', 'recovery', 'high', evidence.id, 'Make progress and recovery visible, preserve unfinished data, and provide a clear next action. Reproduce on the approved target before changing the app.', 'Friction-Absorbing Engineering Enhancements'));
      if (journey.scope === 'exploratory') result.findings.push({ ...makeFinding(`${evidence.id}-scope`, 'product-scope', 'Confirm the boundary of the product', journey.goal, 'cognitive', 'low', evidence.id, 'Explain the supported instant-estimate workflow and test demand before adding commercial proposal or dispatch features.', 'Layout & Structural Rearrangements'), scope: 'opportunity', confidence: 'hypothesis' });
    }
    result.elapsedMs = Math.round(performance.now() - start);
    try {
      // Legacy execution keeps axe inside the audited page; its default result
      // aggregator opens a helper tab, which correctly triggers our popup guard.
      const accessibility = await new AxeBuilder({ page }).setLegacyMode(true).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const evidence = addEvidence('accessibility', `Automated accessibility scan: ${accessibility.violations.length} rule violations`, JSON.stringify(accessibility.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, helpUrl: v.helpUrl, count: v.nodes.length }))));
      for (const violation of accessibility.violations) result.findings.push({ ...makeFinding(`${evidence.id}-${violation.id}`, `axe-${violation.id}`, violation.help, `${violation.description} (${violation.nodes.length} affected nodes). ${violation.helpUrl}`, 'cognitive', violation.impact === 'critical' ? 'high' : violation.impact === 'serious' ? 'medium' : 'low', evidence.id, 'Correct the affected semantics, focus or control layout within the existing brand system; manually verify keyboard and assistive-technology use.', 'Friction-Absorbing Engineering Enhancements'), confidence: 'measured' });
    } catch { addEvidence('error', 'Accessibility scanner could not complete; accessibility coverage is incomplete.'); }
  } catch (error) {
    result.status = 'blocked';
    result.reason = timedOut ? 'Journey time budget exhausted; no completion claim is made.' : error instanceof PolicyError ? error.message : 'Runner could not complete the configured action or navigation; inspect evidence and verify the scenario against the current UI.';
    addEvidence('error', result.reason, error instanceof PolicyError ? undefined : `Error category: ${error instanceof Error ? error.name.replace(/[^A-Za-z]/g, '').slice(0, 60) : 'unknown'}. Raw action logs omitted for privacy.`);
    try { await capture('Visible state at stop'); } catch { /* Navigation may have no readable page. */ }
  } finally {
    clearTimeout(deadlineTimer);
    if (blocked || timedOut) {
      result.status = 'blocked';
      result.reason = timedOut ? 'The bounded execution deadline expired.' : 'Containment blocked a request or side effect; this case is excluded from completion claims.';
    }
    if (!result.elapsedMs) result.elapsedMs = Math.round(performance.now() - start);
    result.injectedDelayMs = Math.min(result.elapsedMs, Math.round(result.injectedDelayMs));
    // Preserve every observation; deduplication is applied by the scorecard, not by losing evidence.
    await context.close();
  }
  return result;
}

export async function runAudit(raw: AuditConfig, personas: Persona[], options: RunOptions): Promise<AuditReport> {
  const config = ConfigSchema.parse(raw); validatePolicy(config);
  personas = personas.map(persona => PersonaSchema.parse(persona));
  if (new Set(personas.map(p => p.id)).size !== personas.length) throw new Error('Persona IDs must be unique.');
  if (new Set(config.journeys.map(j => j.id)).size !== config.journeys.length) throw new Error('Journey IDs must be unique.');
  const mode = config.environment === 'production' ? 'inspect' : options.mode || 'scripted';
  if (mode === 'agent' && !config.allowModelDataTransfer && !options.planner) throw new PolicyError('Agent mode sends visible page evidence to the selected model provider. Set allowModelDataTransfer only for approved synthetic/test data.');
  const planner = mode === 'agent' ? options.planner || createPlanner() : undefined;
  const selected = personas.filter(p => !options.persona || p.id === options.persona);
  if (!selected.length) throw new Error('No persona matches the requested filter.');
  const journeys = config.journeys.filter(j => !options.journey || j.id === options.journey);
  if (!journeys.length) throw new Error('No journey matches the requested filter.');
  if (!journeys.some(j => selected.some(p => j.personas.includes(p.id) || j.personas.includes('*')))) throw new Error('No journeys apply to the selected personas.');
  await fs.mkdir(path.join(options.outputDir, 'screenshots'), { recursive: true });
  const browser = await chromium.launch({ headless: !options.headed });
  const results: JourneyResult[] = [];
  try {
    for (const persona of selected) for (const journey of journeys) {
      if (!journey.personas.includes('*') && !journey.personas.includes(persona.id)) continue;
      console.log(`Auditing ${persona.id} / ${journey.id}`);
      results.push(await runJourney(browser, config, persona, journey, options, planner));
    }
  } finally { await browser.close(); }
  return ReportSchema.parse({ schemaVersion: '1.0', runId: randomUUID(), createdAt: new Date().toISOString(), target: safeUrl(config.baseUrl), environment: config.environment, mode, seed: config.seed, personas: selected, results, sourceRevision: 'See docs/upstream-lock.json and docs/leadquote-scope.md', limitations: [
    'Synthetic persona simulation and an engineering rubric, not research with real HVAC owners or a validated psychometric usability measure.',
    'Timing is automation wall-clock time. Injected typing/thinking/wait delays are recorded separately; network and browser work remain included.',
    'Glare, greasy hands, low battery and distraction are contextual hypotheses. Viewport, touch mode, pacing, network latency, throughput and explicit interruptions are the emulated conditions.',
    'Visible completion does not establish backend persistence, email/SMS receipt, billing accuracy or provider delivery.',
    'Automated accessibility checks are partial and do not certify WCAG conformance. Full keyboard, screen-reader and real-device checks remain necessary.',
    'Blueprint adoption is page-referenced in docs/BLUEPRINT-PLAN.md. Current-view signals are heuristic observations; typography and field counts are not universal rules. Navigation/paint timings are lab samples, not a Core Web Vitals field assessment.',
    'Text redaction is best effort; names, addresses and screenshots may contain sensitive data. Artifacts must stay private unless separately reviewed.',
    'Blocked requests and stale selectors can affect findings. Reproduce observed issues in the approved current deployment before acting.',
    'HTTP GET loading can have application-side effects on poorly designed targets. Browser request policy is not a server sandbox; use only an approved isolated tenant.',
    ...(options.fast ? ['Fast mode disabled realistic pacing and latency; this run is a harness verification, not a field-condition timing run.'] : []),
    ...(mode === 'inspect' ? ['Inspect mode did not execute owner tasks. No completion score is available.'] : [])
  ] });
}
