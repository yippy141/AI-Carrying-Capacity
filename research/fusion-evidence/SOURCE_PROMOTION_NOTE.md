# Fusion source-record promotion — issue #37

Promotion date: **2026-09-01**. This is source-record review only, not claim,
translation, fusion-domain, S-value, or profile approval.

## Gate and authority

[Issue #37](https://github.com/yippy141/AI-Carrying-Capacity/issues/37) supplies
the owner/PM disposition for all 44 already-staged records, subject to mechanical
checks. Before editing, GitHub confirmed that
[PR #36](https://github.com/yippy141/AI-Carrying-Capacity/pull/36) merged into
`main` at `2026-08-31T16:57:59Z`, as
`081d40e09462eba6938d8c6e3055ccc03e1657d9`, with final head
`f1e4b09b7d9bbb39b7cceb351dc93280a0c097d9`. That head is an ancestor of main;
the fusion-evidence tree on both commits is exactly
`48e79818aed3a0e85a8751a0a2ac44d3d6fcc2fe`. Work began from that current main
on `research/fusion-source-promotion`.

All 15 authoritative inputs listed in the issue were read, including the
authority manifest, data dictionary, profile method, freshness and intake
protocols, canonical source register, six research-bank CSVs, verification
report, owner decisions, and domain-review brief. No superseded Spectrum
proposal supplied authority. The one substantive verification review and its
bounded correction pass were not reopened.

## Disposition and data contract

- Staged source records reviewed: **44**.
- Promoted as `review_status=reviewed`, `placeholder=false`: **44**.
- Deferred/rejected from those 44 staged rows: **0**.
- Previously excluded/deferred candidate sources retained outside canonical:
  **2**, `fusion-src-013` and `fusion-src-015`.
- Canonical register: **55 → 99** records; all original 55 remain byte-for-byte
  unchanged, including six non-evidentiary placeholders.
- ID collisions, duplicate source identities/locators, renumberings, and
  crosswalks: **0** among the promotion set or against the existing register.
- Canonical IDs: `fusion-src-001`–`fusion-src-012`, `fusion-src-014`, and
  `fusion-src-016`–`fusion-src-046`.
- The unchanged claim map references **43** of those promoted IDs; each resolves
  directly. `fusion-src-042` is promoted but not referenced there. No source or
  claim was added to the map merely to improve coverage.

The decision ledger has one row per staged source identity, keyed by
`candidate_source_id`; `canonical_source_id` is identical. It contains no S
values or measurements. Counts are record counts, not independent experiments,
evidence-strength scores, or claim approvals. `date_added` and ledger
`promotion_date` are `2026-09-01`; `last_verified` and `access_date` retain the
bank's `2026-08-31` evidence vintage. The original issue #35 `added_by` and
staging note are preserved, with the old provisional-status text explicitly
labelled historical. Missing dates, archives, and reviewers remain missing.

Nine publication dates/years remain missing; all 44 archive URLs and all 44
translation-reviewer fields remain missing. The latter includes 36 English
sources whose translation note is `not_applicable`. No reviewer is invented.

### Counts among the 44 promoted records

| Dimension | Category | Records |
| --- | --- | ---: |
| Reliability tier | A | 16 |
| Reliability tier | B | 22 |
| Reliability tier | C | 6 |
| Method | `administrative_data` | 10 |
| Method | `corporate_report` | 8 |
| Method | `government_strategy` | 11 |
| Method | `law_or_regulation` | 2 |
| Method | `media_report` | 1 |
| Method | `peer_reviewed_paper` | 12 |
| Independent validation | `independently_validated` | 12 |
| Independent validation | `not_applicable` | 24 |
| Independent validation | `not_independently_validated` | 8 |
| Source verification | `verified_peer_reviewed` | 12 |
| Source verification | `verified_official_primary` | 25 |
| Source verification | `verified_official_secondary` | 1 |
| Source verification | `verified_company_primary` | 6 |

Each dimension totals 44. These classifications are inherited unchanged from
the corrected bank, not new assessments of independent replication.

## Restrictions surviving promotion

Every staged field is preserved exactly except `review_status`, `date_added`,
additive/historically labelled `notes`, and the three directed legal-status
normalizations. Numerical values and their source-specific locators remain
verbatim in `useful_indicators`; this field does not populate the indicator
catalog. Inventory notes, including omitted freshness triggers, are also
carried into canonical notes. The ledger preserves each source limitation and
every source-linked rejected-use reason, permitted limited use, and caveat.

### Translation and regulatory interpretation

Eight non-English records retain their original-language URLs and translation
caveats: Chinese `fusion-src-001`–`fusion-src-006` and `fusion-src-016`, and
German `fusion-src-032`. The Japanese-facility records in this staged set are
English sources, not Japanese translations.

For all eight: **direct public quotation or load-bearing translated wording
remains blocked until the stated native-language/specialist review is
completed**. Technical Chinese wording needs an appropriate engineering
specialist; the PRC law needs a qualified Chinese legal/regulatory reviewer;
the German discharge/metric distinctions need native-language fusion review.
Canonical source identity does not approve translation or legal interpretation.

`fusion-src-004`, `fusion-src-039`, and `fusion-src-040` alone change
`official_claim_status` to `not_official_claim`. Their methods remain
`law_or_regulation`, `law_or_regulation`, and `administrative_data`, respectively.
The final PRC law's Articles 14/39/62, the warning about final Article 37 and
earlier draft numbering, the NRC proposed-rule status, and the regulator-page
vintage all remain intact. A 90-day rulemaking comment interval is not a
plant-licence review duration. Legal status does not establish completed
licensing, throughput, affordability, or a jurisdiction-free S profile. The
research-bank legal category and global public evidence-chip ontology do not
change.

### Company, operator, target, and scope limits

The six tier-C records (`012`, `029`, `031`, `042`, `043`, `044`, all with the
`fusion-src-` prefix) remain `not_independently_validated`, as do tier-B
`fusion-src-005` and `fusion-src-011`. They may document attributed source
statements but cannot masquerade as independently observed empirical outcomes.
Source-level review does not approve company targets, reported milestones,
operator data, or media repetition as independent evidence. Existing tier and
commentary blocks remain; downstream source checks additionally enforce the
attribution and target/legal-status distinctions without changing the UI.

HH70's research-device first plasma, engineering paper, low-parameter pulse,
and excluded AI-causation source remain distinct. Neither a roughly two-year
research-device build nor a long pulse establishes a power-plant construction
floor, AI causation, net energy, commercial reliability, or availability.
`fusion-src-013` remains excluded for unvalidated company AI causation;
`fusion-src-015` remains excluded for a first-party milestone lacking the
required independent experimental source. The **11** rejection/defer records
are not 11 excluded source identities: other entries reject particular
wordings, metrics, extrapolations, or methods while allowing limited use.

All pathway/lifecycle restrictions survive: stellarators are contrasts, not
silently pooled with the frozen tokamak pathway; component manufacture is not
plant completion; research commissioning is not nuclear/tritium commissioning;
design/target dates are not completed operation or grid export. MPEX is not a
fusion-spectrum neutron source. IFMIF-DONES remains under development, with
multi-year design targets, material-specific matching limits, and downstream
post-irradiation examination, not a completed accepted qualification dataset.
HEAT-ML remains a geometry-specific calculation proof of concept. Rejected
superlatives, compressed percentages, purported completed IAEA standards, and
generic industrial-scale extrapolations remain rejected. No suitable source
located in a bounded search is not evidence of absence.

### Freshness checks

Promotion-date checks on `2026-09-01` confirmed the banked status on the
[PPPL NSTX-U page](https://www.pppl.gov/nstx-u),
[CFS technology page](https://www.cfs.energy/technology/), and
[NRC rulemaking page](https://www.nrc.gov/materials/fusion/rulemaking-status).
Respectively, these remain mutable project status, company target/construction
status, and proposed-rule/draft-guidance status, not new outcome evidence.

The specifically flagged [STEP page](https://step.ukaea.uk/about/) could not be
refreshed: web retrieval timed out twice, and direct HTTPS retrieval failed
certificate validation because the certificate had expired. No certificate
check was bypassed. Its verified identity is promoted from the corrected
PR #36 bank; the last successful verification remains `2026-08-31`. A successful
original-page refresh remains required before public use or load-bearing use
of its current target wording. This restriction appears in both its canonical
notes and decision row. No claim vintage or research-bank source was silently
rewritten on the basis of an unsuccessful refresh.

## Unchanged claims, profiles, and next gate

No S1–S5 value, owner disposition, raw coding submission, 155-row comparison
audit, 19-row targeted S5 backlog, profile coding/review status, C1–C8 field,
governance row, UI, figure, scenario, or sector module changes. No canonical
data object other than the source register is populated. The full original
fusion bank and Structural Profiles pilot inputs are hash-protected; the
unchanged coverage file retains its 18 profiles and 90 coverage cells.

All nine load-bearing gaps remain open: experiment selection; completed
materials qualification; combined-environment plasma-facing components;
integrated tritium/fuel cycle; qualified integrated blanket; AI-shortened
nuclear/tritium commissioning; commercial reliability/availability; comparable
completed fusion licensing; observed fusion grid export. Source-ID resolution
does not close any of these evidence gaps or fill blank profile source IDs.

The draft PR requires one bounded source-promotion review and merge before the
existing 18-profile fusion domain-informed review and separate S5-only
adjudication. Neither review, adjudication, nor WP2 implementation begins here.
The issue-specific source/data freeze must be explicitly retired or replaced
under the next authorized package, not bypassed by refreshing hashes.

## Validation

All local CI checks passed:

```text
npm ci
npm run typecheck
npm run lint
npm run test:evidence
npm run build
npm run test:design
python3 -m unittest scripts/validate_adoption_depth_test.py scripts/validate_design_placeholders_test.py scripts/validate_structural_profiles_worksheet_test.py scripts/validate_fusion_evidence_test.py scripts/validate_fusion_source_promotion_test.py
python3 scripts/validate_structural_profiles_worksheet.py
python3 scripts/validate_structural_profiles_reconciliation.py
python3 scripts/validate_fusion_evidence.py
python3 scripts/validate_fusion_source_promotion.py
python3 scripts/validate_adoption_depth.py
python3 scripts/validate_repo.py
python3 scripts/validate_source_register.py
python3 scripts/validate_source_register.py research/fusion-evidence/staged_source_register_additions_v1.csv
python3 scripts/validate_indicator_catalog.py
python3 scripts/check_launch_readiness.py --mode private-preview
git diff --check
```

The combined Python suite passed **43 tests**, including **15** promotion and
source-guard regression tests; evidence tests passed **8/8**. The workbook
tests/validators used bundled Python **3.12.13** with CI-pinned
`openpyxl==3.1.5`; hosted CI retains its Python **3.12.5** pin. Node was
**22.19.0**. The first sandboxed build could not fetch Google Fonts; a
network-enabled rerun passed without changing fonts or UI. The existing
non-failing Turbopack broad-file-trace and Node module-type warnings remain.
The generated `next-env.d.ts` build-only change was restored before commit.

Private-preview validation exits successfully while reporting the same **59**
pre-existing public-launch blockers; this task does not clear them. Hash
checks confirm the pre-promotion source rows, other canonical data, original
fusion bank, and full pilot/reconciliation inputs are unchanged. The draft PR
triggers the complete hosted CI workflow, including the new promotion tests
and validator; its result is reported with the PR handoff.
