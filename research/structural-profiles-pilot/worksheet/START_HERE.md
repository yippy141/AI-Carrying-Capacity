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

**Fable** is the seed proposer. In a later, separate task, Fable receives the
Fable-only workbook and supplies its own S1–S5 proposals, rationales, source
IDs, coding date, and confidence. Its authoritative provenance is already
filled as `coder_type=model`, `coder_role=seed_proposer`,
`coder_name=fable`, and `coder_model=claude-fable-5`. Those fields identify the
submission; they do not approve it.

**The blind independent model** is a rubric-reliability check. It receives only
the neutral blind workbook, without Fable's identity, values, rationales,
sources, or hints. The independent task fills its own coder identity and makes
its classification without seeing Fable's return. A second model is not a
substitute for domain expertise.

**Codex** maintains the blank package, validates returned structures, and—only
in a later task—compares the two submissions by `profile_id` and individual
S-dimension. Codex may generate the exception report but does not average the
coders, silently choose a midpoint, approve a row, or turn either submission
into canonical data.

**Jinhua** is the owner and exception reviewer. Jinhua does not review all 155
S-cells (31 profiles × 5 dimensions). After both submissions return and an
exception report is generated, Jinhua reviews only flagged disagreements,
load-bearing low-confidence cases, scope or evidence problems, and any issue
that could change a stage's band or critical-path interpretation. The allowed
owner dispositions are `prefer_fable`, `prefer_blind`,
`preserve_disagreement`, `needs_domain_review`, and
`defer_missing_evidence`. None requires a forced consensus.

**Later domain experts** review technically load-bearing cases in their areas.
Every fusion profile goes into a later domain-informed review queue. A routine
fusion domain check is distinguished from an owner decision: it is not an
exception by itself, and it does not imply that the owner must adjudicate the
row. Any fusion row with a substantive disagreement or evidence problem also
appears in the exception queue.

## The exact sequence after this pull request

1. Review and merge this blank package. Confirm that the workbooks regenerate
   from the CSV/JSON templates and that validation still passes.
2. Send `fable_submission_template.xlsx` to Fable in a separate coding task.
   Do not send the blind workbook as a shared collaboration file.
3. Independently send `blind_submission_template.xlsx` to a model that cannot
   see Fable's task, template identity fields, return, rationales, or sources.
4. Receive the two completed files separately. Do not copy values or reasoning
   from one into the other.
5. Validate each return against the frozen profile set, ordering, allowed
   values, provenance rules, and blank-package schema. Missing support stays
   missing; it is never replaced with an invented source ID.
6. In a new task, generate the dimension-specific exception report. Compare
   S1 with S1, S2 with S2, and so on for each `profile_id`; never average the
   two coders.
7. Send Jinhua only the exception report and the owner-decision view. Jinhua
   records one allowed disposition for each owner-level exception and may
   defer a case rather than manufacture certainty.
8. Route every fusion row, plus any other row flagged for subject-matter
   review, to later domain experts. Keep routine domain review distinct from
   owner adjudication.
9. Only after those steps, start a separate WP2 implementation and population
   task. Preserve the original submissions, disagreements, dates, and review
   provenance. No row becomes approved or canonical unless the full method
   contract is satisfied.

## Which file is safe to send

- **Send to Fable:** `fable_submission_template.xlsx` only. It contains the
  common rubric, frozen scope references, blank submission fields, and Fable's
  authoritative provenance.
- **Send to the blind independent model:** `blind_submission_template.xlsx`
  only. It contains the same profile rows and rubric in the same order, but no
  Fable identity, values, rationales, sources, or hints.
- **Keep with Jinhua/Codex:**
  `structural_profiles_reference_and_owner_review.xlsx`, the CSV/JSON
  templates, and this guide. The owner workbook describes the comparison and
  review workflow, so it is not a blind-coding input.

## What must remain blank now

Until the separate coding and review tasks begin, keep all of the following
blank:

- every S1–S5 value, coder rationale, source ID, coding date, confidence, and
  coder note;
- every C1–C8 value and every country-modifier row;
- every governance-overlay row;
- every lifecycle phase that the frozen taxonomy does not determine without
  substantive judgment;
- every exception-report result and owner-decision row; and
- all approval, canonicalization, reviewer, selected-review, and changelog
  fields.

The profile scope, taxonomy, stable opaque `profile_id`, frozen `pathway_id`,
and `critical_path_role=not_assessed` are reference structure, not research
findings. Blank cells mean not yet coded or not yet decided; they do not mean
zero, not applicable, agreement, or approval.

## Package map

The reference workbook is the human-readable owner view. The Fable and blind
workbooks are separate coding inputs. `stages.csv` and
`stage_profiles_template.csv` define the frozen taxonomy and 31 scoped profile
rows. The two `profile_coding_reviews_*_template.csv` files mirror the
canonical submission schema without any S values. The country and governance
CSVs are header-only blank templates. `owner_decisions_template.csv` is
header-only because Jinhua should see exceptions, not 155 pre-created decision
rows. `exception_report.schema.json` specifies later comparison and routing
without midpoint or consensus rules.

Run `python3 scripts/build_structural_profiles_workbooks.py` to regenerate the
three workbooks and `python3 scripts/validate_structural_profiles_worksheet.py`
to validate the complete blank package.
