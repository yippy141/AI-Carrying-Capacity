# PM Status

Last updated: 2026-07-05.

## Current Launch Posture

**Private preview only** — but the evidence layer is now substantially populated. Public-pilot readiness now depends mainly on promoting the staged `src-v1-dr-*` economics/METR sources, clearing content TODO markers, and running the final red-team (#11).

## Active Branches

| Branch | Objective | Status |
| --- | --- | --- |
| `claude/focused-hofstadter-d07d55` | Bank new Deep Research, populate claim ledger (#7), land launch essay v1 (#10), add Figure 1 scatter | In review (this PR) |

## Issue Board

### Wave 0

| Issue | Objective | Status |
| --- | --- | --- |
| #1 | Agent path locks and PM status | Done |

### Wave 1: Evidence Infrastructure

| Issue | Objective | Status |
| --- | --- | --- |
| #2 | CI and launch-readiness checks | Done |
| #3 | Source schema upgrade | Done |
| #4 | Indicator schema and missingness taxonomy | Done |
| #5 | METR/Epoch capability-horizon module | Done |

### Wave 2: Public Product Conversion

| Issue | Objective | Status |
| --- | --- | --- |
| #6 | Promote first 30 canonical sources | Done (PR #18 merged; 37 reviewed rows) |
| #7 | Populate V0 claim ledger | Done on this branch (30 claims; see `reports/claim-ledger-v0.md`) |
| #8 | Scenario assumption browser | Done |
| #9 | Visual evidence guardrails | Done |
| #10 | Launch essay rewrite | Draft v1.1 on this branch (`content/essays/launch-essay-v1.md`); needs staged-source promotion before publication |

### Final Review

| Issue | Objective | Status |
| --- | --- | --- |
| #11 | Final adversarial launch review | Next after this branch merges |

## Launch Blockers

| Blocker | Owner issue | Status |
| --- | --- | --- |
| Canonical source register lacks reviewed source rows | #6 | Fixed (37 reviewed rows) |
| Public claims lack a populated claim ledger | #7 | Fixed on this branch |
| Launch essay needs source-gated rewrite | #10 | Draft done; blocked on promoting `src-v1-dr-005`–`012` and METR rows (`src-v1-dr-001`–`003`) before the VERIFY markers can clear |
| Staged econ/METR sources not yet canonical | new | Open — see `research/source-register/2026-07-05-deep-research-source-additions.csv` |
| Old content files still carry TODO markers | #10 | Open (`launch-draft.md`, country briefs, sector briefs) |
| Staged visual JSON still cites `src-v0-dr-*` IDs | #9 | Open; reported by readiness checker in private-preview mode |

## Canonical Data Status

- Reviewed sources: 37 (plus 6 placeholders; 22 new staged rows awaiting verification).
- Reviewed indicators: pending.
- Approved claims: 6 approved + 8 approved_with_caveat + 16 staged = 30 total.
- Public visuals using staged data: yes, guarded with staged-evidence banners.
- Public-pilot readiness: expected to fail until staged sources are promoted and TODOs cleared.

## Key Evidence Correction (2026-07-05)

IFR World Robotics 2025 revised China's robot density to **166/10k (22nd)** on updated NBS workforce data; US is 307. The 470 figure was the pre-revision 2023 number; a "567" figure in the earlier essay draft had no IFR basis. Verified against the live IFR press page. See clm-0003 and `reports/claim-ledger-v0.md`.

## Recommended Next Order

1. Merge this branch after review.
2. Promote the 22 staged `src-v1-dr-*` rows (verification-heavy pass; do not auto-merge).
3. Clear VERIFY markers in `launch-essay-v1.md` and TODOs in older content files.
4. Run #11 final red-team in public-pilot mode.
5. Decide launch posture; deploy; update portfolio links.

## Human Decisions Needed

1. Confirm launch posture target: private preview or public pilot.
2. Pick deployment domain (suggested: aiconversion.jhyip.com).
3. Approve or edit the launch essay v1.1 voice and thesis framing.
