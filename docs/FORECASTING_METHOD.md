# Forecasting Method

Status: scenario-method note. This is not a probability model.

## Purpose

The Atlas will eventually include strategic scenario reasoning. That tool should help users examine assumptions. It should not pretend to forecast AGI, national victory, sabotage, war, productivity, or welfare.

## Core Rule

```text
Scenario reasoning tool, not a forecast.
```

No V0 scenario should display probabilities, expected values, country winners, or a single recommended outcome.

## What Forecasting Commentary Can Do

Expert commentary, LessWrong-style essays, Substack posts, and strategic forecasts may be useful for framing assumptions. They can help identify variables, failure modes, and scenario branches.

They cannot support empirical indicator values unless they contain reviewed data or a formal method that is separately documented.

## Forecasting Principles

1. Trend extrapolation is a starting point, not an answer.
2. Explicit models are useful because they expose sensitive assumptions.
3. Scenario forecasts help reveal contradictions.
4. Short-term geopolitical base rates do not settle long-horizon technology questions.
5. Weirdness is not evidence against plausibility by itself.
6. Separate frontier capability, deployment, strategic reaction, and realized outcomes.
7. Keep open-model diffusion separate from closed frontier leadership.
8. Treat compute, energy, chips, and latency as physical constraints.
9. Treat labor, legitimacy, and feedback capacity as social constraints.
10. Show what would change each scenario.

## Scenario Card Schema

A V0 scenario card should include:

- trigger;
- assumptions;
- China options;
- U.S. options;
- escalation channels;
- conversion-capacity implication;
- evidence state;
- what would change this scenario;
- source IDs or TODO source markers.

## Prohibited UI Patterns

- No probability labels.
- No match score presented as confidence.
- No single winning scenario.
- No country victory language.
- No AGI-timeline claim without source review.
- No empirical indicator value from commentary-only sources.

## Recommended UI Language

Use this language in the scenario page and component:

> This is not a forecast. No probabilities are estimated. The tool shows which assumptions activate which strategic pathways.

## Source Treatment

Source types should map to scenario use like this:

| Source kind | Allowed V0 use |
| --- | --- |
| Official strategy | Policy intent or stated options |
| Law or regulation | Binding rule or institutional constraint |
| Dataset | Empirical indicator or scenario signpost |
| Peer-reviewed paper | Method, mechanism, or empirical finding |
| Think tank report | Scenario frame or evidence, depending on method |
| Expert commentary | Scenario framing only |
| Media report | Lead or contextual note unless independently verified |
| Placeholder | Never public evidence |

## Launch Rule

The public V0 can include a scenario assumption browser only after it clearly says it is not a forecast and after its cards show evidence state, caveats, and source status.
