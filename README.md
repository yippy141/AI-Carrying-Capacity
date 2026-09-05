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
  routes; paper and the finite reader routes are the current primary path.
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

The live Figure 1, “Reported use has several meanings,” reads plotted values from
`data/observations/adoption_depth.csv`. Its ECB, U.S. Census, and Eurostat
panels preserve their original definitions and denominators rather than
creating a harmonized use-depth metric. China’s NBS statistic is retained as
context only and is not plotted or compared across source families.

## Current reader candidate

Built from verified merged PR #42 on `release/first-reader-edition`. Read the
finite contract in `docs/RELEASE_SCOPE.md` and the explanation in
`reports/READER_EDITION_AUTHOR_BRIEF.md`. The study now connects adoption,
two operational studies, a hypothetical workflow experiment and a TCV fusion
trace, with `/paper`, `/evidence`, `/methods`, `/about` and retained `/findings`.

**Exposure:** local preview commands bind only to 127.0.0.1. Pushing the draft
PR also triggered the repository’s existing Vercel preview integration. Its
branch URL redirects unauthenticated requests to Vercel sign-in (checked
6 September 2026). No new hosting/authentication service was added; noindex is
not authentication. This repository, staged research, author brief and
draft-PR screenshots are public. See the validation report for the preview URL.

New exact claims and personal copy remain pending Jinhua’s review.
`npm run build` makes an optimized, labeled review preview;
`npm run build:publication` fails until the finite uses and author publication
record are approved. Archive TODOs and unfinished forecasts remain visible in
history without blocking this finite reading edition. They are not deleted.

## Develop locally

Requires Node.js 22, npm, and Python 3.

```sh
npm ci
python3 -m venv .venv
.venv/bin/python3 -m pip install openpyxl==3.1.5
npm run dev
```

Run the application and evidence checks:

```sh
npm run typecheck
npm run lint
npm run build
npm run test:evidence
npx playwright install chromium
npm run test:browser
.venv/bin/python3 -m unittest scripts/test_historical_reader_snapshot.py scripts/test_reader_profiles.py
python3 -m unittest scripts/validate_adoption_depth_test.py
python3 scripts/validate_adoption_depth.py
.venv/bin/python3 scripts/validate_repo.py
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

## Review and licensing

`reports/READER_EDITION_VALIDATION.md` records actual checks, failures and preview
exposure. No five-reader feedback or named specialist sign-off is claimed.
The repository has no root license file. The owner still needs to choose code,
original-content and original-data terms; third-party terms remain separate in
`data/licenses/data_licenses.csv`. No license terms were changed by this release.
