# Frontier Is Not Fate

Current project checkpoint and task-start instructions: `docs/PROJECT_STATE.md`.

**Frontier Is Not Fate** is an editorial web study of how accessible AI
capability becomes—or fails to become—national capacity. The **AI Conversion
Atlas** is the evidence system underneath it.

The project keeps frontier access, conversion capacity, adaptation capacity,
distribution quality, and realized outcomes separate. It does not publish a
composite national score.

## Current architecture

- `app/` — the public study, findings, evidence, forecasts, methods, and lab
  routes.
- `components/` — editorial UI and empirical or conceptual figures.
- `data/sources/` — reviewed canonical sources and non-evidentiary
  placeholders.
- `data/observations/` — source-specific numeric observations with periods,
  denominators, universes, evidence labels, and comparability classes.
- `data/claims/` — claims, supporting source IDs, confidence, required caveats,
  and product-use status.
- `data/forecasts/` — signpost questions, resolution criteria, deadlines, and
  author-review state.
- `docs/FIGURE_REGISTER.md` — figure type, evidence dependencies, caveats, and
  export requirements.
- `research/` — banked research and staged source candidates; report citations
  are not canonical evidence.
- `scripts/` — schema, evidence-integrity, and launch-readiness checks.

The live Figure 1, “Adoption is not integration,” reads plotted values from
`data/observations/adoption_depth.csv`. Its ECB, U.S. Census, and Eurostat
panels preserve their original definitions and denominators rather than
creating a harmonized use-depth metric. China’s NBS statistic is retained as
context only and is not plotted or compared across source families.

## Status

Private preview. The post-PR-#21 information architecture and the first
canonical empirical figure are implemented. Public-pilot readiness remains
blocked by staged sources, legacy visual references, research TODOs, and
unreviewed forecast ranges; the readiness checker reports these explicitly.

## Develop locally

Requires Node.js 22, npm, and Python 3.

```sh
npm ci
npm run dev
```

Run the application and evidence checks:

```sh
npm run typecheck
npm run lint
npm run build
npm run test:evidence
python3 -m unittest scripts/validate_adoption_depth_test.py
python3 scripts/validate_adoption_depth.py
python3 scripts/validate_repo.py
python3 scripts/validate_source_register.py
python3 scripts/validate_indicator_catalog.py
python3 scripts/check_launch_readiness.py --mode private-preview
```

## Research rules

- Do not fabricate data, citations, metadata, or indicator values.
- Mark missing values as missing and estimates or qualitative coding
  explicitly.
- Promote only verified original URLs or DOIs to the canonical source register.
- Give every plotted value a canonical observation and source ID.
- Keep source families, denominators, survey windows, and non-comparable
  contexts separate.
- Treat China–United States comparisons as hypotheses to test, not verdicts.
- Record methodology or architecture decisions in `docs/DECISIONS.md` and
  completed or discovered work in `docs/TASKS.md`.

Read `docs/AGENT_BRIEF.md`, `docs/METHOD.md`, and the relevant data dictionary
before changing evidence or public copy.
