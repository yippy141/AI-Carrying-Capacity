# Source Promotion 30

Date: 2026-06-27
Branch: `agent/source-promotion-30-review-20260627`
Status: review required before merge

## Summary

This branch promotes the first reviewed non-placeholder source rows into `data/sources/source_register.csv` for Issue #6.

The branch adds 37 reviewed source rows while preserving the six non-evidentiary placeholder rows. It deliberately does **not** add indicator values, claim-ledger approvals, public copy, or visual changes.

## Promotion counts

| Category | Count |
| --- | ---: |
| Existing placeholder rows preserved | 6 |
| Reviewed non-placeholder rows added | 37 |
| Total rows after update | 43 |
| Non-English original-language sources added | 10 |
| Official government or legal sources added | 17 |
| Datasets or official-statistics sources added | 10 |

## Promoted source families

### Existing index and benchmark landscape

- `src-0001` Stanford AI Index Report 2026.
- `src-0002` IMF AI Preparedness Index.
- `src-0003` Oxford Insights Government AI Readiness Index 2025.
- `src-0004` WIPO Global Innovation Index 2025.
- `src-0005` ITU ICT Development Index 2025.
- `src-0006` World Bank GovTech Maturity Index 2025.
- `src-0007` OECD.AI Policy Observatory AI Index.
- `src-0008` UNIDO Competitive Industrial Performance Index.

### Compute energy and grid bottlenecks

- `src-0009` IEA Energy and AI.
- `src-0010` LBNL / DOE 2024 United States Data Center Energy Usage Report.
- `src-0011` EPRI Powering Intelligence.
- `src-0012` Berkeley Lab interconnection queue tracker.
- `src-0013` NERC long-term reliability assessments.
- `src-0014` FERC Order No. 2023.
- `src-0015` FERC Order No. 1920.

### Manufacturing robotics and industrial conversion

- `src-0016` IFR World Robotics 2025.
- `src-0008` UNIDO Competitive Industrial Performance Index also supports industrial-output baselines.

### U.S. governance strategy and public-sector adoption

- `src-0017` NIST AI Risk Management Framework.
- `src-0018` America's AI Action Plan.
- `src-0019` OMB M-25-21.
- `src-0020` OMB M-25-22.
- `src-0021` DoD Data Analytics and AI Adoption Strategy.

### China and other non-English official sources

- `src-0022` 新一代人工智能发展规划.
- `src-0023` 国务院关于深入实施人工智能+行动的意见.
- `src-0024` 全国一体化大数据中心协同创新体系算力枢纽实施方案.
- `src-0025` 人形机器人创新发展指导意见.
- `src-0026` 国家人工智能产业综合标准化体系建设指南2024版.
- `src-0027` 生成式人工智能服务管理暂行办法.
- `src-0029` Nationale Rechenzentrumsstrategie der Bundesregierung.
- `src-0030` AI戦略2022.
- `src-0031` 인공지능 발전과 신뢰 기반 조성 등에 관한 기본법.
- `src-0034` France 2030 stratégie nationale pour l'intelligence artificielle.

### Comparator governments and labor adaptation

- `src-0028` EU AI Act.
- `src-0032` Singapore National AI Strategy 2.0.
- `src-0033` IndiaAI Mission.
- `src-0035` KPMG and University of Melbourne global AI trust survey.
- `src-0036` ILO generative AI occupational exposure report.
- `src-0037` OECD Employment Outlook 2025.

## Deliberate classification choices

### Official source reliability is separate from claim validity

Several government strategy rows use reliability tier `A` because the document is an authentic official source. They are still coded as `official_program_claim` or `official_target` when they describe policy objectives rather than independently observed outcomes.

Examples:

- `src-0018` America's AI Action Plan.
- `src-0022` China New Generation AI Development Plan.
- `src-0023` State Council AI+ opinion.
- `src-0025` MIIT humanoid robot guidance.
- `src-0032` Singapore National AI Strategy 2.0.
- `src-0033` IndiaAI Mission.

### Model estimates are separated from observed statistics

Compute-energy sources with modeled scenarios are coded as `model_estimate`, not direct observed outcomes.

Examples:

- `src-0010` LBNL / DOE data-center energy report.
- `src-0011` EPRI data-center electricity scenario report.

### Readiness indices are not conversion outcomes

Index sources are promoted because they are useful comparators, not because they directly answer the Atlas question.

Examples:

- IMF AIPI measures preparedness.
- Oxford Insights measures government AI readiness.
- WIPO GII measures innovation-system performance.
- ITU IDI measures connectivity.
- World Bank GTMI measures digital-government maturity.

## Needs user review before merge

This branch should not be merged automatically. Spot-check these rows first:

1. `src-0003` Oxford Insights report URL and exact publication date.
2. `src-0007` OECD.AI AI Index landing page and current methodology scope.
3. `src-0011` EPRI product URL and release date.
4. `src-0013` NERC exact 2025 LTRA PDF URL.
5. `src-0019` and `src-0020` exact OMB PDF URLs for M-25-21 and M-25-22.
6. `src-0023` State Council AI+ opinion URL and publication date.
7. `src-0025` MIIT humanoid robot guidance URL slug.
8. `src-0026` MIIT AI standardization guide URL slug.
9. `src-0029` German data-center strategy URL.
10. `src-0031` Korean law portal URL and effective date.

## Kept staged or deferred

The following source families were not promoted in this branch:

- Media reports where official sources were available.
- Substack or LessWrong commentary.
- Unverified corporate blog posts.
- Any source that would be used only to support a launch-essay claim rather than a source-register foundation.
- Quantitative indicator values from the Deep Research reports.

## Validation expectation

Expected validation state:

- `python3 scripts/validate_source_register.py` should pass because rows use valid schema enums and URL fields are populated.
- `python3 scripts/validate_repo.py` should pass unless unrelated scaffold expectations changed.
- `python3 scripts/check_launch_readiness.py --mode private-preview` may still report blockers because the claim ledger and launch copy remain incomplete.
- `python3 scripts/check_launch_readiness.py --mode public-pilot` should still fail until #7 and #10 are complete.

## Next after review

After this PR is reviewed and merged:

1. Populate `data/claims/claim_ledger.csv` from the promoted source IDs.
2. Rewrite the launch essay only after claim-ledger rows exist.
3. Run final adversarial red-team before public pilot.
