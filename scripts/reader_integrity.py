"""Current immutable evidence boundary, separate from historical whole-tree scope."""
import hashlib
import json
from pathlib import Path

MANIFEST = Path(__file__).resolve().parents[1] / 'docs/archive/reader-baseline/integrity.json'

def validate_current_integrity(root: Path) -> list[str]:
    manifest = json.loads(MANIFEST.read_text())
    errors = []
    for name, expected in manifest['immutable_files'].items():
        path = root / name
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
            errors.append(f'Immutable research snapshot changed: {name}')
    for name, item in manifest['append_only_files'].items():
        path = root / name
        if not path.is_file() or hashlib.sha256(path.read_bytes()[:item['bytes']]).hexdigest() != item['sha256']:
            errors.append(f'Accepted register prefix changed: {name}')
    return errors
