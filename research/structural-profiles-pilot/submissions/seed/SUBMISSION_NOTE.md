# Seed coding submission — note

Submission: WP2-PRE A, seed S1–S5 coding for the 31 frozen Structural Profiles.

- Coder provenance: `coder_type=model`, `coder_role=seed_proposer`,
  `coder_name=Claude Code`, `coder_model=claude-opus-5`.
- Review IDs: `seed-sp-0001-v1` through `seed-sp-0031-v1`.
- `coding_as_of=2026-08-30`; `submission_status=submitted`.
- Files: `seed_submission_v1.xlsx`, `seed_submission_v1.csv`.

## Attribution

Fable remains the original architect of the Structural Conversion Profiles
framework. The S1–S5 method, the five dimensions, the band structure, and the
seed proposals recorded in `docs/METHOD_PROFILES.md` are Fable's, and
`proposed_by=fable` / `proposed_model=claude-fable-5` remain correct wherever
they appear on those framework records.

Fable did not produce this row-level coding submission. The 31 profiles and 155
S-values in these files were coded in Claude Code using Claude Opus 5, and the
provenance fields name that coder. An earlier version of this submission
misattributed the row-level coding to Fable; this was corrected on owner
confirmation as a metadata-only change. No S-value, rationale, confidence
judgment, source gap, timestamp, scope field, or row order was altered by the
correction, which touched `review_id`, `coder_name`, and `coder_model` only.

## Completion

- 31 of 31 profiles coded, `sp-0001` through `sp-0031`, in the frozen order.
- 155 of 155 S-values supplied; every value is an integer from 0 to 4.
- Every row carries a rationale addressing S1, S2, S3 cost, S3 throughput, S4,
  S5, and a scope caveat, and a `coding_confidence` value.

## Confidence

| Confidence | Profiles | Rows |
| --- | ---: | --- |
| high | 6 | sp-0002, sp-0003, sp-0010, sp-0015, sp-0020, sp-0027 |
| medium | 21 | sp-0001, sp-0004–sp-0009, sp-0011–sp-0014, sp-0016–sp-0019, sp-0021–sp-0023, sp-0026, sp-0028, sp-0029 |
| low | 4 | sp-0024, sp-0025, sp-0030, sp-0031 |

`coding_confidence` is carried in the workbook's own column and is repeated at
the front of each row's `notes` field, because the canonical review schema in
`docs/METHOD_PROFILES.md` has no confidence column. The workbook and the CSV
carry identical values for all seventeen canonical schema fields.

## Source coverage

**31 of 31 rows have blank `source_ids`.** Every row carries a `source_gap:`
note in `notes` instead.

This is a systematic gap, not a per-row oversight, and it is the most important
thing in this submission. `data/sources/source_register.csv` at the frozen base
holds 49 reviewed sources plus 6 placeholder rows. Their subject matter is
national AI readiness and adoption indices, AI governance instruments and
strategies, compute and grid conditions, enterprise diffusion statistics, and
labour-market exposure. Not one of them speaks to the intrinsic structural
properties of a scoped stage in mature software delivery, discrete-manufacturing
new-product introduction, or tokamak development. Citing any of them would have
attached evidence to a claim it does not support.

Two deliberate non-citations are worth recording for the reviewer:

- The interconnection and transmission sources in the register describe
  procedure and queue conditions in one jurisdiction. `sp-0031` grid integration
  is an intrinsic profile, and `docs/METHOD_PROFILES.md` states that intrinsic
  S-marks do not move across countries. That evidence belongs to the
  country-stage modifier layer, so it was not cited here.
- The robotics and industrial-capability datasets describe diffusion and
  national industrial performance, which are country-stage conditions rather
  than intrinsic stage structure, so they were not cited on any manufacturing
  row.

No source ID was invented, and no staged ID, placeholder row, research citation
marker, or external URL was used as if it were canonical.

## Rows flagged for review

### Routine fusion domain review

All 18 fusion rows, `sp-0014` through `sp-0031`, go to the later domain-informed
review queue per `research/structural-profiles-pilot/worksheet/START_HERE.md`.
Per that document this is routine routing and is not by itself an owner-level
exception.

### Load-bearing

- `sp-0020` materials qualification — the 0 codings on S2 and S4 rest on the
  stated structural condition that no fusion-spectrum neutron source operates at
  qualification scale. If such a facility enters service the row changes
  materially. This is the clearest revisit trigger in the set.
- `sp-0027` construction and `sp-0029` reliability demonstration — these carry
  the low end of the fusion anchor. If they are wrong, the anchor's structural
  shape is wrong.
- `sp-0002` implementation — the only row coded 4 on all five dimensions. It
  carries the high end of the software anchor and deserves a check that the
  scope exclusions, not optimism, produced it.

### Scope-sensitive

- `sp-0029` — the reliability target that would count as demonstrated is not
  frozen in the V1 scope, and the coding depends on it.
- `sp-0030` — the scope names no jurisdiction, and fusion regulatory regimes
  differ materially, with some jurisdictions regulating fusion under radiation
  or by-product rules rather than fission licensing.
- `sp-0031` — a fusion pilot's connection scope is unprecedented, and queue and
  procedure conditions are jurisdiction- and network-specific.
- `sp-0012` — quality assurance was coded for a non-regulated product class as
  the frozen scope directs; a safety-critical product class would code lower on
  S5 and needs a distinct profile rather than an amendment to this row.
- `sp-0016`, `sp-0018`, `sp-0021`, `sp-0022`, `sp-0025` — each may need pathway
  variants: shared national facility versus private single-purpose device;
  device current and stored energy; high-temperature versus low-temperature
  superconductor; electron-cyclotron versus ion-cyclotron versus neutral-beam
  routes; and competing blanket concepts.

### Needing better evidence

The four low-confidence rows, `sp-0024`, `sp-0025`, `sp-0030`, and `sp-0031`.
For `sp-0024` and `sp-0025` the underlying difficulty is that pilot-scale
fuel-cycle and breeding-blanket performance are not demonstrated anywhere, so
the coding is inference from smaller-scale practice.

### Coder self-flags

These are places where this coder expects an independent coder to differ for
reasons of coding convention rather than substance, and where the reconciliation
report should look first.

- **Boundary allocation of escaped-defect consequences.** On `sp-0003` the S5
  coding treats errors made inside verification as cheap, and assigns
  escaped-defect consequences to `sp-0004` and `sp-0005` to avoid
  double-counting. A coder who allocates the consequence to the detecting stage
  would code `sp-0003` S5 lower.
- **Accumulated operating time in S1 versus S2 and S4.** `sp-0004`, `sp-0005`,
  `sp-0026`, and `sp-0029` all turn on where soak time, rare-fault recurrence,
  and required operating hours are recorded. This coder put soak and migration
  duration in S4 at `sp-0004` but recorded waiting for a rare fault under S2 and
  S3 at `sp-0005`.
- **Institutional latency excluded from S4.** At `sp-0030`, statutory review
  periods and hearing schedules were deliberately not coded as physical floors,
  on the grounds that S4 measures physical flexibility and institutional latency
  belongs to the governance overlay. A coder who reads S4 as elapsed-time
  flexibility of any origin would code that row much lower.
- **S3 cost and throughput diverged on 24 rows.** Per
  `docs/METHOD_PROFILES.md`, the divergence is explained in each rationale
  rather than forced into agreement, and no sixth dimension was added. These are
  the rows where a single S3 integer is carrying the most compressed judgment.
- **`sp-0013` landed at 2 on all five dimensions.** That may be a real
  structural reading of maintenance and continuous improvement, or it may be
  this coder failing to discriminate. It is offered as a low-signal row rather
  than a confident one.
- **No row was coded 0 on S5.** This may be a genuine property of the frozen
  scope, since the fusion stages that would carry catastrophic-error potential
  are pre-integration design and test stages rather than licensed operation of a
  tritium-fuelled plant. It may equally be a systematic reluctance in this coder
  to use the bottom anchor on S5. It is recorded here so the reconciliation can
  test it rather than inherit it.

## Confirmations

- **No independent values were seen.** This submission was produced from the
  frozen base commit `c2a5c53d586cecad4d137d459b78d432b9104870` only. No
  independent-coder branch, pull request, workbook, CSV, values, rationales,
  notes, or commits were listed, inspected, fetched, or searched for, and no web
  browsing was performed. The inputs were the authoritative documents named in
  the issue, the worksheet package, the source register, and the submission
  template `fable_submission_template.xlsx`, whose filename reflects the
  worksheet package as frozen at the base commit.
- **No profile was approved or canonicalized.** Every row is a proposed model
  coding with `submission_status=submitted`. No `coding_status`,
  `review_status`, `reviewed_by`, `independent_review_by`, `approved_by`,
  `selected_review_ids`, or `last_reviewed` field was written. No reconciliation
  was performed and no owner decision was recorded.
- **No prohibited derivation was produced.** The five dimensions were never
  summed, averaged, weighted, ranked, or percentage-transformed. No composite,
  whole-sector score, band assignment, C-value, country modifier, governance
  coding, or coupling edge was created. `critical_path_role` remains
  `not_assessed` on all 31 rows, and no binding status was inferred.
- **The blank worksheet package was not altered.** The template files at
  `research/structural-profiles-pilot/worksheet/` are unchanged from the frozen
  base; the completed workbook is a copy written only into the unlocked
  submission columns, and the read-only `S1_S5_RUBRIC` and `SCOPE_REFERENCE`
  sheets and all frozen scope and provenance cells are byte-identical to the
  template.

This note reports no sector average, no band placement, and no comparison
between coders.
