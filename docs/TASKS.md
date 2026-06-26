# Tasks

## Done

- [x] Create repo scaffold for research, data, docs, content, scripts, and future app work.
- [x] Add VS Code workspace settings and tasks.
- [x] Add assistant guardrails for Codex, Copilot, and Cursor.
- [x] Add empty source register and indicator catalog.
- [x] Add validation script for scaffold integrity.
- [x] Add source register and indicator catalog data-layer validators.
- [x] Seed source and indicator CSVs with non-evidentiary placeholder rows.
- [x] Add V0 processed metadata build script.
- [x] Document how to add a new indicator.
- [x] Initialize the root Next.js TypeScript app with App Router and Tailwind.
- [x] Build initial V0 pages for methodology, sources, scenarios, sectors, and country profiles.
- [x] Add reusable layout and evidence-status UI components.
- [x] Render placeholder data as visibly missing rather than scored.
- [x] Add commissioned Deep Research reports to `research/deep-research/`.
- [x] Extract Deep Research reports into staged source-register additions.
- [x] Extract Deep Research reports into staged indicator-candidate additions.
- [x] Write first synthesis memo from the research reports.
- [x] Build V0 interactive visual system components and wire homepage, manufacturing, scenarios, and sources pages.
- [x] Add staged local JSON for visual hypotheses, evidence states, missingness, and source-backed claim examples.
- [x] Draft V0 methodology note with scope, evidence labels, and missingness policy.
- [x] Create first content layer for launch essay, China and United States briefs, and manufacturing and compute-energy module briefs.
- [x] Add AI Conversion Atlas to the Jinhua portfolio project data and localization.
- [x] Create V0 red-team review with launch blockers, risks, and proposed fixes.

## Next

- [ ] Verify original URLs or DOIs for staged source-register additions before canonical merge.
- [ ] Review sources and merge approved rows into `data/sources/source_register.csv`.
- [ ] Review indicators and merge approved rows into `data/indicators/indicator_catalog.csv`.
- [ ] Review staged visual JSON against canonical sources before treating visual states as publishable evidence.
- [ ] Replace source placeholders in V0 content with reviewed source IDs after canonical source promotion.
- [ ] Add stronger UI/schema separation between official claims and independently observed evidence.
- [ ] Add missingness reason taxonomy beyond a single `missing` label.
- [ ] Redesign scenario simulator language and presentation so it cannot be mistaken for a forecast.
- [ ] Add validation rules preventing placeholder, staged, tier `D`, or expert-commentary sources from supporting empirical values.
- [ ] Add multilingual source verification fields and review workflow before using non-English sources in public claims.
- [ ] Define a country-level indicator value schema before generating non-placeholder country profiles.
- [ ] Add reviewed source rows before publishing any country or sector values.
- [ ] Add page-level tests once the V0 data schema stabilizes.

## Later

- [ ] Create V0 country profile schema.
- [ ] Create V0 sector module schema.
- [ ] Add tests once data transformation scripts exist.
- [ ] Add source-driven charts only after reviewed indicators exist.
