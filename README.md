# AI Conversion Atlas

Scaffold status: v0 repo setup. No research findings, scored data, or public claims are included yet.

AI Conversion Atlas is a research and product workspace for studying how societies convert accessible AI capability into productivity, state capacity, scientific output, strategic power, and broadly distributed welfare.

The public hook can remain "AI carrying capacity," but the working analytic construct is "AI conversion capacity" or "national AI absorptive capacity."

## Current Scope

This repo is prepared for:

- Deep Research report intake.
- Source register and indicator catalog management.
- Claim ledger tracking for evidence-backed synthesis.
- Methodology and decision logging.
- Future data pipeline work.
- Future interactive product development.
- VS Code, GitHub Copilot, Cursor, and Codex-assisted work.

This repo intentionally does not yet contain:

- A finished literature review.
- A national ranking.
- A composite score.
- A Next.js app or package dependencies.
- Any generated claims about China, the United States, or other countries.

## Quick Start In VS Code

Open the workspace:

```sh
code "AI Conversion Atlas.code-workspace"
```

Run the scaffold validator:

```sh
python3 scripts/validate_repo.py
```

Or through VS Code: Terminal -> Run Task -> Validate repo scaffold.

## Repo Map

```text
docs/                  Project brief, method, decisions, tasks, roadmap.
research/              Deep Research outputs, notes, source-register staging.
data/                  Raw inputs, source register, indicator catalog, processed outputs.
content/               Essays, country briefs, sector briefs, methodology copy.
scripts/               Validation, ingest, and future dataset-building scripts.
app/                   Reserved for a future web app.
components/            Reserved for future UI components.
public/                Reserved for future public visuals and social images.
templates/             Reusable report, source, indicator, and brief templates.
```

## Deep Research Intake

Save commissioned reports as Markdown:

```text
research/deep-research/YYYY-MM-DD-topic.md
```

Save report-specific extraction tables beside the report or in staging:

```text
research/source-register/YYYY-MM-DD-topic-source-register-additions.csv
research/source-register/YYYY-MM-DD-topic-indicator-candidates.csv
```

Do not merge sources into `data/sources/source_register.csv` until they have been reviewed for provenance, claim type, and reliability tier.

For synthesis claims that may appear in an essay, methodology page, or UI, use:

```text
data/claims/claim_ledger.csv
```

## Data Discipline

Every source and indicator should preserve:

- Provenance.
- Language.
- Source type.
- Reliability tier.
- Claim confidence and counterevidence.
- Claim type.
- Data quality.
- Missingness.
- Whether the value is observed, official-claim, qualitative-coded, estimated, or missing.

No silent imputation. No Wikipedia sourcing. No fake precision.

## Initial V0 Research Object

The first credible pilot should stay narrow:

- Countries: United States and China, with selected comparators where data are available.
- Sector: manufacturing, robotics, and embodied AI.
- Cross-cutting constraint: compute, data centers, electricity, and grid absorption.
- Output: transparent methodology, source register, indicator catalog, launch essay, and eventually a visual product.

See `docs/AGENT_BRIEF.md`, `docs/METHOD.md`, and `docs/RESEARCH_INTAKE.md` before adding research or code.
