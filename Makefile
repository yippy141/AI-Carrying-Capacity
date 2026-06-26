.PHONY: validate build

validate:
	python3 scripts/validate_repo.py
	python3 scripts/validate_source_register.py
	python3 scripts/validate_indicator_catalog.py

build:
	python3 scripts/build_v0_dataset.py
