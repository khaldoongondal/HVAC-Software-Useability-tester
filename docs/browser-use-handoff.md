# Browser-use manual handoff protocol

**Status: design reference only. An executable browser-use adapter is not implemented.** The primary Playwright runner remains the supported runtime. This file is not a command to install packages, open a customer account or run an audit.

The inspected upstream package is 0.13.13 at `aa093a843da5edbf323c0b4145c9b6a0db3ecde8`, requires Python >=3.11, and uses MIT licensing. It supplies model wrappers, browser control, optional vision and structured agent output. The dependency surface is substantially larger than a browser-only executor.

A future, separately validated pilot can take a synthetic local fixture task with:
- Explicit loopback fixture origin, task ID, persona ID, maximum steps and a time budget.
- An observed accessibility snapshot and optional screenshot from synthetic data only.
- Allowed actions explicitly enumerated by the host runner; no generic Python/JavaScript or shell tools.
- A typed final result containing completion status, observations, evidence IDs and limitations.

Upstream's `Agent(..., output_model_schema=ResultModel, use_vision=True)` and `Agent.run(max_steps=..., on_step_start=..., on_step_end=...)` supply schema/step mechanics. `Browser(allowed_domains=[...])` limits domains. These controls do not establish business-level read-only execution or block every mutating click, form submission or background request. A task prompt saying “inspect only” is insufficient.

Before implementing a pilot:
1. Build a controller whose action registry contains only audited observation operations.
2. Enforce network write restrictions before page scripts start and reject redirects outside the fixture origin.
3. Validate the Pydantic result with forbidden extra fields, bounded strings and host-resolved evidence references.
4. Separate synthetic narrative from observed evidence and record token/cost/latency information.
5. Test adversarial page text, redirect attempts, mutation attempts, timeout cleanup and invalid outputs.
6. Keep model credentials outside source/config artifacts; no existing customer browser session or cloud browser by default.

Only after those checks should an executable adapter be added. Until then, browser-use interoperability is a documented handoff contract, not a tested integration.
