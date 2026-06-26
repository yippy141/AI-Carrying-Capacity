# Red-Team Review

Status: V0 internal audit.

Date: 2026-06-26.

Scope reviewed:

- `docs/AGENT_BRIEF.md`
- `docs/METHOD.md`
- `content/methodology/v0.md`
- `content/essays/launch-draft.md`
- `content/country-briefs/china.md`
- `content/country-briefs/united-states.md`
- `content/sector-briefs/manufacturing-robotics.md`
- `content/sector-briefs/compute-energy.md`
- `research/deep-research/2026-06-26-v0-consolidated-synthesis.md`
- `research/source-register/2026-06-26-v0-deep-research-source-register-additions.csv`
- `research/source-register/2026-06-26-v0-deep-research-indicator-candidates.csv`
- `data/sources/source_register.csv`
- `data/indicators/indicator_catalog.csv`
- `data/processed/v0_visual_system.json`
- `components/visuals/ScenarioSimulator.tsx`
- `app/page.tsx`
- `app/scenarios/page.tsx`

This review is based on local repo contents. It does not independently verify external URLs, DOIs, source claims, translations, or current facts.

## Bottom Line

The project is directionally disciplined: it explicitly rejects a generic AI readiness index, keeps China-US advantage hypothesis-first in the core methodology, uses missing labels, and separates frontier access, conversion capacity, adaptation capacity, distribution quality, and realized outcomes.

The main risk is not the conceptual frame. The main risk is that V0 visuals, launch copy, and staged research artifacts could look more evidence-backed than they are. The product should not launch as an evidence product until staged sources are converted into canonical, URL/DOI-verified source rows and the UI makes official claims, missing values, and expert commentary unmistakable.

## Checklist Response

| Check | Assessment | Fix |
| --- | --- | --- |
| 1. Novelty overclaim? | Moderate risk. The draft says the index ecosystem leaves a "genuine gap" and the launch draft uses strong strategic framing. That is defensible but could sound like the project invented conversion or diffusion analysis. | Reframe novelty as an applied synthesis and visual diagnostic built from absorptive-capacity, GPT, diffusion, readiness-index, energy, and industrial-policy literatures. Cite adjacent work before claiming the gap. |
| 2. Assumes China has higher conversion capacity? | Low-to-moderate risk in method docs, higher risk in some synthesis language. Core files say "hypothesis," but phrases like "China likely does better" in research drafts and visual labels like "AI+ deployment machinery hypothesis" may be read as a leaning conclusion. | Pair every China-conversion hypothesis with the counter-hypothesis and required falsification evidence. Avoid "likely does better" in public copy until canonical evidence supports it. |
| 3. Separates inputs from outcomes? | Mostly yes. The five-layer model is strong. Risk remains in visuals and indicators where robot scale, public platform scale, or AI+ program activity might be perceived as outcomes. | Add validation and UI rules that prevent input or official-program indicators from appearing inside realized-outcome panels unless outcome evidence is explicitly present. |
| 4. Separates official claims from observed evidence? | Conceptually yes, operationally incomplete. Evidence labels exist, but reliability tier `A` for an official source can still make an official target look strong. | Add fields for `claim_owner`, `official_claim`, `independent_validation_status`, and `observed_outcome`. Show these in source cards, not only in CSVs. |
| 5. Uses non-English sources? | Yes in staged rows: Chinese, Japanese, Korean, German, French, Spanish, Arabic, and Hindi appear. Verification is not yet sufficient. | Add native-title, translated-title, translator/reviewer, source-language URL, and translation notes before canonical merge. |
| 6. Avoids Wikipedia? | No Wikipedia source was visible in reviewed files. | Add a validator that rejects source URLs with `wikipedia.org` and flags copied Wikipedia-style summaries. |
| 7. Marks missing data clearly? | Yes, but missingness is too coarse. `missing` can mean unreviewed, unavailable, incomparable, confidential, or not applicable. | Split missingness into `not_reviewed`, `not_available`, `not_comparable`, `not_applicable`, `confidential`, and `not_yet_measured`. |
| 8. Avoids fake-precise rankings? | Mostly yes. No single national score is present. Risk remains from watch levels, country comparison layouts, and scenario match counts. | Remove ordinal-looking labels unless defined. Avoid sorting countries by status. Use "constraint to test" and "evidence gap" language. |
| 9. Scenario simulator looks like forecast? | Moderate risk. It says "does not forecast winners," but the UI still chooses a "nearest staged pattern" and displays a match count. | Rename to "scenario assumption browser," remove or de-emphasize match counts, show multiple matching patterns, and add an always-visible "not a forecast" label in the result card. |
| 10. Substack/LessWrong labeled as commentary? | Partly. Expert commentary rows are source type `expert_commentary` and tier `D`, but the schema does not enforce how they can be used. | Validator should block `expert_commentary` and tier `D` sources from supporting empirical indicator values. Allow them only for scenario framing or explicit commentary sections. |
| 11. Other flags? | Yes: source verification, causal attribution, subnational bottlenecks, multilingual QA, and source freshness are the biggest additional risks. | Treat these as launch blockers or post-launch research work depending on whether claims are public-facing. |

## Critical Issues

| ID | Risk or weakness | Why it matters | Evidence in repo | Proposed fix |
| --- | --- | --- | --- | --- |
| C1 | Staged sources are not publishable evidence yet. | Many source-register additions have `url_or_doi` set to `missing`; deep-research citations include transient research citation markers rather than canonical public links. | `research/source-register/2026-06-26-v0-deep-research-source-register-additions.csv`; canonical `data/sources/source_register.csv` still contains only placeholder rows. | Do not publish country, sector, or scenario claims as source-backed until URLs/DOIs, publication dates, access dates, and source files are verified and promoted into `data/sources/source_register.csv`. |
| C2 | Public UI may overstate staged material. | Staged visual JSON is useful internally, but rendered country comparisons and source chips can look like evidence-backed findings. | `data/processed/v0_visual_system.json`; `app/page.tsx`; `components/visuals/ScenarioSimulator.tsx`. | Add a public-facing "staged, not reviewed" banner on every visualization that uses staged JSON, or hide those visuals from public launch until source promotion. |
| C3 | Official claims can appear stronger than observed evidence. | An official policy document may be reliability tier `A` as a source, while the claim it supports is still unvalidated. Readers may confuse source authenticity with outcome validity. | China, Korea, Singapore, India, and Germany visual states use `official-claim`; many official policy sources are tier `A`. | Separate source reliability from claim validation in both schema and UI. Require independent validation before any official program count appears as an outcome. |
| C4 | China-conversion hypothesis could leak into conclusion. | The project promise is to test whether China converts better in selected domains, not to assume it. | `content/methodology/v0.md` is careful; research drafts include stronger language such as "China likely does better" in comparator synthesis. | Public copy should use "hypothesis to test" language consistently. Create a China-US claim ledger with pro, contra, required evidence, and current status for each domain. |
| C5 | Inputs and outcomes are separated in theory but fragile in implementation. | Robot density, smart-factory counts, platform users, public compute, and AI+ program targets can easily be mistaken for realized outcomes. | Indicator candidates include input, diffusion, and outcome fields, but no automated guard prevents misuse in views. | Add a validator that prevents indicators with `pillar` values other than `realized_outcomes` from rendering in outcome panels. Add a second check for `official-claim` outcomes. |
| C6 | Missingness is visible but underspecified. | "Missing" is honest, but it does not tell readers whether data are absent, unreviewed, non-comparable, confidential, not applicable, or just not yet scraped. | Method docs and staged JSON use one broad `missing` label. | Add `missing_reason` and `comparability_note` fields. Render missingness reasons in country and sector views. |
| C7 | The scenario simulator can still read as a forecast. | "Nearest staged pattern" plus a match count creates an algorithmic result, even with caveats. Users may infer probabilities or winners. | `components/visuals/ScenarioSimulator.tsx` ranks cases by matched assumptions and shows `{matchCount} of {controls.length}`. | Rename it to an assumption browser, remove ranking language, show all plausible patterns or a manually selected explainer, and put "not a forecast; no probabilities" inside the result panel. |
| C8 | Fake ordinal signals may emerge from watch labels. | `primary-watch`, `secondary-watch`, and `open-question` look like relative severity ratings without a documented rubric. | `data/processed/v0_visual_system.json` bottleneck items. | Replace with non-ordinal labels or define a rubric. If labels remain ordinal, document coding criteria and uncertainty. |
| C9 | Expert commentary controls scenarios but could bleed into empirical claims. | Substack, LessWrong-style essays, and named expert commentary are useful, but they are not empirical evidence unless they include data or formal methods. | Source rows `src-v0-dr-039` and `src-v0-dr-040` are commentary and tier `D`. | Enforce source-use rules in validators: commentary can support scenario assumptions and interpretive context only, not indicator values or observed findings. |
| C10 | Non-English source use is staged, not validated. | The project promises multilingual research. Rows show non-English sources, but no translation QA or native-language verification workflow is visible. | Staged source rows include Chinese, Japanese, Korean, German, French, Spanish, Arabic, and Hindi. | Add multilingual QA fields: original URL, native title, translated title, language, translator/reviewer, translation note, and quote/excerpt location. |
| C11 | Causal attribution is underdeveloped. | Productivity, scientific output, public-service quality, and military capability are affected by many non-AI variables. Without attribution labels, the Atlas may imply AI caused changes that merely coincided with AI adoption. | Indicator candidates include manufacturing productivity, public-sector ROI, scientific conversion output, and military deployment. | Add `attribution_strength` labels: descriptive, before-after, comparison group, causal/quasi-causal, model-based, or speculative. Do not call broad outcomes AI outcomes without an attribution note. |
| C12 | Source freshness and versioning are not strict enough. | AI policy, model access, chip rules, energy queues, and public programs change quickly. Year ranges like `2025-2026` are insufficient for launch claims. | Many staged rows use year ranges and missing URLs. | Add `publication_date`, `access_date`, `version`, `archive_url`, and `last_verified` fields before canonical source promotion. |

## Moderate Issues

| ID | Risk or weakness | Why it matters | Proposed fix |
| --- | --- | --- | --- |
| M1 | Novelty framing may overclaim the gap. | Existing literatures already cover absorptive capacity, diffusion, GPT complements, readiness, and innovation systems. | Say the Atlas applies and operationalizes these literatures for AI-era country-sector conversion, rather than discovering conversion as a new construct. |
| M2 | Country pages can become national profiles by stealth. | Even without a single score, users may read country profile summaries as national verdicts. | Keep country pages module-first. Add "sector/constraint coverage" and "unsupported outside these modules" labels. |
| M3 | Scale and intensity can be conflated. | China may dominate absolute robot installations; Korea may dominate density; the U.S. may dominate frontier platforms; India may dominate population-scale channels. These are different claims. | Show absolute, per-worker, per-firm, per-GDP, and sector-normalized views separately. Never choose one as the default "winner" view. |
| M4 | Adaptation capacity is too broad. | Labor retraining, legal remedies, social trust, grid absorption, and legitimacy are different mechanisms. | Break adaptation into labor adjustment, institutional remedy capacity, infrastructure adaptation, and public legitimacy. |
| M5 | Distribution quality may be too late in the pipeline. | Distribution is currently treated after adaptation, but distribution can shape legitimacy and conversion speed from the beginning. | Show distribution checks next to adoption and outcome charts, not only as a final layer. |
| M6 | Public tolerance can be misread as consent. | High acceptance, low complaint visibility, or state enforcement do not equal legitimacy or welfare. | Split public attitudes, remedy access, contestability, enforcement, and censorship/feedback constraints where relevant. |
| M7 | Official strategies from different political systems are not comparable in the same way. | A U.S. OMB memo, a Chinese State Council opinion, and a Singapore strategy do not imply the same implementation capacity or transparency. | Add a policy-instrument taxonomy and implementation-evidence field. |
| M8 | Compute-energy module risks national aggregation. | The methodology says local load pockets matter, but public copy may drift back toward country-level electricity comparisons. | Use grid-region or load-pocket units wherever possible. Country summaries should aggregate only after showing local constraints. |
| M9 | Security and military conversion evidence is likely too opaque for V0. | Open-source signals are weak and easily politicized. | Keep security as a low-confidence watch layer unless anchored in open budgets, doctrine, procurement, fielded systems, or audited outcomes. |
| M10 | Case studies can overrepresent successful deployments. | Vendor, government, and showcase factory examples are likely selected for success. | Require case cards to include source owner, baseline, denominator, failed deployments if available, and selection-bias warning. |
| M11 | Data availability can bias conclusions toward countries with transparent statistics. | The U.S. and EU may look worse because problems are visible, while less transparent systems may look cleaner. | Add a transparency/observability note to every country-module page and avoid penalizing visibility as weakness. |
| M12 | The source register lacks enough distinction between empirical datasets, modeled estimates, and policy synthesis. | All can be reputable, but they support different kinds of claims. | Add `method_type`: administrative data, survey, model estimate, legal text, strategy, case study, expert commentary, corporate filing, or media report. |

## Nice-To-Have Improvements

| ID | Improvement | Benefit |
| --- | --- | --- |
| N1 | Add a claim ledger view to the site. | Lets readers see every China-US hypothesis, current evidence state, source trail, and falsification condition. |
| N2 | Add "what would change our mind" boxes. | Makes the project visibly hypothesis-testing rather than advocacy. |
| N3 | Add source cards with human-readable caveats. | Source IDs alone are not enough for readers; cards should show title, source type, evidence label, review status, and limitations. |
| N4 | Add a visual distinction between "missing because not reviewed" and "missing because no data exists." | Reduces the chance that missing data is interpreted as weak performance. |
| N5 | Add comparator-specific "why included" notes. | Prevents Japan, Korea, Germany, Singapore, and India from being read as a league table. |
| N6 | Add failed or stalled AI deployment examples. | Success-only case studies will distort the conversion picture. |
| N7 | Add sensitivity notes for future aggregates. | If any aggregate is ever introduced, users should see how conclusions change under different weights and missingness assumptions. |
| N8 | Add archive links for volatile policy and corporate sources. | Protects the source trail from link rot and silent revisions. |

## Launch Blockers

These should be fixed before any public launch that presents the Atlas as evidence-backed rather than a scaffold.

1. Canonical source register still contains only placeholders.
   - Fix: verify and promote source rows with URLs/DOIs, publication dates, access dates, and review status.

2. Staged deep-research citation markers are not public citations.
   - Fix: replace transient citation markers with canonical source links, DOIs, or archived official documents.

3. Official claims are not visually separated enough from observed evidence.
   - Fix: add stronger UI labels and schema fields for official claim versus independent validation.

4. Scenario simulator can look algorithmic and forecast-like.
   - Fix: rename, redesign, and remove ranking/match-count presentation before public launch.

5. Non-English sources are present but not QA-reviewed.
   - Fix: add multilingual verification fields and review at least the sources supporting public claims.

6. Missingness is too coarse for publication.
   - Fix: add missing-reason taxonomy and render it.

7. No automated guard blocks commentary or official-policy sources from supporting empirical values.
   - Fix: extend validation scripts to enforce source-use rules.

8. China-US public copy needs a final bias pass.
   - Fix: ensure every China or U.S. advantage statement is framed as observed, official-claim, qualitative-coded, estimated, missing, or hypothesis pending evidence.

## Post-Launch Improvements

1. Build a country-sector indicator value schema with source-level provenance, missingness reasons, attribution strength, and uncertainty notes.

2. Add a source verification workflow for multilingual documents, including translation notes and archived copies.

3. Create a public claim ledger for high-salience claims such as "China converts faster in manufacturing" or "U.S. frontier access converts into durable advantage."

4. Add subnational modules for compute-energy load pockets: PJM, ERCOT, Northern Virginia, Chinese compute hubs, Japan metro constraints, Korea capital-region constraints, Singapore land/power limits, and India regional reliability.

5. Add case-study templates that include baseline, intervention, measured change, source owner, denominator, selection-bias warning, and distribution note.

6. Add a source observability adjustment so transparent countries are not penalized merely because bottlenecks are easier to see.

7. Add recurring update checks for chip controls, data-center policy, grid queues, AI regulations, and national AI strategies.

8. Add a methodology appendix on causal attribution and lags for productivity, labor, science, public services, and security outcomes.

9. Add a sensitivity framework before introducing any aggregate, even a module-level summary.

10. Add tests that fail if any public-facing component renders a source-backed claim from placeholder, staged, missing-URL, tier `D`, or expert-commentary rows.

