import type { Page } from 'playwright';
import { redact, safeUrl } from './privacy.js';

export interface Control { ref: string; name: string; role: string; width: number; height: number; x: number; y: number; sensitive: boolean; }
export interface Observation { url: string; title: string; text: string; controls: Control[]; }
export async function observe(page: Page, redactSelectors: string[] = []): Promise<Observation> {
  const raw = await page.evaluate((privateSelectors) => {
    const excluded = ['[data-sensitive]', '[data-private]', 'script', 'style', 'noscript', '[aria-hidden=true]', ...privateSelectors].join(',');
    document.querySelectorAll('[data-hvac-ref]').forEach(el => el.removeAttribute('data-hvac-ref'));
    const controls = Array.from(document.querySelectorAll<HTMLElement>('a,button,input:not([type=hidden]),textarea,select,[role=button],[role=link],[role=checkbox],[role=tab]'))
      .filter(el => { const b = el.getBoundingClientRect(); return !el.closest(excluded) && b.width > 0 && b.height > 0 && getComputedStyle(el).visibility !== 'hidden'; }).slice(0, 150)
      .map((el, index) => {
        const box = el.getBoundingClientRect();
        const ref = `e${index + 1}`;
        el.setAttribute('data-hvac-ref', ref);
        const field = el as HTMLInputElement;
        const label = field.labels?.[0]?.textContent;
        const name = el.getAttribute('aria-label') || label || el.innerText || el.getAttribute('placeholder') || el.getAttribute('title') || '';
        return { ref, name: name.trim().slice(0, 180), role: el.getAttribute('role') || ({ A: 'link', BUTTON: 'button', SELECT: 'combobox', TEXTAREA: 'textbox' }[el.tagName] || (field.type === 'checkbox' ? 'checkbox' : 'textbox')), width: Math.round(box.width), height: Math.round(box.height), x: Math.round(box.x), y: Math.round(box.y), sensitive: field.type === 'password' || /password|secret|token|api.?key|credit.?card/i.test(name) };
      });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const text: string[] = [];
    while (walker.nextNode()) {
      const parent = walker.currentNode.parentElement;
      if (parent && !parent.closest(excluded) && parent.getClientRects().length && getComputedStyle(parent).visibility !== 'hidden') text.push(walker.currentNode.textContent || '');
    }
    return { title: document.title, text: text.join(' ').replace(/\s+/g, ' ').slice(0, 10000), controls };
  }, redactSelectors);
  return { url: safeUrl(page.url()), title: redact(raw.title), text: redact(raw.text), controls: raw.controls.map(control => ({ ...control, name: control.sensitive ? '[sensitive field]' : redact(control.name) })) };
}
