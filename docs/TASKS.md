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
- [x] Bank the 2026-07-11 adoption-depth source-verification report with an explicit transient-citation provenance header.
- [x] Verify and promote 12 primary ECB, Eurostat, Census, and NBS sources for the first empirical figure; reject duplicate media and superseded rows.
- [x] Add 13 canonical adoption-depth observations with exact denominators, survey universes, evidence labels, and comparability classes; retain the China NBS value as context-only and unplotted.
- [x] Add adoption-depth schema validation, source-integrity checks, BTOS wording-break guards, and figure-data tests.
- [x] Ship empirical Figure 1, “Adoption is not integration,” with responsive source-specific panels and SVG/PNG export.
- [x] Update the study, What we know page, claim ledger, Figure 3 uptake anchors, README, PM status, methods, and figure register.
- [x] Close GitHub issues #7 and #10 as completed without rewriting their history.
- [x] Mark the research lab noindex/no-follow for the private preview.
- [x] Reverify PR #22 against post-PR-#21 main; refresh 12 promoted source rows, living-source metadata, denominator safeguards, and the concise README architecture summary.

## Active Protocol

- [x] Use one GitHub issue and one branch per agent.
- [x] Keep Wave 1 work separate from Wave 2 work until schema and validation guardrails are merged.
- [x] Merge Wave 1 evidence-infrastructure branch before source promotion or public-copy rewrite.
- [x] Merge Wave 2 UI guardrails branch before public-preview review.
- [x] Review source-promotion PR before merging because canonical source rows become downstream evidence dependencies. (PR #18 merged 2026-06-27.)
- [ ] Review the 19 rows still staged in `research/source-register/2026-07-05-deep-research-source-additions.csv` before clearing remaining essay dependencies.
- [ ] Review the 22 rows still staged in `research/source-register/2026-07-11-deep-research-source-additions.csv`; IEA, LBNL-media, and ECB-media duplicate families are now rejected.
- [ ] Wire first canonical series into `BuildoutVsPayoffFigure` before assigning it a public figure number.
- [ ] Review forecast-register ranges once against resolution sources; flip rows from draft_unreviewed to active.
- [ ] Author decision for fc-0006: current TH1.1 public data may already satisfy the 8-hour threshold; resolve, rebase, or retire without silently revising the range.
- [ ] Remap or retire staged `src-v0-dr-*` IDs in `v0_visual_system.json` so public-pilot readiness can pass.
- [ ] Move six superseded content drafts intact to `research/archive/` in a scoped cleanup; do not delete their useful research material or cosmetically clear TODOs.
- [ ] Obtain native-language human review for the contextual NBS source src-0049 before a public pilot.
- [x] Adopt a living-evidence protocol with evidence vintages, explicit revisit triggers, and lead-only treatment for anonymous social-media claims.
- [x] Adopt the one-primary-review, one-correction-pass convergence rule; backlog P2/P3 findings when no P0/P1 blocker remains.
- [ ] Triage Anthropic's 2026-08-27 Model Hardware Standard preview into source staging as C2/C3, pathway-integration, and assurance evidence; do not automatically recode S1-S5.

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
- [ ] Narrow the dynamic filesystem trace through `next.config.ts` / `lib/registers.ts` so Turbopack no longer warns that the whole project may be included in the NFT list.

## WP1 — Design grammar refit

- [x] Create `design/system-v2` from merged Figure 1 main.
- [x] Replace public color and typography tokens with design system v2.
- [x] Refit `EvidenceChip` to eight evidence bases with an orthogonal review gate.
- [x] Refit `FigureShell` and add `AnnotationLayer` plus PNG/SVG export actions.
- [x] Restyle Figure 1 as four source-specific panels with a context-only China panel.
- [x] Add and integrate the design-reference placeholder-value validator.
- [x] Remove gradients, shadows, emoji, and ambient entrance animation from app code.
- [x] Record chart grammar and integrity checks in `docs/DESIGN_QA.md`.
- [x] Capture and inspect 1440px and 390px screenshots of Figure 1.
- [x] Open draft PR #23 after screenshot acceptance is complete.

## WP1.5 — Structural Profiles method gate

- [x] Review S1-S5 directionality and isolate the opposite-direction legacy `conversion drag` field.
- [x] Accept the non-aggregation rule for correlated S2/S3/S4 dimensions.
- [x] Review all sixteen draft sector bands; amend cybersecurity to Band 2 and materials science to Band 4.
- [x] Freeze amended software, manufacturing, and magnetic-confinement fusion stage lists before coding.
- [x] Accept and tighten model-provenance, independent-review, and disagreement rules.
- [x] Review and amend the three signposts; record reviewer probabilities without activating them as owner forecasts.
- [x] Confirm the anchor-only governance overlay and add functional-assurance provenance fields.
- [x] Confirm eight coupling edges, equal widths, and separate categorical magnitude from magnitude confidence.
- [x] Confirm the four-scenario premise-audit ledger with a six-assumption cap.
- [x] Harmonize evidence basis, public review status, and separate coding status.
- [x] Bank the canonical method, gate review, intellectual lineage, third-party data policy, license register, and verified related-work register.
- [x] Obtain Jinhua's provisional probability judgment for the three method signposts; keep them pre-activation until measurement specifications are frozen.
- [x] Add the authoritative-document manifest and mark conflicting earlier Fable/Spectrum/package documents as historical proposals.
- [x] Clarify S1, S3, qualitative band logic, ordered-band semantics, and public display boundaries.
- [x] Add the stage taxonomy and separate coder-submission schema; preserve disagreement by S-dimension.
- [x] Add actor/subnational country scope, key governance to `profile_id`, and freeze the three initial anchor pathways.
- [x] Record MHS routing and close the final bounded WP1.5 synchronization without starting WP2.
- [ ] Verify the six staged or underspecified lineage leads before moving any into the canonical related-work register.

## WP2 — Three-anchor Structural Profiles pilot

- [ ] Update the WP2 prompt for stable profile IDs, parent stages, pathway/application/lifecycle scope, explicit pathway variants, and ex ante C8 commercialization conditions.
- [x] Create the blank pilot taxonomy and owner-reviewable worksheet package that the original WP2 prompt incorrectly assumes already exists; keep Fable and blind templates separate and value-free.
- [x] Add `coding_as_of`, `last_reviewed`, and `revisit_triggers` to the blank WP2 worksheet templates, schemas, and validators; keep all freshness values unpopulated until coding begins.
- [x] Create blank country-modifier and governance templates; defer C1-C8 and governance population to a limited evidence-backed WP2 mini-pilot.
- [x] Freeze judgment-free stage descriptions, owner-approved primary V1 lifecycle contexts, shared 0/2/4 coding guidance, blind-review provenance, and the 155-comparison reconciliation contract for the coding handoff.
- [x] Validate the separate Claude Code / Claude Opus 5 seed and Codex / GPT-5.6 extra-high independent submissions; pin their corrected heads, preserve immutable normalized copies, and generate the 155-row reconciliation audit, owner-only exception package, and 18-profile fusion queue.
- [x] Complete the delegated 23-row owner-exception review, adopt every entered disposition and rationale, clarify the bounded S5 convention, and record `clarify_S5_then_targeted_S5_adjudication` without pre-approving canonical rows.
- [x] Inventory, verify, and bank relevant evidence from the internal Fusion Test pack; retain provisional candidate IDs and defer canonical IDs to source-register review. See `research/fusion-evidence/` and issue #35.
- [ ] Review the issue #35 promotion exceptions only: native-language/legal scope where load-bearing, the unresolved HEAT-ML publisher page/DOI, and the unverified ITER sector-count and NSTX-U completion percentages; do not reopen S1-S5 in source review.
- [ ] Run routine domain-informed review for all 18 fusion profiles, prioritizing experiment selection, plasma control, materials qualification, tritium/fuel cycle, blankets, commissioning, reliability demonstration, licensing, and grid integration.
- [ ] Complete targeted S5 adjudication for the 19 affected rows using the clarified boundary convention, the seven owner-routed S5 decisions, and the preserved 12-row audit trail; do not reopen S1-S4.
- [ ] Define the human/domain-review plan for software, manufacturing, and fusion before any row becomes canonical.
- [ ] Create the profile CSV schemas from `docs/METHOD_PROFILES.md` after the method-gate branch is reviewed and merged.
- [ ] Obtain at least one independent coding or named expert review before any pilot row becomes approved/canonical.
- [ ] Implement and wire the Structural Profiles validators described in the canonical method.

## WP3–WP5 prompt corrections

- [ ] Revise WP3 sector hover behavior to show stage distributions or ranges, never a synthetic whole-sector S profile.
- [ ] Keep signposts in `designing` or equivalent pre-activation status until their measurement contracts are complete.
- [ ] Run the fusion evidence commission as source inventory and structured extraction first, followed by verification and only then synthesis.
- [ ] Add economic-regime, distribution, adaptation, and topology-change assumptions to WP5 premise auditing.
- [ ] Limit WP5 v1 to six shared premise dimensions across the four anchor scenarios.
- [ ] Evaluate `citrini_2028_gic` as a staged stress test and seek counter-scenarios; do not treat it as a finding or fifth anchor by default.
- [ ] Add dated premise and coupling reviews plus event-triggered refresh rules to the revised WP3–WP5 prompts.
- [ ] Defer automated source monitoring and any public freshness dashboard until after the three-anchor pilot identifies load-bearing sources.
