# PM Status

Last updated: 2026-07-11.

## Current posture

**Private preview only.** PR #21 is merged and the Frontier Is Not Fate
structural reset is complete. No product-reset branch is active. The accepted
public information architecture remains Study / What we know / Evidence /
Forecasts / Methods / About.

The active workstream is the first canonical empirical figure:
**“Adoption is not integration.”** This branch promotes the source family,
creates a canonical observation table, renders Figure 1, updates the public
narrative and claim ledger, and adds data-integrity tests. It does not make the
project public-pilot ready.

## Active branch

| Branch | Objective | Status |
| --- | --- | --- |
| evidence/adoption-depth-figure | Canonical adoption-depth evidence and empirical Figure 1 | Validation and screenshots complete; ready for draft review |

## Recent merge and issue housekeeping

- PR #20 merged the claim ledger, launch essay v1.1, and original conceptual
  figure work.
- PR #21 merged the Frontier Is Not Fate private-preview structural reset.
- GitHub issue #7 is closed as completed by the merged claim-ledger work.
- GitHub issue #10 is closed as completed by the merged launch-essay and
  structural-reset work.
- Their descriptions and history were not rewritten.

## Evidence status

| Layer | Current count and state |
| --- | --- |
| Canonical sources | 49 reviewed non-placeholder rows |
| Non-evidentiary placeholders | 6 |
| Canonical source-register total | 55 rows |
| Remaining staged source rows | 41: 19 in the July 5 file and 22 in the July 11 file |
| Staging rows reconciled this sprint | 2 mapped to canonical sources; 4 duplicate or superseded rows rejected |
| Canonical adoption-depth observations | 12 |
| Claim ledger | 37 total: 6 approved, 14 approved_with_caveat, 17 staged |
| Live empirical figures | 1: Adoption is not integration |

The Figure 1 observations include four ECB intensity categories, four BTOS
use/breadth observations, and four Eurostat overall/size observations. Figure 1
plots ten of the twelve rows; the employment-weighted BTOS summary and Eurostat
overall value remain in the canonical table but are not plotted.

## Branch validation and review artifacts

Typecheck, lint, production build, seven TypeScript evidence tests, eight
observation-validator unit tests, repository validation, source-register
validation, indicator-catalog validation, and canonical observation validation
pass. Private-preview readiness reports the 59 known legacy blockers without
failing, as intended.

Review screenshots are committed under `reports/screenshots/`: a desktop
Figure 1 view, a desktop Panel C view, and three 390px views covering the
figure header/Panel A, Panel B, and Panel C.

## Source-review corrections that must persist

1. ECB’s four reported SAFE categories total 98%. The two-point residual may
   reflect “don’t know” responses and rounding. Do not normalize the values or
   derive 73% any use.
2. BTOS Q23 uses a prior-two-week all-business question. Q24 uses a separate
   prior-six-month list of 15 functions. The 18%, 57%, and 4% values are not a
   same-question funnel.
3. The BTOS paper reports 32% employment-weighted use in its summary while
   Table C.7 reports 31.2%. The 32% summary remains disclosed and unplotted.
4. The 4% “comprehensive adopter” value is a latent-class estimate, not a
   direct response or “all 15 functions” measure.
5. China’s 16.4% applies only to above-scale enterprises in 2023 and remains
   contextual; it is not comparable with SAFE, Eurostat, or BTOS.

## Remaining public-pilot blockers

- Forty-one staged source rows still require promotion, deferral, or rejection
  review.
- Six legacy content drafts contain public-readiness TODO markers. They are
  useful research material but are obsolete as current public copy and should
  be moved intact to research/archive in a scoped cleanup.
- Forty-five staged visual references still use non-canonical src-v0-dr IDs.
  This sprint does not rewrite them for cosmetic readiness.
- Every forecast probability range remains hidden pending author review.
- fc-0006 still requires an author decision to resolve, rebase, or retire it;
  the probability range is unchanged.
- Native-language human review is still recommended for the NBS contextual
  source.
- A final adversarial public-pilot review remains open under issue #11.

The research lab is now explicitly marked noindex/no-follow for the private
preview. A login gate is not recommended at this stage: noindex preserves
review access without implying the lab is public evidence. If confidential or
licensed material enters the lab later, access control should replace robots
metadata.

## Legacy content archive candidates

Move these files intact rather than deleting or cosmetically clearing their
research TODOs:

- content/essays/launch-draft.md
- content/methodology/v0.md
- content/country-briefs/china.md
- content/country-briefs/united-states.md
- content/sector-briefs/manufacturing-robotics.md
- content/sector-briefs/compute-energy.md

Current public pages and content/essays/launch-essay-v1.md supersede these as
product copy.

## Next order

1. Review this branch’s source-promotion report, observation rows, Figure 1,
   claims, and screenshots.
2. Merge only after review; do not auto-merge.
3. Archive obsolete content drafts in a separate scoped cleanup.
4. Resolve or rebase fc-0006 and review every forecast range.
5. Remap or retire the 45 staged visual references.
6. Run issue #11’s final adversarial review in public-pilot mode.

## Human decisions

1. Approve the source-specific wording and denominators in Figure 1.
2. Decide whether future work should use the BTOS 32% summary or the 31.2%
   table value for employment-weighted analysis.
3. Resolve, rebase, or retire fc-0006.
4. Confirm when the project should move from private preview toward a public
   pilot.
