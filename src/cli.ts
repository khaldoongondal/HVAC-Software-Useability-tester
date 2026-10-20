import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { ConfigSchema, ReportSchema } from './schema.js';
import { personas } from './personas.js';
import { runAudit } from './runner.js';
import { writeReport } from './report.js';
import { scoreReport } from './scoring.js';
import { startFixture } from '../fixtures/server.js';
import { fixtureConfig } from '../fixtures/config.js';
import { inspectWithAgentBrowser } from './integrations/agent-browser.js';

const help = `HVAC owner usability agent

npm run demo                             Local fixture, all five personas; no API key
npm run audit -- run --config FILE        Approved target configuration
npm run audit -- run --config FILE --mode agent   Optional model-driven execution
npm run audit -- report --input FILE      Rebuild HTML/Markdown from report JSON
npm run audit -- validate --config FILE   Validate configuration before browser launch
npm run audit -- fixture                  Serve synthetic fixture until Ctrl+C
npm run audit -- native-demo --executable PATH  Optional agent-browser fixture inspection

Options: --out DIR --persona ID --journey ID --headed --fast --fail-on high|critical
Agent mode: HVAC_MODEL + HVAC_MODEL_API_KEY, optional HVAC_MODEL_BASE_URL.
Explicit allowModelDataTransfer in config is required for external model use.
Auth: HVAC_AUTH_STATE must point outside this project and OneDrive.
Production profiles always inspect only. No production task completion score.
Reports default to ignored artifacts/<timestamp>. No API calls in scripted/demo mode.
`;

async function main() {
  const { positionals, values } = parseArgs({ allowPositionals: true, options: {
    config: { type: 'string' }, out: { type: 'string' }, input: { type: 'string' }, mode: { type: 'string' }, persona: { type: 'string' }, journey: { type: 'string' }, executable: { type: 'string' }, 'fail-on': { type: 'string' }, headed: { type: 'boolean' }, fast: { type: 'boolean' }, help: { type: 'boolean' }
  } });
  const command = positionals[0] || 'help';
  if (values.help || command === 'help') { console.log(help); return; }
  const outputDir = path.resolve(values.out || `artifacts/${new Date().toISOString().replace(/[:.]/g, '-')}`);
  if (command === 'report') {
    if (!values.input) throw new Error('report requires --input report.json');
    const report = ReportSchema.parse(JSON.parse(await fs.readFile(values.input, 'utf8')));
    await writeReport(report, outputDir); console.log(`Report: ${path.join(outputDir, 'report.html')}`); return;
  }
  if (command === 'fixture') {
    const fixture = await startFixture(); console.log(`Synthetic fixture: ${fixture.baseUrl}/setup`);
    const close = async () => { await fixture.close(); process.exit(0); };
    process.once('SIGINT', close); process.once('SIGTERM', close); return;
  }
  if (command === 'native-demo') {
    const fixture = await startFixture();
    try { const result = await inspectWithAgentBrowser(`${fixture.baseUrl}/setup`, values.executable); await fs.mkdir(outputDir, { recursive: true }); await fs.writeFile(path.join(outputDir, 'native-snapshot.txt'), result.snapshot); console.log(`Native fixture snapshot saved in ${outputDir}`); }
    finally { await fixture.close(); } return;
  }
  if (!['demo', 'run', 'validate'].includes(command)) throw new Error(`Unknown command: ${command}`);
  if (values.mode && !['scripted', 'agent', 'inspect'].includes(values.mode)) throw new Error('--mode must be scripted, agent or inspect.');
  if (values['fail-on'] && !['high', 'critical'].includes(values['fail-on'])) throw new Error('--fail-on must be high or critical.');
  const fixture = command === 'demo' ? await startFixture() : undefined;
  try {
    if (!fixture && !values.config) throw new Error('An explicit --config is required. Use npm run demo for a local-only run.');
    const config = ConfigSchema.parse(fixture ? fixtureConfig(fixture.baseUrl) : JSON.parse(await fs.readFile(values.config!, 'utf8')));
    if (command === 'validate') {
      const { validatePolicy } = await import('./policy.js'); validatePolicy(config); console.log(`Configuration valid: ${config.name}`); return;
    }
    const report = await runAudit(config, personas, { outputDir, headed: values.headed, fast: values.fast, persona: values.persona, journey: values.journey, mode: values.mode as 'scripted' | 'agent' | 'inspect' | undefined });
    await writeReport(report, outputDir);
    const score = scoreReport(report);
    console.log(`Report: ${path.join(outputDir, 'report.html')}`);
    console.log(`Engineering usability score: ${score.total ?? 'not assessed'} / 100. Synthetic evidence, not human research.`);
    console.log(`Tasks: ${report.results.filter(r => r.status === 'completed').length} completed, ${report.results.filter(r => r.status === 'failed').length} failed, ${report.results.filter(r => r.status === 'blocked').length} blocked.`);
    if (values['fail-on']) {
      const severe = report.results.some(r => r.findings.some(f => f.scope === 'in-scope' && f.confidence !== 'hypothesis' && (f.severity === 'critical' || values['fail-on'] === 'high' && f.severity === 'high')));
      if (severe || report.results.some(r => r.status === 'failed' || r.status === 'blocked')) process.exitCode = 2;
    }
  } finally { await fixture?.close(); }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error instanceof Error ? error.message : 'Audit failed.'); process.exitCode = 1; });
