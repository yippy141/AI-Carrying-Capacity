# Product Reset: Frontier Is Not Fate

Date: 2026-07-11
Status: implemented on branch `product-reset/frontier-is-not-fate`

## What changed and why

The public product is restructured around its strongest research argument rather than its data infrastructure. The prior homepage led with scaffold status, methodology caveats, and a staged-evidence banner — the bookkeeping was the product. The reset makes the argument the product and moves the bookkeeping to where readers expect it: figure captions, sidenotes, and the Evidence section.

- **Public product title:** Frontier Is Not Fate
- **Subtitle:** An interactive study of when advanced AI becomes national power — and when infrastructure, institutions, and organization flatten the return.
- **AI Conversion Atlas** remains the name of the underlying evidence, source, claim, and methods system.

## Information architecture

### Before

| Route | Role |
| --- | --- |
| `/` | Dashboard-style scaffold: banner, funnel, Figure 1, country compare, fingerprint, module links |
| `/methodology` | Method note |
| `/sources` | Source status page |
| `/scenarios` | Scenario assumption browser |
| `/sectors/manufacturing`, `/sectors/compute-energy` | Placeholder sector modules |
| `/countries/[iso]` | Placeholder country shells (linked from footer) |

### After

| Route | Role |
| --- | --- |
| `/` | The study: editorial narrative — hero, research question, three findings, forecasts preview, methods footer |
| `/findings` | Concise finding summaries with figures and evidence stage labels |
| `/evidence` | Source register and claim ledger explorer (reads the canonical CSVs) |
| `/forecasts` | Forecast and signpost tracker from `data/forecasts/forecast_register.csv` |
| `/methods` | Working-paper method, limitations, evidence taxonomy (absorbs `/methodology`, which redirects) |
| `/about` | Motivation, authorship, acknowledgments |
| `/lab` | Research lab index for legacy exploratory views |
| `/scenarios`, `/sectors/*`, `/sources`, `/countries/[iso]` | Retained, reachable via `/lab` (and `/sources` superseded by `/evidence`); removed from primary navigation |

Placeholder country-profile shells are no longer linked from primary navigation or the footer.

## Component disposition

| Component | Disposition |
| --- | --- |
| `FrontierNotFateHero` | **Added** (adapted from superseded PR #19: ribbon figure and station structure retained; status jargon and evidence legend removed from hero; thesis, CTAs, and metadata line added) |
| `FrontierSensitivityScatter` | **Retained**, now Figure 2 inside the domain proposition with caption-level evidence notes |
| `FigureShell` | **Added**: shared figure wrapper with figure number, caption, evidence-stage marker, and expandable evidence notes |
| `BuildoutVsPayoffFigure` | **Moved to lab**: unnumbered planned empirical prototype until canonical series are rendered |
| `ConversionChainCompare` | **Added**: US–China comparative hypothesis with direct record, interpretation, and missing evidence separated cell by cell |
| `EvidenceChip` | **Added**: small inline evidence-status chip replacing banner-scale warnings in the study narrative |
| `ConversionFunnel` | **Moved** off the homepage; available via `/lab` context (unchanged component) |
| `CountryCompare` | **Moved** off the homepage → `/lab` |
| `BottleneckFingerprint` | **Moved** off the homepage → `/lab` |
| `StagedEvidenceBanner` | **Retained** on lab/legacy pages only; removed from the study narrative |
| `ScenarioSimulator` (assumption browser) | **Retained** at `/scenarios`, linked from `/lab` |
| `SectorHeatmap`, `SourceBackedClaimCard`, `UncertaintyLegend` | **Retained** on their existing legacy pages |
| `ConversionMap` | **Retained** (methodology dimensions figure) on `/methods` |
| `DomainConversionScatter` (PR #19) | **Not adopted** — duplicate of `FrontierSensitivityScatter` with an inverted axis; the axis inversion made "high drag" read as "up and to the right pays off" |

## Editorial rules carried into the reset

- Caveats appear as figure-caption markers, inline chips, and expandable notes — never as page-width warning banners in the study narrative, and never deleted.
- Every figure is registered in `docs/FIGURE_REGISTER.md` and classified empirical / modeled / conceptual / forecast.
- Empty states are explicit: where canonical data are unavailable the figure says so and names what would fill it.
- No composite score, no country ranking, no probability presented as forecast fact (forecast rows are labeled draft author judgments).
- Approved claims only in narrative prose; staged claims appear only inside expandable evidence notes with their status visible.
