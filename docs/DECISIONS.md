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

## 2026-07-05: Correct the China robot-density figure and make density claims denominator-explicit

Decision: Use IFR World Robotics 2025's revised China manufacturing robot density of 166 per 10,000 employees (22nd worldwide; US 307; Korea 1,220; global average 132), verified against the live IFR press page. Any density claim in product or essay copy must state which workforce denominator series it uses. The 470 figure (2023, pre-revision) and a 567 figure found in draft copy are superseded; the latter has no identifiable IFR basis.

Reasoning: Robot density is the single most load-bearing comparative number in the manufacturing module, and IFR's NBS-workforce revision reverses the China-US density ordering. Treating the revision as the story (aggregate scale vs median diffusion) is more accurate and analytically sharper than either the old or the hallucinated figure.

## 2026-07-05: Claim ledger is the gate between sources and public copy

Decision: Populate `data/claims/claim_ledger.csv` with three product-use statuses: `approved` (canonical sources only), `approved_with_caveat` (canonical sources; caveat must ship with the claim), and `staged` (cites `src-v1-dr-*` rows pending verification). Public copy may only assert approved or approved_with_caveat claims without a draft marker.

Reasoning: The launch essay makes empirical claims faster than the source register can police unless every claim routes through the ledger. Staged claims keep the essay draftable now while making the promotion dependency explicit.

## 2026-07-05: Figure 1 is an ordinal judgment figure, not a measurement

Decision: Add `FrontierSensitivityScatter` (converted from the Claude Design mockup) as Figure 1 on the homepage. Its "positions are illustrative, not scored" caption, uncertainty halos, and "read the pattern, not the coordinates" language are part of the figure contract and must not be removed. Placements cross-reference clm-0029 and the staged METR domain evidence (clm-0024).

Reasoning: The frontier-sensitivity × conversion-drag scatter is the project's central diagnostic and the most defensible visual form of the marginal-return question: it communicates the pattern without pretending to a fitted function or scored coordinates.

## 2026-07-11: Restructure the public product around the argument (Frontier Is Not Fate)

Decision: The public product is retitled "Frontier Is Not Fate" and rebuilt as an editorial study (hero, research question, three findings, forecasts, methods) with primary navigation Study / Findings / Evidence / Forecasts / Methods / About. "AI Conversion Atlas" remains the name of the evidence system. Legacy dashboard views move to a Research lab area; `/methodology` permanently redirects to `/methods`. Evidence status appears as figure-caption markers, inline chips, and expandable notes instead of page-width banners in the study narrative; banners remain on lab pages.

Reasoning: The prior homepage led with scaffold status and warnings — the bookkeeping was the product. The argument is the product; the bookkeeping is its footnotes. Honesty markers are not removed, they are re-scaled to editorial convention (figure captions and sidenotes), which is both more credible and more readable. See docs/PRODUCT_RESET.md.

## 2026-07-11: Figures are typed and registered

Decision: Every public figure is classified empirical / modeled / conceptual / forecast in docs/FIGURE_REGISTER.md and carries that classification in its caption chip. Data-ready figures render labeled empty states until every plotted series has a canonical source; no fake charts.

Reasoning: The reset increases narrative confidence, so the type system must prevent conceptual figures from borrowing empirical authority. The empty state is a feature: it shows the evidence gate working in public.

## 2026-07-11: Forecast register with draft author ranges

Decision: Add `data/forecasts/forecast_register.csv` and `/forecasts`. Every question has resolution criteria, a named observed resolution source, a deadline, and an append-only update history. All initial probability ranges are marked draft_unreviewed author judgments. Questions never resolve against official targets or announcements.

Reasoning: Signposts with deadlines make the framework falsifiable in public without turning the product into a prediction market. Labeling ranges as unreviewed author judgments keeps the scenario-vs-forecast boundary that the assumption browser already established.

## 2026-07-11: Separate evidence semantics from product-use status

Decision: Evidence chips derive deterministically from claim and evidence type. Product-use status is a separate gate and label; `approved_with_caveat` never maps to `observed` by itself. Staged and rejected claims are capped at staged and missing.

Reasoning: Editorial clearance answers whether and how a claim may appear; it does not change an official target, model estimate, or hypothesis into an observation.

## 2026-07-11: Keep empty empirical prototypes out of the numbered study

Decision: Move `BuildoutVsPayoffFigure` to the research lab as an unnumbered planned prototype. It enters the public numbered narrative only after reviewed canonical series are rendered.

Reasoning: A numbered empirical figure containing only empty states borrows authority from data that are not present.

## 2026-07-11: Gate forecast ranges and audit METR evidence by vintage

Decision: Hide numerical forecast ranges until author review clears them. Keep fc-0006's draft range unchanged while flagging an author decision because current TH1.1 measurements may already cross its threshold. Treat METR's early-2025 slowdown result as historical and out of date, paired with the February 2026 methodology update and its measurement-uncertainty conclusion.

Reasoning: Draft probabilities should not look endorsed. Rapidly changing capability and productivity measurements require explicit baselines, uncertainty, benchmark ceilings, and source vintage.
