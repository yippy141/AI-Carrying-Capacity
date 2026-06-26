# Scripts

Scripts should be small and reproducible.

Current scripts:

- `validate_repo.py`: validates scaffold files, CSV headers, and placeholder JSON.
- `validate_source_register.py`: validates source register columns, unique source IDs, reliability tiers, and disallowed Wikipedia sources.
- `validate_indicator_catalog.py`: validates indicator columns, unique indicator IDs, source ID references, data quality values, and score evidence rules.
- `build_v0_dataset.py`: builds V0 processed metadata JSON from the validated CSV registers.

Future scripts can live in:

- `ingest/`
- `build-dataset/`
- `validation/`
