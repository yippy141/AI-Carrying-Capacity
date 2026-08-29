# Authoritative Documents

Status: canonical authority manifest for Structural Conversion Profiles and the
WP1.5-to-WP2 handoff, frozen 2026-08-29.

## Authority order

When instructions or attachments conflict on structural-profile method,
coding governance, freshness, or the next package gate, use this order:

1. `docs/METHOD_PROFILES.md`
2. `docs/METHOD_GATE_REVIEW.md`
3. `docs/FRESHNESS_PROTOCOL.md`
4. `docs/DECISIONS.md`
5. `reports/PM_HANDOFF_METHOD_GATE_2026-08-28.md`

`docs/AGENT_BRIEF.md`, `docs/TASKS.md`, and the data dictionaries remain
binding operating documents within their own scopes, but they do not override
the method decisions above.

## Superseded proposals

Earlier Fable strategy, Structural Profiles, Compressibility Spectrum, and
work-package documents are historical proposals wherever they conflict with
the authority order above. In particular, do not implement:

- the one-dimensional Compressibility Spectrum;
- whole-sector numerical S profiles or S-dimension averages;
- the placeholder compressibility shares `80%`, `40%`, or `15%`;
- superseded sector names or band placements;
- older stage lists that omit the frozen manufacturing or fusion leaves;
- reviewer point estimates of `60%`, `60%`, and `75%` as owner judgments; or
- any WP2 prompt that assumes an author-reviewed coding sheet already exists.

The design reference controls visual grammar only. Its placeholder values are
not evidence, codings, or data specifications. Strategy and design documents
remain useful in their own domains but cannot silently amend the structural
method.

## Change control

The WP1.5 method is frozen after the 2026-08-29 synchronization. Reopen it only
for a direction error, prohibited aggregation, fabricated precision, invalid
band rule, missing structural class, broken hierarchy, or comparable P0/P1
method failure. Ordinary coder disagreement, new evidence, interface feedback,
or a pathway-specific exception uses versioned row-level review.

Update this manifest whenever a new document supersedes one of the five
authorities. Do not create parallel files named `final`, `v2`, or similar and
leave their authority implicit.
