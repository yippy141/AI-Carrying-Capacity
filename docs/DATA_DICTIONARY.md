# Data Dictionary

Status: V0 evidence-infrastructure schema. Schemas may still change after reviewed source promotion.

## `data/sources/source_register.csv`

Canonical register for reviewed sources. Placeholder rows are non-evidentiary.

| Field | Meaning |
| --- | --- |
| source_id | Stable ID, e.g. `src-0001`. |
| title_original | Original title. |
| title_english | English title or translation. |
| authors_org | Author, institution, or publisher. |
| year | Publication year or `missing`. |
| publication_date | Exact publication date when available. |
| access_date | Date the source was accessed. |
| last_verified | Date the row was last checked. |
| archive_url | Archive link or `missing`. |
| language | Source language. |
| source_type | Law, dataset, paper, report, survey, commentary, media, etc. |
| method_type | Structured source method type. |
| claim_owner | Entity making the claim, if any. |
| official_claim_status | Whether the source contains an official claim or statistic. |
| independent_validation_status | Whether the claim has independent validation. |
| url_or_doi | Link, DOI, or archival reference. |
| original_language_url | Original-language URL when translation is involved. |
| translation_reviewer | Reviewer for non-English interpretation. |
| translation_note | Caveat about translation or terminology. |
| reliability_tier | `A`, `B`, `C`, `D`, or `E`; see `docs/METHOD.md`. |
| geo_scope | Country, region, city, global, or other scope. |
| sector_scope | Sector coverage. |
| key_claims | Main claims relevant to this project. |
| useful_indicators | Candidate indicators supported by the source. |
| limitations | Known caveats, bias, incompleteness, or comparability problems. |
| date_added | Date row was added. |
| added_by | Person or agent adding row. |
| review_status | `staged`, `reviewed`, `needs-check`, `rejected`, or `placeholder`. |
| placeholder | `true` only for non-evidentiary scaffold rows. |
| notes | Extra notes. |

Allowed `method_type` values:

- `official_statistics`
- `law_or_regulation`
- `government_strategy`
- `administrative_data`
- `survey`
- `dataset`
- `peer_reviewed_paper`
- `working_paper`
- `think_tank_report`
- `corporate_filing`
- `corporate_report`
- `media_report`
- `expert_commentary`
- `model_estimate`
- `placeholder`

Allowed `official_claim_status` values:

- `not_official_claim`
- `official_target`
- `official_program_claim`
- `official_observed_statistic`
- `mixed`
- `placeholder`

Allowed `independent_validation_status` values:

- `independently_validated`
- `partially_validated`
- `not_independently_validated`
- `not_applicable`
- `unknown`
- `placeholder`

## `data/indicators/indicator_catalog.csv`

Canonical register for candidate and approved indicators.

| Field | Meaning |
| --- | --- |
| indicator_id | Stable ID, e.g. `ind-0001`. |
| concept | Concept measured. |
| pillar | Frontier access, conversion capacity, diffusion speed, adaptation stress, distribution quality, or realized outcomes. |
| possible_metric | Metric description. |
| unit | Unit of measurement. |
| source_ids | Semicolon-separated source IDs from the source register. |
| coverage | Geographic, sectoral, and temporal coverage. |
| update_frequency | Known update cadence. |
| data_quality | `high`, `medium`, `low`, or `missing`. |
| directionality | Whether higher is better, worse, mixed, or context-dependent. |
| normalization | Candidate normalization method. |
| missingness_policy | How missing values should be represented. |
| missing_reason | Why a value is missing. |
| attribution_strength | Strength of the causal or descriptive link. |
| input_output_role | Whether the indicator is an input, process, output, outcome, stress, distribution, or context measure. |
| evidence_label | observed, official-claim, qualitative-coded, estimated, or missing. |
| qualitative_coding | Rubric or coding note when `evidence_label` is qualitative-coded. |
| score | Candidate score or `missing`; accepted only with source IDs or explicit qualitative coding. |
| placeholder | `true` only for non-evidentiary scaffold rows. |
| notes | Extra notes. |

Allowed `missing_reason` values:

- `not_reviewed`
- `not_available`
- `not_comparable`
- `not_applicable`
- `confidential`
- `not_yet_measured`
- `source_unverified`
- `placeholder`

Allowed `attribution_strength` values:

- `descriptive`
- `before_after`
- `comparison_group`
- `quasi_causal`
- `causal`
- `model_based`
- `speculative`
- `not_applicable`
- `placeholder`

Allowed `input_output_role` values:

- `input`
- `process`
- `output`
- `outcome`
- `stress`
- `distribution`
- `context`
- `placeholder`

## `data/claims/claim_ledger.csv`

Canonical register for claims that may appear in public writing or product UI.

| Field | Meaning |
| --- | --- |
| claim_id | Stable ID, e.g. `claim-0001`. |
| claim | The exact claim being considered. |
| claim_type | Descriptive, causal, predictive, normative, comparative, or methodological. |
| evidence_type | observed, official-claim, qualitative-coded, estimated, commentary, or mixed. |
| source_ids | Source IDs supporting the claim. |
| counterevidence_source_ids | Source IDs that complicate or oppose the claim. |
| confidence | high, medium, low, or unknown. |
| geography | Relevant country, region, or global scope. |
| sector | Relevant sector or cross-cutting module. |
| product_use_status | staged, approved, needs-caveat, rejected, or published. |
| caveat | Required qualification if the claim is used. |
| owner | Person or agent responsible for review. |
| last_reviewed | Date of last review. |
| notes | Extra notes. |

## Evidence Values

Any future scored or coded dataset should include:

- `evidence_label`: observed, official-claim, qualitative-coded, estimated, or missing.
- `source_id`: source register reference.
- `confidence`: high, medium, low, or unknown.
- `missing_reason`: why a value is missing.
- `attribution_strength`: how strong the link is between AI and the measured outcome.
- `notes`: caveats and interpretation.

## Validation Rules

- Wikipedia is not allowed as a source.
- Placeholder rows are valid only as non-evidentiary scaffolding.
- Empirical indicators cannot use tier `C`, `D`, `E`, expert-commentary, or placeholder sources.
- `realized_outcomes` indicators cannot use `input_output_role=input`.
- Official claims cannot be rendered as observed outcomes.
- Missing indicators need a structured `missing_reason`.
