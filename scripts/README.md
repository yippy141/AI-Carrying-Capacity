# Validation Scripts

These scripts are the project’s guardrails. They are meant to keep the AI Conversion Atlas from turning staged research into public evidence too early.

## Normal development checks

Run these before opening a pull request:

```sh
python3 scripts/validate_repo.py
python3 scripts/validate_source_register.py
python3 scripts/validate_indicator_catalog.py
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

## Expected current posture

The project is expected to pass normal validators but fail `--mode public-pilot` until reviewed sources, reviewed indicators, claim ledger rows, and public-copy cleanup are complete.
