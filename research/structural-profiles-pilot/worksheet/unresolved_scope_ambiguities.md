# Unresolved scope ambiguities

Only one field class remains unresolved in the blank package:
`lifecycle_phase`. The frozen pathway scope determines the application context,
but it does not uniquely map each leaf to one of the method's lifecycle values
without substantive judgment. Accordingly, all 31 `lifecycle_phase` cells are
blank.

| Pathway | Affected leaf rows | Why a single lifecycle value cannot be assigned from the frozen taxonomy alone |
| --- | ---: | --- |
| `mature_software_delivery_and_maintenance` | 5 | The leaves cross development, verification, deployment, and operations, and the method does not define whether a release-stage label such as `deployment` means `commercial_deployment` in an established production codebase. |
| `discrete_manufacturing_npi_and_operations` | 8 | NPI and operations stages can span development, qualification, scale-up, and operations; the stage names do not by themselves fix the lifecycle boundary for a particular product or factory route. |
| `tokamak_research_to_pilot_plant_demonstration` | 18 | The tokamak pathway intentionally spans research, development, qualification, demonstration, scale-up, and readiness work. Several leaves can serve more than one phase depending on facility and technical route. |

No application-context ambiguity blocks population: each profile uses the
verbatim frozen V1 anchor scope. Software and manufacturing leaves have
`parent_stage_id=not_applicable` because the canonical method freezes no parent
groups for them. Fusion parent references follow the explicit frozen grouping.
All `critical_path_role` values are `not_assessed`, as required until later
coding establishes a role.
