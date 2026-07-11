# Frontier Is Not Fate

**Frontier Is Not Fate** is a public-facing interactive study of when advanced
AI becomes material national capacity — and when infrastructure, institutions,
organization, and distribution flatten the return.

The **AI Conversion Atlas** is the evidence system underneath the study. It
tracks sources, observations, claims, figures, and falsifiable forecasts so the
public narrative cannot outrun what has actually been verified.

## Status

**Private preview only.** The accepted information architecture is live and the
first canonical empirical figure is now implemented. The project is not a
public-pilot release: legacy research drafts, staged visual references, and
unreviewed forecast ranges remain visible to the internal readiness checker.

The canonical source register currently contains 49 reviewed
non-placeholder sources plus six non-evidentiary placeholders. Forty-one rows
remain staged across the July 5 and July 11 source-intake files.

## Research question

> How does the marginal national return to accessible frontier AI capability
> vary by country, sector, conversion capacity, and outcome type?

The study separates four objects:

1. **Frontier capability** — what leading systems can do.
2. **Accessible capability** — what actors in a country can legally,
   economically, and practically use.
3. **Conversion capacity** — the power, firms, skills, finance, institutions,
   data, and coordination that turn access into repeated use.
4. **Outcomes by stage** — build, use, harvest, and distribute.

These objects are not collapsed into a national score or ranking.

## What the study can say

The public narrative distinguishes evidence-backed observations from
propositions and comparative hypotheses:

| Class | Meaning | Current study item |
| --- | --- | --- |
| Observation | A descriptive claim tied to reviewed canonical evidence | **Adoption is not integration.** Source-specific surveys show gaps between binary adoption and deeper use. |
| Observation | A separate macro record, not inferred from adoption | **Buildout is visible before broad payoff.** Reviewed infrastructure evidence does not establish national productivity attribution. |
| Proposition | A falsifiable mechanism that organizes evidence but is not itself a measured result | **Frontier returns differ by domain.** |
| Comparative hypothesis | A country comparison to test, not a verdict or winner claim | **The United States and China encounter different conversion bottlenecks.** |

The first empirical figure preserves ECB, U.S. Census, and Eurostat definitions
and denominators. It does not call their different concepts a harmonized
“deep-use” metric.

## Evidence system

| Register | Canonical path | Purpose |
| --- | --- | --- |
| Sources | data/sources/source_register.csv | Original URLs or DOIs, publication metadata, method type, reliability, official-claim status, and review state |
| Observations | data/observations/adoption_depth.csv | Figure-ready values with exact period, denominator, universe, evidence label, and comparability class |
| Claims | data/claims/claim_ledger.csv | Public claims, source IDs, confidence, required caveats, counterevidence, and product-use status |
| Figures | docs/FIGURE_REGISTER.md | Figure number, type, sources, status, caveats, and export requirements |
| Forecasts | data/forecasts/forecast_register.csv | Resolution criteria, observed resolution sources, deadlines, and author-review state |

Deep Research reports enter research/deep-research as banked research
artifacts. Candidate rows remain in research/source-register until original
primary URLs, metadata, denominator language, and source class have been
reviewed. A report citation never creates canonical evidence by itself.

## Repository map

~~~text
app/                 Next.js study, findings, evidence, forecasts, methods, and lab routes
components/          Editorial UI and production visual components
content/             Draft prose still under publication review
data/                Canonical sources, observations, claims, forecasts, and staged products
docs/                Method, decisions, tasks, figure register, and agent rules
reports/             PM status, source-promotion audits, screenshots, and blockers
research/            Banked reports, notes, staging files, and future archive material
scripts/             Evidence, schema, and private-preview readiness validators
templates/           Reusable research and register templates
~~~

## Develop locally

Requirements:

- Node.js 22
- npm
- Python 3

Install and run:

~~~sh
npm ci
npm run dev
~~~

Run the full evidence and application checks:

~~~sh
npm run typecheck
npm run lint
npm run build
npm run test:evidence
python3 scripts/validate_repo.py
python3 scripts/validate_source_register.py
python3 scripts/validate_adoption_depth.py
python3 scripts/validate_indicator_catalog.py
python3 scripts/check_launch_readiness.py --mode private-preview
~~~

Private-preview readiness reports known publication blockers without failing
the development build. Public-pilot mode is intentionally stricter.

## Contribution workflow

1. Read docs/AGENT_BRIEF.md, docs/METHOD.md, docs/TASKS.md, and the relevant
   register documentation before changing data or public claims.
2. Work from the latest main branch on a scoped branch or worktree. Preserve
   unrelated local changes.
3. Bank new commissioned research before extracting candidates.
4. Promote only original primary URLs or DOIs into the canonical source
   register. Distinguish official statistics, questionnaires, methodology,
   staff analysis, working papers, and media relays.
5. Put every plotted value in a canonical observation file with its denominator
   and survey universe. Mark estimates and qualitative coding explicitly.
6. Route narrative claims through the claim ledger and update the figure
   register whenever a public figure changes.
7. Record methodology, naming, scoring, or architecture choices in
   docs/DECISIONS.md and update docs/TASKS.md for completed or discovered work.
8. Run the full checks above before committing. Open a draft pull request; do
   not auto-merge or auto-publish.

Useful review targets include source provenance, denominator accuracy,
non-English wording, survey comparability, causal overreach, missingness, and
whether China–U.S. contrasts remain hypotheses rather than conclusions.

## Non-negotiable rules

- Do not fabricate data, citations, source metadata, or indicator values.
- Mark missing values as missing.
- Mark estimates and qualitative coding explicitly.
- Keep frontier access, conversion capacity, adaptation capacity, distribution
  quality, and realized outcomes separate.
- Keep inputs, process measures, and outcomes separate.
- Do not use Wikipedia as evidence.
- Do not create a composite national score unless a documented methodology and
  sensitivity analysis eventually support it.
- Do not add secrets, tokens, API keys, or private credentials.
- Do not declare the project public-pilot ready while known blockers remain.
