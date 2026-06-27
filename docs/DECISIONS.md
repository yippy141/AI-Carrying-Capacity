# Decision Log

## 2026-06-26: Use AI Conversion Atlas as repo identity

Decision: Use "AI Conversion Atlas" as the product/repo identity.

Reasoning: It is clearer and more defensible than treating "AI carrying capacity" as the formal construct. "Carrying capacity" remains useful public language, but "conversion capacity" better captures dynamic, sector-specific, institutionally shaped absorption of AI capability.

## 2026-06-26: Keep V0 scaffold-only

Decision: Do not initialize a Next.js app, install dependencies, or create scored data yet.

Reasoning: The user is commissioning Deep Research reports separately. Creating a framework-heavy app or dataset before those reports arrive would lock in assumptions too early.

## 2026-06-26: Avoid a single V0 score

Decision: Represent the V0 framework as separate dimensions rather than one composite national index.

Reasoning: A single score would create fake precision before source coverage, weighting, missingness, and sensitivity testing are mature.

## 2026-06-26: Keep China-US claims hypothesis-first

Decision: Do not encode China or US advantage as a conclusion in the scaffold.

Reasoning: The strongest version of the project tests sector-specific conversion advantages instead of assuming them.

## 2026-06-26: Use explicit V0 data-layer registries

Decision: Use `data/sources/source_register.csv` and `data/indicators/indicator_catalog.csv` as the canonical V0 registries, with generated metadata JSON in `data/processed/`.

Reasoning: Keeping source metadata, indicator metadata, and country profile outputs separate prevents placeholder or qualitative-coded material from being mistaken for observed country scores.

## 2026-06-26: Use A-E reliability tiers and explicit data quality

Decision: Use `A`, `B`, `C`, `D`, and `E` for source reliability tiers, and `high`, `medium`, `low`, and `missing` for indicator data quality.

Reasoning: Letter tiers leave room for `E` placeholder rows while avoiding confusion with numeric indicator scores. The explicit `missing` data-quality value keeps unknown quality visible.

## 2026-06-26: Require evidence guardrails for scores

Decision: Indicator rows may not carry a score unless they have valid `source_ids` or are explicitly marked and documented as qualitative-coded.

Reasoning: V0 should allow transparent qualitative coding later, but it must never silently accept unsourced scores or treat placeholders as evidence.

## 2026-06-26: Initialize root Next.js app for V0 product scaffold

Decision: Use the repo root as the `ai-conversion-atlas` Next.js TypeScript app with App Router and Tailwind.

Reasoning: The user requested the initial web product now, and keeping the app at the root preserves the existing canonical `app/`, `components/`, `data/`, and `docs/` paths. The app is static and does not require external API keys.

## 2026-06-26: Use missing-first placeholder UI

Decision: Initial country, sector, source, and scenario pages render placeholder and missing states instead of sample scores.

Reasoning: V0 should make data absence legible without implying relative national performance or sector values before source review.

## 2026-06-26: Stage Deep Research consolidation before canonical merge

Decision: Consolidate the Deep Research reports into staged source-register and indicator-candidate CSVs under `research/source-register/`, plus a synthesis memo under `research/deep-research/`, before promoting any rows into canonical `data/` registries.

Reasoning: The reports contain useful citations and claims, but many source URLs are represented only by ephemeral research citations or source names. Canonical data rows should wait until original URLs or DOIs are verified and official claims are separated from independent empirical findings.

## 2026-06-26: Use a layered V0 dashboard methodology

Decision: V0 methodology should remain a layered dashboard across frontier access, conversion capacity, adaptation capacity, distribution quality, and realized outcomes, with manufacturing/robotics and compute/energy as the first modules.

Reasoning: The consolidated research supports domain-specific conversion analysis, not a single national score. Indicators should carry evidence labels such as observed, official-claim, qualitative-coded, estimated, or missing, and China-US claims should remain hypotheses tested by sector and constraint rather than headline conclusions.

## 2026-06-26: Add staged local JSON for the V0 visual system

Decision: Store the first interactive visual-system data in `data/processed/v0_visual_system.json` as staged visual metadata, qualitative watch states, missing-value markers, source IDs, and scenario assumptions.

Reasoning: The user requested interactive components before canonical country or sector values are reviewed. A separate staged visual JSON lets the app render ConversionFunnel, CountryCompare, BottleneckFingerprint, SectorHeatmap, ScenarioSimulator, SourceBackedClaimCard, and UncertaintyLegend without inventing indicator values, calling external APIs, or creating a national score.

## 2026-06-26: Encode scenario outputs as hypothesis patterns

Decision: The V0 scenario simulator matches user-selected assumptions to staged hypothesis patterns rather than calculating probabilities, forecasts, or country rankings.

Reasoning: Scenario work is useful for testing frontier-versus-conversion pathways, but numeric outputs would imply false precision before assumptions, source values, and sensitivity checks are documented.

## 2026-06-26: Draft first content layer with source placeholders

Decision: Write the first methodology, launch essay, country brief, and module brief content as source-placeholder drafts rather than publishable findings.

Reasoning: The user requested the first content layer before canonical source promotion. Explicit TODO_SOURCE, TODO_DATA, and TODO_VERIFY markers preserve the project argument while preventing staged research, official targets, or unsourced hypotheses from becoming evidence claims.

## 2026-06-27: Use GitHub issues, path locks, and branches as the agent operating model

Decision: Manage the next implementation phase through GitHub issues, one branch per agent task, and explicit path locks documented in `docs/AGENT_LOCKS.md`.

Reasoning: The project now has a V0 app shell, staged research, and a red-team audit. The highest risk is not lack of activity; it is agents editing overlapping files, promoting staged research too early, or making visuals and copy look more evidence-backed than they are. A GitHub issue board, branch isolation, path locks, PM status file, and final red-team review create a workflow that lets agents automate work while preserving source discipline.

## 2026-06-27: Add source claim-status and method-type fields before canonical promotion

Decision: Expand the source register with publication, access, verification, archive, method-type, claim-owner, official-claim-status, independent-validation, original-language, and translation-review fields.

Reasoning: Source reliability and claim validity are different. A government strategy may be authentic and high-reliability as a source while still supporting only an official target, policy intent, or program claim rather than an observed outcome.

## 2026-06-27: Add missingness, attribution, and input/output role fields to indicators

Decision: Add `missing_reason`, `attribution_strength`, and `input_output_role` to the indicator catalog, validators, templates, and TypeScript types.

Reasoning: V0 needs to prevent unreviewed values, official claims, input metrics, and causal claims from being treated as comparable outcomes. Missingness must distinguish not reviewed, unavailable, not comparable, not applicable, confidential, not yet measured, source unverified, and placeholder.

## 2026-06-27: Use private-preview and public-pilot readiness modes

Decision: `scripts/check_launch_readiness.py` reports blockers without failing in `private-preview` mode and fails on blockers in `public-pilot` mode. CI uses private-preview mode.

Reasoning: The repository should remain buildable while the evidence layer is incomplete, but there must be a hard public-pilot gate that fails when placeholder-only sources, public TODOs, unsupported empirical indicators, Wikipedia links, or staged visual source mismatches remain.

## 2026-06-27: Treat capability horizon as upstream of conversion capacity

Decision: Add `docs/CAPABILITY_HORIZON.md`, `docs/FORECASTING_METHOD.md`, and a framework-only domain horizon schema under `data/capabilities/`.

Reasoning: METR/Epoch-style capability and scaling evidence can clarify where frontier progress matters, but it should not become a country score or realized-outcome claim. Capability horizon belongs upstream; conversion capacity measures whether societies turn capability into deployment and outcomes.

## 2026-06-27: Rename the scenario simulator as an assumption browser

Decision: Present V0 scenario work as a “Scenario assumption browser,” show multiple compatible pathways, and remove visible match-count or nearest-winner language.

Reasoning: Scenario work in V0 is a reasoning aid, not a forecast. Showing a single nearest staged pattern or match score can look probabilistic even when caveated. The browser should show assumptions, options, evidence state, and what would change the pathway.

## 2026-06-27: Add staged-evidence banners to public visual pages

Decision: Use a reusable `StagedEvidenceBanner` on visual pages that rely on `data/processed/v0_visual_system.json` or staged claim-card examples.

Reasoning: The visual system is useful for product structure, but it must not look like reviewed evidence. Public pages should say that staged visuals are not canonical findings, do not contain a composite score, keep official claims separate from independently observed evidence, and preserve missing values.
