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

## 2026-07-11: Make adoption depth the first canonical empirical figure

Decision: Figure 1 is “Adoption is not integration,” built from source-specific
ECB SAFE intensity, U.S. Census BTOS organizational breadth, and Eurostat
firm-size adoption panels. The panels are not pooled, ranked, or described as a
harmonized deep-use measure.

Reasoning: Each source identifies a real gap between a binary adoption headline
and a more informative conversion measure, but the instruments use different
questions, periods, universes, and denominators. A multi-panel figure preserves
the empirical signal without false harmonization.

## 2026-07-11: Add a canonical observation register

Decision: Add `data/observations/adoption_depth.csv` as a figure-ready canonical
table. Every row must carry a period, denominator, survey universe, canonical
source ID, evidence label, comparability class, definition, caveat, and
verification date. Figure components resolve plotted values by observation ID
rather than embedding numbers.

Reasoning: Source metadata alone cannot prevent denominator drift or component
literals from diverging from reviewed data. The observation layer creates a
testable source-to-value-to-figure chain without turning process measures into
outcomes.

## 2026-07-11: Preserve the ECB unreported residual

Decision: Show the ECB’s four published shares — 27, 33, 31, and 7 — on a
100-point scale with a two-point unallocated residual. Do not normalize the
segments, call the residual rounding alone, or derive 73% any use.

Reasoning: QA1 offers a “don’t know” response and the results page does not
publish a raw allocation for the residual. It may reflect that response and
rounding. The defensible statement is that the reported use categories sum to
71% and the ECB staff blog says more than 70%, not an invented 73%.

## 2026-07-11: Treat BTOS Q23 and Q24 as separate measurement frames

Decision: The 18%/32% Q23 summaries and 57%/4% Q24 breadth measures must remain
visually and methodologically separate. Q23 uses a prior-two-week all-business
question; Q24 uses a prior-six-month list of 15 functions. The 4% comprehensive
adopter value is labeled estimated because it comes from latent-class analysis.

Reasoning: Presenting the values as one funnel would silently change the
reference window and denominator. The working paper is descriptive and
non-causal; its 32% summary also differs from Table C.7’s 31.2%, which must stay
visible as an unresolved precision issue.

## 2026-07-11: Mark the private-preview lab noindex rather than gating it

Decision: Apply noindex/no-follow metadata to `/lab` while retaining ordinary
review access. Do not add an access gate at this stage.

Reasoning: The lab contains clearly labeled, non-confidential research
instruments. Robots metadata reduces accidental discovery without obstructing
review. A real gate becomes appropriate only if confidential, private, or
licensed material enters the route.

## 2026-08-21: Keep non-comparable official context in the observation layer

Decision: Retain China NBS's 2023 16.4% above-scale-enterprise AI-use statistic
in `data/observations/adoption_depth.csv` as `official-claim` and
`context-only`. It is not plotted in Figure 1 and cannot be compared with ECB,
BTOS, or Eurostat rows.

Reasoning: A canonical but non-plotted observation keeps the source-specific
denominator, universe, translation note, and comparability warning testable.
Leaving the value only in narrative copy or the claim ledger would allow those
measurement safeguards to drift.

## 2026-08-27: Adopt design system v2 as the public figure grammar

Decision: Replace the public visual tokens and type stack with the v2 paper,
ink, hairline, country, comparator, and accent system plus Newsreader, Inter,
and IBM Plex Mono. Public figures use a common claim-title, subtitle, chart,
and provenance-footer frame. Decorative gradients, shadows, ambient animation,
emoji, and dashboard chrome are outside the public grammar.

Reasoning: The product needs to look like an auditable research publication,
not a live-precision dashboard. A restrained frame makes evidence basis,
denominator differences, caveats, and provenance visible before visual polish.

## 2026-08-27: Separate evidence basis from review status in UI contracts

Decision: Evidence basis is one of observed, model estimate, scenario, official
target, company target, expert-coded, historical analogy, or hypothesis. Review
status is canonical, reviewed, staged, superseded, or rejected. Only canonical
and reviewed material may render publicly. A government program claim that is
cleared for use is displayed as an observed record of what its primary document
says; its official source and original claim type remain visible, and it does
not establish that the program achieved an outcome.

Reasoning: The former chip API mixed empirical type, conceptual type, forecast
state, missingness, and editorial clearance. Orthogonal fields prevent a review
decision from changing what kind of knowledge a claim represents, while the
official-source metadata preserves the distinction required by the research
method.

## 2026-08-27: Render NBS adoption only as a separate context panel

Decision: Figure 1 now renders the existing canonical NBS adoption observation
in a China panel with its own zero-based axis, above-scale-enterprise
denominator, official-source note, and `CONTEXT ONLY` label. The panel is never
pooled with ECB, Census, or Eurostat. The Census latent-class value retains its
model-estimate chip and hatch.

Reasoning: WP1 requires a China context panel while the source register already
contains a reviewed, non-comparable observation. Paneling exposes the context
without converting it into a harmonized measure or country comparison, and the
hatch prevents the Census estimate from masquerading as measured.

## 2026-08-27: Reject design-reference placeholder values in CI

Decision: Add an app-code validator for reference-only claims, complete
placeholder assignment sequences, and percentages used near compressibility or
frontier-gap claims. Run it in lint, repository validation, and CI.

Reasoning: The design reference is authoritative for grammar only. A mechanical
gate is safer than relying on reviewers to distinguish its illustrative chart
content from canonical project evidence.

## 2026-08-27: Make generic figure exports self-contained in the browser

Decision: Keep Figure 1's explicit publication SVG and use `html-to-image` for
generic FigureShell SVG and PNG exports. Export rendering omits the action row,
embeds page resources, preserves the paper background, and doubles PNG pixel
density.

Reasoning: Serializing arbitrary figure HTML into a raw SVG `foreignObject`
produced tainted-canvas failures for PNG and could omit computed chart styles.
The self-contained renderer keeps the shared export contract functional for
figures that do not yet have a hand-authored SVG builder.

## 2026-08-27: Use sector-stage structural profiles and draft public bands

Decision: Make `sector.stage` the unit of analysis. Public breadth uses five
draft decision-tree bands, unordered within each band; a two-dimensional S1 ×
S2 view is permitted only in methods. Whole-sector numeric coordinates and
silent stage averages are prohibited.

Reasoning: Within-sector heterogeneity is analytically material. Bands preserve
the product's breadth without imposing cardinal distances or compensability.
The pilot must revise bands transparently if stage-level scrutiny contradicts
the tree.

## 2026-08-27: Keep all intrinsic dimensions direction-consistent and ordinal

Decision: Use S1 information share, S2 feedback speed, S3 experiment
affordability and throughput, S4 physical flexibility, and S5 intrinsic error
tolerance on integer 0–4 rubrics where higher always means structurally easier.
Never sum, average, weight, or percentage-transform them.

Reasoning: Direction consistency prevents the v1 latency inversion. The expected
S2/S3/S4 correlation is harmless when dimensions are not aggregated and would
be double counting under an average. Legacy `conversion drag` is a distinct,
opposite-direction construct.

## 2026-08-27: Amend two draft sector bands at the M1.5 gate

Decision: Move cybersecurity from Band 1 to Band 2 because its verification is
not low-consequence. Move materials science from Band 5 to Band 4 because
decade-scale qualification is stage-specific rather than universal. Retain
basic scientific research in Band 3 only with an explicit heterogeneity flag.

Reasoning: These changes apply the published decision tree rather than treating
the seed labels as conclusions. Row disagreements are changelog entries, not
gate blockers.

## 2026-08-27: Freeze amended stage lists before the WP2 coding pilot

Decision: Use the software, discrete-manufacturing, and magnetic-confinement
fusion stage lists in `docs/METHOD_PROFILES.md`. Manufacturing explicitly
includes commissioning, production control, quality, and maintenance. Fusion
explicitly includes major plant subsystems, reliability, licensing, and grid
integration.

Reasoning: Omitting the physical-operation and qualification stages would bias
profiles toward information-rich work. Later splits or merges require a
versioned crosswalk and decision entry.

## 2026-08-27: Separate coding workflow from public review status

Decision: Keep the eight design-system evidence bases and five global review
statuses. Add a separate coding status of proposed, reviewed, approved, or
disputed for expert codings. Preserve Fable as the seed proposer and model.
Canonical approval requires owner review and an identified independent review.

Reasoning: `proposed/approved/disputed` describes coder workflow;
`canonical/reviewed/staged/superseded/rejected` controls public use. Mixing the
two would let editorial clearance alter the kind of evidence a row represents.

## 2026-08-27: Keep the three method signposts inactive pending author ownership

Decision: Retain all three signposts with amended clocks and resolution rules.
Record Codex review probabilities of 60%, 60%, and 75% as recommendations only.
Do not activate them until Jinhua records his author probability, baseline,
clock start, deadline, and invalidation conditions.

Reasoning: A model review can stress-test a signpost but cannot fabricate the
owner's personal forecast judgment. Conditional questions also require frozen
measurement vintages before they can resolve.

## 2026-08-27: Use an anchor-only governance overlay with functional assurance coding

Decision: Limit v1 governance overlay rows to the three anchor sectors. Keep
the overlay separate from S and C fields and add `assurance_functions` plus
evidence, provenance, period, and review fields.

Reasoning: Assurance can produce error detection and trust as well as delay or
an experimentation barrier. Treating it as a one-sign friction would erase the
benefit-hazard asymmetry the overlay is meant to test.

## 2026-08-27: Retain eight coupling edges but separate magnitude from confidence

Decision: Keep eight equal-width seed edges. `effect_magnitude` is categorical
small, medium, large, or unknown; `magnitude_confidence` is established,
contested, or unknown; evidence strength remains separate. Refine the final two
source nodes to `manufacturing_scale_and_learning` and
`advanced_manufacturing_capability`.

Reasoning: The draft's established/contested/unknown field described confidence,
not magnitude. Separating them prevents epistemic certainty from masquerading
as effect size. Paths stop at second order and never produce a flywheel score.

## 2026-08-27: Audit four scenario premises without grading scenarios

Decision: The v1 assumption ledger covers AI 2027, AI 2040 Plan A, AI as Normal
Technology, and the Frontier Is Not Fate baseline, capped at six assumptions.
It records categorical sensitivity, sources, provenance, and review status.

Reasoning: The useful comparison is which conclusions depend on automation,
robotics, grids, or coordination premises. Recreating each scenario's internal
tracker would conflate premise comparison with within-ontology scoring.

## 2026-08-27: Preserve the flywheel metaphor with structural caveats

Decision: Keep the editorial name “Two flywheels” only with its mandatory
subtitle, country counterevidence panel, hypothesis encoding, and named
cross-coupling signposts.

Reasoning: The metaphor can aid recall without essentializing either country if
the caveats survive inside the figure. Revisit if screenshots circulate without
the subtitle or counterevidence.

## 2026-08-27: Make the method gate lightweight and the fusion result open

Decision: Close M1.5 after this one-session review. Scope the first fusion DAG
to magnetic confinement and leave its conclusion fully open: on-path,
off-path, pathway-specific, or insufficient evidence.

Reasoning: A standing committee would add process without improving the current
pilot. Pathway scope avoids a false universal DAG, and a pre-authorized fusion
conclusion would bias the evidence pack.

## 2026-08-27: Verify intellectual lineage and licenses before use

Decision: Use the conservative contribution statement in
`docs/INTELLECTUAL_LINEAGE.md`. Only fetched publisher, DOI, or originating
project records enter the canonical related-work CSV. Unresolved leads remain
staged. Third-party datasets require a license row before first render.

Reasoning: Attribution disciplines novelty claims, while source verification
and licensing are separate gates. A stable citation does not itself authorize
dataset redistribution.

## 2026-08-28: Record owner approval of the M1.5 method gate

Decision: Jinhua approves the sector-stage method, S1-S5, non-aggregation rule,
governance overlay, coupling graph, scenario ledger, conservative contribution
statement, Cybersecurity in Band 2, and Basic Science in Band 3 with a
heterogeneity warning. Rename the relevant overview rows to `Digital media and
entertainment` and `Materials development and qualification`. Record the three
signpost ranges as provisional author judgments of 55–65%, 55–70%, and 70–85%.

Reasoning: These decisions reflect the owner's intended public argument. The
probabilities establish authorship but do not activate a signpost until its
baseline, clock, source, and invalidation rules are frozen.

## 2026-08-28: Make pathway, application, and lifecycle scope explicit

Decision: Give each scoped stage profile a stable `profile_id` and separate
`parent_stage_id`, `pathway_id`, `application_context`, `lifecycle_phase`, and
`critical_path_role` fields. Do not concatenate scope into the identifier.
Preserve fusion leaf stages under parent groups. Permit explicit pathway
variants and jurisdiction-specific stages while keeping the intrinsic coding
of a shared profile fixed.

Reasoning: Materials, science, manufacturing, and fusion differ by experiment,
application, qualification route, route to scale, and commercialization phase.
A fixed whole-sector label or fixed country-neutral DAG would hide that
jaggedness. Hierarchy preserves detail without creating a synthetic average.

## 2026-08-28: Add commercialization fit without collapsing adaptation or distribution

Decision: Add C8 ex ante commercialization conditions to the country-stage
modifiers. C8 may cover demand visibility, business-model incentives,
financing, and routes to commercialization, but not realized adoption, sales,
revenue, productivity, or other downstream outcomes. Keep endogenous demand
feedback, public legitimacy, labor adjustment, ownership, social protection,
political institutions, distribution, and cultural or religious acceptance in
evidence-backed coupling, adaptation, distribution, governance, and scenario
layers rather than S/C composites.

Reasoning: A technically successful R&D stage may still fail to scale or find a
viable demand and financing path. Conversely, demand, standards, procurement,
and reinforcing investment can accelerate conversion. Social and cultural
conditions matter but are sector-specific and time-varying; treating them as a
timeless country trait would invite essentialism and false precision.

## 2026-08-28: Permit economic-regime and pathway topology changes in scenarios

Decision: Add assumption type, economic regime, topology change, distribution
channel, and adaptation channel to the scenario ledger. Stage Citrini
Research's `The 2028 Global Intelligence Crisis` as a candidate stress test,
not a fifth anchor or forecast. Keep v1 to six shared premise dimensions across
the four anchors; staged stress tests map to the same dimensions.

Reasoning: Today's production, labor-income, demand, ownership, and political
relationships need not remain fixed under rapid AI and robotics deployment.
The Citrini scenario is useful because it makes a displacement-and-demand
feedback loop explicit, but its rapid substitution and policy-response
assumptions require independent premise auditing.

## 2026-08-28: Do not run subsequent work packages from the Fable prompts verbatim

Decision: Before WP2, create an owner-reviewable coding worksheet and an
independent-review plan. Correct WP3 so a sector mark shows stage distributions,
not a synthetic whole-sector S profile. Do not automatically activate the three
signposts in WP6 merely because the owner supplied ranges.

Reasoning: The WP2 prompt assumes an attached author-reviewed pilot sheet that
does not exist. The WP3 hover specification contradicts the stage-level unit of
analysis. Signpost ownership and signpost testability are distinct gates.

## 2026-08-28: Build freshness governance now and defer monitoring automation

Decision: Adopt `docs/FRESHNESS_PROTOCOL.md` before WP2. Add `coding_as_of`,
`last_reviewed`, and concrete `revisit_triggers` to the future profile objects,
and equivalent period/review fields to governance, coupling, and scenario
objects. Require a pre-publication freshness check of load-bearing sources.
Triage official releases and verified deployments as evidence leads; treat
anonymous or unattributed social-media claims as `lead_only`. Defer automated
feeds, scheduled scans, and a public freshness dashboard until after the
three-anchor pilot.

Reasoning: The Atlas covers unusually fast-moving technology, policy, and
deployment evidence. Dated provenance and event-triggered review are cheap to
add before schemas exist and expensive to retrofit. Continuous monitoring now
would create noise and workflow overhead before the pilot reveals which
sources actually affect codings. Anthropic's 2026-08-27 Model Hardware Standard
preview illustrates the distinction: it may alter scoped instrument-integration
and experimental-workflow hypotheses, but originating-party proofs of concept
do not establish broad scientific, manufacturing, or commercial conversion.

## 2026-08-29: Freeze the final WP1.5 structural schemas and anchor scopes

Decision: Make `docs/AUTHORITATIVE_DOCS.md` the conflict-resolution manifest
for structural-profile work. Rename S1 to information intensity of the scoped
stage and keep `critical_path_role` separate. Require S3 rationales to address
both marginal attempt cost and attainable throughput. Replace the unmeasured
two-thirds band threshold with a qualitative `predominantly` judgment and
state that the five bands are ordered while entries within them are not
ranked. Add a judgment-free stage taxonomy and a separate coder-submission
table; compute disagreement by S-dimension rather than using one coding range.
Add actor and subnational scope to country modifiers and key governance to
`profile_id`. Freeze the mature-software, discrete-manufacturing NPI/operations,
and tokamak-to-pilot-demonstration scopes for the first coding pass.

Reasoning: These are pre-population integrity corrections, not another method
review. They remove hidden precision, prevent hierarchy and reviewer records
from drifting, avoid forced national averages, and give the three anchors
enough scope to be coded consistently. Later material, application, firm,
subnational, or fusion-pathway differences receive explicit variants rather
than silently changing the frozen profiles.

## 2026-08-29: Freeze display boundaries and the one-review convergence rule

Decision: Limit `review_status=staged` profiles to local or private-lab routes.
Permit `review_status=reviewed` with `coding_status=proposed` or `disputed` in a
public pilot only with `EXPERT-CODED · DRAFT`; canonical approved rows may
render without the draft qualifier. Treat Anthropic MHS initially as C2/C3,
pathway-integration, and governance/assurance evidence rather than an automatic
S1-S5 recoding. Give each work package one primary review, one correction pass,
and a P0/P1-only recheck; backlog P2/P3 findings.

Reasoning: A private prototype can expose method and interface problems before
domain review is complete without presenting staged values as public evidence.
MHS currently changes interfaces and organizational conversion conditions more
directly than intrinsic physical time floors. A severity-based convergence
rule preserves evidence integrity while preventing review from becoming the
project's main output.

## 2026-08-30: Enforce country-modifier pathway referential integrity

Decision: Require every populated `country_stage_modifiers.pathway_id` to
exactly match the `pathway_id` of its referenced `profile_id` in
`stage_profiles.csv`, and fail WP2 validation on any mismatch.

Reasoning: Retaining both fields is useful for explicit exports, but allowing
them to diverge would attach a country condition to the wrong technical route.
This is a referential-integrity clarification, not a change to the frozen
profile method.

## 2026-08-30: Freeze primary V1 lifecycle coding contexts

Decision: Assign each of the 31 pilot profiles the owner-approved primary V1
`lifecycle_phase` used for the first coding pass. This is a coding context, not
a claim that a stage occurs exclusively in one lifecycle phase. Keep
`critical_path_role=not_assessed`; the lifecycle assignment does not establish
binding status. If a stage's intrinsic profile materially differs in another
lifecycle phase, create a versioned profile variant rather than silently
changing the frozen V1 row.

Reasoning: Both model coders need the same bounded stage context before they
apply S1-S5. A declared primary context removes avoidable scope drift while
preserving the method's ability to represent genuinely different lifecycle
variants later.

## 2026-08-30: Normalize reconciliation provenance to role-based seed labels

Decision: Attribute the row-level seed submission to Claude Code using Claude
Opus 5 and the independent submission to Codex using GPT-5.6 at extra-high
reasoning effort. Retain Fable as framework architect, not as a row-level
coder. In reconciliation, replace Fable-specific labels with
`seed_submission_id`, the `seed` submission key, `prefer_seed`, `seed_*` owner
columns, and `seed_submission_v1.csv`; use `missing_seed` for the corresponding
comparison status. Preserve the corrected PR heads and immutable submission
hashes in the review record.

Do not make blank `source_ids` an automatic owner exception on all 155
comparisons. Count the systematic gap and route it only when it materially
affects a load-bearing, low-confidence, scope-sensitive, or disputed judgment.
Treat the repeated S5 boundary-allocation difference as one cross-cutting owner
question: locally contained errors only versus reasonably foreseeable escaped
consequences. Preserve every original value and require a later correction
route rather than silently recoding, averaging, or forcing consensus.

Reasoning: Role-based labels separate framework authorship from actual coding
provenance and prevent a metadata correction from becoming a substantive
recode. Targeted evidence routing keeps the owner workload exception-based,
while a single convention question exposes the systematic S5 disagreement
without manufacturing dozens of duplicate row decisions.

## 2026-08-31: Adopt the delegated owner review and clarify S5

Decision: Adopt the completed 23-row owner-review workbook after verifying it
against the blank review workbook. Record nine `prefer_seed`, seven
`prefer_independent`, four `needs_better_evidence`, two
`needs_domain_review`, and one `preserve_disagreement` dispositions. The seven
rows in the last three categories remain unresolved; no disposition creates an
approved or canonical profile row, and no unresolved row receives a selected
S-value.

S5 includes the direct, reasonably foreseeable consequences of an erroneous
stage output within the frozen pathway and application, up to the next
independent assurance or control boundary. It excludes remote harms that
require a separate downstream failure and excludes jurisdiction-specific
assurance strength or latency, which belong in C6 or the governance overlay.

Treat this as a bounded clarification of the accepted S5 definition, not a
reopening of the M1.5 method gate. Record the post-reconciliation route as
`clarify_S5_then_targeted_S5_adjudication`. Preserve both submissions and all
original S5 values; do not average coders, choose a model globally, or reopen
S1-S4. Carry all 19 affected S5 rows into a targeted adjudication backlog,
including the seven owner-routed S5 decisions and the 12 remaining one-point
audit records.

Reasoning: One consistent boundary rule resolves the cross-cutting method
ambiguity while preserving the row-level evidence and disagreement record.
Source banking and named fusion-domain review remain the next gate because the
owner dispositions do not cure blank canonical source IDs or create directly
comparable observed cases.

## 2026-08-31: Separate fusion source verification from profile adjudication

Decision: Bank the issue #35 Fusion Test pack as a noncanonical internal
source-discovery map. Use stable provisional `fusion-src-*` candidate IDs in
the inventory and staging export; assign canonical source IDs only after a
separate source-register review. Classify each atomic claim as an observed
experimental result, observed facility milestone, official target, company
target, programme announcement, proof of concept, model or scenario estimate,
inference, or commentary. Record S1-S5 source coverage for exactly the 18 frozen
fusion profiles without selecting or recoding any S value.

Keep owner review exception-based: surface the seven promotion/scope exceptions
already routed by the reconciliation inputs plus the HH70 source-description
correction, and leave every owner-decision field blank. Domain review and any S
adjudication remain later gates.

Reasoning: Verifying that a source and locator are real does not establish that
the evidence matches a profile, pathway, lifecycle phase, jurisdiction, or S
dimension. Provisional IDs prevent an inventory from silently becoming the
canonical register, while explicit evidence categories prevent facility
milestones, targets, announcements, and company claims from being promoted as
observed AI or power-plant outcomes.

## 2026-08-31: Type legal status precisely inside the fusion research bank

Decision: Add `observed legal/regulatory status` to the issue #35 research-bank
evidence categories for enacted law, proposed rules, and current regulator
status pages. Keep those legal states explicit and distinct from programme
announcements, observed licence-review outcomes, and each other. Do not change
the global public evidence-basis ontology in this bounded correction pass.

Treat regulatory documents as direct evidence of their legal or procedural
status only. They do not by themselves establish plant-licence review duration,
feedback speed, affordability, throughput, or an intrinsic physical-process
floor. In particular, a rulemaking public-comment interval is not a
plant-licence review duration.

Reasoning: An enacted law and a regulator's current rulemaking page are
observations of legal status, not programme announcements. A bank-local category
corrects that provenance error without silently changing the public method or
turning procedural dates into empirical licensing-performance evidence.

## 2026-09-01: Promote reviewed fusion source identities, not claims

Decision: After verifying merged PR #36 and its exact corrected head
`f1e4b09b7d9bbb39b7cceb351dc93280a0c097d9`, apply issue #37's owner/PM
disposition: promote all 44 already-staged records as reviewed sources, retain
their `fusion-src-*` IDs, and keep `fusion-src-013`/`015` excluded. Preserve
the original 55 canonical records and every banked limitation, tier,
independent-validation status, numerical locator, translation caveat, and
target/programme/company/pathway restriction.

Normalize only the final PRC law and two NRC legal/status records (`004`,
`039`, `040`) to `official_claim_status=not_official_claim`; do not alter the
public evidence-chip ontology. Verified multilingual identity may enter with
a missing translation reviewer, but direct public quotation or load-bearing
translated wording remains blocked pending native-language/specialist review.
Tier-C and company/operator records remain barred from independently observed
empirical use. Preserve the failed STEP refresh as a before-public-use
restriction, not a fabricated fresh verification.

Reasoning: Source identity review is orthogonal to claim, translation, domain,
and profile approval. The source-promotion ledger and note record the gate;
append-only and frozen-input checks replace the old whole-register freeze
without permitting any S, owner, raw-submission, comparison-audit, S5-backlog,
claim/profile, C/governance, or WP2 changes. Domain review and S5 adjudication
remain later, separately authorized work.

## 2026-09-01: Keep fusion domain synthesis separate from adjudication

Decision: After verifying merged PR #38 and its exact source-promotion head
`3c8987175f6975347cc01a768c21d3386ff27cd6` in main, implement issue #39 as
`model_domain_synthesis`: 18 frozen profiles and 90 separate S-dimension
recommendations, using only the already reviewed canonical fusion evidence.
Record the actual Codex Desktop / `gpt-5.6-sol` / `xhigh` runtime provenance.
Preserve both submissions, owner dispositions, all nine empirical gaps, and
the existing 19-row S5 backlog. No recommendation is a score implementation,
named human sign-off, approval, or canonical profile.

Apply the frozen stage boundary to S1, ordinary learning cycles to S2, both
attempt cost and attainable throughput to S3, intrinsic physical floors to
S4, and the owner-approved bounded escaped-consequence rule to S5. Explicitly
mark unverified S5 assurance boundaries as assumptions. Route 19 material
specialist questions and 27 owner exceptions without requiring the owner to
re-review all 90 cells. Proposed technical and jurisdiction variants remain
questions for later scoping, not implemented profiles or country modifiers.

Issue #39's five new domain-review outputs are an explicit exception to the
earlier source-promotion package freeze; retain every original expected hash.
Add a separate gate pinning the complete promoted source register, evidence
bank, immutable coding/owner inputs, method authorities and data/UI trees,
with adversarial tests and exact CSV/workbook agreement checks. No hidden
ordinal average, composite, or production profile is permitted.

Reasoning: Canonical source identity does not establish an observed pilot
outcome, transferability, or a numeric S value. A structured model synthesis
can make technical disagreements and missing evidence reviewable without
manufacturing closure. Submit a draft for one substantive PM review and one
correction pass; targeted S5 adjudication and WP2 remain later gates.

## 2026-09-03: Adopt the bounded PM correction to fusion domain synthesis

Decision: Accept 88 of 90 issue #39 profile-dimension recommendations and
routes unchanged as `recommendation_only`. Correct only construction S2
(`sp-0027/S2`) from 0-2 to a medium-confidence 1/value-change recommendation
and pre-integration tritium/fuel-cycle S2 (`sp-0024/S2`) from 0-1 to a
low-confidence 1 supporting both original coders. Preserve both submitted
zeros for construction, both submitted ones for fuel-cycle development, all
original rationales, owner dispositions, source IDs and protected inputs.
Gap-04 remains open. The PM's official ITER construction-cycle cross-check is
context for the correction, not a canonical source addition; refresh empirical
calibration only through a later source-banking task.

Retain all 19 cell-level specialist questions, grouped into six coordinated
outreach packages. Each blocks `coding_status=approved`,
`review_status=canonical` and unqualified public use. It does not block private
use, staged WP2 construction, or public-pilot display that visibly renders
`EXPERT-CODED · DRAFT` with range, confidence, evidence gaps and review status.
This clarification does not waive source, owner, independent-review, freshness,
disagreement or evidence requirements.

Reasoning: S2 measures the ordinary learn-test-revise cycle inside the frozen
stage. A repeatable major construction work-package loop supports 1 without
using total facility duration, while the missing integrated self-sufficient
fuel-cycle outcome belongs after the frozen pre-integration development loop.
The correction improves scope fidelity and expert-outreach usability without
reopening M1.5, selecting a canonical value, adjudicating S5, or starting WP2.
