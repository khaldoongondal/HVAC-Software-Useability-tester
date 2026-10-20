import path from 'node:path';

export function redact(text: string): string {
  return text
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[email]')
    .replace(/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[phone]')
    .replace(/\b(?:sk-|ghp_|github_pat_|Bearer\s+)[A-Za-z0-9_.-]+/gi, '[credential]')
    .replace(/(https?:\/\/[^\s?#"<>]+)[?#][^\s"<>]*/g, '$1?[redacted]');
}
export function safeUrl(value: string): string {
  try { const url = new URL(value); return `${url.origin}${url.pathname}`; } catch { return '[unavailable URL]'; }
}
export function validateAuthPath(value: string, projectRoot: string): string {
  if (!path.isAbsolute(value)) throw new Error('HVAC_AUTH_STATE must be an absolute path outside the project and OneDrive.');
  const resolved = path.resolve(value);
  const relative = path.relative(projectRoot, resolved);
  if (/onedrive/i.test(resolved) || (!relative.startsWith('..' + path.sep) && !path.isAbsolute(relative))) {
    throw new Error('Keep authentication state outside the project and OneDrive.');
  }
  return resolved;
}
