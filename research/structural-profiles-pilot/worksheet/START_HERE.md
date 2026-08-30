# Structural Profiles pilot worksheet — start here

## What this package is for

This package is a blank research worksheet for the three-anchor Structural
Profiles pilot: mature production software, discrete-manufacturing new-product
introduction and operations, and tokamak research through pilot-plant
readiness. It tests whether two models can apply the same five-dimensional
rubric consistently to the same 31 scoped leaf stages, and whether the review
process surfaces disagreements clearly enough for a human owner to resolve
only the important exceptions.

Here, **coding means research classification, not software programming**. A
coder reads the scope and rubric, proposes an ordinal value from 0 to 4 for
each of S1–S5, explains the reasoning, identifies supporting source IDs, dates
the coding, and states confidence. The five dimensions stay separate. They are
not added, averaged, weighted, ranked, or converted into percentages.

This pull request creates only the worksheet structure and its validators. It
does not run the pilot. Every S1–S5 and C1–C8 field is blank, no source ID has
been supplied, and no row has been approved or made canonical.

## Who does what

**The seed proposer** is Claude Code using Claude Opus 5. Its completed
submission uses `coder_type=model`, `coder_role=seed_proposer`,
`coder_name=Claude Code`, and `coder_model=claude-opus-5`.

**The independent coder** is Codex using GPT-5.6 at extra-high reasoning
effort. Its completed submission was produced without seeing the seed return.
A second model is not a substitute for domain expertise.

**Fable** remains credited as the original Structural Conversion Profiles
framework architect. Fable did not produce either row-level submission. The
Fable-specific names in the original blank handoff files are historical
package labels, not row-level coder provenance.

**Codex** maintains the package, validates returned structures, and compares
the two submissions by `profile_id` and individual S-dimension. Codex may
generate the exception report but does not average the coders, silently choose
a midpoint, approve a row, or turn either submission into canonical data.

**Jinhua** is the owner and exception reviewer. Jinhua does not review all 155
S-cells (31 profiles × 5 dimensions). After both submissions return and an
exception report is generated, Jinhua reviews only flagged disagreements,
load-bearing low-confidence cases, scope or evidence problems, and any issue
that could change a stage's band or critical-path interpretation. The allowed
owner dispositions are `prefer_seed`, `prefer_independent`,
`preserve_disagreement`, `needs_domain_review`, and
`needs_better_evidence`. None requires a forced consensus.

**Later domain experts** review technically load-bearing cases in their areas.
Every fusion profile goes into a later domain-informed review queue. A routine
fusion domain check is distinguished from an owner decision: it is not an
exception by itself, and it does not imply that the owner must adjudicate the
row. Any fusion row with a substantive disagreement or evidence problem also
appears in the exception queue.

## Reconciliation sequence

1. The blank package was reviewed and merged with reproducible workbook and
   schema validation.
2. The two coders produced separate returns. The original Fable-named seed
   handoff template remains historical package provenance, not the completed
   row-level coder record.
3. The corrected seed and independent heads were pinned after CI, and the
   provenance-only commits were verified not to change values or rationales.
4. Each return is validated independently against the frozen profile set,
   ordering, allowed values, provenance, and workbook/CSV parity. Missing
   support stays missing; it is never replaced with an invented source ID.
5. Reconciliation keeps one audit row for every profile and S-dimension
   (31 × 5 = 155), including exact agreements, one-point differences, and
   missing scores. It never averages the coders or silently omits a comparison.
6. Jinhua receives only the owner-routed exception workbook plus the single
   cross-cutting S5 convention question. Jinhua may defer a case rather than
   manufacture certainty.
7. Every fusion row, plus any other row flagged for subject-matter review,
   enters later domain review. Routine domain review remains distinct from
   owner adjudication.
8. Only after those steps may a separate WP2 implementation and population
   task begin. No row becomes approved or canonical unless the full method
   contract is satisfied.

## Which completed files enter reconciliation

- **Seed:** immutable normalized `seed_submission_v1.csv`, pinned to the
  corrected PR head and credited to Claude Code / Claude Opus 5.
- **Independent:** immutable normalized `independent_submission_v1.csv`,
  pinned to the corrected PR head and credited to Codex / GPT-5.6 at
  extra-high reasoning effort.
- **Owner review:** the generated owner-exception workbook only. Neither raw
  coding submission is merged or used as canonical profile data.

## What remains unpopulated

The original worksheet templates remain blank research structure. The
reconciliation workbook also leaves every owner decision blank. Do not
populate any of the following in this package:

- every S1–S5 value, coder rationale, source ID, coding date, confidence, and
  coder note;
- every C1–C8 value and every country-modifier row;
- every governance-overlay row;
- every exception-report result and owner-decision row; and
- all approval, canonicalization, reviewer, selected-review, and changelog
  fields.

The profile scope, taxonomy, stable opaque `profile_id`, frozen `pathway_id`,
owner-approved primary V1 `lifecycle_phase`, and
`critical_path_role=not_assessed` are reference structure, not research
findings. A primary lifecycle context does not claim that a stage occurs
exclusively in that phase. Blank cells mean not yet coded or not yet decided;
they do not mean zero, not applicable, agreement, or approval.

## Package map

The reference workbook is the human-readable owner view. The Fable-named and
blind workbooks are the historical separate coding inputs. `stages.csv` and
`stage_profiles_template.csv` define the frozen taxonomy and 31 scoped profile
rows. The two `profile_coding_reviews_*_template.csv` files mirror the
canonical submission schema without any S values. The country and governance
CSVs are header-only blank templates. `owner_decisions_template.csv` is
header-only because Jinhua should see exceptions, not 155 pre-created decision
rows. `exception_report.schema.json` specifies later comparison and routing
for all 155 dimension comparisons without midpoint or consensus rules. In the
reconciliation contract, role-based labels are authoritative: `seed`,
`seed_submission_id`, `prefer_seed`, and `seed_*` owner columns.

Run `python3 scripts/build_structural_profiles_workbooks.py` to regenerate the
three workbooks and `python3 scripts/validate_structural_profiles_worksheet.py`
to validate the complete blank package.
