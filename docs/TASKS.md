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
- [x] Create GitHub issue board for Wave 0, Wave 1, Wave 2, and final red-team work.
- [x] Merge Wave 0 control-plane branch with `docs/AGENT_LOCKS.md`, `docs/AGENT_RUNBOOK.md`, and `reports/PM_STATUS.md`.
- [x] Add CI and launch-readiness checks. See issue #2.
- [x] Upgrade canonical source schema and source validation. See issue #3.
- [x] Upgrade indicator schema, missingness taxonomy, and attribution rules. See issue #4.
- [x] Add METR/Epoch capability-horizon module. See issue #5.
- [x] Redesign scenario simulator as a scenario assumption browser. See issue #8.
- [x] Add staged visual evidence banners and source-card claim-status guardrails. See issue #9.
- [x] Bank 2026-07-05 Deep Research reports (China AI+ diffusion outcomes; AI macro adoption/capex/capability) with staged source additions.
- [x] Populate V0 claim ledger with 30 claims. See issue #7 and `reports/claim-ledger-v0.md`.
- [x] Verify and correct the China robot-density figure against the live IFR source (166/10k revised; supersedes 470/567). See clm-0003.
- [x] Land launch essay v1.1 with corrected robotics passage and claim-ledger cross-references. See issue #10 (publication still gated on staged-source promotion).
- [x] Add Figure 1 `FrontierSensitivityScatter` (from Claude Design mockup) and wire it into the homepage.
- [x] Bank 2026-07-11 Deep Research (evidence review; China evidence map) with staged source additions.
- [x] Product reset: rebuild public product as the Frontier Is Not Fate study with Study/Findings/Evidence/Forecasts/Methods/About IA. See `docs/PRODUCT_RESET.md`.
- [x] Add forecast register (`data/forecasts/`) and `/forecasts` tracker with draft author ranges.
- [x] Add figure register and type every public figure (empirical/modeled/conceptual/forecast). See `docs/FIGURE_REGISTER.md`.
- [x] Move legacy dashboard views to `/lab`; redirect `/methodology` to `/methods`.
- [x] Repair PR #21 evidence semantics: gate staged claims, type chips by claim semantics, and separate product status.
- [x] Move the empty build-versus-harvest prototype out of the numbered public narrative.
- [x] Migrate the 2026-07-11 staged source additions to the canonical schema and add the METR February 2026 update.
- [x] Hide draft forecast ranges pending author review and flag fc-0006 for a resolve/rebase/retire decision.

## Active Protocol

- [x] Use one GitHub issue and one branch per agent.
- [x] Keep Wave 1 work separate from Wave 2 work until schema and validation guardrails are merged.
- [x] Merge Wave 1 evidence-infrastructure branch before source promotion or public-copy rewrite.
- [x] Merge Wave 2 UI guardrails branch before public-preview review.
- [x] Review source-promotion PR before merging because canonical source rows become downstream evidence dependencies. (PR #18 merged 2026-06-27.)
- [ ] Review and promote the 22 staged rows in `research/source-register/2026-07-05-deep-research-source-additions.csv` before clearing essay VERIFY markers.
- [ ] Review and promote the 25 staged rows in `research/source-register/2026-07-11-deep-research-source-additions.csv` (reconcile duplicate families: IEA vs src-0009, ECB media relay vs src-v1-dr-005).
- [ ] Wire first canonical series into `BuildoutVsPayoffFigure` before assigning it a public figure number.
- [ ] Review forecast-register ranges once against resolution sources; flip rows from draft_unreviewed to active.
- [ ] Author decision for fc-0006: current TH1.1 public data may already satisfy the 8-hour threshold; resolve, rebase, or retire without silently revising the range.
- [ ] Remap or retire staged `src-v0-dr-*` IDs in `v0_visual_system.json` so public-pilot readiness can pass.

## Next

- [x] Verify and promote first reviewed URL/DOI-backed source rows into `data/sources/source_register.csv`. See issue #6.
- [x] Spot-check Issue #6 source-promotion PR rows before merge. See `reports/source-promotion-30.md`.
- [ ] Review indicators and merge approved rows into `data/indicators/indicator_catalog.csv`. See issue #4 and later data work.
- [x] Populate V0 claim ledger before public launch copy. See issue #7.
- [ ] Review staged visual JSON against canonical sources before treating visual states as publishable evidence. See issue #9.
- [ ] Replace source placeholders in V0 content with reviewed source IDs after canonical source promotion. See issue #10.
- [ ] Define a country-level indicator value schema before generating non-placeholder country profiles.
- [ ] Add reviewed source rows before publishing any country or sector values. See issue #6.
- [ ] Add page-level tests once the V0 data schema stabilizes.
- [ ] Run final adversarial launch review. See issue #11.

## Later

- [ ] Create V0 country profile schema.
- [ ] Create V0 sector module schema.
- [ ] Add tests once data transformation scripts exist.
- [ ] Add source-driven charts only after reviewed indicators exist.
