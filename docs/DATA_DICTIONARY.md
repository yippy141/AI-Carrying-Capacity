# Data Dictionary

Status: scaffold. Schemas may change after research synthesis.

## `data/sources/source_register.csv`

Canonical register for reviewed sources.

| Field | Meaning |
| --- | --- |
| source_id | Stable ID, e.g. `src-0001`. |
| title_original | Original title. |
| title_english | English title or translation. |
| authors_org | Author, institution, or publisher. |
| year | Publication year. |
| language | Source language. |
| source_type | Law, dataset, paper, report, survey, commentary, media, etc. |
| url_or_doi | Link, DOI, or archival reference. |
| reliability_tier | `A`, `B`, `C`, `D`, or `E`; see `docs/METHOD.md`. |
| geo_scope | Country, region, city, global, or other scope. |
| sector_scope | Sector coverage. |
| key_claims | Main claims relevant to this project. |
| useful_indicators | Candidate indicators supported by the source. |
| limitations | Known caveats, bias, incompleteness, or comparability problems. |
| date_added | Date row was added. |
| added_by | Person or agent adding row. |
| review_status | `staged`, `reviewed`, `needs-check`, or `rejected`. |
| placeholder | `true` only for non-evidentiary scaffold rows. |
| notes | Extra notes. |

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
| evidence_label | observed, official-claim, qualitative-coded, estimated, or missing. |
| qualitative_coding | Rubric or coding note when `evidence_label` is qualitative-coded. |
| score | Candidate score or `missing`; accepted only with source IDs or explicit qualitative coding. |
| placeholder | `true` only for non-evidentiary scaffold rows. |
| notes | Extra notes. |

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
- `notes`: caveats and interpretation.
