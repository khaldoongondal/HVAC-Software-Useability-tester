# Final HVAC owner audit plan

**Prepared October 20, 2026. Status: execution authorized and started.**

Execution update: KD said to start, authorized manual backend creation, then superseded the existing-login requirement with a separate new test login for **Gondaltech**. The new identity and business have been created, and LeadQuote access is active. Public widget and external delivery controls are disabled. Credentials and identity identifiers stay in protected systems. The earlier existing-login language below records the reviewed plan and is superseded by this update for account creation only.

The auditor is an independent project in `Leadder/HVAC-Software-Useability-tester`, pushed to the user-designated GitHub repository. KD reviewed the complete plan and subsequently instructed execution. The original plan-review hold is satisfied.

## 1. Objective and success standard

Audit LeadQuote as an HVAC business owner from the first entry through full setup, later business changes and daily work. Establish whether each task is understandable, achievable, recoverable and accurately represented by the UI. Preserve Leadder's existing branding, palette, typography, tokens and style system. The audit produces recommendations; it does not silently redesign or modify application code.

Completion means every planned task has an explicit outcome and supporting evidence. A completed task requires its intended result, not just a click or model claim. An unavailable feature, missing prerequisite or policy block remains visible as incomplete coverage. No perfect score is manufactured from missing data.

## 2. Test business and preflight

Current execution arrangement: **Gondaltech is a brand-new business under the separate test login KD later supplied**. KD explicitly authorized manual backend creation and LeadQuote access. The new business, selected-business state and owner access were verified. The original existing-login arrangement is superseded. Never rename an existing client, borrow another account's completed onboarding or use Cool Aid.

Before creating it:

1. Confirm the current supported account-creation path, any payment/terms prerequisites, and which actions it triggers.
2. Record the app version/source evidence and refresh the current UI selectors.
3. Prepare a fictional HVAC data pack: products, capacities, Good/Better/Best tiers, sample prices, service descriptions and deliberately invalid inputs. Clearly label it audit data.
4. Identify controlled test-only website and receipt destinations if those stages will be executed. Do not guess addresses, real contact recipients, CRM credentials or site-access details.
5. Record KD's platform/software-owner privileges. They may expose extra features or mask customer permission problems. A true least-privilege customer test requires an established role-preview mechanism or separately authorized test identity; do not remove KD's administrative access.

Current read-only preflight found account switching and existing-client management, but no visible Create business control in those inspected surfaces. The LeadQuote price-book page displayed a release-hold message with disabled publication. These are starting prerequisites to verify, not findings from a Gondal Tech audit. Do not bypass product holds to make the run appear complete.

## 3. Five synthetic owner perspectives

| Persona | Primary environment | Evaluation focus |
| --- | --- | --- |
| Paper-to-Digital Transitioner | Desktop; low software familiarity and high workload | Plain language, setup guidance, shallow navigation, recovery without remembered cross-screen data |
| High-Volume Mobile Dispatcher | Phone/tablet in the field | Fast enquiry access, large comfortable controls, short paths, readable estimates |
| Office-Bound Operations Hawk | Desktop; repeated administrative work | Efficient price changes, consistent navigation, minimal duplicate entry, reliable save states |
| Commercial Contract Estimator | Tablet; complex equipment/scoping expectations | Pricing/option clarity, technical units, flexible descriptions, clear product boundaries |
| Micro-Business Solo Operator | Phone; frequent calls and interruptions | Autosave/draft clarity, resume, cancellation, accidental inputs and preservation of work |

The profiles are synthetic hypotheses, not interviews or evidence that age determines ability. Dispatch, invoicing and multi-page commercial proposals are not presumed LeadQuote capabilities. Unsupported expectations become product-fit opportunities, not automatic usability defects.

## 4. Full initial setup journey

Walk through the actual owner path, retaining the order shown by the app:

1. Select Gondal Tech and enter LeadQuote; understand the current setup status and next action.
2. Enter business details, country/region, address format, timezone and quote currency using approved synthetic data.
3. Define service areas and identify the price approver.
4. Understand KD-assisted setup versus client-managed tasks. Verify the included-help explanation and any required onboarding call.
5. Supply equipment, capacities, tiers, price-sheet information, options, scope notes and exclusions.
6. Review branding and financing fields without assuming a financing capability or changing brand identity.
7. Follow website, access and installation instructions; distinguish what the owner supplies from what KD completes.
8. Review business policies, enquiry destinations and lead follow-up responsibilities.
9. Complete the available intake/save flow; test required/optional cues, inline errors, back/forward, progress and submission uncertainty.
10. Resume after interruption/reload. Verify saved values, status and the next step.
11. Inspect booking/support handoffs. Actual booking or communications require a controlled, authorized destination; otherwise mark the handoff inspected and the outcome untested.

Do not substitute admin-preseeded state for the owner's missing setup steps. Track manual fulfillment prerequisites separately from UI problems.

## 5. Initial price book and widget readiness

Create a clearly fictional initial price draft where supported. Test currency and unit clarity; ranges; products, capacities and tiers; equipment/options; and sensible validation. Verify invalid, empty and boundary inputs without publishing them.

Save, leave and return to prove persistence. Compare draft/review/approved/live labels. Review stale-revision or uncertain-save behavior without blind duplicate submission. Establish who approves and which prerequisites remain before activation.

Follow the widget-help path. Inspect inline, hosted and popup preview choices that actually exist. Run homeowner-style equipment selection, option comparison, backtracking and estimate review on the controlled preview. Check estimate scope, exclusions, currency and next action. Installation and public activation are separate from preview acceptance.

## 6. Changes an owner would make later

Exercise available supported changes only within Gondal Tech:

- Update a synthetic equipment price, tier, capacity or option.
- Change a description, service/scope note or other normal editable business field.
- Cancel an edit, reload an unfinished edit, revisit a saved edit and verify the exact intended change persisted.
- Test tab switching and interrupted work; assess unsaved-change guidance.
- Where supported, test conflicting/stale edits in controlled tabs and verify clear recovery.
- Confirm that draft changes do not present themselves as live publication and that existing saved quotes remain historically consistent.
- Review widget/business settings and help; do not enter credentials, change external providers or invite people as part of routine editing.

Publication/activation, provider configuration and any action with real external consequences need their own concrete execution checkpoint. Audit authorization does not remove existing release gates.

## 7. Daily-work simulation

Run three realistic work sessions using synthetic records:

| Session | Tasks | Expected evidence |
| --- | --- | --- |
| Morning owner review | Open the correct account, find new enquiries, inspect a saved estimate and identify the next action | Discoverability, clear record/status, search scope, frozen quote values |
| Midday field work | Find an enquiry on a phone, recover after a call, make an allowed price correction and return to work | Touch comfort, short paths, persistence and no lost task context |
| End-of-day office review | Revisit enquiries, interpret delivery states, check unresolved items and find support | Accurate accepted/sent/failed/paused wording, recoverable next actions, no false receipt claims |

Inspect filtering, pagination and search behavior as the app actually implements them. Do not assume global search if the UI searches one page. Distinguish an accepted send request from confirmed inbox delivery. Contacting homeowners, retrying messages or creating support notifications is not inferred from viewing a record.

## 8. Blueprint-based inspection

The supplied 15-page blueprint is mapped in `docs/BLUEPRINT-PLAN.md` and `docs/blueprint-checklist.json`.

| Area | Automated or observable evidence | Human review still required |
| --- | --- | --- |
| Flow and cognitive burden | Action counts, input density, progress/status declarations, repeated data entry | Necessary complexity, grouping, task clarity and five-second comprehension |
| Language and forms | Jargon flags, required/optional cues, validation and typo recovery | Trade vocabulary, contextual defaults, input normalization accuracy |
| Layout and typography | Current-view overflow, line-height/tracking flags, target geometry | Visual hierarchy, reading measure, mobile reach and brand consistency |
| Accessibility | Axe rules, zoom metadata, tabindex and semantic cues | Full keyboard/focus order, screen reader, 320-CSS-pixel reflow, text-spacing overrides and real-device use |
| Performance | Network profile, automation duration and available navigation/paint timing | Perceived feedback and representative field performance; no lab-only Core Web Vitals certification |
| Trust and completion | Explicit save/receipt states, error/recovery behavior | Honest scope, pricing, claims, support responsibility and authentic proof |
| Conversion and experiments | Evidence-based candidate improvements | Real analytics, properly designed experiments and human interpretation |

Apply the blueprint critically. Do not force a fixed number of fields, shrink destructive controls, fabricate successful saves, delay a fast process artificially, invent security badges or assume a color ratio guarantees contrast compliance. Its external statistics and case studies are not Leadder outcomes or promised gains. Retain the existing visual system.

## 9. Execution method and test matrix

Start with a baseline desktop owner path, then repeat applicable tasks for the other personas. Use desktop, phone and tablet viewports; Light/Dark/System behavior where relevant; keyboard navigation; zoom/text-spacing review; slower network conditions; deliberate safe typos; wrong-choice/backtracking; interruption/reload; and recoverable validation failures.

Include paced slow typing and imprecise/missed taps against safe neutral targets. In a controlled fixture or isolated staging form, test an accidental Enter-triggered submission while incomplete, then verify validation, preserved input and no unintended duplicate. The current fixture implements typing and neutral misclicks; accidental-submit recovery is a planned scenario requiring its own verified setup. Defer that case on live surfaces if its effects cannot be isolated.

Physical glare, greasy hands, low battery and real OS phone-call behavior cannot be certified by desktop browser emulation. State which condition was actually emulated and which remains a contextual assumption.

The harness uses Playwright as the default executor, schema-bound optional model decisions, observed element references, per-scenario control allowlists, fresh contexts, seeded pacing and bounded execution. Production configs remain inspect-only. Separately authorized guided browser actions on Gondal Tech are recorded distinctly and do not weaken the default runner's safeguards.

Record state changes between passes. Use fresh browser contexts where appropriate, but recognize that they do not reset backend data. Keep the same business and a change ledger; do not silently delete/reset it.

## 10. Evidence, findings and scoring

For each task record persona, context, expected outcome, actual steps, observed result, duration, injected delays, evidence/screenshot references, state changes and limitations. Use explicit outcomes: completed, failed, blocked, not run, or outside supported scope.

Every finding includes severity, affected owner task, reproduction, expected/observed behavior, confidence, evidence IDs and a specific recommendation. Separate confirmed observations, heuristic interpretations, product-fit opportunities and missing prerequisites.

The engineering score remains:

- Time/efficiency: 30%
- Cognitive friction: 25%
- Trade language: 20%
- Error recovery: 25%

Report per-persona and overall scores alongside coverage and completion rate. Repeated rules are deduplicated; hypotheses and opportunities do not incur penalties. Blocked/unrun cases do not become passes. Inspection-only evidence earns no task-completion score. Scores are transparent engineering heuristics, not validated human-usability research. Critical risks remain visible regardless of aggregate score.

## 11. Deliverables

1. Executive assessment with the highest-impact owner obstacles and immediate next steps.
2. Five persona scorecards and the complete setup/changes/daily-work coverage matrix.
3. Evidence-linked findings in offline HTML, Markdown and strict JSON where the execution mode supports that contract; guided observations clearly labeled separately.
4. Prioritized issue backlog: critical, high, medium and low, with effort, dependency and verification notes.
5. The four requested optimization sections: **Eliminated Steps; Layout & Structural Rearrangements; Trade-Specific Microcopy Rewrites (Before → After); Friction-Absorbing Engineering Enhancements.**
6. Gondal Tech change ledger and final account state, including which drafts, records or settings remain.
7. A retest plan mapping each proposed improvement to the affected task and evidence.
8. Future human-owner research and experiment candidates from `docs/EXPERIMENT-PLAN.md`; no automatic experiments or conversion-lift claims.

Raw authenticated captures and contact details remain outside the public repository. Only sanitized synthetic examples and reusable tester source are published.

## 12. Framework provenance and project controls

The five requested repositories inform persona methodology, interaction mechanics, observation/action loops, compact browser references and strict schemas. `agent-browser` has a real pinned fixture adapter. Browser-use is an architecture reference/manual handoff, not an installed Python executor. The supplied human-behavior-simulation-kit URL returned 404; its requested behaviors are independently implemented and the gap documented.

Laya: skip, because representative labeled/calibrated project data is absent. OpenJev: skip, because no Jev-compatible client is needed. Foreman: skip, because browser evidence and unvalidated short-context supervision are a poor fit. No shared inference services are started.

## 13. Start and stop rules

KD said to start and the new identity/business were created under the later clarified scope. Continue autonomously through available authorized tasks. Stop dependent stages only for a concrete prerequisite: missing intake context, payment/terms, unavailable release capability, controlled recipient/site details, or a consequential action outside the approved audit scope. Report actual completed and blocked coverage; the plan is not proof of acceptance.

Do not change unrelated businesses, billing, app releases, databases or provider configuration to manufacture a pass. No user/prospect communications, real payments or public publication follow merely from this plan. A blocked task is reported with the exact condition and the smallest action needed to continue.
