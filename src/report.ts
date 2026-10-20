import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Section, type AuditReport, type Evidence, type Finding, type JourneyResult } from './schema.js';
import { scoreReport, validateReport, WEIGHTS, type DimensionScores, type ScoreSummary } from './scoring.js';

const h = (value: unknown): string => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
const md = (value: unknown): string => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/[\\`*_{}[\]()#|]/g, '\\$&');
const cell = (value: unknown): string => md(value).replace(/\r?\n/g, '<br>');
const score = (value: number | null): string => value === null ? 'Not assessed' : `${value.toFixed(1)} / 100`;
const compactScore = (value: number | null): string => value === null ? '—' : value.toFixed(1);
const percent = (value: number | null): string => value === null ? 'Not assessed' : `${value.toFixed(1)}%`;
const seconds = (value: number): string => `${(value / 1000).toFixed(2)}s`;
const safeScreenshot = (path: string): boolean => /^screenshots\/[a-z0-9-]+\.png$/i.test(path);
const dimensions = Object.keys(WEIGHTS) as (keyof DimensionScores)[];
const builtinLimitations = [
  'Synthetic persona behavior is an engineering simulation, not interviews, quotations, or validated research with real HVAC owners.',
  'Scores are transparent deterministic heuristics. They are not a validated human usability measure or a release certificate.',
  'Coverage is limited to the configured persona/journey cases. Unconfigured workflows, absent capabilities, and inaccessible states remain untested.',
  'A score of 100 means the assessed checks recorded no rubric penalties; it does not establish that the product has no usability problems.',
  'Injected typing, thinking, and explicit wait delays are subtracted from elapsed time. Network latency and browser work remain included; timing cannot predict a human completion time.',
  'Hypotheses and opportunities are unscored. Findings on blocked, unsupported, not-run, and evidence-free cases are unscored.',
  'Recommendations preserve the existing application branding, colors, typography, logo, and design tokens. Proposed changes require implementation and retesting.',
];
const blueprintNotice = 'Coverage guide for the supplied blueprint, PDF pp. 1–15. This static checklist is not a pass/fail result: an automated check counts only when this run contains supporting evidence. External statistics and claimed uplifts in the blueprint remain unverified and are never Leadder results or promises.';
const blueprintCoverage = [
  { area: 'Complexity, inputs and recovery', pages: 'pp. 1–5, 11–13', automated: 'Current-view snapshots, configured action traces, labels, target measurements and state assertions can reveal candidate friction.', required: 'Observe real owners completing setup, correcting an input and resuming work. Verify required values, persistence and the next step; fewer visible fields alone does not prove a better workflow.' },
  { area: 'Keyboard and assistive technology', pages: 'pp. 4–5, 10–11', automated: 'DOM/axe observations and any recorded focus probe apply only to inspected states.', required: 'Complete keyboard journeys manually: logical order, visible and unobscured focus, modal entry/exit, focus return, no traps, and screen-reader error/status announcements. Automation is not conformance certification.' },
  { area: '320px reflow and text spacing', pages: 'pp. 5–8, 10–11', automated: 'Overflow and spacing probes, when recorded, inspect the current rendered view and can miss hidden or later states.', required: 'Review all relevant states at 320 CSS pixels and zoom. Test text overrides together: line height 1.5, paragraph spacing 2em, letter spacing 0.12em and word spacing 0.16em. Check clipping, functionality, sticky content and valid exceptions; preserve authored brand styles.' },
  { area: 'Brand consistency', pages: 'pp. 5–9', automated: 'Visible style observations may identify inconsistencies; this report cannot infer approval of a design token.', required: 'Compare all app pages and supported themes against the existing brand/token pack. Preserve colors, typography, logos and component conventions. Treat the hosted widget as its separate branding boundary.' },
  { area: 'Task and approved-draft clarity', pages: 'pp. 1–5, 7–13', automated: 'Language heuristics and configured success states identify questions to investigate, not owner comprehension.', required: 'Ask HVAC owners to explain included setup help, draft versus approved pricing, whether an action changes live quotes, who acts next and how to recover. Score answers against verified product authority without coaching.' },
  { area: 'Truthful trust and reliable receipt', pages: 'pp. 8–13', automated: 'Rendered badges, messages and status labels establish only what was displayed.', required: 'Verify security, product and proof claims independently. Never invent endorsements, urgency or success states. Distinguish provider acceptance, delivery and actual receipt; controlled receipt tests require separate authority and approved destinations.' },
  { area: 'Real-owner research and experiments', pages: 'pp. 1–15; experiments pp. 13–15', automated: 'Synthetic personas provide reproducible engineering lenses. This run contains no participant interviews or randomized comparison unless separately documented.', required: 'Run approved research and preregistered experiments after baseline measurement. Specify an owner/business analysis unit, MDE, alpha, power, sample plan, guardrails and stopping rule. See repository docs/EXPERIMENT-PLAN.md; no experiment is launched by this report.' },
] as const;

function environmentNotice(report: AuditReport): string {
  if (report.environment === 'fixture') return 'SYNTHETIC FIXTURE DEMONSTRATION. These results concern the bundled demonstration, not the deployed LeadQuote application.';
  if (report.environment === 'production') return 'PRODUCTION INSPECTION. Persona behavior is synthetic. Inspect-only observations do not verify setup, changes, sends, payments, or end-to-end task completion.';
  return 'ISOLATED STAGING AUDIT. Persona behavior and test data are synthetic. Findings apply to the recorded staging surface and do not certify production.';
}

function findingState(finding: Finding, resultIndex: number, summary: ScoreSummary): string {
  const assessment = summary.assessments[resultIndex];
  if (!assessment.assessed) return 'Unscored: case not assessed';
  if (finding.confidence === 'hypothesis') return 'Unscored hypothesis';
  if (finding.scope === 'opportunity') return 'Unscored opportunity';
  if (finding.dimension === 'time') return 'Time uses adjusted elapsed / budget only';
  return assessment.appliedFindingIds.includes(finding.id) ? 'Applied once to rubric' : 'Repeated rule: no additional penalty';
}

function evidenceFor(result: JourneyResult, finding: Finding): Evidence[] {
  const ids = new Set(finding.evidenceIds);
  return result.evidence.filter(evidence => ids.has(evidence.id));
}

function orderedFindings(report: AuditReport, summary: ScoreSummary): { result: JourneyResult; resultIndex: number; finding: Finding }[] {
  const severity = { critical: 0, high: 1, medium: 2, low: 3 };
  const supported = (finding: Finding, index: number): number => summary.assessments[index].assessed && finding.confidence !== 'hypothesis' && finding.scope === 'in-scope' ? 0 : 1;
  return report.results.flatMap((result, resultIndex) => result.findings.map(finding => ({ result, resultIndex, finding })))
    .sort((a, b) => supported(a.finding, a.resultIndex) - supported(b.finding, b.resultIndex) || severity[a.finding.severity] - severity[b.finding.severity]);
}

function rubricMarkdown(): string {
  return [
    'The engineering rubric weights time 30%, cognitive load 25%, language 20%, and recovery 25%. Each assessed dimension starts at 100.',
    'Time = max(0, 100 − max(0, adjusted elapsed / budget − 1) × 50), where adjusted elapsed = max(0, elapsed − injected delay). Within budget earns 100; twice the budget earns 50; three times the budget earns 0. Time findings add no second penalty. Inspect-only mode has no time score.',
    'Other dimensions subtract 40 for critical, 25 for high, 12 for medium, and 5 for low severity, floored at 0. A rule is applied once per persona/journey case at its strongest supported severity. Hypotheses and opportunities do not reduce a score. Failed status adds no independent penalty.',
    'Only completed or failed cases with recorded evidence are assessed. Dimension means use assessed cases; their weighted mean is the overall score. If a dimension is unavailable, its weight is omitted and the remaining weights are normalized. Zero assessed cases produce no score. Partial coverage is shown explicitly.',
    'Completion rate is completed evidence-backed cases / all assessed cases. It is separate from the engineering score. Inspect-only task results remain unverified and unscored.',
  ].join('\n\n');
}

function renderMarkdown(report: AuditReport, summary: ScoreSummary): string {
  const lines = [
    '# HVAC owner usability audit', '', `**${md(environmentNotice(report))}**`, '',
    `Run: ${md(report.runId)} · ${md(report.createdAt)} · Mode: ${md(report.mode)}`, '',
    `Target: ${md(report.target)}`, '', `Source revision: ${md(report.sourceRevision)}`, '',
    `Engineering score: **${score(summary.total)}**${summary.coverage.partial ? ' (partial assessment)' : ''}`, '',
    `Coverage: ${summary.coverage.assessed}/${summary.coverage.total} cases (${percent(summary.coverage.percent)}). Completion: ${percent(summary.coverage.completionRate)} of assessed cases.`, '',
    '## Persona scorecards', '', '| Synthetic persona | Engineering score | Assessed / configured | Completion of assessed |', '| --- | --- | --- | --- |',
    ...summary.personas.map(persona => `| ${cell(persona.name)} | ${score(persona.total)}${persona.coverage.partial ? ' (partial)' : ''} | ${persona.coverage.assessed}/${persona.coverage.total} | ${percent(persona.coverage.completionRate)} |`), '',
    '## Dimensions', '', '| Dimension | Weight | Engineering score |', '| --- | --- | --- |',
    ...dimensions.map(dimension => `| ${dimension} | ${WEIGHTS[dimension]}% | ${score(summary.dimensions[dimension])} |`), '',
    '## Journey coverage', '', '| Persona | Journey | Status | Adjusted / budget | Score | Reason |', '| --- | --- | --- | --- | --- | --- |',
    ...report.results.map((result, index) => `| ${cell(result.personaId)} | ${cell(result.journeyName)} | ${result.status} | ${seconds(summary.assessments[index].adjustedElapsedMs)} / ${result.budgetSeconds}s | ${score(summary.assessments[index].total)} | ${cell(result.reason)}${summary.assessments[index].exclusionReason ? `; ${cell(summary.assessments[index].exclusionReason)}` : ''} |`), '',
    '## Findings and supporting evidence', '',
  ];
  let findingCount = 0;
  orderedFindings(report, summary).forEach(({ result, resultIndex, finding }) => {
    findingCount += 1;
    lines.push(`### ${md(finding.title)}`, '',
      `${md(result.personaId)} / ${md(result.journeyName)} · ${finding.severity} · ${finding.dimension} · ${finding.confidence} · ${finding.scope}`, '',
      `Finding: ${md(finding.id)}; rule: ${md(finding.rule)}. ${findingState(finding, resultIndex, summary)}.`, '',
      md(finding.detail), '', `Proposed change: ${md(finding.recommendation.change)}`, '', 'Evidence:', '');
    for (const evidence of evidenceFor(result, finding)) {
      lines.push(`- **${md(evidence.id)}** (${evidence.kind}) — ${md(evidence.summary)}`, `  - Captured: ${md(evidence.timestamp)}`, `  - URL: ${md(evidence.url)}`);
      if (evidence.details) lines.push(`  - Details: ${cell(evidence.details)}`);
      if (evidence.screenshot) lines.push(`  - Screenshot artifact: ${safeScreenshot(evidence.screenshot) ? `[${md(evidence.screenshot)}](${evidence.screenshot})` : md(evidence.screenshot)}`);
    }
    lines.push('');
  });
  if (!findingCount) lines.push('No findings were recorded. Check coverage and limitations before interpreting this result.', '');

  lines.push('## Optimization plan', '', 'All changes below are proposals for review and retesting. Preserve existing branding and design tokens.', '');
  for (const section of Section.options) {
    lines.push(`### ${section}`, '');
    const matches = report.results.flatMap(result => result.findings.filter(finding => finding.recommendation.section === section).map(finding => ({ result, finding })));
    if (!matches.length) { lines.push('No evidence-backed proposal recorded for this section.', ''); continue; }
    lines.push('| Finding / case | Before | After (proposed, untested) |', '| --- | --- | --- |');
    for (const { result, finding } of matches) lines.push(`| ${cell(`${finding.id}: ${result.personaId}/${result.journeyId}`)} | ${cell(finding.recommendation.before ?? 'Not captured')} | ${cell(finding.recommendation.after ?? finding.recommendation.change)} |`);
    lines.push('');
  }
  lines.push('## Blueprint review coverage', '', blueprintNotice, '', '| Review area / PDF pages | Automated scope, when evidenced | Follow-up still required |', '| --- | --- | --- |', ...blueprintCoverage.map(row => `| ${cell(`${row.area} (${row.pages})`)} | ${cell(row.automated)} | ${cell(row.required)} |`), '', '## Scoring method', '', rubricMarkdown(), '', '## Limitations', '', ...[...builtinLimitations, ...report.limitations].map(limitation => `- ${md(limitation)}`), '');
  return lines.join('\n');
}

function evidenceHtml(evidence: Evidence): string {
  const screenshot = evidence.screenshot ? safeScreenshot(evidence.screenshot) ? `<a href="${h(evidence.screenshot)}">${h(evidence.screenshot)}</a>` : h(evidence.screenshot) : null;
  return `<div class="evidence"><strong>${h(evidence.id)}</strong> <span class="tag">${h(evidence.kind)}</span><p>${h(evidence.summary)}</p><dl><dt>Captured</dt><dd>${h(evidence.timestamp)}</dd><dt>URL</dt><dd>${h(evidence.url)}</dd>${screenshot ? `<dt>Screenshot artifact</dt><dd>${screenshot}</dd>` : ''}</dl>${evidence.details ? `<pre>${h(evidence.details)}</pre>` : ''}</div>`;
}

function renderHtml(report: AuditReport, summary: ScoreSummary): string {
  const personaName = (id: string): string => report.personas.find(persona => persona.id === id)?.name ?? id;
  const allFindings = orderedFindings(report, summary);
  const findings = allFindings.map(({ result, resultIndex, finding }, index) => {
    const search = [finding.title, finding.detail, finding.rule, finding.recommendation.change, personaName(result.personaId), result.journeyName, ...evidenceFor(result, finding).map(evidence => evidence.summary)].join(' ').toLowerCase();
    return `<article class="finding" id="finding-${index}" data-search="${h(search)}" data-persona="${h(result.personaId)}" data-severity="${finding.severity}" data-dimension="${finding.dimension}"><div class="finding-meta"><span class="tag ${finding.severity}">${finding.severity}</span><span>${h(personaName(result.personaId))} · ${h(result.journeyName)}</span></div><h3>${h(finding.title)}</h3><p>${h(finding.detail)}</p><p class="meta">${h(finding.id)} · Rule ${h(finding.rule)} · ${finding.dimension} · ${finding.confidence} · ${finding.scope}</p><p class="state">${h(findingState(finding, resultIndex, summary))}</p><div class="recommendation"><strong>Proposed change</strong><p>${h(finding.recommendation.change)}</p></div><details><summary>Supporting evidence (${new Set(finding.evidenceIds).size})</summary>${evidenceFor(result, finding).map(evidenceHtml).join('')}</details></article>`;
  }).join('');
  const sections = Section.options.map(section => {
    const matches = allFindings.filter(({ finding }) => finding.recommendation.section === section);
    return `<section class="optimization"><h3>${h(section)}</h3>${matches.length ? `<div class="table-wrap"><table><thead><tr><th>Finding / case</th><th>Before</th><th>After <small>(proposed, untested)</small></th></tr></thead><tbody>${matches.map(({ result, finding }) => `<tr><td>${h(finding.id)}<small>${h(result.personaId)} / ${h(result.journeyId)}</small></td><td>${h(finding.recommendation.before ?? 'Not captured')}</td><td>${h(finding.recommendation.after ?? finding.recommendation.change)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">No evidence-backed proposal recorded for this section.</p>'}</section>`;
  }).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'none'; connect-src 'none'; base-uri 'none'; form-action 'none'"><title>HVAC owner usability audit</title><style>
:root{color-scheme:dark;--bg:#111916;--panel:#19231e;--border:#35443b;--text:#f2f5f2;--muted:#afc0b3;--green:#a5e8b3}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.55 system-ui,sans-serif}main{max-width:1240px;margin:auto;padding:40px 24px 72px}h1{font-size:clamp(2rem,4vw,3.6rem);line-height:1.1;letter-spacing:-.04em;margin:.4em 0}h2{font-size:1.6rem;margin:2.4em 0 .8em}h3{line-height:1.35;margin:.6em 0}p{margin:.6em 0}a{color:var(--green)}.eyebrow{text-transform:uppercase;letter-spacing:.16em;color:var(--green);font-size:.8rem}.notice{padding:16px 20px;border-left:4px solid var(--green);background:#21372a;margin:24px 0}.meta,.muted,small{color:var(--muted);font-size:.88rem}.meta{overflow-wrap:anywhere}.metrics,.personas{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px}.metric,.persona,.finding,.optimization{border:1px solid var(--border);border-radius:12px;background:var(--panel);padding:20px}.metric strong{display:block;font-size:1.8rem;line-height:1.2;margin:8px 0}.metric span{color:var(--muted)}.score-number{font-size:1.6rem;color:var(--green)}.dimension-list{list-style:none;padding:0;margin:12px 0}.dimension-list li{display:flex;justify-content:space-between;gap:12px;padding:5px 0;border-bottom:1px solid var(--border)}.filters{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:12px;margin:16px 0}label{font-size:.85rem;color:var(--muted)}input,select{display:block;width:100%;background:#111916;color:var(--text);border:1px solid #64766a;border-radius:6px;min-height:44px;padding:10px;font:inherit;margin-top:5px}input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid var(--green);outline-offset:3px}.finding{margin:16px 0}.finding-meta{display:flex;align-items:center;gap:12px;flex-wrap:wrap;color:var(--muted);font-size:.85rem}.tag{display:inline-block;font-size:.75rem;padding:3px 9px;border:1px solid #62786a;border-radius:20px;color:var(--text)}.critical{border-color:#ef8c8c;color:#ffb8b8}.high{border-color:#dfa66b;color:#ffcf9b}.medium{border-color:#c7c072;color:#ede7a8}.state{color:var(--green);font-size:.85rem}.recommendation{border-left:2px solid var(--green);padding:5px 16px;margin:16px 0}details{border-top:1px solid var(--border);margin-top:16px;padding-top:14px}summary{cursor:pointer;color:var(--green);padding:8px 0}.evidence{margin:16px 0;padding:16px;background:#111916;border-radius:6px;overflow-wrap:anywhere}.evidence dl{font-size:.85rem}.evidence dt{color:var(--muted)}.evidence dd{margin:0 0 8px}pre{font:13px/1.5 ui-monospace,monospace;white-space:pre-wrap;overflow-wrap:anywhere}.table-wrap{overflow-x:auto;border:1px solid var(--border);border-radius:8px}table{border-collapse:collapse;width:100%;font-size:.9rem;min-width:650px}th,td{text-align:left;padding:12px 14px;border-bottom:1px solid var(--border);vertical-align:top;overflow-wrap:anywhere}th{background:#243129;color:var(--green);font-weight:600}td small{display:block;margin-top:5px}.optimization{margin:16px 0}.optimization h3{margin-top:0}.limitations li{margin:10px 0;color:var(--muted)}.rubric{max-width:100ch}.empty{padding:24px;border:1px dashed var(--border);color:var(--muted)}[hidden]{display:none!important}footer{border-top:1px solid var(--border);margin-top:40px;padding-top:20px;color:var(--muted);font-size:.8rem}@media(max-width:750px){main{padding:24px 16px 48px}.filters{grid-template-columns:1fr 1fr}.filters label:first-child{grid-column:1/-1}.metric strong{font-size:1.5rem}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}}@media print{body{background:white;color:#111}.filters{display:none}.finding,.persona,.metric,.optimization{break-inside:avoid;background:white;border-color:#aaa}.meta,.muted,small,.limitations li{color:#444}h1,h2,h3,.score-number,.state{color:#163e23}.notice{background:#eee}.table-wrap{overflow:visible}table{min-width:0}th{background:#eee;color:#111}.evidence{background:#f5f5f5;color:#111}}
.report-nav{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 24px}.report-nav a{display:inline-flex;align-items:center;min-height:44px;padding:8px 12px;border:1px solid var(--border);border-radius:6px;text-decoration:none;font-size:.85rem}.report-nav a:hover{background:var(--panel)}.report-nav a:focus-visible{outline:3px solid var(--green);outline-offset:3px}.dimension-list li{align-items:baseline;font-size:.85rem}.dimension-list li span:last-child{white-space:nowrap;font-variant-numeric:tabular-nums}.journey-table td:nth-child(2){white-space:nowrap}h2[id]{scroll-margin-top:20px}@media print{.report-nav{display:none}}
</style></head><body><main><header><div class="eyebrow">LeadQuote · HVAC owner perspective</div><h1>Setup and usability audit</h1><p class="muted">Evidence-led engineering observations from synthetic personas</p><p class="meta">Run ${h(report.runId)} · ${h(report.createdAt)} · ${h(report.mode)} mode<br>Target: ${h(report.target)}<br>Source revision: ${h(report.sourceRevision)}</p><div class="notice">${h(environmentNotice(report))}</div><nav class="report-nav" aria-label="Report sections"><a href="#personas">Personas</a><a href="#coverage">Coverage</a><a href="#observations">Findings</a><a href="#optimization">Optimization</a><a href="#method">Scoring method</a><a href="#limitations">Limitations</a></nav></header>
<section aria-label="Audit summary" class="metrics"><div class="metric"><span>${summary.coverage.partial ? 'Partial engineering score' : 'Engineering score'}</span><strong>${score(summary.total)}</strong><small>Heuristic, not validated human research</small></div><div class="metric"><span>Case coverage</span><strong>${summary.coverage.assessed} / ${summary.coverage.total}</strong><small>${percent(summary.coverage.percent)} assessed · ${summary.coverage.excluded} excluded</small></div><div class="metric"><span>Task completion</span><strong>${percent(summary.coverage.completionRate)}</strong><small>${summary.coverage.completed} completed / ${summary.coverage.assessed} assessed cases</small></div><div class="metric"><span>Recorded findings</span><strong>${allFindings.length}</strong><small>Includes unscored opportunities and hypotheses</small></div></section>
<h2 id="personas">Synthetic persona scorecards</h2><section class="personas">${summary.personas.map(persona => `<article class="persona"><h3>${h(persona.name)}</h3><div class="score-number">${score(persona.total)}</div><p class="meta">${persona.coverage.partial ? 'Partial assessment · ' : ''}${persona.coverage.assessed}/${persona.coverage.total} cases · ${percent(persona.coverage.completionRate)} completed</p><ul class="dimension-list" aria-label="Dimension scores out of 100">${dimensions.map(dimension => `<li><span>${dimension} · ${WEIGHTS[dimension]}%</span><span>${compactScore(persona.dimensions[dimension])}</span></li>`).join('')}</ul></article>`).join('')}</section>
<h2 id="coverage">Journey coverage</h2><div class="table-wrap"><table class="journey-table"><thead><tr><th>Persona / journey</th><th>Status</th><th>Adjusted time / budget</th><th>Score</th><th>Reason</th></tr></thead><tbody>${report.results.map((result, index) => `<tr><td>${h(personaName(result.personaId))}<small>${h(result.journeyName)}</small></td><td>${h(result.status)}</td><td>${seconds(summary.assessments[index].adjustedElapsedMs)} / ${result.budgetSeconds}s<small>Injected: ${seconds(result.injectedDelayMs)}</small></td><td>${score(summary.assessments[index].total)}</td><td>${h(result.reason)}${summary.assessments[index].exclusionReason ? `<small>${h(summary.assessments[index].exclusionReason)}</small>` : ''}</td></tr>`).join('')}</tbody></table></div>
<h2 id="observations">Findings and supporting evidence</h2><p class="muted">Assessed in-scope findings appear first, ordered by severity. Hypotheses and unassessed observations follow.</p><noscript><p class="notice">All findings are shown. Search and filters require JavaScript.</p></noscript><div class="filters"><label>Search findings<input id="search" type="search" placeholder="Rule, journey, evidence or recommendation"></label><label>Persona<select id="persona"><option value="">All personas</option>${report.personas.map(persona => `<option value="${h(persona.id)}">${h(persona.name)}</option>`).join('')}</select></label><label>Severity<select id="severity"><option value="">All severities</option>${['critical', 'high', 'medium', 'low'].map(value => `<option value="${value}">${value}</option>`).join('')}</select></label><label>Dimension<select id="dimension"><option value="">All dimensions</option>${dimensions.map(value => `<option value="${value}">${value}</option>`).join('')}</select></label></div><p id="finding-count" class="meta" aria-live="polite">${allFindings.length} findings shown</p><div id="findings">${findings || '<p class="empty">No findings were recorded. Check coverage and limitations before interpreting this result.</p>'}</div><p id="no-matches" class="empty" hidden>No findings match these filters.</p>
<h2 id="optimization">Optimization plan</h2><p class="muted">Before → After proposals for review and retesting. Preserve the existing application branding and design tokens.</p>${sections}
<h2 id="blueprint">Blueprint review coverage</h2><p class="muted">${h(blueprintNotice)}</p><details><summary>Review automated scope and required follow-up</summary><div class="table-wrap"><table><thead><tr><th>Review area / PDF pages</th><th>Automated scope, when evidenced</th><th>Follow-up still required</th></tr></thead><tbody>${blueprintCoverage.map(row => `<tr><td>${h(row.area)}<small>${h(row.pages)}</small></td><td>${h(row.automated)}</td><td>${h(row.required)}</td></tr>`).join('')}</tbody></table></div></details>
<h2 id="method">Scoring method</h2><section class="rubric">${rubricMarkdown().split('\n\n').map(paragraph => `<p>${h(paragraph)}</p>`).join('')}</section>
<h2 id="limitations">Limitations</h2><ul class="limitations">${[...builtinLimitations, ...report.limitations].map(limitation => `<li>${h(limitation)}</li>`).join('')}</ul><footer>Rubric ${h(summary.rubricVersion)} · Offline report · No external scripts, fonts, or network requests · Seed ${report.seed}</footer></main>
<script>
(() => {
  'use strict';
  const search = document.getElementById('search');
  const persona = document.getElementById('persona');
  const severity = document.getElementById('severity');
  const dimension = document.getElementById('dimension');
  const cards = Array.from(document.querySelectorAll('.finding'));
  const update = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    for (const card of cards) {
      const match = (!query || card.dataset.search.includes(query)) && (!persona.value || card.dataset.persona === persona.value) && (!severity.value || card.dataset.severity === severity.value) && (!dimension.value || card.dataset.dimension === dimension.value);
      card.hidden = !match;
      if (match) visible += 1;
    }
    document.getElementById('finding-count').textContent = visible + ' of ' + cards.length + ' findings shown';
    document.getElementById('no-matches').hidden = visible !== 0 || cards.length === 0;
  };
  search.addEventListener('input', update);
  for (const control of [persona, severity, dimension]) control.addEventListener('change', update);
})();
</script></body></html>`;
}

/** Validate all references before creating output. No network or external asset dependencies. */
export async function writeReport(report: AuditReport, directory: string): Promise<void> {
  const validated = validateReport(report);
  const summary = scoreReport(validated);
  const markdown = renderMarkdown(validated, summary);
  const html = renderHtml(validated, summary);
  await mkdir(directory, { recursive: true });
  await Promise.all([
    writeFile(join(directory, 'report.json'), `${JSON.stringify(validated, null, 2)}\n`, 'utf8'),
    writeFile(join(directory, 'report.md'), markdown, 'utf8'),
    writeFile(join(directory, 'report.html'), html, 'utf8'),
  ]);
}
