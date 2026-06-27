# PM Status

Last updated: 2026-06-27.

## Current Launch Posture

**Private preview only.**

The repo has a strong V0 scaffold, staged research, and interactive product shell. It should not be described as an evidence product until canonical sources, indicators, claims, and visual guardrails are reviewed.

## Active Branches

| Branch | Objective | Status |
| --- | --- | --- |
| `agent/wave1-evidence-infra-20260627` | CI, source schema, indicator schema, capability horizon | Ready for PR review |

## Issue Board

### Wave 0

| Issue | Objective | Status |
| --- | --- | --- |
| #1 | Agent path locks and PM status | Done |

### Wave 1: Evidence Infrastructure

| Issue | Objective | Status |
| --- | --- | --- |
| #2 | CI and launch-readiness checks | Implemented in Wave 1 branch |
| #3 | Source schema upgrade | Implemented in Wave 1 branch |
| #4 | Indicator schema and missingness taxonomy | Implemented in Wave 1 branch |
| #5 | METR/Epoch capability-horizon module | Implemented in Wave 1 branch |

### Wave 2: Public Product Conversion

| Issue | Objective | Status |
| --- | --- | --- |
| #6 | Promote first 30 canonical sources | Next after Wave 1 merge |
| #7 | Populate V0 claim ledger | Blocked by #6 |
| #8 | Scenario assumption browser | Ready |
| #9 | Visual evidence guardrails | Ready |
| #10 | Launch essay rewrite | Blocked by #6 and #7 |

### Final Review

| Issue | Objective | Status |
| --- | --- | --- |
| #11 | Final adversarial launch review | Blocked by Wave 2 |

## Launch Blockers

| Blocker | Owner issue | Status |
| --- | --- | --- |
| Canonical source register lacks reviewed source rows | #6 | Open |
| Public claims lack a populated claim ledger | #7 | Open |
| Missingness too coarse | #4 | Fixed in schema; needs UI/data adoption |
| Official claims need stronger schema/UI separation | #3, #9 | Schema fixed; UI still open |
| Scenario UI may read as forecast | #8 | Open |
| Staged visuals may look like evidence | #9 | Open |
| Launch essay needs source-gated rewrite | #10 | Open |

## Canonical Data Status

- Reviewed sources: pending.
- Reviewed indicators: pending.
- Approved claims: pending.
- Public visuals using staged data: yes, with additional guardrails needed.
- Public-pilot readiness: expected to fail until #6, #7, #8, #9, and #10 are complete.

## Recommended Merge Order

1. Merge Wave 1 evidence infrastructure.
2. Run #6 source promotion.
3. Run #7 claim ledger.
4. Run #8 scenario assumption browser.
5. Run #9 visual evidence guardrails.
6. Run #10 launch essay rewrite.
7. Run #11 final red-team.
8. Decide launch posture.

## Human Decisions Needed

1. Confirm launch posture target: private preview or public pilot.
2. Pick deployment domain.
3. Pick launch essay voice.
4. Decide how many canonical sources are enough before public pilot.
