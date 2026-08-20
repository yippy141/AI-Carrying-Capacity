# Canonical observations

**adoption_depth.csv** is the first canonical, figure-ready observation table
in the Atlas. It stores source-specific measures of enterprise AI adoption,
intensity, and organizational breadth without pretending that the source
families are harmonized.

Every row must preserve its period, denominator, survey universe, source ID,
evidence label, and comparability class. Direct comparison is permitted only
inside one instrument, question frame, universe, period, and denominator.

Allowed **evidence_label** values are observed, official-claim,
qualitative-coded, and estimated.

Allowed **comparability_class** values are:

- directly-comparable
- within-source-only
- not-directly-comparable
- context-only

Run **python3 scripts/validate_adoption_depth.py** after editing this file.
