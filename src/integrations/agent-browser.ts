import { execFile } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { promisify } from 'node:util';

const executeFile = promisify(execFile);
const EXPECTED_VERSION = '0.39.1';
const MAX_SNAPSHOT = 30_000;
const TEMP_PREFIX = 'hvac-agent-browser-';

type CliResponse = { success: boolean; data?: { snapshot?: unknown; url?: unknown } };

function fixtureUrl(value: string): URL {
  const url = new URL(value);
  if (url.protocol !== 'http:' || url.hostname !== '127.0.0.1'
    || !url.port || Number(url.port) < 1024 || url.username || url.password
    || url.search || url.hash) {
    throw new Error('agent-browser inspection accepts only the marked HTTP 127.0.0.1 fixture on an explicit port >=1024, without credentials, query or fragment.');
  }
  return url;
}

function isolatedEnvironment(): NodeJS.ProcessEnv {
  // Keep native browser discovery and Windows process startup working, without
  // forwarding API keys, proxies, NODE_OPTIONS or ambient AGENT_BROWSER options.
  const allowed = new Set([
    'PATH', 'PATHEXT', 'SYSTEMROOT', 'WINDIR', 'COMSPEC',
    'TEMP', 'TMP', 'TMPDIR', 'LOCALAPPDATA', 'APPDATA',
    'USERPROFILE', 'HOME', 'HOMEDRIVE', 'HOMEPATH', 'LANG', 'LC_ALL',
  ]);
  return Object.fromEntries(Object.entries(process.env).filter(([key, value]) =>
    value !== undefined && allowed.has(key.toUpperCase())));
}

/**
 * Optional adapter for the trusted bundled fixture, never a production runner.
 * Requires a separately installed native agent-browser 0.39.1 and Chrome.
 * No CLI, plugin, state, profile, model or generic action escape hatch is exposed.
 */
export async function inspectWithAgentBrowser(
  value: string,
  executable: string = 'agent-browser',
): Promise<{ snapshot: string }> {
  const target = fixtureUrl(value);
  if (!executable || /[\r\n\0]/.test(executable) || /\.(?:cmd|bat)$/i.test(executable)) {
    throw new Error('Provide a native agent-browser executable; shell scripts and command shims are not supported.');
  }

  const response = await fetch(target, {
    method: 'HEAD',
    redirect: 'error',
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok || response.headers.get('x-hvac-audit-fixture') !== '1') {
    throw new Error('Target is not identified as the bundled HVAC audit fixture.');
  }

  const directory = await mkdtemp(join(tmpdir(), TEMP_PREFIX));
  const session = 'hvac-' + randomUUID();
  const configPath = join(directory, 'config.json');
  const policyPath = join(directory, 'policy.json');
  const env = isolatedEnvironment();
  let started = false;
  let primaryError: unknown;
  let snapshot: string | undefined;

  const baseArgs = [
    '--config', configPath, '--namespace', session, '--session', session,
    '--json', '--content-boundaries', '--max-output', String(MAX_SNAPSHOT),
    '--allowed-domains', '127.0.0.1', '--action-policy', policyPath, '--no-webmcp',
  ];

  async function raw(args: string[]): Promise<string> {
    const result = await executeFile(executable, [...baseArgs, ...args], {
      // The native daemon can outlive its browser. A removable config directory
      // must not become its cwd on Windows, where that would prevent cleanup.
      cwd: tmpdir(),
      env,
      shell: false,
      windowsHide: true,
      timeout: 30_000,
      maxBuffer: 256_000,
      encoding: 'utf8',
    });
    return result.stdout.trim();
  }

  async function run(args: string[]): Promise<CliResponse> {
    const result: unknown = JSON.parse(await raw(args));
    if (!result || typeof result !== 'object' || !('success' in result)
      || result.success !== true) {
      throw new Error('agent-browser did not confirm the requested inspection command.');
    }
    return result as CliResponse;
  }

  async function verifyOrigin(): Promise<void> {
    const result = await run(['get', 'url']);
    if (typeof result.data?.url !== 'string'
      || new URL(result.data.url).origin !== target.origin) {
      throw new Error('Fixture inspection left its configured origin.');
    }
  }

  try {
    // Explicit config bypasses upstream user/project config merging.
    await writeFile(configPath, JSON.stringify({
      headed: false, plugins: [], restoreSave: 'never',
      idleTimeout: '60s', contentBoundaries: true, maxOutput: MAX_SNAPSHOT,
    }), { mode: 0o600 });
    // Native 0.39.1 checks raw action names. "launch" and "close" manage this
    // fresh browser only; no fill/click/press/evaluate/state operation is allowed.
    await writeFile(policyPath, JSON.stringify({
      default: 'deny',
      allow: ['launch', 'navigate', 'snapshot', 'url', 'get', 'close'],
      deny: ['click', 'fill', 'type', 'press', 'interact', 'eval', 'evaluate',
        'download', 'upload', 'state', 'network', 'webmcp_invoke'],
    }), { mode: 0o600 });

    const version = await raw(['--version']);
    if (!/^agent-browser\s+v?0\.39\.1(?:\s|$)/.test(version)) {
      throw new Error('This optional inspector requires reviewed agent-browser ' + EXPECTED_VERSION + '.');
    }
    // Mark before dispatch: a timeout could leave the browser running.
    started = true;
    await run(['open', target.href]);
    await verifyOrigin();
    const result = await run(['snapshot', '-i']);
    if (typeof result.data?.snapshot !== 'string' || !result.data.snapshot.trim()
      || result.data.snapshot.length > MAX_SNAPSHOT) {
      throw new Error('agent-browser returned an empty, malformed or oversized snapshot.');
    }
    snapshot = result.data.snapshot;
    await verifyOrigin();
  } catch (error) {
    primaryError = error;
  } finally {
    if (started) {
      try {
        await run(['close']);
      } catch (error) {
        const cleanupError = new Error('agent-browser session cleanup was not confirmed: ' + session, { cause: error });
        primaryError = primaryError
          ? new AggregateError([primaryError, cleanupError], 'Inspection failed and session cleanup needs attention.')
          : cleanupError;
      }
    }
    // Delete only the exact directory created by mkdtemp inside the OS temp root.
    if (resolve(dirname(directory)) !== resolve(tmpdir()) || !basename(directory).startsWith(TEMP_PREFIX)) {
      primaryError = new Error('Refusing cleanup outside the expected temporary directory.', { cause: primaryError });
    } else {
      try {
        await rm(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      } catch (error) {
        primaryError = primaryError
          ? new AggregateError([primaryError, error], 'Inspection and temporary-file cleanup failed.')
          : error;
      }
    }
  }
  if (primaryError) throw primaryError;
  if (snapshot === undefined) throw new Error('No fixture snapshot was produced.');
  return { snapshot };
}
