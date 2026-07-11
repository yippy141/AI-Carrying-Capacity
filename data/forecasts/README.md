# Forecast Register

`forecast_register.csv` holds measurable forecast questions with resolution criteria, deadlines, resolution sources, gated probability ranges, rationale, author-review fields, and update history.

Rules:

- Every row is a **question with a resolution procedure**, never a prediction presented as analysis.
- `status` values: `draft_unreviewed` (initial author ranges, not yet reviewed), `active` (reviewed and tracked), `resolved_yes`, `resolved_no`, `retired`.
- `initial_probability_range` is an author judgment. It is not a market price, a model output, or an institutional estimate, and the product UI must label it as such.
- The UI must hide `initial_probability_range` unless `author_review_status=reviewed`.
- `baseline_date` records the range's evidence baseline. `lower_bound_rationale` and `upper_bound_rationale` must be filled before author review can clear.
- `author_review_status` values: `pending`, `needs_decision`, or `reviewed`.
- Update history is append-only: `YYYY-MM-DD: old_range -> new_range (reason)`, separated by ` | `.
- Forecast questions are signposts for the conversion framework — each row should say which part of the framework it tests (`framework_relevance`).
- Never resolve a question against an official target or announcement; resolution requires the named observed source.
