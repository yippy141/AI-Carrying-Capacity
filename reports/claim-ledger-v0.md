# Claim Ledger V0 — Population Report

Date: 2026-07-05
Owner: Jinhua Yip (drafted by Claude Fable 5)
Scope: Issue #7 — populate `data/claims/claim_ledger.csv` from canonical sources and staged research.

## Summary

30 claims added. Status distribution:

- **approved** (6): claims resting entirely on canonical, reviewed sources (IFR robotics, LBNL/NERC/FERC grid sources).
- **approved_with_caveat** (8): claims with canonical support that must always ship with their caveat (official targets, policy intent, benchmark-gap, exposure concentration, the central Atlas thesis).
- **staged** (16): claims whose supporting sources exist only in `research/source-register/2026-07-05-deep-research-source-additions.csv` and await URL/DOI verification and canonical promotion (ECB SAFE depth deficit, OECD/Eurostat/Census/Fed adoption figures, IMF/OECD productivity models, Epoch capex share, METR time horizons, CAICT compute figures, Chinese academic TFP studies).

## The most important correction

**clm-0003** records a verified correction that invalidates a figure in the prior essay draft: IFR's *World Robotics 2025* revised China's manufacturing robot density to **166 per 10,000 employees (22nd worldwide)** after incorporating updated NBS workforce data. The US figure is 307 (8th); Korea leads at 1,220; the global average is 132. Earlier IFR releases showed China at 470 (2023 data) under the old denominator, and a "567" figure circulating in draft copy has no identifiable IFR basis and must not be used. Verified against the live IFR press page on 2026-07-05.

Implication for the argument: China leads overwhelmingly in aggregate installations and stock, but density-normalized diffusion trails the US. This *strengthens* the Atlas's "clustered, not systemic" reading of Chinese industrial AI conversion (clm-0004) and weakens any simple "China converts faster" narrative.

## Top caveats that must travel with claims

1. Robot density is denominator-sensitive; state the workforce series used (clm-0003).
2. Chinese penetration figures in policy documents are targets, not adoption statistics (clm-0006).
3. CAICT scale figures are official-adjacent claims, not independently validated (clm-0009).
4. Adoption ≠ intensity: >70% "some use" vs ~7% intensive use in the euro area (clm-0018).
5. Firm-weighted and employment-weighted adoption differ by 4x in the US; neither is wrong (clm-0019).
6. IMF/OECD productivity numbers are model estimates, not observations (clm-0020).
7. METR time horizons are capability-layer inputs, never country scores, and 50% success ≠ safe delegation (clm-0023–0025).

## Rejected / deferred

- Any use of "China robot density 567 or 470 (current)" — superseded by the WR2025 revision.
- "China has higher AI conversion capacity than the US" — never entered as a claim; only the testable hypothesis form (clm-0007, clm-0029) is in the ledger.
- MIIT/state-media "470 density, far above global average" framing — recorded only inside the staged China Deep Research report; would need the primary MIIT statement plus the IFR counterpoint to enter as an official-claim row.

## Next actions

1. Promote the staged `src-v1-dr-*` rows (especially ECB, Eurostat, OECD, Census, Fed, IMF, OECD-G7, METR ×3, Epoch) so clm-0017 through clm-0025 can move from staged to approved.
2. Locate primary documents for CAICT blue book, Management World digital-divide study (DOI), Tsinghua CFRC paper, and the MOHRSS employment document.
3. Re-verify clm-0005 (57% domestic robot-maker share) against the WR2025 China press release.
