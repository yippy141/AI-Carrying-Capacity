# Agent Instructions

All AI assistants working in this repo must follow `docs/AGENT_BRIEF.md`.

Core rules:

- Do not fabricate data, citations, or indicator values.
- Mark missing values as missing.
- Mark estimates and qualitative coding explicitly.
- Keep frontier access, conversion capacity, adaptation capacity, distribution quality, and realized outcomes separate.
- Treat China-US claims as hypotheses to test, not conclusions to assume.
- Do not create a single national score unless the methodology explicitly supports it.
- Update `docs/DECISIONS.md` for methodology, naming, scoring, or architecture decisions.
- Update `docs/TASKS.md` when tasks are completed or discovered.
- Run `python3 scripts/validate_repo.py` after scaffold or data-structure changes.
- Do not add secrets, tokens, API keys, or private credentials.
