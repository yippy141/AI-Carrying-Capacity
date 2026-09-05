#!/usr/bin/env python3
"""PR-specific scope, not a permanent ban on future application development."""
import argparse,subprocess
from pathlib import Path
from reader_integrity import validate_current_integrity
ROOT=Path(__file__).resolve().parents[1]
ALLOWED=('app/','components/','lib/','scripts/','docs/','reports/','research/reader-edition/','data/profiles/','public/reader/','tests/','.github/workflows/')
FILES={'README.md','PRODUCT.md','DESIGN.md','package.json','package-lock.json','next.config.ts','next-env.d.ts','playwright.config.ts','.gitignore','data/licenses/data_licenses.csv'}
def check(base):
 names=set(subprocess.check_output(['git','diff','--name-only',base],cwd=ROOT,text=True).splitlines())
 names.update(subprocess.check_output(['git','ls-files','--others','--exclude-standard'],cwd=ROOT,text=True).splitlines())
 errors=validate_current_integrity(ROOT)
 for n in sorted(names):
  if n not in FILES and not n.startswith(ALLOWED):errors.append(f'Out-of-scope release path: {n}')
  if any(p in n.lower() for p in ['.pem','.key','credentials','secrets/']):errors.append(f'Credential-like path: {n}')
 return errors
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--base',default='5dcf523e250b1989a92c034d8f4e40706df94051');a=p.parse_args()
 errors=check(a.base)
 if errors:raise SystemExit('\n'.join(errors))
 print('Reader PR scope and immutable current records passed.')
