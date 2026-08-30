# Validation Scripts

These scripts are the project’s guardrails. They are meant to keep the AI Conversion Atlas from turning staged research into public evidence too early.

## Normal development checks

Run these before opening a pull request:

```sh
python3 scripts/validate_repo.py
python3 scripts/validate_source_register.py
python3 scripts/validate_indicator_catalog.py
python3 scripts/validate_structural_profiles_worksheet.py
python3 -m unittest scripts/validate_structural_profiles_worksheet_test.py
python3 scripts/validate_structural_profiles_reconciliation.py
npm run typecheck
npm run lint
npm run build
```

## Launch-readiness checks

For normal development and private review:

```sh
python3 scripts/check_launch_readiness.py --mode private-preview
```

This prints launch blockers but exits successfully so the repo can continue to evolve.

For any public pilot or launch candidate:

```sh
python3 scripts/check_launch_readiness.py --mode public-pilot
```

This exits with an error if public blockers remain.

## What launch readiness checks

The launch-readiness script flags:

- a canonical source register with no reviewed non-placeholder sources;
- `TODO_SOURCE`, `TODO_DATA`, or `TODO_VERIFY` markers in public-facing app, component, or content files;
- scores without reviewed source IDs or explicit qualitative coding;
- empirical indicators supported only by low-tier, placeholder, or expert-commentary sources;
- Wikipedia links in canonical sources;
- staged visual source IDs that are not present in the canonical source register.

## Source register validator

```sh
python3 scripts/validate_source_register.py
```

This checks required columns, unique `source_id` values, allowed reliability tiers, method types, official-claim statuses, independent-validation statuses, review statuses, placeholder discipline, and the no-Wikipedia rule.

## Indicator catalog validator

```sh
python3 scripts/validate_indicator_catalog.py
```

This checks required columns, unique `indicator_id` values, known source IDs, evidence labels, missingness reasons, attribution-strength values, input/output roles, score guardrails, and empirical source-use restrictions.

## Build script

```sh
python3 scripts/build_v0_dataset.py
```

This builds processed metadata JSON from the canonical CSV registers. It should use only validated register fields and should not invent indicator values.

## Structural Profiles blank worksheet package

```sh
python3 scripts/build_structural_profiles_workbooks.py
python3 scripts/validate_structural_profiles_worksheet.py
python3 -m unittest scripts/validate_structural_profiles_worksheet_test.py
```

The builder regenerates the owner reference workbook and the separate Fable
and blind submission workbooks from the machine-readable templates under
`research/structural-profiles-pilot/worksheet/`. The validator fails on scope
drift, populated S/C values, invented source IDs, coder leakage, mismatched
country/profile pathways, workbook/CSV drift, or prohibited aggregation. It
compares committed workbooks with temporary rebuilds through a canonical
semantic-and-layout manifest, then requires two builds in the same runtime to
be byte-identical.

## Structural Profiles reconciliation package

```sh
python3 scripts/validate_structural_profiles_reconciliation.py
```

The issue #31 builder pins the corrected PR #33 seed and PR #32 independent
heads, validates each submission and its workbook independently, verifies that
the provenance corrections did not change scores or rationales, and generates
the 155-row audit, owner-only exception subset, and 18-profile fusion queue.
The validator protects immutable submission hashes, role-based `seed`
terminology, model identities, comparison counts, blank owner decisions, and
the separate S5 convention question.

## Expected current posture

The project is expected to pass normal validators but fail `--mode public-pilot` until reviewed sources, reviewed indicators, claim ledger rows, and public-copy cleanup are complete.
