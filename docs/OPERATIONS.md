# Operation and extension

## Scenario preparation
Follow `fixtures/config.ts` and the exported JSON Schema. Each journey needs a specific goal, exact path, personas, automation time budget, step cap, actions, visible completion selector, notes and an explicit model control allowlist. Prefer roles and accessible labels. A test ID should identify a state rather than a generic page heading.

Start with clean data. Already-present success blocks an interactive journey; an old Saved message does not prove a new save. Add `expectedText` to narrow assertions. Backend persistence and provider receipts need separately verified checks; visible success alone is not acceptance.

The hard deadline is at most three times the scoring budget and never over two minutes. It allows overruns without indefinite execution. Timed-out, blocked and stale-selector cases are excluded from completion claims. Do not raise budgets to hide failures.

## Privacy
Use synthetic records. Text snapshots omit field values and nodes matching `redactSelectors`, `[data-private]` and `[data-sensitive]`; screenshots mask inputs and configured selectors. Common email, phone and token patterns are scrubbed. Arbitrary names/addresses cannot be reliably recognized. Keep artifacts private until reviewed.

Keys and auth state belong outside the repository and OneDrive. The tool records no cookies, request bodies, storage dumps, raw browser call logs or provider error bodies. Model mode transfers observations only after explicit config permission. Model prose is not an observed finding until supported independently.

## Limits
This is a cooperating test application, not a hostile-site security sandbox. Trusted operators own configs. Production disables interactions; staging requires an isolated tenant declaration. Non-read requests require an exact authorized same-target endpoint. GET effects and complex authenticated/provider prerequisites need server-side test isolation. Never widen scope automatically after a block.

Fresh browser contexts do not roll back a backend. Establish disposable tenant cleanup before allowing writes. There is no automatic blind retry of uncertain mutation actions. The optional native adapter is fixture-only; browser-use is a manual handoff protocol, not an active Python dependency.

## Reproducibility and interpretation
Keep the exact approved config privately alongside the report. Reports contain run ID, time, target, seed, personas, tasks, mode, environment, elapsed/injected timing and source references. Pin the Git commit and browser/runtime versions in your acceptance record. Task timing excludes the subsequent accessibility scan but includes browser work. Fast mode is harness verification only.

Automated accessibility checks and hit-target heuristics are partial. Add real keyboard, zoom, screen reader, mobile and field-worker sessions before asserting accessibility or user acceptance. Larger context-based target recommendations are not a WCAG pass/fail verdict.
