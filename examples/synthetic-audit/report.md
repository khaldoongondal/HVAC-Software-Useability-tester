# HVAC owner usability audit

**SYNTHETIC FIXTURE DEMONSTRATION. These results concern the bundled demonstration, not the deployed LeadQuote application.**

Run: f0842e48-baff-47d2-9b83-6cfdfc5b414b · 2026-10-20T22:51:52.156Z · Mode: scripted

Target: http://127.0.0.1:65400/

Source revision: See docs/upstream-lock.json and docs/leadquote-scope.md

Engineering score: **93.3 / 100** (partial assessment)

Coverage: 13/16 cases (81.3%). Completion: 76.9% of assessed cases.

## Persona scorecards

| Synthetic persona | Engineering score | Assessed / configured | Completion of assessed |
| --- | --- | --- | --- |
| The Paper-to-Digital Transitioner | 95.0 / 100 | 3/3 | 66.7% |
| The High-Volume Mobile Dispatcher | 93.8 / 100 (partial) | 2/3 | 100.0% |
| The Office-Bound Operations Hawk | 95.8 / 100 (partial) | 3/4 | 66.7% |
| The Commercial Contract Estimator | 91.8 / 100 (partial) | 2/3 | 100.0% |
| The Micro-Business Solo Operator | 90.0 / 100 | 3/3 | 66.7% |

## Dimensions

| Dimension | Weight | Engineering score |
| --- | --- | --- |
| time | 30% | 100.0 / 100 |
| cognitive | 25% | 85.0 / 100 |
| language | 20% | 92.7 / 100 |
| recovery | 25% | 94.2 / 100 |

## Journey coverage

| Persona | Journey | Status | Adjusted / budget | Score | Reason |
| --- | --- | --- | --- | --- | --- |
| paper-to-digital | Save a setup draft and resume after a call | failed | 3.05s / 45s | 91.5 / 100 | The configured visible condition did not pass. |
| paper-to-digital | Correct a price entry mistake | completed | 0.34s / 40s | 94.8 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |
| paper-to-digital | Find a homeowner enquiry and read its estimate | completed | 0.27s / 30s | 98.8 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |
| mobile-dispatcher | Find a homeowner enquiry and read its estimate | completed | 0.32s / 30s | 93.8 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |
| mobile-dispatcher | Preview a quote and correct the system choice | completed | 0.47s / 35s | 93.8 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |
| mobile-dispatcher | Explore commercial proposal and dispatch expectations | unsupported | 0.27s / 25s | Not assessed | Exploratory product-scope question, excluded from usability scoring.; Status unsupported is excluded from scoring. |
| operations-hawk | Save a setup draft and resume after a call | failed | 2.92s / 45s | 92.8 / 100 | The configured visible condition did not pass. |
| operations-hawk | Correct a price entry mistake | completed | 0.46s / 40s | 96.0 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |
| operations-hawk | Find a homeowner enquiry and read its estimate | completed | 0.28s / 30s | 98.8 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |
| operations-hawk | Explore commercial proposal and dispatch expectations | unsupported | 0.20s / 25s | Not assessed | Exploratory product-scope question, excluded from usability scoring.; Status unsupported is excluded from scoring. |
| commercial-estimator | Correct a price entry mistake | completed | 0.35s / 40s | 89.8 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |
| commercial-estimator | Preview a quote and correct the system choice | completed | 0.46s / 35s | 93.8 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |
| commercial-estimator | Explore commercial proposal and dispatch expectations | unsupported | 0.17s / 25s | Not assessed | Exploratory product-scope question, excluded from usability scoring.; Status unsupported is excluded from scoring. |
| solo-operator | Save a setup draft and resume after a call | failed | 3.03s / 45s | 86.5 / 100 | The configured visible condition did not pass. |
| solo-operator | Correct a price entry mistake | completed | 0.38s / 40s | 89.8 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |
| solo-operator | Preview a quote and correct the system choice | completed | 0.52s / 35s | 93.8 / 100 | The configured visible condition passed. Provider delivery and hidden backend state are not certified. |

## Findings and supporting evidence

### The task did not reach its visible completion condition

paper-to-digital / Save a setup draft and resume after a call · high · recovery · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e15-completion; rule: completion-condition. Applied once to rubric.

The scenario finished without its configured success state. Check the replay evidence and verify the selector is current before assigning this to the product.

Proposed change: Make progress and recovery visible, preserve unfinished data, and provide a clear next action. Reproduce on the approved target before changing the app.

Evidence:

- **paper-to-digital-setup-resume-e15** (assertion) — Configured visible completion condition not observed
  - Captured: 2026-10-20T22:51:38.330Z
  - URL: http://127.0.0.1:65400/setup
  - Details: testId: setup-resume-complete

### Controls may be difficult to hit in this context

mobile-dispatcher / Find a homeowner enquiry and read its estimate · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-find-enquiry-e1-targets; rule: target-size. Applied once to rubric.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-find-enquiry-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:39.700Z
  - URL: http://127.0.0.1:65400/enquiries
  - Details: \{"url":"http://127.0.0.1:65400/enquiries","title":"Your enquiries \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Your enquiries Find a request Fictional quote requests Request System Details DEMO-001 Heat pump Open DEMO-002 Furnace Open Fictional requests contain no homeowner name, email, phone or address.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Find a request","role":"textbox","width":354,"height":50,"x":18,"y":283,"sensitive":false\},\{"ref":"e7","name":"Open request DEMO-001","role":"button","width":28,"height":22,"x":277,"y":449,"sensitive":false\},\{"ref":"e8","name":"Open request DEMO-002","role":"button","width":28,"height":22,"x":277,"y":512,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Find a homeowner enquiry and read its estimate · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-find-enquiry-e4-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-find-enquiry-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:39.785Z
  - URL: http://127.0.0.1:65400/enquiries
  - Details: \{"url":"http://127.0.0.1:65400/enquiries","title":"Your enquiries \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Your enquiries Find a request Fictional quote requests Request System Details DEMO-001 Heat pump Open Fictional requests contain no homeowner name, email, phone or address.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Find a request","role":"textbox","width":354,"height":50,"x":18,"y":283,"sensitive":false\},\{"ref":"e7","name":"Open request DEMO-001","role":"button","width":28,"height":22,"x":277,"y":449,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Find a homeowner enquiry and read its estimate · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-find-enquiry-e7-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-find-enquiry-e7** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:39.851Z
  - URL: http://127.0.0.1:65400/enquiries
  - Details: \{"url":"http://127.0.0.1:65400/enquiries","title":"Your enquiries \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Your enquiries Find a request Fictional quote requests Request System Details DEMO-001 Heat pump Open Saved quote details DEMO-001: Heat pump, Good tier, estimate USD 6500. Fictional requests contain no homeowner name, email, phone or address.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Find a request","role":"textbox","width":354,"height":50,"x":18,"y":283,"sensitive":false\},\{"ref":"e7","name":"Open request DEMO-001","role":"button","width":28,"height":22,"x":277,"y":449,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-quote-backtrack-e1-targets; rule: target-size. Applied once to rubric.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-quote-backtrack-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:40.225Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Which system do you need? Furnace Heat pump ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Furnace","role":"button","width":91,"height":44,"x":39,"y":505,"sensitive":false\},\{"ref":"e7","name":"Heat pump","role":"button","width":115,"height":44,"x":138,"y":505,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-quote-backtrack-e4-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-quote-backtrack-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:40.301Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Furnace options Standard configuration, one unit, fictional approved prices. Back to systems Preview estimate ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Back to systems","role":"button","width":148,"height":44,"x":39,"y":569,"sensitive":false\},\{"ref":"e7","name":"Preview estimate","role":"button","width":155,"height":44,"x":39,"y":637,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-quote-backtrack-e7-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-quote-backtrack-e7** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:40.349Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Which system do you need? Furnace Heat pump ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Furnace","role":"button","width":91,"height":44,"x":39,"y":505,"sensitive":false\},\{"ref":"e7","name":"Heat pump","role":"button","width":115,"height":44,"x":138,"y":505,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-quote-backtrack-e10-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-quote-backtrack-e10** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:40.416Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Which system do you need? Furnace Heat pump ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Furnace","role":"button","width":91,"height":44,"x":39,"y":505,"sensitive":false\},\{"ref":"e7","name":"Heat pump","role":"button","width":115,"height":44,"x":138,"y":505,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-quote-backtrack-e13-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-quote-backtrack-e13** (snapshot) — After action 4
  - Captured: 2026-10-20T22:51:40.482Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Heat pump options Standard configuration, one unit, fictional approved prices. Back to systems Preview estimate ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Back to systems","role":"button","width":148,"height":44,"x":39,"y":569,"sensitive":false\},\{"ref":"e7","name":"Preview estimate","role":"button","width":155,"height":44,"x":39,"y":637,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-quote-backtrack-e16-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-quote-backtrack-e16** (snapshot) — After action 5
  - Captured: 2026-10-20T22:51:40.534Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Heat pump options Standard configuration, one unit, fictional approved prices. Back to systems Preview estimate Estimate preview Heat pump preview: USD 6500–7800. No enquiry was sent. Final installation scope requires contractor confirmation.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Back to systems","role":"button","width":148,"height":44,"x":39,"y":569,"sensitive":false\},\{"ref":"e7","name":"Preview estimate","role":"button","width":155,"height":44,"x":39,"y":637,"sensitive":false\}\]\}

### The task did not reach its visible completion condition

operations-hawk / Save a setup draft and resume after a call · high · recovery · heuristic · in-scope

Finding: operations-hawk-setup-resume-e15-completion; rule: completion-condition. Applied once to rubric.

The scenario finished without its configured success state. Check the replay evidence and verify the selector is current before assigning this to the product.

Proposed change: Make progress and recovery visible, preserve unfinished data, and provide a clear next action. Reproduce on the approved target before changing the app.

Evidence:

- **operations-hawk-setup-resume-e15** (assertion) — Configured visible completion condition not observed
  - Captured: 2026-10-20T22:51:44.145Z
  - URL: http://127.0.0.1:65400/setup
  - Details: testId: setup-resume-complete

### Controls may be difficult to hit in this context

commercial-estimator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e1-targets; rule: target-size. Applied once to rubric.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:46.020Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e4-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:46.105Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":525,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e6-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:46.137Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e9-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:46.175Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e12-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:46.249Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-quote-backtrack-e1-targets; rule: target-size. Applied once to rubric.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-quote-backtrack-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:46.558Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Which system do you need? Furnace Heat pump ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Furnace","role":"button","width":91,"height":44,"x":77,"y":428,"sensitive":false\},\{"ref":"e7","name":"Heat pump","role":"button","width":115,"height":44,"x":176,"y":428,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-quote-backtrack-e4-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-quote-backtrack-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:46.667Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Furnace options Standard configuration, one unit, fictional approved prices. Back to systems Preview estimate ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Back to systems","role":"button","width":148,"height":44,"x":77,"y":468,"sensitive":false\},\{"ref":"e7","name":"Preview estimate","role":"button","width":155,"height":44,"x":233,"y":468,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-quote-backtrack-e7-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-quote-backtrack-e7** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:46.732Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Which system do you need? Furnace Heat pump ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Furnace","role":"button","width":91,"height":44,"x":77,"y":428,"sensitive":false\},\{"ref":"e7","name":"Heat pump","role":"button","width":115,"height":44,"x":176,"y":428,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-quote-backtrack-e10-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-quote-backtrack-e10** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:46.799Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Which system do you need? Furnace Heat pump ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Furnace","role":"button","width":91,"height":44,"x":77,"y":428,"sensitive":false\},\{"ref":"e7","name":"Heat pump","role":"button","width":115,"height":44,"x":176,"y":428,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-quote-backtrack-e13-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-quote-backtrack-e13** (snapshot) — After action 4
  - Captured: 2026-10-20T22:51:46.866Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Heat pump options Standard configuration, one unit, fictional approved prices. Back to systems Preview estimate ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Back to systems","role":"button","width":148,"height":44,"x":77,"y":468,"sensitive":false\},\{"ref":"e7","name":"Preview estimate","role":"button","width":155,"height":44,"x":233,"y":468,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-quote-backtrack-e16-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-quote-backtrack-e16** (snapshot) — After action 5
  - Captured: 2026-10-20T22:51:46.935Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Heat pump options Standard configuration, one unit, fictional approved prices. Back to systems Preview estimate Estimate preview Heat pump preview: USD 6500–7800. No enquiry was sent. Final installation scope requires contractor confirmation.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Back to systems","role":"button","width":148,"height":44,"x":77,"y":468,"sensitive":false\},\{"ref":"e7","name":"Preview estimate","role":"button","width":155,"height":44,"x":233,"y":468,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Save a setup draft and resume after a call · high · cognitive · heuristic · in-scope

Finding: solo-operator-setup-resume-e1-targets; rule: target-size. Applied once to rubric.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-setup-resume-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:47.703Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":297,"height":74,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":39,"y":562,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Save a setup draft and resume after a call · high · cognitive · heuristic · in-scope

Finding: solo-operator-setup-resume-e4-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-setup-resume-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:47.766Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":297,"height":74,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":39,"y":562,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Save a setup draft and resume after a call · high · cognitive · heuristic · in-scope

Finding: solo-operator-setup-resume-e7-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-setup-resume-e7** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:47.814Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":297,"height":74,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":39,"y":562,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Save a setup draft and resume after a call · high · cognitive · heuristic · in-scope

Finding: solo-operator-setup-resume-e10-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-setup-resume-e10** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:47.883Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Setup draft saved. You can leave and return. Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":297,"height":74,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":39,"y":562,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Save a setup draft and resume after a call · high · cognitive · heuristic · in-scope

Finding: solo-operator-setup-resume-e13-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-setup-resume-e13** (snapshot) — After action 4
  - Captured: 2026-10-20T22:51:48.028Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Draft restored. Check both fields before continuing. Your service area was not restored. Enter it again. Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":297,"height":74,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":39,"y":562,"sensitive":false\}\]\}

### The task did not reach its visible completion condition

solo-operator / Save a setup draft and resume after a call · high · recovery · heuristic · in-scope

Finding: solo-operator-setup-resume-e15-completion; rule: completion-condition. Applied once to rubric.

The scenario finished without its configured success state. Check the replay evidence and verify the selector is current before assigning this to the product.

Proposed change: Make progress and recovery visible, preserve unfinished data, and provide a clear next action. Reproduce on the approved target before changing the app.

Evidence:

- **solo-operator-setup-resume-e15** (assertion) — Configured visible completion condition not observed
  - Captured: 2026-10-20T22:51:50.581Z
  - URL: http://127.0.0.1:65400/setup
  - Details: testId: setup-resume-complete

### Controls may be difficult to hit in this context

solo-operator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e1-targets; rule: target-size. Applied once to rubric.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:50.940Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e4-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:50.994Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":564,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":626,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e6-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:51.030Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e9-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:51.067Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Correct a price entry mistake · high · cognitive · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e12-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:51.132Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: solo-operator-quote-backtrack-e1-targets; rule: target-size. Applied once to rubric.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-quote-backtrack-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:51.530Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Which system do you need? Furnace Heat pump ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Furnace","role":"button","width":91,"height":44,"x":39,"y":505,"sensitive":false\},\{"ref":"e7","name":"Heat pump","role":"button","width":115,"height":44,"x":138,"y":505,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: solo-operator-quote-backtrack-e4-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-quote-backtrack-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:51.616Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Furnace options Standard configuration, one unit, fictional approved prices. Back to systems Preview estimate ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Back to systems","role":"button","width":148,"height":44,"x":39,"y":569,"sensitive":false\},\{"ref":"e7","name":"Preview estimate","role":"button","width":155,"height":44,"x":39,"y":637,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: solo-operator-quote-backtrack-e7-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-quote-backtrack-e7** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:51.681Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Which system do you need? Furnace Heat pump ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Furnace","role":"button","width":91,"height":44,"x":39,"y":505,"sensitive":false\},\{"ref":"e7","name":"Heat pump","role":"button","width":115,"height":44,"x":138,"y":505,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: solo-operator-quote-backtrack-e10-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-quote-backtrack-e10** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:51.748Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Which system do you need? Furnace Heat pump ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Furnace","role":"button","width":91,"height":44,"x":39,"y":505,"sensitive":false\},\{"ref":"e7","name":"Heat pump","role":"button","width":115,"height":44,"x":138,"y":505,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: solo-operator-quote-backtrack-e13-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-quote-backtrack-e13** (snapshot) — After action 4
  - Captured: 2026-10-20T22:51:51.798Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Heat pump options Standard configuration, one unit, fictional approved prices. Back to systems Preview estimate ","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Back to systems","role":"button","width":148,"height":44,"x":39,"y":569,"sensitive":false\},\{"ref":"e7","name":"Preview estimate","role":"button","width":155,"height":44,"x":39,"y":637,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

solo-operator / Preview a quote and correct the system choice · high · cognitive · heuristic · in-scope

Finding: solo-operator-quote-backtrack-e16-targets; rule: target-size. Repeated rule: no additional penalty.

7 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **solo-operator-quote-backtrack-e16** (snapshot) — After action 5
  - Captured: 2026-10-20T22:51:51.866Z
  - URL: http://127.0.0.1:65400/widget
  - Details: \{"url":"http://127.0.0.1:65400/widget","title":"Preview an instant estimate \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Preview an instant estimate This preview never captures a lead or sends a message. Neutral practice area. Clicking here changes nothing. Heat pump options Standard configuration, one unit, fictional approved prices. Back to systems Preview estimate Estimate preview Heat pump preview: USD 6500–7800. No enquiry was sent. Final installation scope requires contractor confirmation.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Back to systems","role":"button","width":148,"height":44,"x":39,"y":569,"sensitive":false\},\{"ref":"e7","name":"Preview estimate","role":"button","width":155,"height":44,"x":39,"y":637,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

paper-to-digital / Save a setup draft and resume after a call · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e1-targets; rule: target-size. Applied once to rubric.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-setup-resume-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:35.414Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":500,"height":74,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":205,"y":509,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e2-blueprint-field-cues; rule: blueprint-field-cues. Applied once to rubric.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-setup-resume-e2** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:35.487Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":51.5,"domContentLoadedMs":79.6,"loadEventMs":80.1,"firstPaintMs":104,"firstContentfulPaintMs":104\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Save a setup draft and resume after a call · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e4-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-setup-resume-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:35.530Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":500,"height":74,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":205,"y":509,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e5-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-setup-resume-e5** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:35.565Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":51.5,"domContentLoadedMs":79.6,"loadEventMs":80.1,"firstPaintMs":104,"firstContentfulPaintMs":104\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Save a setup draft and resume after a call · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e7-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-setup-resume-e7** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:35.606Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":500,"height":74,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":205,"y":509,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e8-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-setup-resume-e8** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:35.631Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":51.5,"domContentLoadedMs":79.6,"loadEventMs":80.1,"firstPaintMs":104,"firstContentfulPaintMs":104\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Save a setup draft and resume after a call · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e10-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-setup-resume-e10** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:35.685Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Setup draft saved. You can leave and return. Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":500,"height":74,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":205,"y":509,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e11-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-setup-resume-e11** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:35.714Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":51.5,"domContentLoadedMs":79.6,"loadEventMs":80.1,"firstPaintMs":104,"firstContentfulPaintMs":104\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Save a setup draft and resume after a call · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e13-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-setup-resume-e13** (snapshot) — After action 4
  - Captured: 2026-10-20T22:51:35.773Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"url":"http://127.0.0.1:65400/setup","title":"Set up your quote tool \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Set up your quote tool Save your business information before your setup call. Business name Areas you serve Save setup draft Draft restored. Check both fields before continuing. Your service area was not restored. Enter it again. Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Business name","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Areas you serve","role":"textbox","width":500,"height":74,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save setup draft","role":"button","width":150,"height":44,"x":205,"y":509,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: paper-to-digital-setup-resume-e14-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-setup-resume-e14** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:35.817Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":5,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2.3,"domContentLoadedMs":29.6,"loadEventMs":29.8,"firstPaintMs":44,"firstContentfulPaintMs":44\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Correct a price entry mistake · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e1-targets; rule: target-size. Applied once to rubric.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:38.610Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Configuration Matrix

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e1-jargon-1; rule: jargon-configuration-matrix. Applied once to rubric.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:38.610Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e1-jargon-2; rule: jargon-database-record. Applied once to rubric.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:38.610Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e1-jargon-3; rule: jargon-payload. Applied once to rubric.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:38.610Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e2-blueprint-field-cues; rule: blueprint-field-cues. Applied once to rubric.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e2** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:38.663Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.5,"domContentLoadedMs":45.2,"loadEventMs":45.3,"firstPaintMs":52,"firstContentfulPaintMs":52\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Correct a price entry mistake · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e4-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:38.687Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":525,"sensitive":false\}\]\}

### Review trade language: Configuration Matrix

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e4-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:38.687Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":525,"sensitive":false\}\]\}

### Review trade language: Database Record

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e4-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:38.687Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":525,"sensitive":false\}\]\}

### Review trade language: Payload

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e4-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:38.687Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":525,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e5-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e5** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:38.714Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.5,"domContentLoadedMs":45.2,"loadEventMs":45.3,"firstPaintMs":52,"firstContentfulPaintMs":52\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Correct a price entry mistake · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e6-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:38.722Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Configuration Matrix

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e6-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:38.722Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e6-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:38.722Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e6-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:38.722Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e7-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e7** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:38.745Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.5,"domContentLoadedMs":45.2,"loadEventMs":45.3,"firstPaintMs":52,"firstContentfulPaintMs":52\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Correct a price entry mistake · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e9-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:38.771Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Configuration Matrix

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e9-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:38.771Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e9-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:38.771Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e9-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:38.771Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e10-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e10** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:38.797Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.5,"domContentLoadedMs":45.2,"loadEventMs":45.3,"firstPaintMs":52,"firstContentfulPaintMs":52\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Correct a price entry mistake · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e12-targets; rule: target-size. Repeated rule: no additional penalty.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:38.834Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Configuration Matrix

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e12-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:38.834Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e12-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:38.834Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e12-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **paper-to-digital-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:38.834Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":205,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":205,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":205,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

paper-to-digital / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: paper-to-digital-pricing-recovery-e13-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **paper-to-digital-pricing-recovery-e13** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:38.863Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1280,"height":800,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.5,"domContentLoadedMs":45.2,"loadEventMs":45.3,"firstPaintMs":52,"firstContentfulPaintMs":52\}\}

### Controls may be difficult to hit in this context

paper-to-digital / Find a homeowner enquiry and read its estimate · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-find-enquiry-e1-targets; rule: target-size. Applied once to rubric.

7 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-find-enquiry-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:39.156Z
  - URL: http://127.0.0.1:65400/enquiries
  - Details: \{"url":"http://127.0.0.1:65400/enquiries","title":"Your enquiries \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Your enquiries Find a request Fictional quote requests Request System Details DEMO-001 Heat pump Open DEMO-002 Furnace Open Fictional requests contain no homeowner name, email, phone or address.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Find a request","role":"textbox","width":500,"height":50,"x":184,"y":252,"sensitive":false\},\{"ref":"e7","name":"Open request DEMO-001","role":"button","width":28,"height":22,"x":857,"y":430,"sensitive":false\},\{"ref":"e8","name":"Open request DEMO-002","role":"button","width":28,"height":22,"x":857,"y":497,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

paper-to-digital / Find a homeowner enquiry and read its estimate · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-find-enquiry-e4-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-find-enquiry-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:39.244Z
  - URL: http://127.0.0.1:65400/enquiries
  - Details: \{"url":"http://127.0.0.1:65400/enquiries","title":"Your enquiries \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Your enquiries Find a request Fictional quote requests Request System Details DEMO-001 Heat pump Open Fictional requests contain no homeowner name, email, phone or address.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Find a request","role":"textbox","width":500,"height":50,"x":184,"y":252,"sensitive":false\},\{"ref":"e7","name":"Open request DEMO-001","role":"button","width":28,"height":22,"x":857,"y":430,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

paper-to-digital / Find a homeowner enquiry and read its estimate · low · cognitive · heuristic · in-scope

Finding: paper-to-digital-find-enquiry-e7-targets; rule: target-size. Repeated rule: no additional penalty.

6 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **paper-to-digital-find-enquiry-e7** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:39.317Z
  - URL: http://127.0.0.1:65400/enquiries
  - Details: \{"url":"http://127.0.0.1:65400/enquiries","title":"Your enquiries \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Your enquiries Find a request Fictional quote requests Request System Details DEMO-001 Heat pump Open Saved quote details DEMO-001: Heat pump, Good tier, estimate USD 6500. Fictional requests contain no homeowner name, email, phone or address.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":184,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":237,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":323,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":400,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":515,"y":85,"sensitive":false\},\{"ref":"e6","name":"Find a request","role":"textbox","width":500,"height":50,"x":184,"y":252,"sensitive":false\},\{"ref":"e7","name":"Open request DEMO-001","role":"button","width":28,"height":22,"x":857,"y":430,"sensitive":false\}\]\}

### Review required and optional field guidance

operations-hawk / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: operations-hawk-setup-resume-e2-blueprint-field-cues; rule: blueprint-field-cues. Applied once to rubric.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-setup-resume-e2** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:41.317Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2.3,"domContentLoadedMs":17.4,"loadEventMs":17.7,"firstPaintMs":40,"firstContentfulPaintMs":40\}\}

### Review required and optional field guidance

operations-hawk / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: operations-hawk-setup-resume-e5-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-setup-resume-e5** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:41.382Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2.3,"domContentLoadedMs":17.4,"loadEventMs":17.7,"firstPaintMs":40,"firstContentfulPaintMs":40\}\}

### Review required and optional field guidance

operations-hawk / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: operations-hawk-setup-resume-e8-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-setup-resume-e8** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:41.451Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2.3,"domContentLoadedMs":17.4,"loadEventMs":17.7,"firstPaintMs":40,"firstContentfulPaintMs":40\}\}

### Review required and optional field guidance

operations-hawk / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: operations-hawk-setup-resume-e11-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-setup-resume-e11** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:41.533Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2.3,"domContentLoadedMs":17.4,"loadEventMs":17.7,"firstPaintMs":40,"firstContentfulPaintMs":40\}\}

### Review required and optional field guidance

operations-hawk / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: operations-hawk-setup-resume-e14-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-setup-resume-e14** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:41.634Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":5,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2,"domContentLoadedMs":20.2,"loadEventMs":20.5,"firstPaintMs":28,"firstContentfulPaintMs":28\}\}

### Review trade language: Configuration Matrix

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e1-jargon-0; rule: jargon-configuration-matrix. Applied once to rubric.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:44.493Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e1-jargon-1; rule: jargon-database-record. Applied once to rubric.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:44.493Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e1-jargon-2; rule: jargon-payload. Applied once to rubric.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:44.493Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e2-blueprint-field-cues; rule: blueprint-field-cues. Applied once to rubric.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-pricing-recovery-e2** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:44.563Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":3.6,"domContentLoadedMs":23,"loadEventMs":23.2,"firstPaintMs":44,"firstContentfulPaintMs":44\}\}

### Review trade language: Configuration Matrix

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e4-jargon-0; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:44.596Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":525,"sensitive":false\}\]\}

### Review trade language: Database Record

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e4-jargon-1; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:44.596Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":525,"sensitive":false\}\]\}

### Review trade language: Payload

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e4-jargon-2; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:44.596Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":525,"sensitive":false\}\]\}

### Review required and optional field guidance

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e5-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-pricing-recovery-e5** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:44.643Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":3.6,"domContentLoadedMs":23,"loadEventMs":23.2,"firstPaintMs":44,"firstContentfulPaintMs":44\}\}

### Review trade language: Configuration Matrix

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e6-jargon-0; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:44.659Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e6-jargon-1; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:44.659Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e6-jargon-2; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:44.659Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e7-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-pricing-recovery-e7** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:44.710Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":3.6,"domContentLoadedMs":23,"loadEventMs":23.2,"firstPaintMs":44,"firstContentfulPaintMs":44\}\}

### Review trade language: Configuration Matrix

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e9-jargon-0; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:44.742Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e9-jargon-1; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:44.742Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e9-jargon-2; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:44.742Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e10-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-pricing-recovery-e10** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:44.789Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":3.6,"domContentLoadedMs":23,"loadEventMs":23.2,"firstPaintMs":44,"firstContentfulPaintMs":44\}\}

### Review trade language: Configuration Matrix

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e12-jargon-0; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:44.835Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e12-jargon-1; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:44.835Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e12-jargon-2; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **operations-hawk-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:44.835Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":285,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":285,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":285,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

operations-hawk / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: operations-hawk-pricing-recovery-e13-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **operations-hawk-pricing-recovery-e13** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:44.873Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1440,"height":900,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":3.6,"domContentLoadedMs":23,"loadEventMs":23.2,"firstPaintMs":44,"firstContentfulPaintMs":44\}\}

### Controls may be difficult to hit in this context

operations-hawk / Find a homeowner enquiry and read its estimate · low · cognitive · heuristic · in-scope

Finding: operations-hawk-find-enquiry-e1-targets; rule: target-size. Applied once to rubric.

2 visible controls are smaller than the synthetic 24px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Open request DEMO-001 \(28×22\); Open request DEMO-002 \(28×22\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **operations-hawk-find-enquiry-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:45.162Z
  - URL: http://127.0.0.1:65400/enquiries
  - Details: \{"url":"http://127.0.0.1:65400/enquiries","title":"Your enquiries \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Your enquiries Find a request Fictional quote requests Request System Details DEMO-001 Heat pump Open DEMO-002 Furnace Open Fictional requests contain no homeowner name, email, phone or address.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Find a request","role":"textbox","width":500,"height":50,"x":264,"y":252,"sensitive":false\},\{"ref":"e7","name":"Open request DEMO-001","role":"button","width":28,"height":22,"x":937,"y":430,"sensitive":false\},\{"ref":"e8","name":"Open request DEMO-002","role":"button","width":28,"height":22,"x":937,"y":497,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

operations-hawk / Find a homeowner enquiry and read its estimate · low · cognitive · heuristic · in-scope

Finding: operations-hawk-find-enquiry-e4-targets; rule: target-size. Repeated rule: no additional penalty.

1 visible controls are smaller than the synthetic 24px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Open request DEMO-001 \(28×22\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **operations-hawk-find-enquiry-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:45.246Z
  - URL: http://127.0.0.1:65400/enquiries
  - Details: \{"url":"http://127.0.0.1:65400/enquiries","title":"Your enquiries \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Your enquiries Find a request Fictional quote requests Request System Details DEMO-001 Heat pump Open Fictional requests contain no homeowner name, email, phone or address.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Find a request","role":"textbox","width":500,"height":50,"x":264,"y":252,"sensitive":false\},\{"ref":"e7","name":"Open request DEMO-001","role":"button","width":28,"height":22,"x":937,"y":430,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

operations-hawk / Find a homeowner enquiry and read its estimate · low · cognitive · heuristic · in-scope

Finding: operations-hawk-find-enquiry-e7-targets; rule: target-size. Repeated rule: no additional penalty.

1 visible controls are smaller than the synthetic 24px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Open request DEMO-001 \(28×22\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **operations-hawk-find-enquiry-e7** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:45.336Z
  - URL: http://127.0.0.1:65400/enquiries
  - Details: \{"url":"http://127.0.0.1:65400/enquiries","title":"Your enquiries \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Your enquiries Find a request Fictional quote requests Request System Details DEMO-001 Heat pump Open Saved quote details DEMO-001: Heat pump, Good tier, estimate USD 6500. Fictional requests contain no homeowner name, email, phone or address.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":264,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":317,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":403,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":480,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":595,"y":85,"sensitive":false\},\{"ref":"e6","name":"Find a request","role":"textbox","width":500,"height":50,"x":264,"y":252,"sensitive":false\},\{"ref":"e7","name":"Open request DEMO-001","role":"button","width":28,"height":22,"x":937,"y":430,"sensitive":false\}\]\}

### Review trade language: Configuration Matrix

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e1-jargon-1; rule: jargon-configuration-matrix. Applied once to rubric.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:46.020Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e1-jargon-2; rule: jargon-database-record. Applied once to rubric.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:46.020Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e1-jargon-3; rule: jargon-payload. Applied once to rubric.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:46.020Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e2-blueprint-field-cues; rule: blueprint-field-cues. Applied once to rubric.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e2** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:46.077Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1024,"height":768,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.6,"domContentLoadedMs":16.5,"loadEventMs":16.9,"firstPaintMs":48,"firstContentfulPaintMs":48\}\}

### Review trade language: Configuration Matrix

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e4-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:46.105Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":525,"sensitive":false\}\]\}

### Review trade language: Database Record

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e4-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:46.105Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":525,"sensitive":false\}\]\}

### Review trade language: Payload

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e4-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:46.105Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":463,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":525,"sensitive":false\}\]\}

### Review required and optional field guidance

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e5-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e5** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:46.128Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1024,"height":768,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.6,"domContentLoadedMs":16.5,"loadEventMs":16.9,"firstPaintMs":48,"firstContentfulPaintMs":48\}\}

### Review trade language: Configuration Matrix

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e6-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:46.137Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e6-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:46.137Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e6-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:46.137Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e7-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e7** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:46.159Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1024,"height":768,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.6,"domContentLoadedMs":16.5,"loadEventMs":16.9,"firstPaintMs":48,"firstContentfulPaintMs":48\}\}

### Review trade language: Configuration Matrix

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e9-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:46.175Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e9-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:46.175Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e9-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:46.175Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e10-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e10** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:46.210Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1024,"height":768,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.6,"domContentLoadedMs":16.5,"loadEventMs":16.9,"firstPaintMs":48,"firstContentfulPaintMs":48\}\}

### Review trade language: Configuration Matrix

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e12-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:46.249Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review trade language: Database Record

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e12-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:46.249Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review trade language: Payload

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e12-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **commercial-estimator-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:46.249Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":500,"height":50,"x":77,"y":331,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":500,"height":50,"x":77,"y":423,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":77,"y":485,"sensitive":false\}\]\}

### Review required and optional field guidance

commercial-estimator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: commercial-estimator-pricing-recovery-e13-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **commercial-estimator-pricing-recovery-e13** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:46.279Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":1024,"height":768,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.6,"domContentLoadedMs":16.5,"loadEventMs":16.9,"firstPaintMs":48,"firstContentfulPaintMs":48\}\}

### Review required and optional field guidance

solo-operator / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: solo-operator-setup-resume-e2-blueprint-field-cues; rule: blueprint-field-cues. Applied once to rubric.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-setup-resume-e2** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:47.741Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2.8,"domContentLoadedMs":145.4,"loadEventMs":145.4,"firstPaintMs":160,"firstContentfulPaintMs":160\}\}

### Review required and optional field guidance

solo-operator / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: solo-operator-setup-resume-e5-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-setup-resume-e5** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:47.787Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2.8,"domContentLoadedMs":145.4,"loadEventMs":145.4,"firstPaintMs":160,"firstContentfulPaintMs":160\}\}

### Review required and optional field guidance

solo-operator / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: solo-operator-setup-resume-e8-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-setup-resume-e8** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:47.838Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2.8,"domContentLoadedMs":145.4,"loadEventMs":145.4,"firstPaintMs":160,"firstContentfulPaintMs":160\}\}

### Review required and optional field guidance

solo-operator / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: solo-operator-setup-resume-e11-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-setup-resume-e11** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:47.905Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2.8,"domContentLoadedMs":145.4,"loadEventMs":145.4,"firstPaintMs":160,"firstContentfulPaintMs":160\}\}

### Review required and optional field guidance

solo-operator / Save a setup draft and resume after a call · low · language · heuristic · in-scope

Finding: solo-operator-setup-resume-e14-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 2 required and 0 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-setup-resume-e14** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:48.073Z
  - URL: http://127.0.0.1:65400/setup
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":5,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":2,"requiredWithoutLocalCueCount":2,"optionalWithoutLocalCueCount":0\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":1,"timing":\{"responseStartMs":2,"domContentLoadedMs":92.4,"loadEventMs":92.4,"firstPaintMs":100,"firstContentfulPaintMs":100\}\}

### Review trade language: Configuration Matrix

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e1-jargon-1; rule: jargon-configuration-matrix. Applied once to rubric.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:50.940Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review trade language: Database Record

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e1-jargon-2; rule: jargon-database-record. Applied once to rubric.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:50.940Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review trade language: Payload

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e1-jargon-3; rule: jargon-payload. Applied once to rubric.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:50.940Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review required and optional field guidance

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e2-blueprint-field-cues; rule: blueprint-field-cues. Applied once to rubric.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-pricing-recovery-e2** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:50.972Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.2,"domContentLoadedMs":119.2,"loadEventMs":119.6,"firstPaintMs":144,"firstContentfulPaintMs":144\}\}

### Review trade language: Configuration Matrix

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e4-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:50.994Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":564,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":626,"sensitive":false\}\]\}

### Review trade language: Database Record

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e4-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:50.994Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":564,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":626,"sensitive":false\}\]\}

### Review trade language: Payload

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e4-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e4** (snapshot) — Deliberate synthetic typo before correction
  - Captured: 2026-10-20T22:51:50.994Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Enter a price greater than zero using numbers only. Your other draft values are unchanged. Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":564,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":626,"sensitive":false\}\]\}

### Review required and optional field guidance

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e5-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-pricing-recovery-e5** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:51.022Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.2,"domContentLoadedMs":119.2,"loadEventMs":119.6,"firstPaintMs":144,"firstContentfulPaintMs":144\}\}

### Review trade language: Configuration Matrix

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e6-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:51.030Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review trade language: Database Record

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e6-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:51.030Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review trade language: Payload

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e6-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e6** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:51.030Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review required and optional field guidance

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e7-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-pricing-recovery-e7** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:51.053Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.2,"domContentLoadedMs":119.2,"loadEventMs":119.6,"firstPaintMs":144,"firstContentfulPaintMs":144\}\}

### Review trade language: Configuration Matrix

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e9-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:51.067Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review trade language: Database Record

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e9-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:51.067Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review trade language: Payload

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e9-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e9** (snapshot) — After action 2
  - Captured: 2026-10-20T22:51:51.067Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review required and optional field guidance

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e10-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-pricing-recovery-e10** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:51.088Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":3,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.2,"domContentLoadedMs":119.2,"loadEventMs":119.6,"firstPaintMs":144,"firstContentfulPaintMs":144\}\}

### Review trade language: Configuration Matrix

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e12-jargon-1; rule: jargon-configuration-matrix. Repeated rule: no additional penalty.

The page contains “Configuration Matrix”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:51.132Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review trade language: Database Record

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e12-jargon-2; rule: jargon-database-record. Repeated rule: no additional penalty.

The page contains “Database Record”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:51.132Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review trade language: Payload

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e12-jargon-3; rule: jargon-payload. Repeated rule: no additional penalty.

The page contains “Payload”. Check the surrounding task context with owners; an advanced integration label may be appropriate.

Proposed change: Use task language in the primary flow; retain precise technical terms in optional help.

Evidence:

- **solo-operator-pricing-recovery-e12** (snapshot) — After action 3
  - Captured: 2026-10-20T22:51:51.132Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"url":"http://127.0.0.1:65400/pricebook","title":"Configuration Matrix \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Configuration Matrix Modify the Database Record and Serialize payload to stage the quote tiers. Good tier price Better tier price Save price draft Draft saved for review. Nothing has been published. Synthetic draft only. No prices are published.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Good tier price","role":"textbox","width":297,"height":50,"x":39,"y":384,"sensitive":false\},\{"ref":"e7","name":"Better tier price","role":"textbox","width":297,"height":50,"x":39,"y":476,"sensitive":false\},\{"ref":"e8","name":"Save price draft","role":"button","width":146,"height":44,"x":39,"y":538,"sensitive":false\}\]\}

### Review required and optional field guidance

solo-operator / Correct a price entry mistake · low · language · heuristic · in-scope

Finding: solo-operator-pricing-recovery-e13-blueprint-field-cues; rule: blueprint-field-cues. Repeated rule: no additional penalty.

Blueprint p. 12 \(§5.1\): 0 required and 2 optional visible form inputs lack a local label/description cue. Form-level instructions or localized wording may already explain them. Input count is descriptive; no maximum field count is imposed.

Proposed change: Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens.

Evidence:

- **solo-operator-pricing-recovery-e13** (metric) — Blueprint: current-view layout, form cues, interaction declarations and lab timing
  - Captured: 2026-10-20T22:51:51.154Z
  - URL: http://127.0.0.1:65400/pricebook
  - Details: \{"viewport":\{"width":375,"height":812,"horizontalOverflowPx":0,"overflowElementCount":0\},"zoomRestrictedByMeta":false,"paragraphs":\{"visibleCount":4,"tightLineHeightCount":0,"negativeLetterSpacingCount":0,"unknownLineHeightCount":0\},"forms":\{"visibleCount":1,"visibleInputCount":2,"requiredCount":0,"requiredWithoutLocalCueCount":0,"optionalWithoutLocalCueCount":2\},"unmutedAutoplayDeclarationCount":0,"positiveTabIndexCount":0,"visibleProgressCount":0,"declaredLiveRegionCount":2,"timing":\{"responseStartMs":2.2,"domContentLoadedMs":119.2,"loadEventMs":119.6,"firstPaintMs":144,"firstContentfulPaintMs":144\}\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Explore commercial proposal and dispatch expectations · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-product-fit-e1-targets; rule: target-size. Unscored: case not assessed.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-product-fit-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:40.903Z
  - URL: http://127.0.0.1:65400/scope
  - Details: \{"url":"http://127.0.0.1:65400/scope","title":"Is this the right tool for the job? \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Is this the right tool for the job? This fictional product helps homeowners request an instant HVAC estimate and helps an owner maintain approved prices and review enquiries. Explain supported quote work","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Explain supported quote work","role":"button","width":248,"height":44,"x":18,"y":386,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

mobile-dispatcher / Explore commercial proposal and dispatch expectations · high · cognitive · heuristic · in-scope

Finding: mobile-dispatcher-product-fit-e4-targets; rule: target-size. Unscored: case not assessed.

6 visible controls are smaller than the synthetic 48px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **mobile-dispatcher-product-fit-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:40.984Z
  - URL: http://127.0.0.1:65400/scope
  - Details: \{"url":"http://127.0.0.1:65400/scope","title":"Is this the right tool for the job? \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Is this the right tool for the job? This fictional product helps homeowners request an instant HVAC estimate and helps an owner maintain approved prices and review enquiries. Explain supported quote work Product scope Product-fit opportunity: dispatch, invoices and multi-page commercial proposals are outside this fixture. Evaluate whether the price-book and early-enquiry workflow help the commercial estimator. Do not mark a missing specialist proposal feature as a defect in an advertised instant-estimate tool.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":18,"y":100,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":69,"y":100,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":153,"y":100,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":228,"y":100,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":18,"y":134,"sensitive":false\},\{"ref":"e6","name":"Explain supported quote work","role":"button","width":248,"height":44,"x":18,"y":386,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Explore commercial proposal and dispatch expectations · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-product-fit-e1-targets; rule: target-size. Unscored: case not assessed.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-product-fit-e1** (snapshot) — Initial visible page
  - Captured: 2026-10-20T22:51:47.223Z
  - URL: http://127.0.0.1:65400/scope
  - Details: \{"url":"http://127.0.0.1:65400/scope","title":"Is this the right tool for the job? \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Is this the right tool for the job? This fictional product helps homeowners request an instant HVAC estimate and helps an owner maintain approved prices and review enquiries. Explain supported quote work","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Explain supported quote work","role":"button","width":248,"height":44,"x":56,"y":304,"sensitive":false\}\]\}

### Controls may be difficult to hit in this context

commercial-estimator / Explore commercial proposal and dispatch expectations · high · cognitive · heuristic · in-scope

Finding: commercial-estimator-product-fit-e4-targets; rule: target-size. Unscored: case not assessed.

5 visible controls are smaller than the synthetic 44px comfort target. This is a contextual heuristic, not a WCAG conformance determination. Examples: Setup \(41×24\); Price book \(75×24\); Enquiries \(64×24\); Quote preview \(103×24\); Product scope \(101×24\).

Proposed change: Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens.

Evidence:

- **commercial-estimator-product-fit-e4** (snapshot) — After action 1
  - Captured: 2026-10-20T22:51:47.302Z
  - URL: http://127.0.0.1:65400/scope
  - Details: \{"url":"http://127.0.0.1:65400/scope","title":"Is this the right tool for the job? \| Synthetic HVAC Lab","text":"Synthetic HVAC usability laboratory Fictional data and deliberate defects. This is not the LeadQuote application. Setup Price book Enquiries Quote preview Product scope Is this the right tool for the job? This fictional product helps homeowners request an instant HVAC estimate and helps an owner maintain approved prices and review enquiries. Explain supported quote work Product scope Product-fit opportunity: dispatch, invoices and multi-page commercial proposals are outside this fixture. Evaluate whether the price-book and early-enquiry workflow help the commercial estimator. Do not mark a missing specialist proposal feature as a defect in an advertised instant-estimate tool.","controls":\[\{"ref":"e1","name":"Setup","role":"link","width":41,"height":24,"x":56,"y":85,"sensitive":false\},\{"ref":"e2","name":"Price book","role":"link","width":75,"height":24,"x":109,"y":85,"sensitive":false\},\{"ref":"e3","name":"Enquiries","role":"link","width":64,"height":24,"x":195,"y":85,"sensitive":false\},\{"ref":"e4","name":"Quote preview","role":"link","width":103,"height":24,"x":272,"y":85,"sensitive":false\},\{"ref":"e5","name":"Product scope","role":"link","width":101,"height":24,"x":387,"y":85,"sensitive":false\},\{"ref":"e6","name":"Explain supported quote work","role":"button","width":248,"height":44,"x":56,"y":304,"sensitive":false\}\]\}

### Confirm the boundary of the product

mobile-dispatcher / Explore commercial proposal and dispatch expectations · low · cognitive · hypothesis · opportunity

Finding: mobile-dispatcher-product-fit-e6-scope; rule: product-scope. Unscored: case not assessed.

Determine whether dispatch, invoicing or multi-page commercial proposals are supported, then read the scope explanation.

Proposed change: Explain the supported instant-estimate workflow and test demand before adding commercial proposal or dispatch features.

Evidence:

- **mobile-dispatcher-product-fit-e6** (assertion) — Configured visible completion condition observed
  - Captured: 2026-10-20T22:51:41.010Z
  - URL: http://127.0.0.1:65400/scope
  - Details: testId: scope-detail

### Confirm the boundary of the product

operations-hawk / Explore commercial proposal and dispatch expectations · low · cognitive · hypothesis · opportunity

Finding: operations-hawk-product-fit-e6-scope; rule: product-scope. Unscored: case not assessed.

Determine whether dispatch, invoicing or multi-page commercial proposals are supported, then read the scope explanation.

Proposed change: Explain the supported instant-estimate workflow and test demand before adding commercial proposal or dispatch features.

Evidence:

- **operations-hawk-product-fit-e6** (assertion) — Configured visible completion condition observed
  - Captured: 2026-10-20T22:51:45.754Z
  - URL: http://127.0.0.1:65400/scope
  - Details: testId: scope-detail

### Confirm the boundary of the product

commercial-estimator / Explore commercial proposal and dispatch expectations · low · cognitive · hypothesis · opportunity

Finding: commercial-estimator-product-fit-e6-scope; rule: product-scope. Unscored: case not assessed.

Determine whether dispatch, invoicing or multi-page commercial proposals are supported, then read the scope explanation.

Proposed change: Explain the supported instant-estimate workflow and test demand before adding commercial proposal or dispatch features.

Evidence:

- **commercial-estimator-product-fit-e6** (assertion) — Configured visible completion condition observed
  - Captured: 2026-10-20T22:51:47.334Z
  - URL: http://127.0.0.1:65400/scope
  - Details: testId: scope-detail

## Optimization plan

All changes below are proposals for review and retesting. Preserve existing branding and design tokens.

### Eliminated Steps

No evidence-backed proposal recorded for this section.

### Layout & Structural Rearrangements

| Finding / case | Before | After (proposed, untested) |
| --- | --- | --- |
| paper-to-digital-setup-resume-e1-targets: paper-to-digital/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-setup-resume-e4-targets: paper-to-digital/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-setup-resume-e7-targets: paper-to-digital/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-setup-resume-e10-targets: paper-to-digital/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-setup-resume-e13-targets: paper-to-digital/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-pricing-recovery-e1-targets: paper-to-digital/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-pricing-recovery-e4-targets: paper-to-digital/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-pricing-recovery-e6-targets: paper-to-digital/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-pricing-recovery-e9-targets: paper-to-digital/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-pricing-recovery-e12-targets: paper-to-digital/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-find-enquiry-e1-targets: paper-to-digital/find-enquiry | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-find-enquiry-e4-targets: paper-to-digital/find-enquiry | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| paper-to-digital-find-enquiry-e7-targets: paper-to-digital/find-enquiry | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-find-enquiry-e1-targets: mobile-dispatcher/find-enquiry | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-find-enquiry-e4-targets: mobile-dispatcher/find-enquiry | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-find-enquiry-e7-targets: mobile-dispatcher/find-enquiry | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-quote-backtrack-e1-targets: mobile-dispatcher/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-quote-backtrack-e4-targets: mobile-dispatcher/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-quote-backtrack-e7-targets: mobile-dispatcher/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-quote-backtrack-e10-targets: mobile-dispatcher/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-quote-backtrack-e13-targets: mobile-dispatcher/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-quote-backtrack-e16-targets: mobile-dispatcher/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-product-fit-e1-targets: mobile-dispatcher/product-fit | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-product-fit-e4-targets: mobile-dispatcher/product-fit | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| mobile-dispatcher-product-fit-e6-scope: mobile-dispatcher/product-fit | Not captured | Explain the supported instant-estimate workflow and test demand before adding commercial proposal or dispatch features. |
| operations-hawk-find-enquiry-e1-targets: operations-hawk/find-enquiry | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| operations-hawk-find-enquiry-e4-targets: operations-hawk/find-enquiry | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| operations-hawk-find-enquiry-e7-targets: operations-hawk/find-enquiry | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| operations-hawk-product-fit-e6-scope: operations-hawk/product-fit | Not captured | Explain the supported instant-estimate workflow and test demand before adding commercial proposal or dispatch features. |
| commercial-estimator-pricing-recovery-e1-targets: commercial-estimator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-pricing-recovery-e4-targets: commercial-estimator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-pricing-recovery-e6-targets: commercial-estimator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-pricing-recovery-e9-targets: commercial-estimator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-pricing-recovery-e12-targets: commercial-estimator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-quote-backtrack-e1-targets: commercial-estimator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-quote-backtrack-e4-targets: commercial-estimator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-quote-backtrack-e7-targets: commercial-estimator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-quote-backtrack-e10-targets: commercial-estimator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-quote-backtrack-e13-targets: commercial-estimator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-quote-backtrack-e16-targets: commercial-estimator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-product-fit-e1-targets: commercial-estimator/product-fit | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-product-fit-e4-targets: commercial-estimator/product-fit | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| commercial-estimator-product-fit-e6-scope: commercial-estimator/product-fit | Not captured | Explain the supported instant-estimate workflow and test demand before adding commercial proposal or dispatch features. |
| solo-operator-setup-resume-e1-targets: solo-operator/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-setup-resume-e4-targets: solo-operator/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-setup-resume-e7-targets: solo-operator/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-setup-resume-e10-targets: solo-operator/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-setup-resume-e13-targets: solo-operator/setup-resume | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-pricing-recovery-e1-targets: solo-operator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-pricing-recovery-e4-targets: solo-operator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-pricing-recovery-e6-targets: solo-operator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-pricing-recovery-e9-targets: solo-operator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-pricing-recovery-e12-targets: solo-operator/pricing-recovery | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-quote-backtrack-e1-targets: solo-operator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-quote-backtrack-e4-targets: solo-operator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-quote-backtrack-e7-targets: solo-operator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-quote-backtrack-e10-targets: solo-operator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-quote-backtrack-e13-targets: solo-operator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |
| solo-operator-quote-backtrack-e16-targets: solo-operator/quote-backtrack | Not captured | Increase the affected controls’ hit areas and spacing while preserving existing colors, typography and tokens. |

### Trade-Specific Microcopy Rewrites

| Finding / case | Before | After (proposed, untested) |
| --- | --- | --- |
| paper-to-digital-setup-resume-e2-blueprint-field-cues: paper-to-digital/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| paper-to-digital-setup-resume-e5-blueprint-field-cues: paper-to-digital/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| paper-to-digital-setup-resume-e8-blueprint-field-cues: paper-to-digital/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| paper-to-digital-setup-resume-e11-blueprint-field-cues: paper-to-digital/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| paper-to-digital-setup-resume-e14-blueprint-field-cues: paper-to-digital/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| paper-to-digital-pricing-recovery-e1-jargon-1: paper-to-digital/pricing-recovery | Configuration Matrix | Your equipment and prices |
| paper-to-digital-pricing-recovery-e1-jargon-2: paper-to-digital/pricing-recovery | Database Record | Enquiry details |
| paper-to-digital-pricing-recovery-e1-jargon-3: paper-to-digital/pricing-recovery | Payload | Information sent |
| paper-to-digital-pricing-recovery-e2-blueprint-field-cues: paper-to-digital/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| paper-to-digital-pricing-recovery-e4-jargon-1: paper-to-digital/pricing-recovery | Configuration Matrix | Your equipment and prices |
| paper-to-digital-pricing-recovery-e4-jargon-2: paper-to-digital/pricing-recovery | Database Record | Enquiry details |
| paper-to-digital-pricing-recovery-e4-jargon-3: paper-to-digital/pricing-recovery | Payload | Information sent |
| paper-to-digital-pricing-recovery-e5-blueprint-field-cues: paper-to-digital/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| paper-to-digital-pricing-recovery-e6-jargon-1: paper-to-digital/pricing-recovery | Configuration Matrix | Your equipment and prices |
| paper-to-digital-pricing-recovery-e6-jargon-2: paper-to-digital/pricing-recovery | Database Record | Enquiry details |
| paper-to-digital-pricing-recovery-e6-jargon-3: paper-to-digital/pricing-recovery | Payload | Information sent |
| paper-to-digital-pricing-recovery-e7-blueprint-field-cues: paper-to-digital/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| paper-to-digital-pricing-recovery-e9-jargon-1: paper-to-digital/pricing-recovery | Configuration Matrix | Your equipment and prices |
| paper-to-digital-pricing-recovery-e9-jargon-2: paper-to-digital/pricing-recovery | Database Record | Enquiry details |
| paper-to-digital-pricing-recovery-e9-jargon-3: paper-to-digital/pricing-recovery | Payload | Information sent |
| paper-to-digital-pricing-recovery-e10-blueprint-field-cues: paper-to-digital/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| paper-to-digital-pricing-recovery-e12-jargon-1: paper-to-digital/pricing-recovery | Configuration Matrix | Your equipment and prices |
| paper-to-digital-pricing-recovery-e12-jargon-2: paper-to-digital/pricing-recovery | Database Record | Enquiry details |
| paper-to-digital-pricing-recovery-e12-jargon-3: paper-to-digital/pricing-recovery | Payload | Information sent |
| paper-to-digital-pricing-recovery-e13-blueprint-field-cues: paper-to-digital/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-setup-resume-e2-blueprint-field-cues: operations-hawk/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-setup-resume-e5-blueprint-field-cues: operations-hawk/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-setup-resume-e8-blueprint-field-cues: operations-hawk/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-setup-resume-e11-blueprint-field-cues: operations-hawk/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-setup-resume-e14-blueprint-field-cues: operations-hawk/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-pricing-recovery-e1-jargon-0: operations-hawk/pricing-recovery | Configuration Matrix | Your equipment and prices |
| operations-hawk-pricing-recovery-e1-jargon-1: operations-hawk/pricing-recovery | Database Record | Enquiry details |
| operations-hawk-pricing-recovery-e1-jargon-2: operations-hawk/pricing-recovery | Payload | Information sent |
| operations-hawk-pricing-recovery-e2-blueprint-field-cues: operations-hawk/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-pricing-recovery-e4-jargon-0: operations-hawk/pricing-recovery | Configuration Matrix | Your equipment and prices |
| operations-hawk-pricing-recovery-e4-jargon-1: operations-hawk/pricing-recovery | Database Record | Enquiry details |
| operations-hawk-pricing-recovery-e4-jargon-2: operations-hawk/pricing-recovery | Payload | Information sent |
| operations-hawk-pricing-recovery-e5-blueprint-field-cues: operations-hawk/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-pricing-recovery-e6-jargon-0: operations-hawk/pricing-recovery | Configuration Matrix | Your equipment and prices |
| operations-hawk-pricing-recovery-e6-jargon-1: operations-hawk/pricing-recovery | Database Record | Enquiry details |
| operations-hawk-pricing-recovery-e6-jargon-2: operations-hawk/pricing-recovery | Payload | Information sent |
| operations-hawk-pricing-recovery-e7-blueprint-field-cues: operations-hawk/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-pricing-recovery-e9-jargon-0: operations-hawk/pricing-recovery | Configuration Matrix | Your equipment and prices |
| operations-hawk-pricing-recovery-e9-jargon-1: operations-hawk/pricing-recovery | Database Record | Enquiry details |
| operations-hawk-pricing-recovery-e9-jargon-2: operations-hawk/pricing-recovery | Payload | Information sent |
| operations-hawk-pricing-recovery-e10-blueprint-field-cues: operations-hawk/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| operations-hawk-pricing-recovery-e12-jargon-0: operations-hawk/pricing-recovery | Configuration Matrix | Your equipment and prices |
| operations-hawk-pricing-recovery-e12-jargon-1: operations-hawk/pricing-recovery | Database Record | Enquiry details |
| operations-hawk-pricing-recovery-e12-jargon-2: operations-hawk/pricing-recovery | Payload | Information sent |
| operations-hawk-pricing-recovery-e13-blueprint-field-cues: operations-hawk/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| commercial-estimator-pricing-recovery-e1-jargon-1: commercial-estimator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| commercial-estimator-pricing-recovery-e1-jargon-2: commercial-estimator/pricing-recovery | Database Record | Enquiry details |
| commercial-estimator-pricing-recovery-e1-jargon-3: commercial-estimator/pricing-recovery | Payload | Information sent |
| commercial-estimator-pricing-recovery-e2-blueprint-field-cues: commercial-estimator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| commercial-estimator-pricing-recovery-e4-jargon-1: commercial-estimator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| commercial-estimator-pricing-recovery-e4-jargon-2: commercial-estimator/pricing-recovery | Database Record | Enquiry details |
| commercial-estimator-pricing-recovery-e4-jargon-3: commercial-estimator/pricing-recovery | Payload | Information sent |
| commercial-estimator-pricing-recovery-e5-blueprint-field-cues: commercial-estimator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| commercial-estimator-pricing-recovery-e6-jargon-1: commercial-estimator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| commercial-estimator-pricing-recovery-e6-jargon-2: commercial-estimator/pricing-recovery | Database Record | Enquiry details |
| commercial-estimator-pricing-recovery-e6-jargon-3: commercial-estimator/pricing-recovery | Payload | Information sent |
| commercial-estimator-pricing-recovery-e7-blueprint-field-cues: commercial-estimator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| commercial-estimator-pricing-recovery-e9-jargon-1: commercial-estimator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| commercial-estimator-pricing-recovery-e9-jargon-2: commercial-estimator/pricing-recovery | Database Record | Enquiry details |
| commercial-estimator-pricing-recovery-e9-jargon-3: commercial-estimator/pricing-recovery | Payload | Information sent |
| commercial-estimator-pricing-recovery-e10-blueprint-field-cues: commercial-estimator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| commercial-estimator-pricing-recovery-e12-jargon-1: commercial-estimator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| commercial-estimator-pricing-recovery-e12-jargon-2: commercial-estimator/pricing-recovery | Database Record | Enquiry details |
| commercial-estimator-pricing-recovery-e12-jargon-3: commercial-estimator/pricing-recovery | Payload | Information sent |
| commercial-estimator-pricing-recovery-e13-blueprint-field-cues: commercial-estimator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-setup-resume-e2-blueprint-field-cues: solo-operator/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-setup-resume-e5-blueprint-field-cues: solo-operator/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-setup-resume-e8-blueprint-field-cues: solo-operator/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-setup-resume-e11-blueprint-field-cues: solo-operator/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-setup-resume-e14-blueprint-field-cues: solo-operator/setup-resume | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-pricing-recovery-e1-jargon-1: solo-operator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| solo-operator-pricing-recovery-e1-jargon-2: solo-operator/pricing-recovery | Database Record | Enquiry details |
| solo-operator-pricing-recovery-e1-jargon-3: solo-operator/pricing-recovery | Payload | Information sent |
| solo-operator-pricing-recovery-e2-blueprint-field-cues: solo-operator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-pricing-recovery-e4-jargon-1: solo-operator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| solo-operator-pricing-recovery-e4-jargon-2: solo-operator/pricing-recovery | Database Record | Enquiry details |
| solo-operator-pricing-recovery-e4-jargon-3: solo-operator/pricing-recovery | Payload | Information sent |
| solo-operator-pricing-recovery-e5-blueprint-field-cues: solo-operator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-pricing-recovery-e6-jargon-1: solo-operator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| solo-operator-pricing-recovery-e6-jargon-2: solo-operator/pricing-recovery | Database Record | Enquiry details |
| solo-operator-pricing-recovery-e6-jargon-3: solo-operator/pricing-recovery | Payload | Information sent |
| solo-operator-pricing-recovery-e7-blueprint-field-cues: solo-operator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-pricing-recovery-e9-jargon-1: solo-operator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| solo-operator-pricing-recovery-e9-jargon-2: solo-operator/pricing-recovery | Database Record | Enquiry details |
| solo-operator-pricing-recovery-e9-jargon-3: solo-operator/pricing-recovery | Payload | Information sent |
| solo-operator-pricing-recovery-e10-blueprint-field-cues: solo-operator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |
| solo-operator-pricing-recovery-e12-jargon-1: solo-operator/pricing-recovery | Configuration Matrix | Your equipment and prices |
| solo-operator-pricing-recovery-e12-jargon-2: solo-operator/pricing-recovery | Database Record | Enquiry details |
| solo-operator-pricing-recovery-e12-jargon-3: solo-operator/pricing-recovery | Payload | Information sent |
| solo-operator-pricing-recovery-e13-blueprint-field-cues: solo-operator/pricing-recovery | Not captured | Check whether the current form explains which details are required or optional; clarify only ambiguous instructions. Preserve existing branding, fonts, colors and design tokens. |

### Friction-Absorbing Engineering Enhancements

| Finding / case | Before | After (proposed, untested) |
| --- | --- | --- |
| paper-to-digital-setup-resume-e15-completion: paper-to-digital/setup-resume | Not captured | Make progress and recovery visible, preserve unfinished data, and provide a clear next action. Reproduce on the approved target before changing the app. |
| operations-hawk-setup-resume-e15-completion: operations-hawk/setup-resume | Not captured | Make progress and recovery visible, preserve unfinished data, and provide a clear next action. Reproduce on the approved target before changing the app. |
| solo-operator-setup-resume-e15-completion: solo-operator/setup-resume | Not captured | Make progress and recovery visible, preserve unfinished data, and provide a clear next action. Reproduce on the approved target before changing the app. |

## Blueprint review coverage

Coverage guide for the supplied blueprint, PDF pp. 1–15. This static checklist is not a pass/fail result: an automated check counts only when this run contains supporting evidence. External statistics and claimed uplifts in the blueprint remain unverified and are never Leadder results or promises.

| Review area / PDF pages | Automated scope, when evidenced | Follow-up still required |
| --- | --- | --- |
| Complexity, inputs and recovery \(pp. 1–5, 11–13\) | Current-view snapshots, configured action traces, labels, target measurements and state assertions can reveal candidate friction. | Observe real owners completing setup, correcting an input and resuming work. Verify required values, persistence and the next step; fewer visible fields alone does not prove a better workflow. |
| Keyboard and assistive technology \(pp. 4–5, 10–11\) | DOM/axe observations and any recorded focus probe apply only to inspected states. | Complete keyboard journeys manually: logical order, visible and unobscured focus, modal entry/exit, focus return, no traps, and screen-reader error/status announcements. Automation is not conformance certification. |
| 320px reflow and text spacing \(pp. 5–8, 10–11\) | Overflow and spacing probes, when recorded, inspect the current rendered view and can miss hidden or later states. | Review all relevant states at 320 CSS pixels and zoom. Test text overrides together: line height 1.5, paragraph spacing 2em, letter spacing 0.12em and word spacing 0.16em. Check clipping, functionality, sticky content and valid exceptions; preserve authored brand styles. |
| Brand consistency \(pp. 5–9\) | Visible style observations may identify inconsistencies; this report cannot infer approval of a design token. | Compare all app pages and supported themes against the existing brand/token pack. Preserve colors, typography, logos and component conventions. Treat the hosted widget as its separate branding boundary. |
| Task and approved-draft clarity \(pp. 1–5, 7–13\) | Language heuristics and configured success states identify questions to investigate, not owner comprehension. | Ask HVAC owners to explain included setup help, draft versus approved pricing, whether an action changes live quotes, who acts next and how to recover. Score answers against verified product authority without coaching. |
| Truthful trust and reliable receipt \(pp. 8–13\) | Rendered badges, messages and status labels establish only what was displayed. | Verify security, product and proof claims independently. Never invent endorsements, urgency or success states. Distinguish provider acceptance, delivery and actual receipt; controlled receipt tests require separate authority and approved destinations. |
| Real-owner research and experiments \(pp. 1–15; experiments pp. 13–15\) | Synthetic personas provide reproducible engineering lenses. This run contains no participant interviews or randomized comparison unless separately documented. | Run approved research and preregistered experiments after baseline measurement. Specify an owner/business analysis unit, MDE, alpha, power, sample plan, guardrails and stopping rule. See repository docs/EXPERIMENT-PLAN.md; no experiment is launched by this report. |

## Scoring method

The engineering rubric weights time 30%, cognitive load 25%, language 20%, and recovery 25%. Each assessed dimension starts at 100.

Time = max(0, 100 − max(0, adjusted elapsed / budget − 1) × 50), where adjusted elapsed = max(0, elapsed − injected delay). Within budget earns 100; twice the budget earns 50; three times the budget earns 0. Time findings add no second penalty. Inspect-only mode has no time score.

Other dimensions subtract 40 for critical, 25 for high, 12 for medium, and 5 for low severity, floored at 0. A rule is applied once per persona/journey case at its strongest supported severity. Hypotheses and opportunities do not reduce a score. Failed status adds no independent penalty.

Only completed or failed cases with recorded evidence are assessed. Dimension means use assessed cases; their weighted mean is the overall score. If a dimension is unavailable, its weight is omitted and the remaining weights are normalized. Zero assessed cases produce no score. Partial coverage is shown explicitly.

Completion rate is completed evidence-backed cases / all assessed cases. It is separate from the engineering score. Inspect-only task results remain unverified and unscored.

## Limitations

- Synthetic persona behavior is an engineering simulation, not interviews, quotations, or validated research with real HVAC owners.
- Scores are transparent deterministic heuristics. They are not a validated human usability measure or a release certificate.
- Coverage is limited to the configured persona/journey cases. Unconfigured workflows, absent capabilities, and inaccessible states remain untested.
- A score of 100 means the assessed checks recorded no rubric penalties; it does not establish that the product has no usability problems.
- Injected typing, thinking, and explicit wait delays are subtracted from elapsed time. Network latency and browser work remain included; timing cannot predict a human completion time.
- Hypotheses and opportunities are unscored. Findings on blocked, unsupported, not-run, and evidence-free cases are unscored.
- Recommendations preserve the existing application branding, colors, typography, logo, and design tokens. Proposed changes require implementation and retesting.
- Synthetic persona simulation and an engineering rubric, not research with real HVAC owners or a validated psychometric usability measure.
- Timing is automation wall-clock time. Injected typing/thinking/wait delays are recorded separately; network and browser work remain included.
- Glare, greasy hands, low battery and distraction are contextual hypotheses. Viewport, touch mode, pacing, network latency, throughput and explicit interruptions are the emulated conditions.
- Visible completion does not establish backend persistence, email/SMS receipt, billing accuracy or provider delivery.
- Automated accessibility checks are partial and do not certify WCAG conformance. Full keyboard, screen-reader and real-device checks remain necessary.
- Blueprint adoption is page-referenced in docs/BLUEPRINT-PLAN.md. Current-view signals are heuristic observations; typography and field counts are not universal rules. Navigation/paint timings are lab samples, not a Core Web Vitals field assessment.
- Text redaction is best effort; names, addresses and screenshots may contain sensitive data. Artifacts must stay private unless separately reviewed.
- Blocked requests and stale selectors can affect findings. Reproduce observed issues in the approved current deployment before acting.
- HTTP GET loading can have application-side effects on poorly designed targets. Browser request policy is not a server sandbox; use only an approved isolated tenant.
- Fast mode disabled realistic pacing and latency; this run is a harness verification, not a field-condition timing run.
- Published synthetic example omits screenshots; generate a fresh local demo for screenshot files.
