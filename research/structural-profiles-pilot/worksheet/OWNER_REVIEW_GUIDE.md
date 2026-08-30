# Owner review guide

This guide defines the next owner exception-review step. It does not authorize
new coding, prefilled owner decisions, or canonical profile population in this
pull request.

## What Jinhua receives

After separate seed and independent submissions return, Codex creates a
155-row audit (31 × 5 = 155): one comparison for every `profile_id` crossed
with S1-S5. Exact
agreements and one-point differences remain visible in that audit but do not
reach Jinhua by default. Missing submissions are retained with a
`missing_score` flag; they are never silently dropped.

Jinhua receives only owner-routed exceptions. These include a difference of two
or more, a 0-versus-4 case, or a semantic issue such as a potential band or
critical-path change, contradictory rationales, incompatible evidence,
low-confidence load-bearing interpretation, or scope ambiguity. A one-point
difference reaches owner review only when one of those semantic flags also
applies.

All 18 fusion profiles also enter a separate routine domain-review queue.
Routine fusion review does not itself require an owner decision.

## How to dispose an exception

Use exactly one of these values and explain the reason without manufacturing
consensus:

- `prefer_seed`
- `prefer_independent`
- `preserve_disagreement`
- `needs_domain_review`
- `needs_better_evidence`

An owner disposition records how the exception should proceed. It does not
approve or canonicalize a profile row.

## Clearly fictional example

> **FICTIONAL EXAMPLE — not a package profile, submission, source, or decision.**
>
> Suppose two coders assess a made-up stage called `fictional_component_check`
> on S2. The seed coder enters 3 and the independent coder enters 2. The numeric
> difference is one, so the row normally stays audit-only. Their rationales,
> however, describe different scopes: one describes a rapid bench check and
> the other a months-long qualification campaign. Codex adds
> `scope_pathway_application_or_lifecycle_ambiguity` and routes the row to the
> owner. Jinhua could select `preserve_disagreement`, `needs_domain_review`, or
> `needs_better_evidence`; no midpoint or consensus is required.

## What happens after disposition

Codex preserves both original values and rationales, records the owner's
disposition separately, and routes any requested domain or evidence work. Only
a later WP2 task may populate canonical profile data after the full approval
contract is satisfied.

## Provenance normalization

The seed return was produced in Claude Code using Claude Opus 5; the
independent return was produced by Codex using GPT-5.6 at extra-high reasoning
effort. Fable is credited as framework architect, not as the row-level coder.
Reconciliation uses `seed_submission_id`, the `seed` submission key,
`prefer_seed`, `seed_*` owner columns, and `seed_submission_v1.csv`.

Blank `source_ids` are a systematic gap in both returns. They are counted but
do not route all 155 comparisons. Missing support becomes an owner exception
only when it materially affects a load-bearing, low-confidence,
scope-sensitive, or disputed judgment.

## Cross-cutting S5 convention question

The original coders used different boundary-allocation conventions on S5.
Owner review must decide whether S5 covers only errors contained within the
scoped stage or also the reasonably foreseeable consequences of an erroneous
stage output escaping into a later stage. Reconciliation preserves every
original value and asks for a later correction route; it does not silently
apply either convention.
