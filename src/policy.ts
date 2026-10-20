import type { AuditConfig } from './schema.js';

export class PolicyError extends Error { override name = 'PolicyError'; }
export function isLoopback(url: string): boolean {
  return ['127.0.0.1', 'localhost', '[::1]'].includes(new URL(url).hostname);
}
export function validatePolicy(config: AuditConfig): void {
  const base = new URL(config.baseUrl);
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) throw new PolicyError('Use a credential-free HTTP(S) base URL without query parameters.');
  if (!config.allowedOrigins.includes(base.origin)) throw new PolicyError('The target origin must be explicitly allowlisted.');
  for (const origin of config.allowedOrigins) {
    if (new URL(origin).origin !== origin || !/^https?:/.test(origin)) throw new PolicyError('Allowed origins must be exact HTTP(S) origins without paths.');
  }
  if (config.environment === 'fixture' && config.allowedOrigins.some(origin => !isLoopback(origin))) throw new PolicyError('Fixture mode permits loopback origins only.');
  if (config.environment === 'production' && config.mutationPaths.length) throw new PolicyError('Production is inspect-only.');
  if (config.environment === 'staging' && !config.isolatedTenant.trim()) throw new PolicyError('Staging requires an explicitly designated isolated tenant.');
  for (const candidate of [...config.allowedPaths, ...config.mutationPaths, ...config.journeys.map(j => j.path)]) {
    if (candidate.startsWith('//') || new URL(candidate, base).pathname !== candidate || /[?#*]/.test(candidate)) throw new PolicyError('Use exact normalized paths without wildcards or query parameters.');
  }
  for (const journey of config.journeys) assertNavigation(new URL(journey.path, config.baseUrl).href, config);
}
export function assertNavigation(value: string, config: AuditConfig): void {
  const url = new URL(value, config.baseUrl);
  if (url.username || url.password || !config.allowedOrigins.includes(url.origin) || !config.allowedPaths.includes(url.pathname)) throw new PolicyError('Navigation is outside the configured origin/path scope.');
}
export function requestAllowed(urlValue: string, method: string, navigation: boolean, config: AuditConfig): boolean {
  try {
    const url = new URL(urlValue);
    if (url.username || url.password || !config.allowedOrigins.includes(url.origin)) return false;
    if (navigation && !config.allowedPaths.includes(url.pathname)) return false;
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return true;
    return config.environment !== 'production' && url.origin === new URL(config.baseUrl).origin && config.mutationPaths.includes(url.pathname);
  } catch { return false; }
}
export function assertInteraction(config: AuditConfig): void {
  if (config.environment === 'production') throw new PolicyError('Production mode only navigates to configured pages and observes them.');
}
