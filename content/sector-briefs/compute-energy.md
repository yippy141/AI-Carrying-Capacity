# Compute, Data Centers, Electricity, And Grid Absorption

Status: V0 constraint-module draft. No scored country assessment.

## Why This Module Comes First

AI conversion now depends on physical infrastructure as much as model access. Compute capacity requires chips, servers, data centers, high-density racks, cooling, water, energized load, interconnection, firm power, transmission, latency fit, and local political acceptance. TODO_SOURCE: verify with IEA, DOE/LBNL, NERC, PJM, ERCOT, Berkeley Lab, NDRC, NEA, State Grid, METI/MIC, MOTIE/KEPCO, RTE, utility filings, and corporate filings where relevant.

This module measures the boundary between announced AI ambition and deployable AI capacity. It should not treat national electricity totals, annual renewable claims, or announced data-center investment as proof that AI workloads can be powered at the right site and time.

## Conversion Chain

The compute-energy conversion chain runs from accelerator access to data-center construction, grid interconnection, transformers and substations, cooling and water, firm power, operational commissioning, workload placement, latency suitability, and sustained service reliability.

The central measurement distinction is announced versus contracted versus energized versus AI-ready. TODO_DATA: needs source-backed definitions and values for announced capacity, contracted large-load capacity, interconnection status, energized load, and operational high-density AI load.

## V0 Indicator Families

| Indicator family | Layer | V0 use |
| --- | --- | --- |
| Accelerator access | Frontier access | Chip and packaging access for domestic actors. TODO_SOURCE: needs filings, export-control, and supply-chain sources. |
| Public or subsidized AI compute | Frontier access | Government-backed compute available to firms, researchers, or agencies. TODO_DATA: separate targets from delivered capacity. |
| Energized AI-capable load | Conversion capacity | Operational load suitable for AI workloads. TODO_DATA: missing reviewed values. |
| Contracted-to-energized ratio | Conversion capacity | Bottleneck indicator for speculative or delayed large-load pipelines. TODO_DATA: needs grid-region evidence. |
| Interconnection delay | Conversion capacity | Time from request to commercial operation or load service. TODO_DATA: jurisdiction-specific and not always comparable. |
| Large-load queue saturation | Conversion capacity | Large-load requests relative to system peak or local deliverability. TODO_DATA: needs PJM/ERCOT-style source checks. |
| Firm-power coverage | Conversion capacity | Share of expected AI load backed by dispatchable or hourly matched supply. TODO_DATA: do not count annual PPAs without hourly deliverability evidence. |
| Data-center electricity share | Conversion capacity | Context indicator for scale and local stress. TODO_DATA: define data-center and compute-center boundaries. |
| Water and cooling readiness | Conversion capacity | Site feasibility for high-density racks and thermal management. TODO_DATA: needs local water and cooling evidence. |
| Siting latency fit | Conversion capacity | Whether workload class fits geography. TODO_SOURCE: needed for remote batch versus latency-sensitive inference. |

## Country Hypotheses To Test

The United States may have exceptional private compute investment, cloud depth, and accelerator access while facing regional grid bottlenecks, interconnection delays, permitting conflict, transmission constraints, skilled-trades shortages, and ratepayer disputes. TODO_SOURCE: needs DOE/LBNL, NERC, PJM, ERCOT, Berkeley Lab, utility commission, state siting, and corporate filing evidence.

China may have stronger state capacity to coordinate compute siting, grid planning, and infrastructure buildout, while facing frontier-chip constraints, workload-location mismatch, power-quality constraints, water limits, utilization uncertainty, and independent-validation gaps. TODO_SOURCE: needs NDRC, NEA, State Grid, provincial grid, East Data West Computing, data-center efficiency, chip-access, and independent utilization evidence.

Japan, South Korea, Germany, France, Singapore, and India should be used as comparators where data permit. The relevant comparator question is not general AI ambition; it is whether each system can site, power, cool, connect, and operate AI workloads under local grid, land, water, regulatory, and latency constraints. TODO_SOURCE: needs METI/MIC Watt-Bit materials, MOTIE/KEPCO large-load rules, German and French data-center/grid strategy, Singapore data-center policy, Indian compute mission and power-system materials.

## Measurement Traps

Do not treat announced megawatts as energized megawatts.

Do not treat annual renewable procurement as firm power.

Do not treat national electricity supply as local AI-ready deliverability.

Do not treat data-center count as compute quality.

Do not treat remote compute siting as suitable for every workload.

Do not ignore water, cooling, transformers, substations, transmission, and community acceptance.

## Visual Concepts

- Data-center conversion funnel: announced, permitted, contracted, interconnected, energized, AI-ready.
- Load-pocket map: large-load requests, grid stress, transmission constraints, and reliability risk.
- Firm-power explainer: annual green energy claims versus hourly deliverable power.
- Latency-workload matrix: training, batch inference, public services, robotics, industrial control.
- China-US compute-energy split: private acceleration pathway versus state-coordination pathway, with bottlenecks visible.

## First Source Work Queue

- TODO_SOURCE: IEA global AI and energy/data-center analysis.
- TODO_SOURCE: DOE/LBNL U.S. data-center energy and water reports.
- TODO_SOURCE: Berkeley Lab interconnection queue data.
- TODO_SOURCE: NERC reliability assessments.
- TODO_SOURCE: PJM load forecasts and data-center load materials.
- TODO_SOURCE: ERCOT large-load interconnection materials.
- TODO_SOURCE: NDRC/NEA/national data authorities on East Data West Computing and integrated compute networks.
- TODO_SOURCE: Chinese green data-center and power-grid coordination materials.
- TODO_SOURCE: METI/MIC Watt-Bit, MOTIE/KEPCO large-load, RTE siting, and Germany data-center strategy materials.
- TODO_DATA: source-backed announced, contracted, energized, AI-ready, firm-power, water, cooling, and latency-fit indicators.
