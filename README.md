# HVAC Owner Usability Agent

A runnable auditor for LeadQuote setup and owner use: five synthetic HVAC personas, reproducible browser journeys, field-condition emulation, an optional vision planner and an offline evidence-linked report.

**Audit status: awaiting KD's instruction to start.** The [finalized audit plan](FINAL-AUDIT-PLAN.md) covers creation of Gondal Tech under the existing login, full setup, later changes and daily use. No Gondal Tech business has been created and no live audit has started. See [build verification](docs/VERIFICATION.md) for the separate local engineering checks.

**Start with the local demo.** It uses fictional data, includes intentional defects, needs no model key and never connects to LeadQuote. Persona findings are hypotheses for real owner research, not testimonials or measured human behavior.

## Run

Requires Node.js 24 or later. From this folder:

```sh
npm ci
npm run browser:install
npm run verify
npm run demo
```

Open the printed `report.html` path in a browser. Each run also produces `report.md`, `report.json` and masked screenshots in ignored `artifacts/`.

```sh
npm run demo -- --fast
npm run demo -- --persona solo-operator --headed
npm run audit -- validate --config config/leadquote.inspect.json
npm run audit -- help
```

The fixture matrix has 16 cases: **10 completed, 3 intentional setup-recovery failures and 3 product-scope exclusions**. Finding defects is a successful audit run. `--fail-on high` makes findings, failed or blocked cases exit with code 2 for CI. Configuration/tool errors exit with code 1. Fast mode omits realistic pacing and latency.

## Five owner perspectives

| Persona | Context | Main tests |
| --- | --- | --- |
| Paper-to-Digital Transitioner | Low software familiarity, heavy workload | Setup clarity, jargon, recovery |
| High-Volume Mobile Dispatcher | Small touchscreen, many enquiries | Hit areas, fast enquiry access, quote preview |
| Office-Bound Operations Hawk | Desktop, repeated operations | Price editing, navigation, unnecessary steps |
| Commercial Contract Estimator | Tablet, complex expectations | Price interpretation, backtracking, product boundaries |
| Micro-Business Solo Operator | Frequent calls and interruptions | Save/resume, validation, lost context |

These are fictional profiles adapted from the supplied brief. Age does not establish ability. Viewport, touch, pacing, network latency/throughput and explicit interruptions are emulated. Glare, battery and greasy-hand conditions are labeled assumptions. This is not anti-detection automation.

## Execution modes

- **Scripted:** repeatable actions, synthetic typo correction, interruption/reload and safe fixture-only misclicks, with visible completion assertions.
- **Agent:** a structured model chooses one observed element reference at a time. The executor validates the schema, scenario control allowlist and completion independently. Optional screenshots supply vision context.
- **Inspect:** visit configured pages and collect observations. Production profiles always use this mode. Owner task completion remains untested and no task score is awarded.

Each persona/journey has a fresh browser context. Step caps and a deadline of the smaller of three times the task budget or 120 seconds bound execution. Already-present success messages, stale selectors, policy blocks and unknown element references cannot establish completion.

## Later LeadQuote audit

The requested audit business is **Gondal Tech, newly created under the existing Leadder login**. Follow the [complete setup, changes and daily-work plan](docs/GONDAL-TECH-AUDIT-PLAN.md). Its creation and runtime journeys must be evidenced; the plan does not claim the business already exists.

1. Select an authorized isolated test tenant with synthetic records. Never use Cool Aid or a real customer account. This build has not established test-tenant access.
2. Review [`config/leadquote.inspect.json`](config/leadquote.inspect.json). It covers app entry, onboarding guidance, price-book entry, delivery explanation and widget help. Routes are grounded in a dated source snapshot, not current runtime acceptance.
3. Create test-account authentication state through your approved login process if needed. Keep it outside this project and OneDrive, then set `HVAC_AUTH_STATE` to its absolute path in the process environment. Never commit it.
4. Run `npm run audit -- run --config config/leadquote.inspect.json`. Screenshots and model transfer are disabled. Unavailable pages or missing sessions are blocked cases, not product defects.
5. To execute setup actions, author a separate `staging` config for the approved environment. Set `isolatedTenant`, exact origins, allowed paths, specifically authorized write endpoints and model `allowedControls`. Verify one journey before the full matrix.
6. Reproduce material findings before changing the app. Recommendations preserve branding, colors, typography and design tokens.

No welcome-link secrets belong in a config. Included onboarding inspection covers missing-context guidance; full onboarding requires an approved pre-established session. A fixture pass never proves a deployed app or provider delivery works.

Inspection prevents intentional form actions and non-read HTTP methods. Loading a page can still cause server effects through GET requests: browser containment is not a server sandbox. WebSockets, new windows, downloads and requests outside configured origins are blocked. Staging writes are not rolled back by browser isolation. See [operating boundaries](docs/OPERATIONS.md).

## Optional model mode

Set `HVAC_MODEL_API_KEY`, `HVAC_MODEL`, and optionally `HVAC_MODEL_BASE_URL` in the process environment. The default endpoint is OpenAI's HTTPS API. The provider must support Chat Completions structured JSON output; screenshot input also requires vision support. No model is silently selected.

Set `allowModelDataTransfer: true` only in an approved synthetic/staging configuration. Redacted visible text and optional masked screenshots will be sent to the selected provider:

```sh
npm run audit -- run --config config/your-approved-staging.json --mode agent
```

No paid model calls were made during acceptance. Planner boundaries were tested with injected structured decisions; specific provider/model performance remains to be evaluated. Refusals, invalid output and disallowed controls stop the case. There is no unrestricted fallback agent.

## Requested framework synthesis

| Repository | Use |
| --- | --- |
| `ncklrs/claude-chrome-user-testing` | Contextual personas, explicit goals, confusion evidence and comparative outcomes |
| `jcrevoisier/human-behavior-simulation-kit` | Unavailable (404). Original pacing, typo, interruption and safe misclick implementations cover the requested concepts; no imported code is claimed |
| `browser-use/browser-use` | Observe/action/verify, vision and structured-output architecture; [manual handoff protocol](docs/browser-use-handoff.md), not an installed Python executor |
| `vercel-labs/agent-browser` | Compact observed references; pinned, smoke-tested native fixture inspection adapter |
| `aj-geddes/useful-ai-prompts` | Explicit input/constraint/output contracts and strict JSON schemas implemented with Zod |

Playwright is the default execution engine so interception, isolation and evidence have one owner. [Sources and pinned revisions](docs/sources.md) and [third-party notices](THIRD_PARTY_NOTICES.md) distinguish methodology, implementation and unavailable references.

Optional native inspection on Windows:

```powershell
npm run audit -- native-demo --executable "$PWD\node_modules\agent-browser\bin\agent-browser-win32-x64.exe"
```

Use the matching native binary on another OS. The adapter accepts only the marked local fixture and never a reused authenticated browser.

## Score and output

The supplied 15-page UI blueprint is incorporated in the [page-referenced adoption plan](docs/BLUEPRINT-PLAN.md), [machine-readable checklist](docs/blueprint-checklist.json) and [future experiment protocol](docs/EXPERIMENT-PLAN.md). The runner adds current-view overflow, zoom, typography, required/optional cues, autoplay and keyboard-order observations, with lab navigation/paint timing. Reports distinguish those checks from manual accessibility, brand, trust and experimental review. The source PDF and full extraction are not redistributed.

The **HVAC Engineering Usability Score (0–100)** is a transparent heuristic rubric: time 30%, cognitive friction 25%, trade language 20% and recovery 25%. It is not a validated human-usability measure. Repeated rules are deduplicated per case; hypotheses and scope opportunities do not incur penalties.

Only evidence-backed completed/failed tasks are scored. Blocked, unrun, unsupported and inspect-only cases are excluded with visible coverage. No assessed cases means **no score**, never 100. Completion is separate. Automated timing subtracts injected delays and is never described as human task time.

Reports contain the four requested sections:

1. Eliminated Steps
2. Layout & Structural Rearrangements
3. Trade-Specific Microcopy Rewrites, including Before → After
4. Friction-Absorbing Engineering Enhancements

Every finding has evidence references, scope, confidence and severity. Offline HTML supports search and persona/severity/dimension filters. JSON contracts are in [`schemas/`](schemas/); regenerate with `npm run schemas` after changes.

## Files

| Path | Purpose |
| --- | --- |
| `src/runner.ts`, `planner.ts` | Browser loop and bounded optional model planner |
| `src/policy.ts`, `observe.ts`, `privacy.ts` | Containment, compact refs and redaction |
| `src/scoring.ts`, `report.ts` | Evidence validation, rubric and reports |
| `src/personas.ts` | Five profiles |
| `fixtures/`, `config/` | Local laboratory and LeadQuote inspection profile |
| `tests/` | Browser, schema, policy, scoring and report verification |
| `prompts/hvac-auditor.md` | Human-supervised audit protocol |
| `docs/` | Scope, sources, operations and acceptance evidence |

Generated artifacts, auth state, environment files and dependencies are ignored by Git. Reports may still contain names or screenshots; review before sharing. CI runs only the synthetic fixture and uploads its synthetic artifacts.
