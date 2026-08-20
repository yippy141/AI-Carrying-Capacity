# Adoption-depth source promotion

Date: 2026-07-11
Reverified: 2026-08-21
Branch: evidence/adoption-depth-figure
Status: review required before merge

## Outcome

This pass promotes only the source families required for Figure 1,
“Adoption is not integration,” plus the immediate questionnaire, methodology,
wording-break, and China-context sources needed to interpret it.

The canonical register now contains **49 reviewed non-placeholder sources**
and **6 non-evidentiary placeholders** (55 rows total). The July 5 and July 11
staging files now contain **41 rows still marked staged**: 19 in the July 5
file and 22 in the July 11 file. Two historical staging rows map to promoted
canonical sources; four duplicate or superseded rows are marked rejected.

No transient Deep Research citation marker was promoted. Every canonical row
uses an original institutional URL or DOI.

## Promoted

| Canonical ID | Source | Role |
| --- | --- | --- |
| src-0038 | ECB SAFE Q4 2025 results | Four published AI-use intensity shares; Figure 1 Panel A |
| src-0039 | ECB SAFE Q4 2025 questionnaire | Exact QA1 wording, AI definition, and “don’t know” response |
| src-0040 | ECB SAFE methodology, July 2026 | Sample, exclusions, fieldwork, calibration, and economic weights |
| src-0041 | ECB June 24 staff analysis | Defines “intensive” as significant use; context only |
| src-0042 | Eurostat Statistics Explained article | 2025 overall and firm-size adoption values; Figure 1 Panel C |
| src-0043 | Eurostat ISOC_EB_AI dataset DOI | Canonical dataset and API-backed value check |
| src-0044 | Eurostat ICT-enterprise metadata | Enterprise universe, optional micro coverage, sample, and weighting |
| src-0045 | Census May 26 BTOS story | Current headline context and November 2025 wording break |
| src-0046 | Current BTOS AI-supplement questionnaire | Q23 prior-two-week and Q24 prior-six-month question frames |
| src-0047 | Current BTOS methodology | Target population, exclusions, panels, and weighting |
| src-0048 | CES Working Paper 26-25 | Descriptive 18/32, 57, and latent-class 4 estimates; Figure 1 Panel B |
| src-0049 | Fifth National Economic Census digital-transformation article | China 16.4% context only; not plotted or cross-source compared |

## Value and denominator decisions

### ECB SAFE

The four published weighted shares are 27%, 33%, 31%, and 7%. They total 98%.
SAFE QA1 includes a “don’t know” response, and the results page does not say
that the two-point residual is caused only by rounding. Figure 1 therefore:

- preserves the four values on a true 100-point scale;
- leaves the two-point residual unallocated;
- says it may reflect “don’t know” responses and rounding;
- does not derive a 73% any-use value from 100 minus 27.

The source-specific observation is instead that reported “any use” includes
the very-infrequent and experimental category. The ECB staff blog describes
aggregate use cautiously as “more than 70%.”

### U.S. Census BTOS

The BTOS values are not one funnel:

- 18% and 32% are Q23 summaries for reported use in any business function over
  the prior two weeks. Table C.7 reports 17.9% and 31.2%; the abstract and
  conclusion report 18% and 32%.
- 57% conditions on firms reporting use in at least one of 15 Q24 functions
  over the prior six months.
- 4% is a latent-class working-paper estimate among Q24 functional users. It is
  not a direct response and does not mean use in every function.

The canonical data retain the published 18% and 32% summaries with the table
discrepancy disclosed. Figure 1 plots 18% but not 32%, and visually separates
Q23 all-business use from Q24 functional-user breadth. The paper’s outcome
regressions are descriptive correlations with no causal interpretation.

### Eurostat

The article, dataset, and metadata agree on 2025 values: 19.95% overall, 17.00%
small, 30.36% medium, and 55.03% large. Panel C plots only the three size
classes and labels them as an adoption gradient, not use depth.

The official report and dataset indicators for at least two and at least three
technologies were also located and verified. They are not promoted into the
initial observation file because technology-count breadth is not required for
Figure 1 and is not workflow integration.

### China

The NBS article verifies 16.4% AI use among above-scale enterprises in 2023,
with the article’s sector-specific above-scale definition and original Chinese
wording. The source is promoted only as contextual evidence. No China value is
plotted or treated as comparable with SAFE, Eurostat, or BTOS. The value is
retained in the canonical observation table as an `official-claim`,
`context-only` row so its denominator and non-comparability caveat cannot drift.

## Deferred

| Source or family | Reason |
| --- | --- |
| Eurostat 2026 key-results statistical report | Exact landing page and DOI are verified, but the multi-technology thresholds are not needed for the initial figure |
| NBS Fifth Census yearbook glossary | Official definition source is verified; defer until a China observation module needs the additional concept detail |
| BTOS 2023 AI story | Historical wording is narrower; retain as a future wording-break reference, not a trend point |
| OECD firm-adoption reports and topic pages | Useful comparative context, but not necessary for the first figure |
| METR worker-uplift and time-horizon sources | Measure worker self-report or model capability, not enterprise adoption depth |
| Other 2026 report sources | Outside the narrow Figure 1 and immediate-method scope |

## Rejected for this promotion

| Source or value | Reason |
| --- | --- |
| China 47% cloud/IoT/AI/industrial-internet basket | Combined digital-technology measure, not AI adoption |
| Derived productivity, uplift, or national-return claims | Adoption measures do not establish productivity or causal outcomes |
| Claim “AI adoption is increasing productivity” | Unsupported by the promoted adoption observations |
| BTOS 2023-to-2026 trend without a wording break | Core question changed on 2025-11-17 |
| Automatic normalization of ECB shares to 100 | Would invent allocation of the unreported residual |

## Duplicate or superseded

- July 5 Eurostat newsroom row src-v1-dr-006 is superseded by the fuller
  Statistics Explained article and dataset, src-0042 and src-0043.
- Reuters’ ECB relay src-v2-dr-007 is superseded by the primary ECB results and
  staff analysis, src-0038 and src-0041.
- The July 11 IEA duplicate src-v2-dr-005 maps to canonical src-0009.
- The Reuters LBNL relay src-v2-dr-006 is superseded by canonical primary
  source src-0010.
- The 2025 BTOS Version 4 methodology is superseded by current src-0047.

## Needs human verification or author decision

1. Native-language human review is still recommended for the translation and
   scope note on src-0049. The original NBS URL, displayed date, denominator,
   and wording were verified.
2. An author should decide later whether a downstream analysis should use the
   paper’s 32% employment-weighted summary or Table C.7’s 31.2%. This branch
   preserves 32% as a disclosed, unplotted summary value.
3. Raw SAFE QA1 tabulations would be needed to divide the two-point residual
   between “don’t know,” rounding, or another unpublished category.
4. The live ECB methodology now prints July 2026 without a day. The Census
   methodology at the canonical URL was updated on 2026-08-13, while the
   Census questionnaire prints a revision date rather than a publication date.
   Canonical date fields remain exact, partial, or missing accordingly.

## Not approved by report appearance

The banked Deep Research report remains a research artifact with transient
citations. Its source proposals and extracted values acquired canonical status
only after this primary-URL, metadata, denominator, and wording review.
