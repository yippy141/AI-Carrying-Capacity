# Unresolved scope ambiguities

No genuine ambiguity currently prevents a frozen V1 scope field from being
populated.

The owner-approved `lifecycle_phase` values are primary V1 coding contexts, not
claims that a stage occurs exclusively in one phase. The stage descriptions
state the included activity and the material exclusions needed for the first
coding pass. `critical_path_role` remains `not_assessed`; no binding status has
been assigned.

If later evidence shows that a stage's intrinsic profile materially differs in
another lifecycle phase, pathway, or application context, that case requires a
versioned profile variant. It must not silently alter one of the 31 frozen V1
rows.
