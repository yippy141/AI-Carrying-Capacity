# Structural Profiles reconciliation — v1

## Input provenance and stop-condition verification

- Branch base: `c2a5c53d586cecad4d137d459b78d432b9104870` (`main` at branch creation).
- Seed submission: draft PR #33 head `3bc7e1d3e16d507fe7374ae66a3af6eace519ca4`; CI completed successfully at 2026-08-30T14:25:05Z.
- Independent submission: draft PR #32 head `86dbff4aab694d413a33d3c4a8b0d28047d73c2f`; CI completed successfully at 2026-08-30T14:29:20Z.
- Seed coder: Claude Code / Claude Opus 5 (`claude-opus-5`), role `seed_proposer`.
- Independent coder: Codex / GPT-5.6 (`gpt-5.6`), role `independent_coder`, reasoning effort `extra_high`.
- Fable is credited as framework architect and is not credited as either row-level coder.
- Seed raw CSV SHA-256: `9723a3c3a006b701fed3d000f77d89379610bc51f85eff3555b696078708e675`.
- Independent raw CSV SHA-256: `4176afa878a850d7155a95772884bec72756353440b588f30e5414a37acdb973`.
- Seed 155-value projection SHA-256: `1c3666348097def3bb89328ca71007827d42cecfc0cba9073e3df9692d9fdd34`; rationale projection SHA-256: `3b017d3b5add8914ab530a13c80cbdeabf4cb3910d8f0215b77289123cf25123`.
- Independent 155-value projection SHA-256: `915d4af9e7eb279b3926d97c541ecacb403936e822a7868ca1c2ae6820f2bc33`; rationale projection SHA-256: `5040d0a154571c847d0ae7a113dbed9eed3d68f669651416343b878d810b7d0c`.
- Field-level comparison against the first substantive commits confirms that both correction commits changed metadata only: no S-value or rationale changed.
- Each workbook independently matched its CSV across all 17 canonical review fields; each had 31 profiles in frozen order, valid 0–4 integers, matching frozen scope, present provenance/rationales/dates/status/confidence, no formulas or prohibited derived fields, and blank-but-permitted source IDs.

The two normalized CSVs are immutable byte copies read directly from those recorded heads. The seed-specific workflow normalization changes names and provenance labels only; it does not reinterpret or recode either submission.

## Comparison counts

| Comparison status | Count |
| --- | ---: |
| `exact_agreement` | 96 |
| `one_point_difference` | 57 |
| `difference_ge_2` | 2 |
| `missing_seed` | 0 |
| `missing_independent` | 0 |
| `missing_both` | 0 |
| **Total** | **155** |

Owner-routed exceptions: **23**. Exact and one-point rows remain audit-only unless one of the recorded semantic triggers requires owner disposition. Trigger counts below are non-exclusive.

| Owner-routing trigger | Exception rows |
| --- | ---: |
| `absolute_difference_ge_2` | 2 |
| `contradictory_rationales` | 2 |
| `low_confidence_load_bearing_stage` | 19 |
| `missing_or_incompatible_source_support` | 23 |
| `scope_pathway_application_or_lifecycle_ambiguity` | 16 |

| Sector | Owner exceptions |
| --- | ---: |
| Fusion, magnetic confinement | 22 |
| Software engineering | 1 |

## Adopted owner dispositions

The owner delegated the exception review and adopted the completed workbook.
All 23 routed exceptions have one allowed disposition and a nonblank rationale;
the exact entries are preserved in `owner_exception_review_v1.xlsx` and
`owner_decisions_v1.csv`.

Before adoption, the PM workbook was compared with the original blank workbook.
The common sheets differ only in the 46 owner disposition/rationale cells, the
two cross-cutting S5 decision cells, and the clearly labeled PM note and its
supporting merge/row formatting; the owner-rationale column was widened for the
entered text. `PM_RECOMMENDATIONS` is the only added sheet. The original
formula, tables, validations, protected context cells, and 19-row S5 audit
display are unchanged.

| Owner disposition | Count |
| --- | ---: |
| `prefer_seed` | 9 |
| `prefer_independent` | 7 |
| `needs_better_evidence` | 4 |
| `needs_domain_review` | 2 |
| `preserve_disagreement` | 1 |
| **Total** | **23** |

Seven exception rows remain unresolved and have no selected S-value:

- `exc-sp-0020-s2` and `exc-sp-0020-s4` — better evidence and canonical source IDs required;
- `exc-sp-0030-s2` and `exc-sp-0030-s3` — fusion-regulatory domain review required;
- `exc-sp-0030-s5` — preserve the S5 disagreement pending targeted adjudication; and
- `exc-sp-0031-s3` and `exc-sp-0031-s4` — better evidence and a frozen site/pathway case required.

The other 16 dispositions record an owner preference between submissions, not
an approval or canonical profile value. `selected_s_value` remains blank in
the decision export.

## Systematic source gap and confidence

Both submissions have blank canonical `source_ids` on 31 of 31 profile rows (62 blank submission fields total, or 155 blank comparison views per coder). There are no non-resolving nonblank IDs. This systematic gap is counted here and is not itself replicated into 155 owner decisions. It routes only where the exception row records that the gap materially affects a load-bearing, low-confidence, scope-sensitive, or disputed judgment.

| Coder | High | Medium | Low | Total profiles |
| --- | ---: | ---: | ---: | ---: |
| Seed — Claude Code / Claude Opus 5 | 6 | 21 | 4 | 31 |
| Independent — Codex / GPT-5.6, extra-high | 6 | 14 | 11 | 31 |

Confidence is preserved per coder and is not used to average, weight, or midpoint-select scores.

## Cross-cutting coding convention — S5 boundary allocation

The repeated S5 difference is a boundary-allocation question, not 19 separate instructions to select a preferred row. The seed coder generally assesses errors contained within the scoped stage and assigns escaped-error consequences downstream. The independent coder more often includes the reasonably foreseeable consequences of an erroneous stage output escaping into deployment, operations, qualification, or licensed operation.

Owner question: should S5 assess **(a) locally contained errors only**, or **(b) the reasonably foreseeable consequences of an erroneous stage output escaping that stage**?

The owner adopts the following bounded convention:

S5 includes the direct, reasonably foreseeable consequences of an erroneous
stage output within the frozen pathway and application, up to the next
independent assurance or control boundary. It excludes remote harms that
require a separate downstream failure and excludes jurisdiction-specific
assurance strength or latency, which belong in C6 or the governance overlay.

This clarifies the accepted S5 definition without reopening the M1.5 method
gate. The post-reconciliation route is
`clarify_S5_then_targeted_S5_adjudication`. All original S5 values remain
unchanged, S1-S4 are not reopened, and neither coder is averaged or selected
globally.

S5 differs on 19 profiles: seed is higher on 18, equal on 12 of all 31 profiles, and lower on 1. The two two-point gaps are `sp-0003` verification and validation and `sp-0030` licensing; there are no larger gaps.

| Profile | Stage | Seed S5 | Independent S5 | Difference |
| --- | --- | ---: | ---: | ---: |
| `sp-0001` | Requirements and architecture | 3 | 2 | 1 |
| `sp-0002` | Implementation | 4 | 3 | 1 |
| `sp-0003` | Verification and validation | 4 | 2 | 2 |
| `sp-0004` | Deployment | 2 | 1 | 1 |
| `sp-0005` | Operations and maintenance | 2 | 1 | 1 |
| `sp-0008` | Supply and tooling | 1 | 2 | 1 |
| `sp-0011` | Production and process control | 2 | 1 | 1 |
| `sp-0012` | Quality assurance | 2 | 1 | 1 |
| `sp-0013` | Maintenance and continuous improvement | 2 | 1 | 1 |
| `sp-0014` | Theory and system design | 3 | 2 | 1 |
| `sp-0015` | Simulation | 4 | 3 | 1 |
| `sp-0020` | Materials qualification | 1 | 0 | 1 |
| `sp-0023` | Plasma-facing components | 2 | 1 | 1 |
| `sp-0024` | Tritium and fuel cycle | 1 | 0 | 1 |
| `sp-0025` | Blankets | 1 | 0 | 1 |
| `sp-0028` | Commissioning | 1 | 0 | 1 |
| `sp-0029` | Reliability demonstration | 1 | 0 | 1 |
| `sp-0030` | Licensing | 2 | 0 | 2 |
| `sp-0031` | Grid integration | 1 | 0 | 1 |

`targeted_s5_adjudication_backlog_v1.csv` preserves these 19 rows. Seven carry
their owner-routed dispositions and rationales; the other 12 retain their
one-point audit trail for the later S5-only adjudication. No backlog row has a
selected S5 value.

## Fusion domain-review queue

`fusion_domain_review_queue_v1.csv` contains exactly 18 profiles (`sp-0014` through `sp-0031`). It is a routine domain-review queue, separate from owner exceptions. A fusion row appears in the owner subset only when another recorded semantic trigger applies.

`fusion_domain_review_brief_v1.md` routes all 18 profiles and prioritizes
experiment selection, plasma control, materials qualification, tritium/fuel
cycle, blankets, commissioning, reliability demonstration, licensing, and
grid integration. `evidence_gap_backlog_v1.csv` keeps the internal-pack,
missing-source-ID, expert-review, and no-comparable-observed-case states
separate. No evidence lead or URL is promoted into the canonical source
register in this PR.

## Gate status and next step

Structural blocker: none. The comparison denominator remains 155 and the six
status counts sum to 155. The immutable raw submissions and all 155 comparison
rows remain unchanged. The adopted owner review is complete, with seven
unresolved exception rows explicitly retained without selected values.

The next gate is source inventory and banking followed by named domain review
for all 18 fusion profiles and targeted adjudication of the 19 S5 differences.
Fusion domain review, source banking, targeted S5 adjudication, and WP2
implementation remain open.

This package does not approve, canonicalize, or implement any profile row. It
creates no country modifiers, governance codings, public UI, WP2 data,
composite, average, midpoint, or forced consensus.

Owner-review correction recorded on `2026-08-31`.
