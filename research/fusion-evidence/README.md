# Fusion evidence bank

This folder is the issue #35 first-pass source inventory for **The Fusion Test — Evidence Pack for Frontier Is Not Fate**. The banked pack has a research cut-off of **2026-08-12**. It is an internal synthesis and source-discovery map, not a canonical evidence source.

## What was done

Every candidate in the pack's prioritized source register was checked against an original publisher page, official document, company primary page, or DOI. Chinese claims were checked against original-language primary sources first. The resulting inventory keeps these categories separate: observed experimental result, observed facility milestone, official target, company target, programme announcement, proof of concept, model or scenario estimate, inference, and commentary.

The outputs do not alter the canonical source register. `staged_source_register_additions_v1.csv` contains only provisional candidate IDs and `review_status=staged`; it is a review queue, not a promotion. Rejected or deferred claims remain visible in `rejected_and_deferred_sources_v1.csv`, including valid sources that do not support the pack's stronger wording.

## Why source verification is separate from S adjudication

A real source can still be irrelevant to a profile, mismatched to a lifecycle phase, or unable to support a particular S dimension. Source verification answers whether the document, metadata, claim wording, and locator are real. Domain review determines whether that evidence is technically transferable. Only a later S-adjudication gate may select or recode an S1-S5 value. No S value or owner disposition is changed here.

## Files

- `fusion_test_evidence_pack_2026-08-12.md`: losslessly banked internal pack with a provenance header.
- `source_inventory_v1.csv`: candidate-by-candidate verification and promotion recommendation.
- `claim_source_map_v1.csv`: atomic profile/S-dimension claim mappings, including explicit missingness.
- `profile_evidence_coverage_v1.csv`: exactly 18 frozen fusion profiles with S1-S5 coverage statuses, load-bearing claims, maturity, missingness, and next actions.
- `staged_source_register_additions_v1.csv`: schema-compatible, noncanonical staging rows.
- `rejected_and_deferred_sources_v1.csv`: rejected wording, scope errors, and deferred sources with permitted limited uses.
- `refresh_and_change_log_v1.csv`: load-bearing freshness changes after the cut-off and verification corrections.
- `fusion_source_review_v1.xlsx`: owner-facing workbook; only genuine exceptions are surfaced by default and no approval field is prefilled.
- `VERIFICATION_REPORT.md`: counts, unresolved gaps, material changes, and the next gate.

## Owner exceptions only

The owner is not asked to inspect every uncontested source. The workbook surfaces only seven claim-level exceptions already routed by the authoritative reconciliation inputs: materials-qualification S2/S4 promotion scope, licensing S2/S3/S5 regulatory review, and grid-integration S3/S4 review. A separate HH70 source-characterization correction is shown as a source exception; it does not ask for S adjudication.

## Exact next gate

Review the proposed staging rows for source-register promotion and obtain native-language or regulatory review only where the exception queue says it is load-bearing. After promotion decisions, run the already-planned 18-profile fusion domain review. S adjudication remains a later, separate gate.
