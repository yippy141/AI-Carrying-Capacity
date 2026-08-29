# Owner review guide

The owner does **not** fill or adjudicate 155 cells one by one. Owner review starts only after Fable and an independent coder have submitted separate worksheets and a reconciliation step has compared them by profile and by S-dimension.

## What the exception report flags

For each profile and dimension, reconciliation records both submissions and sets explicit fields for:

- exact agreement;
- a one-point difference;
- a difference of two or more;
- a missing score;
- contradictory rationales;
- missing evidence;
- scope ambiguity;
- a low-confidence, load-bearing row; and
- mandatory fusion domain review.

The comparison fields are mutually interpretable: when both scores exist, exactly one of exact agreement, one-point difference, or difference of two or more should be true. A missing score is flagged separately. Contradictory rationale, missing evidence, scope ambiguity, and low-confidence load-bearing status may coexist with any score comparison. Every fusion profile receives the domain-review flag even when two coders agree.

## Fictional example — not a project coding

Assume fictional profile `example-profile-z` covers a made-up stage called “Example Stage Z.” For S2, Fable submits `2` and the independent coder submits `4`. The reconciliation row marks `difference_two_or_more_flag=true`. Fable's fictional rationale says feedback depends on a multi-week external test; the independent rationale assumes a same-day digital test. That mismatch also marks `scope_ambiguity_flag=true` because the coders may be evaluating different stage boundaries.

The owner reviews that one exception row and its source support. The example does not select either score and does not describe any real anchor stage.

## Five allowed owner dispositions

| `owner_decision` | Use when |
| --- | --- |
| `prefer_fable` | Fable's scoped rationale and evidence better fit the frozen profile. |
| `prefer_independent` | The independent submission better fits the frozen profile. |
| `preserve_disagreement` | Both are defensible and the difference should remain explicit. |
| `needs_domain_review` | A qualified reviewer must resolve or bound the issue; this is mandatory for fusion before canonical approval. |
| `needs_better_evidence` | The available support is inadequate for disposition. |

An owner decision is a documented disposition, not permission to erase the unselected submission. Both coder records remain intact. Any selected profile row still follows the method's approval, provenance, freshness, and changelog requirements.
