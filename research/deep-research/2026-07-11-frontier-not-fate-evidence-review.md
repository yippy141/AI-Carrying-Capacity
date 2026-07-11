> Status: staged Deep Research output (evaluation pass on the V1 working paper), banked 2026-07-11.
> Citations are unverified transient markers. Do not treat any figure, probability, or source row below
> as canonical evidence until promoted through `data/sources/source_register.csv`.
> Staged extractions: `research/source-register/2026-07-11-deep-research-source-additions.csv`, `data/forecasts/forecast_register.csv` (draft).

# Frontier Is Not Fate

## Executive assessment

**A. Executive assessment**

The working paper’s core intuition is directionally right: a country’s marginal return to advanced AI depends less on frontier capability in the abstract than on whether that capability is **accessible**, **cheap enough**, **reliable enough**, and paired with local complements that let organisations convert it into output. That conclusion is strongly supported by the best current evidence. The strongest support comes from three places. First, capability is improving very quickly in ways that are not well captured by benchmark scores alone: METR’s task-horizon work shows frontier models reaching roughly a **50-minute** 50%-success horizon on timed expert tasks in early 2025, while Thompson and co-authors show that the **cost of achieving a given benchmark level** has been falling by roughly **5× to 10× per year**, with estimated algorithmic efficiency improvements around **3× per year**. Second, adoption is highly uneven even where access exists: U.S. Census-based reporting put business AI use at **20.6%** in June 2026, while an ECB survey found that **more than 70%** of euro-area firms report *some* AI use but only **7%** report *intense* use, and the 2024 European Working Conditions Survey implies worker-level generative-AI adoption averaging **12%**, ranging from **under 3% to 25%** across 35 European countries. Third, the conversion bottlenecks are visible in official and quasi-official data: IMF work emphasises infrastructure, skills, innovation systems, and regulation as complements; IEA and LBNL show that AI infrastructure is already creating real energy and grid constraints; and country surveys from Canada, Italy, and Japan show large adoption gaps even among advanced economies. citeturn14academia4turn15academia1turn12news5turn13news6turn19academia9turn20view0turn24view1turn26view0turn28news2turn41news0turn31news2turn32news0

What is **well supported** already is narrower than many AI narratives imply. The paper can defensibly claim that build-stage effects are large and already measurable; that use-stage diffusion is broadening but remains highly uneven by size, sector, country, and worker skill; that harvest-stage productivity gains are clearest in tightly scoped task settings and in selected occupations, not yet in a way that justifies a clean national-AI-growth attribution; and that distributional effects are beginning to show up first in exposed cognitive and entry-level roles rather than as economy-wide job collapse. IMF research continues to place global job exposure near **40%**, with advanced economies closer to **60%**; the IMF’s 2026 skills work finds wage premia for “new skill” postings in the U.K. and U.S. and weaker employment in regions with higher AI-skill demand in AI-vulnerable occupations; OECD reporting summarised from the 2026 Employment Outlook points in the same direction for younger workers in highly exposed roles; and ILO–World Bank work for Latin America finds that limited digital infrastructure may cap both disruption and gains. citeturn20view0turn22view3turn22view4turn33news0turn33news2

What remains **conceptual or unresolved** is also important. There is not yet credible evidence for a national causal curve linking “frontier lead” to GDP or welfare gains. There is not yet strong audited evidence that sovereign access to domestic frontier models, by itself, materially raises national productivity. And there is not yet enough public evidence to make strong empirical claims about AI’s effects on state capacity or military effectiveness outside narrow operational examples and policy announcements. A sceptical economist would also reject any attempt to convert current benchmark gains directly into national income gains, any use of announced investment totals as if they were realised output effects, and any claim that present national-account movements can be cleanly decomposed into an “AI contribution” without careful input-output and capital-stock work. Those sceptical objections are not fatal to the paper; they imply that the paper should be framed as a **stage-based descriptive and inferential study**, not as a causal macro paper. citeturn14academia0turn14academia7turn15academia0turn21view0turn21view1turn29news2turn32news3turn38news3

**K. Do not claim yet**

Do not claim that AI has already produced a broad national productivity acceleration outside a few tightly measured contexts. Do not claim that countries with frontier-model developers necessarily have higher near-term returns than countries with access to frontier APIs or strong open-weight use. Do not claim that current public-sector pilots prove large state-capacity gains. Do not claim that current layoffs or hiring weakness are cleanly attributable to AI alone. And do not treat Europe’s, Canada’s, or France’s announced AI investment packages as observed buildout outcomes rather than mobilization goals or policy targets. citeturn21view0turn13news5turn29news2turn41news4turn32news3turn38news3

## Revised framework and hypotheses

**B. Revised conceptual framework**

The most defensible revision is to make the paper explicitly about a **conversion chain**:

\[
\text{Frontier capability} \rightarrow \text{Accessible capability} \rightarrow \text{Organisational uptake} \rightarrow \text{Measured output gains} \rightarrow \text{Distribution}
\]

with **conversion capacity** and **adjustment costs** acting as country- and sector-specific filters at every step.

That revision fits the current evidence better than a single AI-readiness story. Frontier systems are improving rapidly, but the evidence base increasingly shows that observed returns depend on access conditions and complements. METR’s task-horizon work and RE-Bench suggest that frontier systems can already perform meaningful knowledge-work and research-engineering subtasks, but returns remain highly sensitive to robustness, time budget, and environment complexity. The “price of progress” work shows why cost-adjusted capability matters more than raw benchmark scores. Meanwhile, IMF, ECB, EWCS, Census, and national-statistics evidence all show that **the same underlying capability shock** converts into very different adoption and use profiles across places and organisations. citeturn14academia4turn14academia0turn15academia1turn20view0turn13news6turn19academia9turn12news5turn41news0turn31news2turn32news0

The paper should therefore distinguish four analytically separate objects.

**Frontier capability** is what the best available systems can do at a given reliability, cost, and task duration. This is observed most cleanly in benchmark suites, price-performance comparisons, and time-horizon evaluations, not in national statistics. citeturn14academia4turn15academia1turn14academia0turn14academia7

**Accessible capability** is what actors in a country can actually use, given export controls, regulation, domestic availability, pricing, cloud access, latency, language support, and open-weight availability. This is where “sovereignty” matters empirically: not because domestic ownership automatically raises welfare, but because access restrictions and procurement rules can shift what is usable, by whom, and at what price. Europe’s productivity discussions, China’s self-sufficiency push, and Canada’s 2026 strategy all point to this layer. citeturn21view0turn18news1turn41news1

**Conversion capacity** is the national and sectoral stock of complements: power, data centres, broadband, firm size, management quality, organisational redesign, finance, sector-specific data, workforce skills, trust, procurement capability, and regulatory clarity. IMF’s AI Preparedness Index is useful here as a complement index rather than a dependent variable, and its 2026 skill-readiness discussion sharpens the labour-market side of conversion capacity. Energy and grid conditions belong here as well, because IEA and LBNL show they are no longer hypothetical constraints. citeturn20view0turn22view3turn22view4turn24view1turn26view0turn28news2

**Outcomes** should be split into four stages rather than pooled: **build**, **use**, **harvest**, and **distribute**. This matters because the evidence is much stronger for build and use than for harvest and distribute. The current data increasingly show visible buildout, rapidly rising but uneven use, limited but real micro-level harvest, and early signs of unequal distribution. citeturn29news2turn26view0turn13news6turn19academia9turn14academia1turn22view4

**C. Testable hypotheses**

The V1 paper can sustain the following hypotheses without overpromising causal identification:

| Hypothesis | Testable implication | Evidence stage | Status as of July 2026 |
|---|---|---|---|
| Countries with higher conversion capacity realise higher adoption and intensive-use rates at a given level of accessible capability | Conditional on exposure and access, adoption and especially *intense* use should be higher where training, digitalisation, firm capabilities, finance, and energy are stronger | Use | Early support citeturn13news6turn19academia9turn20view0turn22view4 |
| Buildout responds more directly to frontier capability and expected rents than harvest does | Capex, data-centre loads, and AI-related investment should move sooner and more visibly than productivity or wages | Build vs harvest | Strong support citeturn29news2turn26view0turn28news2turn23academia11 |
| Output gains rise nonlinearly with adoption intensity, not merely with binary use | “Any AI use” should overstate realised returns relative to sustained or customised use | Use vs harvest | Strong support from ECB survey distinctions citeturn13news6 |
| Countries with access but weak complements will show “frontier without harvest” | Frontier tools accessible, but low uptake, weak organisational redesign, and little productivity movement | Use vs harvest | Supported by country heterogeneity in Canada, Italy, Japan and across Europe citeturn41news0turn31news2turn32news0turn19academia9 |
| Labour-market effects appear first in exposed, standardised, early-career, and routinised cognitive work | Relative employment or hiring softness should show up there before aggregate job losses do | Distribute | Early support, still fragile citeturn22view4turn33news0turn19academia8 |
| Open-weight access and affordable inference can partly substitute for domestic frontier ownership in civilian use cases | Countries without domestic frontier labs can still achieve substantial adoption in many sectors when access and complements are strong | Access vs build | Plausible and consistent with evidence, but not yet directly identified citeturn15academia1turn21view0turn19academia9 |
| State-capacity gains lag private-use gains because procurement, liability, and trust frictions are stronger | Public-sector quality improvements should appear later and in narrower functions than private adoption | State capacity | Conceptually strong, weakly evidenced in public data so far citeturn15academia0turn20view0 |

## Measurement strategy

**Operationalising the x-axis**

The strongest x-axis is **not** raw benchmark performance. Benchmarks by themselves can be misleading because they ignore price and robustness, and recent work shows that capability-at-cost is improving much faster than raw benchmarks alone would suggest. The best core x-axis for this paper is therefore:

**Accessible reliability-adjusted task capability at fixed inference cost and task horizon.** citeturn15academia1turn14academia4

A practical implementation is:

\[
X_{cst} = \sum_{k \in \text{task bundle}_s} w_{sk}
\max_{m \in \mathcal{A}_{ct}}
\Big[ \Pr(\text{success}_{mkt}) \mid \text{cost} \le B,\ \text{time} \le H \Big]
\]

where \( \mathcal{A}_{ct} \) is the set of models legally and economically accessible in country \(c\) at time \(t\), \(B\) is a country-relevant inference budget, and \(H\) is a task-duration cap. This uses the intuition from METR’s time-horizon measure and the cost-adjusted evidence from Thompson and co-authors, while avoiding the mistake of equating frontier lab scores with national returns. citeturn14academia4turn15academia1

Among the candidate x-axes in the prompt, the ranking for V1 should be:

| Candidate x-axis | Recommendation | Why |
|---|---|---|
| Reliability-adjusted task completion | **Primary** | Closest to real work outcomes and compatible with occupation-linked bundles; can be linked to human task taxonomies and time-to-complete measures citeturn14academia4turn33academia5 |
| Capability at fixed inference cost | **Primary sensitivity axis** | Essential because falling price per unit of performance is part of the economic shock, not noise citeturn15academia1 |
| Autonomous task horizon | **Secondary sensitivity axis** | Valuable for long-horizon cognitive work and R&D, but current external validity is still limited citeturn14academia4turn14academia0turn14academia7 |
| Domestic model access | **Access modifier, not core axis** | Important for legally/economically usable capability, but wrong as a direct proxy for realised gains citeturn18news1turn41news1 |
| Open-weight access | **Access modifier** | Important for cost, sovereignty, and experimentation; should enter the access layer rather than replace performance measurement citeturn15academia1 |
| Compute access | **Build-stage modifier** | Important for domestic training and some strategic uses, but not necessary for many adoption outcomes citeturn39academia2turn24view1 |
| Frontier lead relative to competitors | **Strategic-state sensitivity axis** | More relevant for strategic capacity than for broad civilian welfare or productivity returns citeturn39academia2turn18news1 |
| Model benchmark performance | **Do not use alone** | Too detached from price, reliability, and access citeturn15academia1turn14academia4 |

**Operationalising the y-axes and the four evidence stages**

For V1, the y-side should be modular and stage-specific.

| Stage | Y-axis family | Preferred operationalisation | Source class |
|---|---|---|---|
| Build | AI-related GFCF and infrastructure | Data-centre and ICT investment; AI-related structures/equipment/software where distinguishable; power demand; interconnection queues; hyperscaler-related construction | BEA/Fed/Reuters/LBNL/IEA/national accounts citeturn29news2turn28news2turn26view0turn24view1 |
| Use | Adoption and intensity | Share of firms using AI in production; share of workers using GenAI; intensive/customised use; sectoral and size splits | Census BTOS, ECB, EWCS, Eurostat/ISTAT, Statistics Canada, national surveys citeturn12news5turn13news6turn19academia9turn41news0turn31news2turn32news0 |
| Harvest | Productivity, quality, time, innovation | Labour productivity, TFP where credible; task time saved; error reduction; quality metrics; R&D cycle times; research-engineering benchmark performance | BLS/BEA, RCTs, field studies, METR, sector studies citeturn14academia1turn14academia0turn14academia7turn22view4 |
| Distribute | Wages, employment, welfare, strategic capacity | Wage premia, employment by exposure/hiring cohort, consumer surplus/WTP where credible, regional inequality, public-service latency/accuracy, selected strategic proxies | IMF, ILO/WB, OECD/national labour force sources, audited public-service metrics where available citeturn22view4turn33news2turn33news0 |

The paper should also explicitly tag every value as one of five types: **observed data**, **model estimate**, **official target**, **survey response**, or **scenario/commentary**. France’s **€109 billion** announcement, the EU’s **€200 billion** InvestAI initiative, and Canada’s GDP/job projections belong in the **official target / policy announcement** category and should never be mixed with realised outcomes. citeturn32news3turn38news3turn41news4

**G. Indicator and dataset catalog**

The V1 catalog should prioritise a limited set of indicators that can actually be kept comparable across countries and sectors.

| Indicator | Unit | Stage | Geography | Suggested source |
|---|---|---|---|---|
| Business AI use in production | % firms | Use | U.S. monthly; Canada; Italy; EU members where available | Census BTOS; Statistics Canada; ISTAT; Eurostat/national agencies citeturn12news5turn41news0turn31news2 |
| Worker GenAI use | % workers | Use | Europe, U.S. | EWCS; Gallup/other surveys for auxiliary comparison citeturn19academia9turn33news4 |
| Intense AI use | % firms | Use | Euro area | ECB firm survey/blog results citeturn13news6 |
| AI-related electricity demand | TWh, % of total demand | Build | U.S., global, selected countries | IEA; LBNL; EIA; national grid operators when available citeturn26view0turn28news2turn23news1 |
| AI/data-centre capex contribution | pp of GDP growth or % GDP | Build | U.S. | J.P. Morgan via Reuters; BEA-compatible decomposition where feasible citeturn29news2 |
| Accessibility-adjusted task capability | index | X-axis | country-sector-time | Constructed from public model availability, pricing, export-control status, language support, and task benchmarks citeturn15academia1turn14academia4 |
| Conversion capacity index | index | Modifier | country-sector-time | IMF preparedness plus skills, power, digital density, finance, management proxies citeturn20view0turn22view4turn24view1 |
| Entry-level hiring/employment in exposed roles | relative change | Distribute | U.S./OECD | IMF and OECD-linked occupational evidence; labour force/public postings | citeturn22view4turn33news0turn19academia8 |
| R&D acceleration proxy | task score / cycle time | Harvest | global/model or sectoral | METR RE-Bench, MLRC-Bench, domain-specific studies citeturn14academia0turn14academia7 |

## Evidence appraisal

**D. Evidence-quality matrix**

The evidence base is now rich enough for a serious paper, but it is still structurally unbalanced. The strongest evidence is at the micro-task, worker-survey, and infrastructure levels; the weakest is at the national causal-output level.

| Evidence class | Internal validity | External validity | Best use in this paper | What it cannot support |
|---|---|---|---|---|
| Randomised experiments and strong field trials | High | Usually low-to-medium | Task-level productivity, conditions for augmentation vs drag, worker heterogeneity | National GDP claims or unconditional productivity effects citeturn14academia1 |
| Firm/worker panel and repeated survey data | Medium | Medium | Diffusion, intensity, heterogeneity by sector/size/country | Clean causal attribution without stronger instruments citeturn13news6turn19academia9turn12news5 |
| Official national accounts and energy statistics | High for buildout | Medium for AI attribution | Build-stage effects, infrastructure strain, visible capex | Harvest-stage causal claims without decomposition citeturn26view0turn28news2turn23news1 |
| Capability benchmarks and task-horizon studies | Medium | Medium for knowledge work; lower elsewhere | Defining the x-axis, sensitivity analysis, strategic interpretation | Direct welfare or productivity measurement citeturn14academia4turn14academia0turn14academia7 |
| Public-sector pilots and case studies | Low-to-medium | Low | Case-study appendix, mechanism illustration | General claims about state-capacity gains |
| Official targets and investment announcements | None as outcome evidence | N/A | Policy intent, revealed ambition, financing pipeline | Anything about realised returns citeturn32news3turn38news3turn41news4 |

**Review of the strongest 2024–July 2026 empirical evidence**

At the **build** stage, the evidence is already macro-relevant. Reuters’ reporting on J.P. Morgan estimates put data-centre spending at **0.1% to 0.3%** of U.S. GDP growth in 2024 and **10 to 20 basis points** of additional GDP support in 2025–2026. LBNL’s DOE-backed report estimated U.S. data centres at **4.4%** of U.S. electricity consumption in 2023, rising to **6.7% to 12%** by 2028, while the IEA’s 2025 *Energy and AI* report projects global data-centre electricity demand rising from roughly **415 TWh** in 2024 to about **945 TWh** by 2030, with the United States and China accounting for about **80%** of the growth and the U.S. data-centre load representing nearly **half** of U.S. electricity-demand growth to 2030. This is the single strongest part of the paper’s evidence chain. citeturn29news2turn28news2turn26view0turn26view2turn26view4

At the **use** stage, the evidence is strong but not yet harmonised. In the United States, Census-based reporting shows rapid diffusion from very low levels to **20.6%** of businesses by June 2026, with larger firms leading and sectoral concentration in information, professional services, education, some finance, and publishing. In the euro area, the ECB survey implies that extensive-margin use is already broad, but intensive use is still uncommon. The worker-level European evidence is especially valuable because it links exposure to adoption and to country-level training and digitalisation. Canada, Italy, and Japan all show that advanced economies can still lag sharply on use even when they have strong research reputations or high income. citeturn12news5turn13news6turn19academia9turn41news0turn31news2turn32news0

At the **harvest** stage, the correct reading is “promising but patchy.” METR’s 2025 randomised trial found that early-2025 AI coding tools made experienced open-source developers working in familiar codebases **19% slower**, a crucial reminder that task gains are not automatic. On the capability side, RE-Bench shows frontier agents outperforming human experts under short total-time budgets in research-engineering tasks but losing their edge as the time budget lengthens, while MLRC-Bench shows much weaker performance on open-ended ML research problems. In Europe, Henseke finds no detectable effect yet of early worker adoption on reported task restructuring, consistent with a transition stage rather than a completed reorganisation of work. IMF’s 2026 skills evidence is more encouraging on the labour-market side, showing wage premia for emerging skills and employment growth in regions with general new-skill adoption, but notably weaker employment outcomes in regions with stronger AI-skill demand for vulnerable occupations. The harvest stage is therefore real, but still conditional and narrower than the build and use stages. citeturn14academia1turn14academia0turn14academia7turn19academia9turn22view4

At the **distribute** stage, the best evidence points to unevenness rather than collapse. IMF continues to stress within-country inequality risks; OECD’s 2026 reporting points to relative weakness among younger workers in highly exposed occupations; and the ILO–World Bank work on Latin America suggests that weaker digital infrastructure may mute both upside and disruption, implying that low-conversion countries can be partly protected from downside only by also forgoing upside. This is exactly the logic of “frontier is not fate.” citeturn20view0turn22view4turn33news0turn33news2

**Coverage of OECD, METR, Epoch, Stanford HAI, CSET, IMF, ECB, BIS, and national statistics**

For **METR**, the paper should rely directly on time horizons, RE-Bench, and the 2025 software productivity RCT, because these are transparent and reproducible enough to define the capability side while also disciplining hype. For **Epoch/Thompson-style work**, use the cost-adjusted capability lens rather than unadjusted leaderboards. For **IMF**, use the 2024 preparedness and exposure work plus the 2025–2026 blogs on Europe, power, and skill transition. For **ECB**, use the 2026 firm-intensity survey as the cleanest current distinction between any-use and intense-use in Europe. For **BIS**, use its 2026 Annual Economic Report warning on exuberance only as a buildout-risk and macro-finance constraint, not as evidence of realised productivity failure. For **Stanford HAI AI Index 2026**, use it as a background compendium and a source register target, but not as a load-bearing empirical estimate unless the underlying primary source can be traced. For **national statistical agencies**, use them whenever they directly observe enterprise or household use, as in Canada and Italy. For **CSET**, it remains useful for compute, policy mapping, and strategic background, but in this memo I would not use a CSET output as a headline empirical estimate unless it directly enters the capability-access layer and can be linked to primary data. citeturn14academia4turn14academia0turn14academia1turn15academia1turn20view0turn21view0turn21view1turn22view4turn13news6turn16news7turn15academia0turn41news0turn31news2

## Empirical design, figures, and paper outline

**E. Recommended V1 empirical design**

The best V1 design is a **descriptive country–sector panel with explicit non-causal response curves**, backed by matched case studies and a narrow set of event-study appendices where the timing is credible. This is more defensible than pretending to identify a national causal effect.

The unit should be **country × sector × half-year** from roughly 2019 to 2026, starting with a coverage set that is actually observable: United States, Canada, France, Germany, Italy, Spain, the euro area aggregate, the United Kingdom if included as a comparator, Japan, and Korea; optionally China for build/access where official data quality permits. Sector coverage should prioritise information, finance, professional services, education, publishing/media, manufacturing, healthcare, public administration, and utilities. citeturn12news5turn13news6turn19academia9turn41news0turn31news2turn32news0

The main estimating object should be a **response surface**, not a causal coefficient. Concretely, estimate and visualise:

\[
Y_{cst}^{(j)} = f\!\left(X_{cst},\, C_{cst},\, X_{cst}\times C_{cst},\, E_s,\, T_t\right)
\]

where \(Y^{(j)}\) is a stage-specific outcome, \(X\) is the accessible capability index, \(C\) is conversion capacity, \(E_s\) is sector exposure, and \(T_t\) is a common global time shock. Use splines or binscatters rather than a single linear effect. The interpretation is descriptive: “given this accessible capability and this conversion capacity, what outcome range is observed across comparable countries and sectors?” That fits the current evidence base and will survive expert criticism better than a macro-causal claim. citeturn14academia4turn15academia1turn20view0turn13news6turn19academia9

The matched case-study appendix should compare countries that differ on conversion capacity more than on frontier access. Good pairs are **Canada vs United States**, **Italy vs Germany**, and **Japan vs selected northern European economies**. The point is not to “prove” causality, but to show how similar access can yield different use and early-harvest profiles. citeturn41news0turn12news5turn31news2turn32news0turn21view0

Credible event studies should be limited to cases where timing and exposure are observable, such as: occupation-level outcomes before and after ChatGPT/GenAI diffusion by exposure class; BTOS use increases by state/industry; and electricity-price or interconnection effects around major data-centre buildout in highly exposed regions. These should be framed as **auxiliary evidence**, not the paper’s central identification strategy. citeturn22view4turn12news5turn23news2turn28news2

**H. Figure register**

| Figure | Research question | Chart type | X and Y variables | Coverage | Data sources | Expected finding | Uncertainty | Type | Exact reproduction steps |
|---|---|---|---|---|---|---|---|---|---|
| Conversion beats exposure | Does adoption depend more on conversion capacity than exposure alone? | Scatter with sector labels and fitted curves | X: conversion-capacity index; Y: AI-use rate; colour by sector-exposure quintile | 10–15 countries, 8 sectors | IMF preparedness components; Census/ECB/EWCS/StatsCan/ISTAT/Japan survey | High-exposure sectors diverge sharply by conversion capacity | Cross-country comparability | Empirical | Build country-sector panel; normalise conversion variables; merge use-rate series; winsorise 1%; plot sector-weighted points and spline by exposure bin |
| Build without harvest | Are build-stage effects larger and earlier than harvest-stage effects? | Two-panel line chart | Panel A: AI/data-centre energy or capex; Panel B: stage-specific productivity proxies | U.S. plus comparator regions | LBNL, IEA, EIA, BLS/BEA, sector productivity series | Build rises steeply while harvest moves slowly | Attribution of productivity to AI | Empirical | Pull annual/quarterly energy and investment series; index 2022=100; plot against sector productivity or value-added-per-hour for most exposed sectors |
| Extensive vs intensive use | How much of the current “AI adoption boom” is shallow use? | Dumbbell or paired bar chart | X: countries/firms; Y: any AI use vs intense AI use | Euro area firms and selected country comparators | ECB survey; national stats where available | Large gap between adoption and transformative use | Survey definitional mismatch | Empirical | Use ECB measures for euro area; add national enterprise-use rates as contextual comparisons; harmonise “intense” only where definitions allow; clearly mark non-comparable series |
| Accessibility-adjusted frontier | What is the right x-axis over time? | Indexed line chart | X: time; Y: capability index under fixed cost and fixed horizon constraints | Global frontier plus country-access scenarios | METR, public model pricing, Epoch/Thompson cost work | Raw frontier rises fast; accessible cost-adjusted capability rises differently by country-access regime | Model availability/pricing change quickly | Modeled from empirical inputs | Select benchmark/task bundle; estimate best available public model at each date under cost cap; multiply by country-access mask; plot U.S./EU/Canada/Japan stylised paths |
| Uneven labour adjustment | Where do distributional effects show up first? | Event-study style coefficient plot or grouped bars | X: exposure/hiring cohort; Y: employment or hiring change relative to baseline | U.S. and OECD comparators | IMF skills blog evidence, OECD 2026 outlook summaries, CPS/job-posting appendices | Entry-level and highly exposed cognitive jobs soften first | AI attribution vs macro cycle | Empirical | Classify occupations by exposure; split by early-career intensity; estimate relative post-2022 changes with controls; present as descriptive associations |
| Energy as conversion bottleneck | Is electricity now a first-order conversion variable? | Stacked regional bar chart with annotation | X: region/country; Y: projected data-centre electricity growth and share of total demand growth | U.S., China, Europe, Japan | IEA 2025, LBNL/Reuters for U.S. | Buildout potential is now partly energy-constrained | Projections depend on uptake scenarios | Empirical plus modeled | Extract IEA regional growth figures and U.S. LBNL ranges; stack absolute TWh growth with labels for share of total electricity-growth contribution |
| Frontier is not fate map | Which countries are most likely to under-convert accessible frontier AI? | Quadrant chart | X: accessible capability; Y: conversion capacity; bubble size: current intensive use or buildout | 10–15 countries | Constructed access index + IMF + national adoption/buildout indicators | Countries cluster into frontier leaders, fast converters, under-converters, and infrastructure-constrained adopters | Access index construction | Modeled from empirical inputs | Standardise access variables; build simple weighted index; merge with conversion and use/build variables; define quadrants by medians or theory-driven thresholds |

**J. Recommended working-paper outline**

A V1 outline that fits the evidence is:

1. Introduction: Frontier is not fate  
2. Conceptual framework: access, conversion, stages, and adjustment costs  
3. Measurement: defining accessible capability and conversion capacity  
4. Data and scope: country–sector descriptive panel  
5. Build: infrastructure, capex, power, and compute concentration  
6. Use: adoption and intensive use across firms, workers, and states  
7. Harvest: micro productivity, innovation acceleration, and where evidence is strongest  
8. Distribute: wage, employment, welfare, and regional inequality  
9. Matched case studies  
10. Why national causal identification is not yet credible  
11. Forecasting tests for 2027–2030  
12. Policy implications and research agenda

## Registers, forecasts, and research plan

**E. Source register additions, CSV-compatible**

The rows below are deliberately selective and prioritised for V1. URLs and DOIs are included directly so that each numerical claim can be traced.

```csv
source_id,short_citation,source_type,geography,stage,strongest_use,url_or_doi,notes
S001,IMF 2024 Gen-AI and the Future of Work,official discussion note,global,framework/exposure,AI exposure and preparedness,https://doi.org/10.5089/9798400262548.006,Use for exposure and preparedness not realised output
S002,IMF 2025 AI Needs More Abundant Power Supplies,official blog/global macro,global,build,power-demand constraints,https://www.imf.org/en/blogs/articles/2025/05/13/ai-needs-more-abundant-power-supplies-to-keep-driving-economic-growth,Contains OPEC-based electricity numbers and links to WEO feature
S003,IMF 2025 Europe Growth Dividend,official blog,Europe,framework/harvest,complements and productivity scenarios,https://www.imf.org/en/blogs/articles/2025/11/20/how-europe-can-capture-the-ai-growth-dividend,Scenario/model estimate not observed outcome
S004,IMF 2026 New Skills and AI,official blog,multi-country,distribute/harvest,skills transition and wage/employment patterns,https://www.imf.org/en/blogs/articles/2026/01/14/new-skills-and-ai-are-reshaping-the-future-of-work,Useful for labour-market mechanisms
S005,IEA 2025 Energy and AI,official report,global,build,electricity demand and regional concentration,https://www.iea.org/reports/energy-and-ai,Primary source for AI-energy buildout
S006,LBNL 2024 U.S. Data Center Energy Usage via Reuters,official-report reporting,U.S.,build,U.S. data-center electricity share,https://www.reuters.com/business/energy/us-data-center-power-use-could-nearly-triple-by-2028-doe-backed-report-says-2024-12-20/,Use until direct PDF ingestion is cleaner
S007,ECB 2026 firm AI intensity survey,official research blog/euro area,euro area,use,any-use versus intense-use distinction,https://www.reuters.com/business/intense-ai-use-still-rare-among-euro-zone-firms-ecb-researchers-find-2026-06-24/,Key stage-separation input
S008,Henseke 2026 Generative AI at Work,working paper,Europe,use/harvest,worker-level adoption heterogeneity,https://arxiv.org/abs/2604.18849,Best current cross-country worker adoption study
S009,METR 2025 Long Tasks,working paper,global capability,x-axis,time-horizon metric,https://arxiv.org/abs/2503.14499,Primary x-axis support
S010,Becker et al. 2025 OSS Productivity RCT,working paper,U.S./software,harvest,task-level productivity under real use,https://arxiv.org/abs/2507.09089,Best cautionary RCT against universal productivity claims
S011,Wijk et al. 2024 RE-Bench,working paper,global capability,harvest/R&D,research-engineering capability,https://arxiv.org/abs/2411.15114,Use as capability not output evidence
S012,Zhang et al. 2025 MLRC-Bench,working paper,global capability,harvest/R&D,limits on frontier models in open-ended research,https://arxiv.org/abs/2504.09702,Useful check on overclaiming AI R&D acceleration
S013,Gundlach et al. 2025 Price of Progress,working paper,global capability,x-axis,cost-adjusted capability trends,https://arxiv.org/abs/2511.23455,Essential for fixed-cost axis
S014,AI Index 2026,flagship compendium,global,background,investment/adoption references,https://arxiv.org/abs/2606.15708,Use only with underlying-source tracing for headline stats
S015,Canada AI strategy reporting 2026,official-policy reporting,Canada,use/framework,official target versus observed adoption,https://www.reuters.com/business/world-at-work/canada-says-ai-strategy-will-help-create-250000-jobs-boost-gdp-by-3-2026-06-04/,Treat GDP and jobs claims as official targets
S016,Italy ISTAT enterprise AI reporting 2025,official-stat reporting,Italy,use,national enterprise adoption numbers,https://www.reuters.com/business/just-8-italian-enterprises-using-ai-many-people-lack-digital-know-how-2025-05-21/,National statistical agency output summarised by Reuters
S017,Japan firm AI survey 2024,credible survey reporting,Japan,use,adoption gap and barriers,https://www.reuters.com/technology/artificial-intelligence/more-than-40-japanese-companies-have-no-plan-make-use-ai-2024-07-17/,Good descriptive comparator
S018,ILO-World Bank 2024 Latin America AI exposure,official international study,Latin America,distribute/exposure,low-conversion-country exposure bounds,https://www.reuters.com/technology/artificial-intelligence/ai-could-eliminate-up-5-jobs-latin-america-study-finds-2024-07-31/,Useful for development comparison
S019,BIS 2026 Annual Economic Report on AI exuberance,official macro-financial,global,build/risks,financing-risk constraint,https://www.reuters.com/business/finance/global-markets-bis-pix-2026-06-28/,Use as macro-finance constraint not productivity evidence
S020,Trends in AI Supercomputers 2025,working paper,global capability/build,build,compute concentration and power needs,https://arxiv.org/abs/2504.16026,Useful for strategic and access layers
```

**F. Claim-ledger additions and revisions, CSV-compatible**

```csv
claim_id,claim_text,status,evidence_type,primary_source_id,skeptical_economist_note
C001,National returns to advanced AI vary substantially with conversion capacity rather than frontier capability alone,add-supported,mixed official+survey+working papers,S001,Supported descriptively; not yet causally identified
C002,Build-stage effects are already visible in national macro and energy data,add-supported,official statistics/reporting,S005,Strong for infrastructure; weak for final-output attribution
C003,Any-use adoption metrics materially overstate transformative use,add-supported,official survey,S007,Intense-use distinction is crucial
C004,Benchmark scores alone are a poor x-axis for national economic analysis,add-supported,working paper,S013,Price-adjusted performance changes the ordering
C005,Autonomous task horizon is useful but should be a sensitivity measure rather than the sole x-axis,add-supported,working paper,S009,External validity still limited beyond measured task families
C006,Current evidence does not support a clean national causal effect of frontier-model access on GDP,rewrite-as-caution,assessment,S001,Must not overclaim from cross-country readiness data
C007,Domestic frontier-model ownership is neither necessary nor sufficient for large civilian returns,add-supported-inference,inference from multi-source evidence,S003,Inference supported by access/use heterogeneity, not direct causal estimate
C008,Large productivity gains are clearest in specific tasks and occupations rather than in broad national aggregates,add-supported,RCT+worker surveys,S010,This is the safest harvest-stage statement
C009,Adjustment costs appear first in exposed and early-career cognitive work,add-supported,official blog+OECD reporting,S004,Still early and should be framed as relative softness not mass displacement
C010,AI infrastructure is now constrained by electricity, grid connection, and local siting,add-supported,official report,S005,Core conversion-capacity variable
C011,State-capacity gains from AI are currently undermeasured and should not be a headline empirical claim,add-caution,assessment,S014,Needs audited service metrics before strong claims
C012,Official investment announcements should be tagged as targets not outcomes,add-supported,official policy reporting,S015,Essential bookkeeping rule for paper credibility
```

**I. Forecast-question register**

| Forecast question | Resolution criteria | Resolution source | Initial probability range | Relevance to framework | Update triggers |
|---|---|---|---|---|---|
| Will U.S. business AI use in the Census BTOS reach at least **35%** in any month of 2027? | BTOS reports current use ≥35% of firms | U.S. Census BTOS releases | 45–60% | Tests extensive-margin diffusion in a high-access, high-conversion economy | Major price declines; regulatory shocks; recession |
| Will at least **15%** of euro-area firms report **intense** AI use by end-2028? | ECB repeat survey or equivalent shows intense-use share ≥15% | ECB firm survey/blog or published paper | 30–45% | Tests whether Europe moves from use to harvest | Cheaper inference; major EU procurement push; power constraints |
| Will Canada’s business AI use reach **20%** by end-2028? | Official Canadian business survey shows share ≥20% | Statistics Canada or official strategy tracker | 40–55% | Tests whether sovereign-AI strategy closes the conversion gap | Public compute rollout; training uptake; SME incentives |
| Will Italy’s enterprise AI use exceed **25%** by end-2030? | ISTAT or Eurostat enterprise-use figure >25% | ISTAT / Eurostat | 35–50% | Tests late-converter pathway in an advanced economy | Digital-skills changes; SME support; macro slowdown |
| Will U.S. data centres consume at least **10%** of U.S. electricity by 2028? | Official or DOE/LBNL-endorsed estimate reaches ≥10% | LBNL/DOE/EIA | 40–55% | Tests whether build-stage constraints intensify | Chip availability; siting delays; efficiency gains |
| Will global accessible frontier task horizon exceed **8 hours** at 50% success on a METR-like measure by end-2028? | Public evaluation reports ≥8h 50%-horizon or equivalent reproducible benchmark | METR or comparable public evaluation | 50–65% | Direct x-axis test of capability progression | New reasoning/autonomy jumps; benchmark redesign |
| Will open-weight models reach within **20%** of leading closed models on the paper’s fixed-cost task bundle by end-2028? | Constructed capability-at-cost index gap ≤20% | Public model evaluations and pricing | 35–50% | Tests substitution between open access and sovereign/closed access | Major open-weight releases; distillation restrictions |
| Will worker-level GenAI adoption in Europe exceed **25%** in the next EWCS-style cross-country release? | Worker survey average >25% | EWCS successor or harmonised official survey | 40–55% | Tests use-stage steepening | Employer policy liberalisation; legal restrictions |
| Will at least one major tax, customs, or benefits agency publish an audited result showing **≥20%** reduction in processing time from AI by end-2029? | Official audit or evaluation verifies ≥20% reduction attributable to AI deployment | National audit office / ministry evaluation | 30–45% | Tests state-capacity branch of framework | Procurement changes; public backlash; audit publication |
| Will highly exposed entry-level cognitive occupations in at least one G7 economy show a **≥5 percentage point** worse employment or hiring outcome than low-exposure peers by 2028? | Official labour/posting data with transparent exposure grouping show differential ≥5 pp | IMF/OECD/national labour agencies or public datasets | 45–60% | Tests distribute-stage concentration of adjustment costs | Macro recession; immigration changes; labour regulation |

**Three headline findings likely to survive criticism**

The safest headline findings are these.

First, **the marginal return to frontier AI is mediated more by conversion capacity than by frontier access alone**. That is the central empirical implication of the uneven diffusion data across the U.S., euro area, Canada, Italy, Japan, and worker-level Europe. citeturn12news5turn13news6turn19academia9turn41news0turn31news2turn32news0

Second, **the build stage is already visible in macro and infrastructure statistics, but the harvest stage is not yet broad enough to justify large national productivity claims**. That distinction is exactly what the current energy, capex, and micro-productivity evidence implies. citeturn29news2turn26view0turn28news2turn14academia1turn19academia9turn22view4

Third, **the earliest adjustment costs are concentrated rather than aggregate**: in power systems, grid queues, exposed cognitive work, and younger or entry-level roles, rather than in economy-wide unemployment collapses. citeturn26view3turn23news2turn22view4turn33news0

**L. Prioritised six-week research plan**

Week one should lock the ontology and bookkeeping. Finalise the stage structure, the observed/modelled/target taxonomy, the access layer, and the core x-axis. Build the source register using the items above and determine exactly which countries and sectors have enough data to stay in-sample. citeturn20view0turn15academia1turn14academia4

Week two should build the **use-stage panel**. Pull and harmonise U.S. BTOS, ECB intensity measures, EWCS worker adoption, Canada, Italy, and Japan comparators. This is the backbone of the paper. citeturn12news5turn13news6turn19academia9turn41news0turn31news2turn32news0

Week three should build the **build-stage panel**. Ingest IEA, LBNL/DOE, EIA, and selected capex proxies. Produce the first versions of the infrastructure and power figures. This is where the paper will be strongest empirically. citeturn26view0turn28news2turn23news1

Week four should assemble the **harvest and distribute annexes**. Code the RCT and firm/worker evidence into a structured evidence matrix with columns for setting, internal validity, outcome type, and external validity. Build the occupation-level exposure appendix and the “do not claim yet” guardrails. citeturn14academia1turn14academia0turn14academia7turn22view4turn33news0turn33news2

Week five should produce the **V1 figures and response-surface results**. No causal language. Focus on descriptive gradients, stage comparisons, and matched case studies. Stress-test whether every figure still works if France/EU/Canada investment announcements are excluded as outcomes and treated only as policy intent. citeturn32news3turn38news3turn41news4

Week six should draft the paper, forecast register, and interactive product. The interactive should allow users to toggle countries, sectors, stage, and outcome type; switch the x-axis between raw frontier, fixed-cost capability, and accessible capability; and view observed versus announced measures separately. The working paper should close by explicitly stating that the first generation of national AI-return analysis is about **conversion heterogeneity**, not about proving a single causal macro elasticity. citeturn15academia1turn14academia4turn20view0