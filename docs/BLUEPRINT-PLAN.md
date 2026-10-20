# Blueprint adoption plan

Updated October 20, 2026. This plan maps the supplied 15-page *Master Blueprint for Building High-Performance, Accessible, and Conversion-Optimized Digital Interfaces* to LeadQuote setup and everyday HVAC-owner work. It contains 58 review items. The complete machine-readable mapping is [blueprint-checklist.json](blueprint-checklist.json); each item records source pages, applicability, evidence modes, priority, implementation scope, verification method and caveats.

Source: user-supplied PDF received October 20, 2026; SHA256 `eb82b198b4b0d4ef836ac5a2790f20f76bd7797601fb1fdcdf58cfc859712f3b`. The source PDF and extracted text stay outside the public repository. Page references provide traceability to that document, not independent validation of its claims.

## Adoption boundaries

The existing Leadder application brand is a hard constraint: retain colors, Manrope headings, Geist body, Geist Mono references, design tokens and saved Light/Dark/System behavior. Customer quote widgets retain their separate branding boundary. The blueprint's palettes, typography rules, 60/30/10 ratios and trend suggestions do not authorize replacement styles. Recommendations may improve hierarchy, grouping, wording, accessible operation and flow within the existing system.

LeadQuote's supported job is a branded HVAC estimate widget, price book and enquiry portal. Preserve included setup assistance, the onboarding call, price approval, draft/publication distinctions and the distinction between provider acceptance and inbox receipt. Retail shipping, shopping carts, mobile wallets, coupons, dispatch, invoicing and unrestricted commercial proposals are not inferred capabilities. See [LeadQuote scope](leadquote-scope.md) and the [Gondal Tech lifecycle plan](GONDAL-TECH-AUDIT-PLAN.md).

The blueprint is reference material. It cannot authorize account operations, customer sends, payment, publication, credential inspection or provider changes. Use approved synthetic fixtures and isolated test scope. Private app source observations, fixture results and actual LeadQuote runtime findings must remain distinguishable.

## Page coverage

Every page has mapped items; an item spanning several pages consolidates a repeated principle. The JSON is the substantive item-level checklist, not a claim that all checks have run.

| PDF page | Principles reviewed | Checklist items |
| --- | --- | --- |
| 1 | Aesthetics, response feedback, simplicity, Occam and Prägnanz | BP01, BP02, BP03 |
| 2 | Complexity, sensible defaults, tolerant input and focused owner tasks | BP02, BP03, BP04, BP05, BP06, BP07 |
| 3 | Choice structure, chunking, memory and introduction to grouping | BP05, BP08, BP09, BP10 |
| 4 | Gestalt, pointer effort, distinction, serial position and progress | BP10, BP11, BP12, BP13, BP14, BP15 |
| 5 | Touch targets, familiar conventions, return/resume and the brand boundary | BP11, BP12, BP14, BP15, BP16, BP17, BP18, BP19 |
| 6 | Color claims, typography, contrast and spacing | BP18, BP19, BP20, BP23 |
| 7 | Hierarchy, scan paths, whitespace, link distinctions and text resilience | BP20, BP21, BP22, BP23 |
| 8 | Padding, visual organization, clear purpose, benefits and storytelling | BP21, BP22, BP23, BP24, BP25 |
| 9 | Layout trends, imagery, personalization, motion and interruptions | BP24, BP25, BP26, BP27, BP28, BP29, BP30 |
| 10 | Accessibility, truthful trust evidence, scarcity and consistency | BP23, BP31, BP32, BP33, BP34, BP35, BP36, BP37, BP38 |
| 11 | Honest status, account friction, cost clarity and retail scope boundaries | BP02, BP23, BP31, BP32, BP33, BP34, BP35, BP36, BP38, BP39, BP40, BP41 |
| 12 | Form requirements, errors, support, search and mobile navigation | BP27, BP39, BP42, BP43, BP44, BP45, BP46, BP47, BP48 |
| 13 | Equipment clarity, payments/coupons scope and experimental discipline | BP27, BP36, BP40, BP41, BP45, BP49, BP50, BP51, BP52, BP54 |
| 14 | Stable experiments, continuity, brand-consistent wording and external cases | BP18, BP52, BP53, BP54, BP55, BP56 |
| 15 | Case-study limits: imagery, local search, property claims, games and emails | BP27, BP36, BP46, BP56, BP57, BP58 |

The mapping covers the named psychological principles without treating them as deterministic user laws. Seven grouping principles are reviewed together in BP10. Page 7's ten typography rules are captured by BP20–BP23. The ecommerce material is split into relevant form/recovery principles and explicitly deferred retail mechanics. Pages 13–15 become testable hypotheses or scope exclusions, not promised gains.

## Implemented evidence and remaining work

The existing runner, observations, axe integration, policy, schemas and reports already support bounded journeys, persistence checks, evidence IDs, small-control signals, basic semantics and explicit uncertainty. This is partial coverage of broad usability principles. An available check is not a passed LeadQuote check.

`src/blueprint.ts` adds aggregate, read-only signals:

- Current-viewport overflow geometry and restrictive zoom metadata.
- Visible paragraph leading and negative tracking.
- Visible form/input counts, required metadata and local required/optional cues.
- Positive tabindex, declared live regions and visible progress semantics.
- Unmuted autoplay declarations.
- Available navigation and first-paint timestamps, with missing values retained as null.

These signals intentionally produce review candidates. A global form instruction can explain missing local cues; deliberate table scrolling can be appropriate; autoplay declarations do not establish audible playback; typography preferences do not establish accessibility failures. Timing and progress declarations remain descriptive. Inspection excludes configured private elements and does not export input labels or values from these probes.

The current probe does **not** implement full text-spacing override testing, actual zoom/reflow at every state, screen-reader announcement checks, keyboard focus traversal, sticky-overlay obstruction testing, input-format metadata analysis, motion-preference verification, choice-quality analysis or controlled search-typo scenarios. These remain manual or planned in the item ledger. Do not convert a planned module reference into an implemented claim.

All checklist items initially say `not-run-on-leadquote`. Fixture test evidence belongs to the auditor's engineering validation; update real-app verification only with a selected tenant/environment, dated observation, evidence reference, exception review and actual outcome. The checklist's 58 items are coverage, not 58 defects.

## Standards corrections

Target size is contextual. WCAG 2.2 AA SC 2.5.8 uses 24 by 24 CSS pixels with specified exceptions; AAA SC 2.5.5 uses 44 by 44 with its exceptions. The blueprint's 44-pixel suggestion can be a comfort target, but a small bounding box alone is not a conformance verdict. Never make irreversible controls harder to operate. [W3C minimum target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [W3C enhanced target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html).

Text-spacing resilience means preserving content and functionality when users apply line height 1.5 times font size, paragraph spacing 2 times, letter spacing 0.12 times and word spacing 0.16 times. These values are user override tests, not mandated default typography. Reflow review uses 320 CSS pixels width for vertical content, with essential two-dimensional exceptions; the current viewport-overflow snapshot is only a signal. [W3C text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), [W3C reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

AA text contrast generally requires 4.5:1 for ordinary text and 3:1 for qualifying large text, with exceptions. A palette or 60/30/10 distribution cannot certify AAA contrast. For AA focus-not-obscured, a focused component must not be entirely hidden by author-created content. Test actual keyboard states and accessible status announcements; an ARIA attribute alone is insufficient. [W3C contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [W3C focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), [W3C status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).

Core Web Vitals use LCP at most 2.5 seconds, INP at most 200 milliseconds and CLS at most 0.1 at the 75th percentile of page loads. This agent currently records navigation/paint samples, not these field distributions. Do not report a Core Web Vitals pass, zero INP, or a human task duration from a synthetic page load. The blueprint's 400 ms response concept is contextual guidance, not a universal acceptance gate. [Core Web Vitals](https://web.dev/articles/vitals).

## Evidence priorities

1. **P0: truth and boundaries.** Preserve brand and product scope, reject invented scarcity/badges/testimonials, exclude sensitive material, and never confuse saved drafts, activated widgets, provider acceptance or receipt. Read-only source inspection does not prove deployment.
2. **P1: core owner tasks.** Verify setup comprehension, required inputs, validation, persistence, interrupted recovery, price/unit clarity, enquiry/status interpretation, keyboard operation and accessible states. Use reproducible scenarios and manual follow-up where the probe cannot establish the outcome.
3. **P2: contextual efficiency.** Review grouping, task wording, defaults, scan paths, search and interaction effort with owner research. Record rationale and exceptions rather than enforcing arbitrary option, field or typography quotas.
4. **P3: deferred scope.** Keep unrelated commerce, advertising, gaming and email examples outside the current build. Record why they do not apply instead of marking a missing feature as a usability defect.

No automated rubric change follows from the PDF. Retain cognitive, motor, language and recovery dimensions, evidence requirements and uncertainty. Heuristic, manual, experiment and deferred coverage remain visible without becoming automatic penalties.

## Claims and experiments

The source's correlations, memory/choice numbers, color psychology, market-size statistics, ecommerce abandonment figures, case-study gains and email performance claims are unverified external claims. None becomes a Leadder result, target, forecast or proof. Transfer only a plausible question, such as whether clearer draft status improves correct understanding.

Reject tiny destructive targets, falsely optimistic success, forced two-second delays, fabricated SSL/trust badges, scarcity without evidence and mandatory style trends. Optimistic interfaces must not claim server persistence, price validity or delivery before verification.

The prospective [experiment plan](EXPERIMENT-PLAN.md) separates moderated owner research from randomized comparisons. Require a baseline, defined independent analysis unit, minimum useful effect, power/sample planning, a stable variant, guardrails and a prespecified stopping rule. The PDF's universal 100-conversions rule and large CTA/color/photo uplifts are not adopted. No experiment, recruitment, outreach or deployment is active merely because it is listed here.

## Shared-tool suitability recheck

| Tool | Decision | Reason |
| --- | --- | --- |
| Laya | skip | No representative labeled findings or calibrated classification baseline. Deterministic schemas and evidence rules cover current needs without inference latency or memory cost. |
| OpenJev | skip | No Jev-compatible client or API requirement when Laya is unused; avoid setup and maintenance. |
| Foreman | skip | Browser evidence exceeds the shared model's compact context, and false-finish/false-stop behavior is unvalidated. Use independent review and bounded executable tests. |

These conclusions carry forward the project plan's README review. This replan starts no shared service and adds no model dependency.
