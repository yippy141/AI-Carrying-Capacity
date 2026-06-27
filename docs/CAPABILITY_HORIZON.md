# Capability Horizon

Status: V0 concept module. This is upstream of country scoring and should not be used as a national rank.

## Purpose

The Atlas needs a way to discuss frontier-model progress without confusing it with societal conversion capacity.

Capability horizon asks: **what kinds of tasks can frontier systems perform, for how long, and in which domains?**

Conversion capacity asks: **can firms, states, labs, workers, infrastructure, and institutions turn those capabilities into repeated real-world outcomes?**

The gap between the two is the conversion problem.

## Core Distinction

```text
Capability horizon ≠ conversion capacity
```

A model may have a long horizon in software or reasoning tasks while still producing little near-term change in factories, hospitals, courts, public services, or logistics systems. Physical deployment, regulation, procurement, data access, safety assurance, worker adaptation, and infrastructure can all slow conversion.

## How To Use METR-Style Evidence

METR-style time-horizon work should be used to reason about the **task autonomy frontier**. It should not be treated as country-level conversion evidence.

Use it for:

- domain sensitivity to frontier progress;
- estimates of where autonomous digital work may matter first;
- scenario assumptions about frontier lead size;
- caveats about jagged capability across domains.

Do not use it for:

- country scores;
- claims that a society has converted AI well;
- realized productivity outcomes;
- public-service or manufacturing impact without separate deployment evidence.

TODO_SOURCE: add canonical source row for METR time-horizon methodology before public launch.

## How To Use Epoch-Style Evidence

Epoch-style scaling and data-center work should be used for the **frontier-access and compute-energy boundary** layers.

Use it for:

- scaling-constraint assumptions;
- compute, chip, power, data, and latency constraints;
- uncertainty language around infrastructure estimates;
- scenario signposts about physical bottlenecks.

Do not use it for:

- direct country-conversion scores;
- claims of realized welfare or productivity;
- unreviewed data-center values in public charts.

TODO_SOURCE: add canonical source rows for Epoch scaling and data-center datasets before public launch.

## Domain Table

| Domain | Frontier sensitivity | Conversion drag | V0 status |
| --- | --- | --- | --- |
| Software engineering | high | medium | framework only |
| AI R&D | high | medium | framework only |
| Scientific QA and math | high | high | framework only |
| Agentic computer use | medium | high | framework only |
| Cyber and intelligence | high | medium | low public observability |
| Manufacturing and robotics | medium | very high | V0 module |
| Healthcare administration | medium | very high | future module |
| Public services | medium | high | future module |
| Autonomous driving and physical autonomy | medium | very high | future module |

These are conceptual placements. They require reviewed source rows and documented coding rules before becoming product labels.

## Visual Spec

A future visual should show four layers:

```text
frontier capability growth
        ↓
domain capability horizon
        ↓
conversion drag
        ↓
realized outcome evidence
```

The visual should make clear that a frontier lead matters most where capability horizons are long and conversion drag is low. It matters least, or at least later, where physical, institutional, or legitimacy constraints dominate.

## Product Rule

Capability-horizon material may appear in the public pilot only if:

- it is labeled as upstream capability evidence;
- it is not treated as a country score;
- METR/Epoch sources have canonical source IDs;
- domain labels carry uncertainty notes;
- the page says capability growth can outrun institutional absorption.
