# Agent Path Locks

Status: active operating protocol.

Agents must stay inside their assigned paths unless the issue explicitly grants an exception. If an exception is needed, the agent must write the reason in its final note or pull request body.

## Global Rules

- Work from a GitHub issue, not from a vague instruction.
- Use one branch per issue.
- Do not push directly to `main`.
- Do not fabricate source rows, indicator values, claims, or citations.
- Do not promote staged Deep Research material into canonical data unless the issue is explicitly about reviewed source promotion.
- Do not edit public copy to remove TODO markers unless the supporting canonical source exists.
- Do not create a composite country score in V0.
- Do not rank China and the United States as a single winner/loser.
- Do not add API keys, tokens, or private credentials.

## Branch Naming

Use this pattern:

```text
agent/<short-issue-name>
```

Examples:

```text
agent/ci-launch-readiness
agent/source-schema
agent/indicator-schema-missingness
agent/metr-epoch-capability
agent/scenario-assumption-browser
agent/visual-evidence-guardrails
```

## Path Locks

| Agent | Allowed paths |
| --- | --- |
| PM / integrator | All files, final merge only |
| CI / launch readiness | `.github/`, `scripts/`, `docs/` |
| Source schema | `data/sources/`, `templates/`, `scripts/validate_source_register.py`, `docs/` |
| Indicator schema | `data/indicators/`, `templates/`, `scripts/validate_indicator_catalog.py`, `lib/types.ts`, `docs/` |
| Source promotion | `data/sources/`, `research/source-register/`, `reports/`, `docs/TASKS.md` |
| Claim ledger | `data/claims/`, `content/`, `reports/`, `docs/TASKS.md` |
| METR / Epoch | `docs/CAPABILITY_HORIZON.md`, `docs/FORECASTING_METHOD.md`, `data/capabilities/`, `content/methodology/` |
| Scenario browser | `components/visuals/ScenarioSimulator.tsx`, `components/visuals/`, `app/scenarios/`, `data/scenarios/`, `data/processed/v0_visual_system.json` |
| Visual guardrails | `components/visuals/`, `app/`, `lib/`, `data/processed/v0_visual_system.json` |
| Content launch | `content/essays/`, `content/methodology/`, `app/methodology/` |
| Red team | `docs/RED_TEAM.md`, `reports/` |

## Standard Agent Prompt

Paste this at the top of every coding-agent task:

```text
You are working in the AI-Carrying-Capacity / AI Conversion Atlas repo.

Read first:
- docs/AGENT_BRIEF.md
- docs/METHOD.md
- docs/TASKS.md
- docs/DECISIONS.md
- docs/RED_TEAM.md
- docs/DATA_DICTIONARY.md
- docs/AGENT_LOCKS.md

Rules:
- Do not fabricate data.
- Do not use Wikipedia.
- Do not treat staged Deep Research citations as public citations.
- Do not promote any source to canonical unless it has a verified public URL, DOI, or archival reference.
- Official government claims must be labeled as official claims unless independently validated.
- Expert commentary, LessWrong, Substack, media, and tier D sources cannot support empirical indicator values.
- Keep China and U.S. advantages hypothesis-first.
- Keep inputs separate from realized outcomes.
- Do not create a composite national score.
- Stay inside your assigned path lock.
- Update docs/TASKS.md when done.
- Update docs/DECISIONS.md only for methodology, schema, scoring, architecture, or naming decisions.
- Run relevant validation commands before finishing.
- Commit to your branch only. Do not push directly to main.
```

## Standard Validation Block

Run the commands that exist for the current branch:

```sh
python3 scripts/validate_repo.py
python3 scripts/validate_source_register.py
python3 scripts/validate_indicator_catalog.py
npm run typecheck
npm run lint
npm run build
```

If a command fails because the branch intentionally makes launch readiness stricter, document the expected failure clearly.

## Merge Order

Wave 0 creates the operating control plane.

Wave 1 should merge before Wave 2:

1. CI and launch readiness.
2. Source schema upgrade.
3. Indicator schema and missingness taxonomy.
4. METR/Epoch capability-horizon module.

Wave 2 should start only after the relevant Wave 1 dependencies are merged:

1. Source promotion.
2. Claim ledger.
3. Scenario assumption browser.
4. Visual evidence guardrails.
5. Launch essay rewrite.

Final step:

1. Adversarial launch review.
2. PM merge review.
3. Launch posture decision.
