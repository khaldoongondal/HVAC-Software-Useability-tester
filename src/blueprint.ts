import type { Page } from 'playwright';
import type { Finding } from './schema.js';

/** Aggregate snapshot signals only: no element names, text, values, selectors or URLs. */
export interface BlueprintSignals {
  viewport: { width: number; height: number; horizontalOverflowPx: number; overflowElementCount: number };
  zoomRestrictedByMeta: boolean;
  paragraphs: { visibleCount: number; tightLineHeightCount: number; negativeLetterSpacingCount: number; unknownLineHeightCount: number };
  forms: { visibleCount: number; visibleInputCount: number; requiredCount: number; requiredWithoutLocalCueCount: number; optionalWithoutLocalCueCount: number };
  unmutedAutoplayDeclarationCount: number;
  positiveTabIndexCount: number;
  visibleProgressCount: number;
  declaredLiveRegionCount: number;
  timing: { responseStartMs: number | null; domContentLoadedMs: number | null; loadEventMs: number | null; firstPaintMs: number | null; firstContentfulPaintMs: number | null };
}

export async function inspectBlueprint(page: Page, redactSelectors: string[] = []): Promise<BlueprintSignals> {
  return page.evaluate((privateSelectors): BlueprintSignals => {
    const excluded = ['[data-sensitive]', '[data-private]', '[hidden]', '[aria-hidden="true"]', ...privateSelectors].join(',');
    // Array-wrapped callbacks avoid tsx/esbuild name helpers leaking into the serialized browser function.
    const available = [(element: Element): boolean => {
      if (element.closest(excluded)) return false;
      for (let current: Element | null = element; current; current = current.parentElement) {
        const style = getComputedStyle(current);
        if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse' || style.opacity === '0') return false;
      }
      return true;
    }][0];
    const width = document.documentElement.clientWidth, height = window.innerHeight;
    const visible = [(element: Element): boolean => {
      if (!available(element)) return false;
      const box = element.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && box.top < height && box.bottom > 0 && box.left < width && box.right > 0;
    }][0];
    const select = [(selector: string) => Array.from(document.querySelectorAll(selector))][0];
    // Measure allowed content intersecting the current vertical viewport. Private geometry is not inspected.
    const overflowing = select('body *').filter(element => {
      if (!available(element) || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(element.tagName)) return false;
      const box = element.getBoundingClientRect();
      if (box.width <= 0 || box.height <= 0 || box.top >= height || box.bottom <= 0) return false;
      if (box.right <= width + 1 && box.left >= -1) return false;
      // A deliberately scrollable/clipped internal region is not page-level overflow.
      for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        if (['auto', 'scroll', 'hidden', 'clip'].includes(getComputedStyle(parent).overflowX)) return false;
      }
      return true;
    });
    const horizontalOverflowPx = Math.round(Math.max(0, ...overflowing.map(element => {
      const box = element.getBoundingClientRect(); return Math.max(box.right - width, -box.left);
    })));
    const paragraphs = select('p').filter(visible);
    let tightLineHeightCount = 0, negativeLetterSpacingCount = 0, unknownLineHeightCount = 0;
    for (const paragraph of paragraphs) {
      const style = getComputedStyle(paragraph), size = parseFloat(style.fontSize), leading = parseFloat(style.lineHeight);
      if (!Number.isFinite(leading) || !size) unknownLineHeightCount++;
      else if (leading / size < 1.4) tightLineHeightCount++;
      if (parseFloat(style.letterSpacing) < 0) negativeLetterSpacingCount++;
    }
    const formSelector = 'form,[role="form"]';
    const inputs = select('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="image"]),textarea,select')
      .filter(element => visible(element) && element.closest(formSelector));
    let requiredCount = 0, requiredWithoutLocalCueCount = 0, optionalWithoutLocalCueCount = 0;
    for (const element of inputs) {
      const required = element.hasAttribute('required') || element.getAttribute('aria-required') === 'true';
      if (required) requiredCount++;
      const field = element as HTMLInputElement;
      const labels = [...Array.from(field.labels ?? []), ...(element.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean).map(id => document.getElementById(id)).filter((node): node is HTMLElement => node !== null)]
        .filter(available);
      // Text is tested within the page and immediately discarded; no field values or labels leave the page.
      const cue = required ? /\brequired\b|\*/i : /\boptional\b/i;
      const hasCue = labels.some(label => cue.test(label.textContent ?? '')) || cue.test(element.getAttribute('aria-label') ?? '');
      if (!hasCue) { if (required) requiredWithoutLocalCueCount++; else optionalWithoutLocalCueCount++; }
    }
    const zoomRestrictedByMeta = select('meta[name="viewport" i]').filter(element => !element.closest(excluded)).some(element => {
      const content = element.getAttribute('content') ?? '';
      const max = content.match(/(?:^|[,;\s])maximum-scale\s*=\s*([\d.]+)/i);
      return /(?:^|[,;\s])user-scalable\s*=\s*(?:no|0)(?:[,;\s]|$)/i.test(content) || (max !== null && Number(max[1]) <= 1);
    });
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const measured = [(value: number | undefined) => value !== undefined && Number.isFinite(value) && value > 0 ? Math.round(value * 10) / 10 : null][0];
    const paint = [(name: string) => measured(performance.getEntriesByType('paint').find(entry => entry.name === name)?.startTime)][0];
    return {
      viewport: { width, height, horizontalOverflowPx, overflowElementCount: overflowing.length }, zoomRestrictedByMeta,
      paragraphs: { visibleCount: paragraphs.length, tightLineHeightCount, negativeLetterSpacingCount, unknownLineHeightCount },
      forms: { visibleCount: select(formSelector).filter(visible).length, visibleInputCount: inputs.length, requiredCount, requiredWithoutLocalCueCount, optionalWithoutLocalCueCount },
      unmutedAutoplayDeclarationCount: select('audio,video').filter(element => available(element) && (element as HTMLMediaElement).autoplay && !(element as HTMLMediaElement).muted).length,
      positiveTabIndexCount: select('[tabindex]').filter(element => visible(element) && (element as HTMLElement).tabIndex > 0).length,
      visibleProgressCount: select('progress,[role="progressbar"],[aria-current="step"]').filter(visible).length,
      declaredLiveRegionCount: select('[role="status"],[role="alert"],[aria-live="polite"],[aria-live="assertive"]').filter(available).length,
      timing: { responseStartMs: measured(navigation?.responseStart), domContentLoadedMs: measured(navigation?.domContentLoadedEventEnd), loadEventMs: measured(navigation?.loadEventEnd), firstPaintMs: paint('first-paint'), firstContentfulPaintMs: paint('first-contentful-paint') },
    };
  }, redactSelectors);
}

export function blueprintFindings(signals: BlueprintSignals, evidenceId: string): Finding[] {
  const findings: Finding[] = [];
  const add = (rule: string, title: string, detail: string, dimension: Finding['dimension'], change: string, section: Finding['recommendation']['section'] = 'Friction-Absorbing Engineering Enhancements') => {
    findings.push({ id: `${evidenceId}-blueprint-${rule}`, rule: `blueprint-${rule}`, title, detail, dimension, severity: 'low', confidence: 'heuristic', scope: 'in-scope', evidenceIds: [evidenceId], recommendation: { section, change: `${change} Preserve existing branding, fonts, colors and design tokens.` } });
  };
  if (signals.viewport.horizontalOverflowPx > 1) add('viewport-overflow', 'Review horizontal overflow in this viewport', `Blueprint pp. 7–8 (§3.2, edge spacing) and p. 10 (§4.2, accessibility): allowed content extends approximately ${signals.viewport.horizontalOverflowPx}px beyond this viewport. This snapshot is not a WCAG reflow test and does not establish behavior at other widths or zoom levels.`, 'cognitive', 'Inspect the overflowing layout and preserve readable content at the tested width; keep intentional table scrolling inside its container.', 'Layout & Structural Rearrangements');
  if (signals.zoomRestrictedByMeta) add('zoom-meta', 'Viewport metadata requests restricted zoom', 'Blueprint p. 10 (§4.2 accessibility principle): viewport metadata contains user-scalable=no/0 or maximum-scale of at most 1. Browser enforcement varies. This implementation heuristic is derived from the accessibility principle, not an explicit blueprint zoom threshold.', 'recovery', 'Allow user-controlled zoom and verify enlargement on real browsers and devices.');
  if (signals.paragraphs.tightLineHeightCount) add('paragraph-leading', 'Review tight paragraph line spacing', `Blueprint p. 6 (§3.2): ${signals.paragraphs.tightLineHeightCount} visible paragraphs have computed line-height below 1.4 times font size. Context and font metrics matter; this is a readability heuristic, not a conformance failure.`, 'cognitive', 'Review affected paragraph spacing using the existing typography tokens and confirm readability with owners.');
  if (signals.paragraphs.negativeLetterSpacingCount) add('paragraph-tracking', 'Review compressed paragraph letter spacing', `Blueprint pp. 6–7 (§3.2): ${signals.paragraphs.negativeLetterSpacingCount} visible paragraphs have negative computed letter spacing. Confirm whether the chosen font and text size remain readable.`, 'cognitive', 'Review paragraph tracking in the shared typography system without changing the brand typeface.');
  if (signals.forms.requiredWithoutLocalCueCount || signals.forms.optionalWithoutLocalCueCount) add('field-cues', 'Review required and optional field guidance', `Blueprint p. 12 (§5.1): ${signals.forms.requiredWithoutLocalCueCount} required and ${signals.forms.optionalWithoutLocalCueCount} optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.`, 'language', 'Check whether the current form explains which details are required or optional; clarify only ambiguous instructions.', 'Trade-Specific Microcopy Rewrites');
  if (signals.unmutedAutoplayDeclarationCount) add('autoplay-audio', 'Media requests autoplay without being muted', `Blueprint p. 9 (§4.1): ${signals.unmutedAutoplayDeclarationCount} non-private media elements declare autoplay while unmuted. This does not prove playback or an audible track; browser autoplay policy and media content need separate verification.`, 'cognitive', 'Prefer deliberate playback controls and verify that media does not interrupt the owner’s task.');
  if (signals.positiveTabIndexCount) add('positive-tabindex', 'Review explicitly reordered keyboard stops', `Blueprint p. 10 (§4.2 keyboard access): ${signals.positiveTabIndexCount} visible elements use positive tabindex. This flags a manual focus-order review, not a demonstrated keyboard failure or a specific rule quoted from the blueprint.`, 'recovery', 'Check keyboard sequence against the visual task order and prefer natural DOM order where practical.');
  // Timing and progress/live-region declarations remain descriptive evidence, never scoring gates.
  return findings;
}
