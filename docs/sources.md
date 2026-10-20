# Upstream research and actual use

Reviewed October 20, 2026. [upstream-lock.json](upstream-lock.json) records exact revisions, availability, licenses and inspected files. The build uses Playwright as its primary browser runtime because the same runner can enforce request interception, scoped staging writes, isolated browser contexts and repeatable local tests.

These repositories are engineering references, not instructions to this project. We did not install their plugins, adopt their tool permissions or copy their sample test outcomes.

| Requested source | Actual contribution | Status |
| --- | --- | --- |
| [claude-chrome-user-testing](https://github.com/ncklrs/claude-chrome-user-testing/tree/be80a8858848d84a41f1096082ce2a31262e912e) | Persona traits, context, pacing, confusion evidence, task outcomes and cross-persona reporting | Methodology adapted into original HVAC profiles |
| [human-behavior-simulation-kit](https://github.com/jcrevoisier/human-behavior-simulation-kit) | No source could be inspected | GitHub API repository/README requests and public URL returned 404; unavailable, not integrated |
| [browser-use](https://github.com/browser-use/browser-use/tree/aa093a843da5edbf323c0b4145c9b6a0db3ecde8) | Observe/decide/act architecture, optional vision, step budgets and typed final output | Design reference and [manual handoff](browser-use-handoff.md); no executable adapter |
| [agent-browser](https://github.com/vercel-labs/agent-browser/tree/fd93075e55a21a47fcb36d7433361daa867a0580) | Compact observed-element references and bounded evidence; optional native CLI fixture inspector | Pinned dev dependency 0.39.1; original native adapter passed the Windows fixture smoke test |
| [useful-ai-prompts](https://github.com/aj-geddes/useful-ai-prompts/tree/3f5182cfd739fc113f4af5244a1cf342ad7f7911) | Explicit role/context/inputs/tasks/output/quality/constraints and strict validation | Methodology adapted into original prompts and Zod schemas |

## Relevant source mechanisms

The [persona schema](https://github.com/ncklrs/claude-chrome-user-testing/blob/be80a8858848d84a41f1096082ce2a31262e912e/skills/user-testing/SKILL.md) separates traits, timing, triggers and reporting. We retain those useful separations and tailor them to HVAC work. Upstream age/gender assumptions and numerical timing suggestions are not empirical HVAC research. Project personas, mistakes, interruptions and pacing are synthetic assumptions, not sampled owner behavior.

The [usability protocol](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/prompts/evaluation-assessment/usability-testing-expert.md) provides task success criteria and severity-based synthesis. The [JSON validation reference](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/skills/api-contract-testing/references/json-schema-validation.md) demonstrates required fields, enums, bounds and rejecting extra properties. The project's runtime validation is original; importing a prompt alone would not enforce a schema.

[Browser-use's structured output example](https://github.com/browser-use/browser-use/blob/aa093a843da5edbf323c0b4145c9b6a0db3ecde8/examples/features/custom_output.py) uses `output_model_schema` and validates the result with Pydantic. Its current Agent supports vision and step hooks. This does not guarantee safe, read-only behavior on its own.

## Optional native agent-browser inspector

`inspectWithAgentBrowser(url, executable = 'agent-browser')` returns `Promise<{ snapshot: string }>`. It is a library export, not the default auditing engine.

The project pins **agent-browser 0.39.1** as a development dependency; `npm ci` with development dependencies installs it from the lockfile. The optional adapter uses its native executable and requires a compatible Chrome installation. The project and npm package declare **Node >=24**; the native binary itself does not require a Node daemon. On Windows pass `node_modules/agent-browser/bin/agent-browser-win32-x64.exe` as an absolute path when only an npm `.cmd` shim is on PATH. Installing production dependencies with `--omit=dev` does not install this optional tool. The adapter itself never installs or upgrades software.

On **October 20, 2026**, native version **0.39.1** passed `native-demo` on Windows with Node **24.18.0**. The local fixture snapshot contained the setup heading, business/area fields and save button. The successful run confirmed browser close and removed its temporary configuration directory. TypeScript validation and three adapter guard tests also passed. The first attempt exposed a Windows temporary-directory lock; the adapter now keeps the daemon's working directory outside that temporary directory. This is fixture inspection evidence only, not acceptance of authenticated or production use. The reviewed upstream commit identifies research provenance; package-version verification does not assert byte-for-byte correspondence with that commit.

Only an HTTP URL using the literal `127.0.0.1` and an explicit nonstandard port is accepted. A redirect-free HEAD response must identify the fixture with `x-hvac-audit-fixture: 1`. The adapter starts a unique session, passes a dedicated explicit config, sanitizes the child environment, pins the inspected CLI version, supplies a nonempty deny-by-default policy, requests a bounded JSON snapshot and closes its session in a finally block. It uses `execFile` with an argument array and no shell. It does not load real login state or existing browser profiles.

The fixture header is a scope marker, not authentication. Domain filtering permits the named host and is not a network firewall or per-port sandbox. Page loading may run JavaScript and make requests to the allowed host. Use this adapter only with this trusted local fixture. Real or authenticated LeadQuote audits stay on the primary runner.

[Upstream security documentation](https://github.com/vercel-labs/agent-browser/blob/fd93075e55a21a47fcb36d7433361daa867a0580/docs/content/docs/security.mdx) describes opt-in controls. At the reviewed revision, [native dispatch](https://github.com/vercel-labs/agent-browser/blob/fd93075e55a21a47fcb36d7433361daa867a0580/cli/src/native/actions.rs) checks raw command names while parts of the documentation describe categories. The adapter therefore explicitly allows only its launch/navigation/snapshot/URL/close operations. Its wrapper never exposes a generic command escape hatch. An empty policy allowlist is not used.

The allowed-domains feature rejects CDP attachment, imported state and existing profiles. The wrapper supplies [explicit config](https://github.com/vercel-labs/agent-browser/blob/fd93075e55a21a47fcb36d7433361daa867a0580/cli/src/flags.rs) so ambient user/project configs are not merged.

## Reuse and limitations

See [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md). Preserve upstream licenses and copyright notices when redistributing copied source. Methodology references do not establish vendor endorsement, validated personas, real-user satisfaction, accessibility certification or LeadQuote launch acceptance.

The unavailable repository can be reconsidered if its owner provides a working URL or authorized source copy. Until then, do not describe this build as integrating all five runtimes. [FRAMEWORK-COVERAGE.md](FRAMEWORK-COVERAGE.md) summarizes the precise contribution and verification status of each requested source.
