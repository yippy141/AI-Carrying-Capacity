"""Exercise original nested hashes against the actual immutable PR #42 snapshot."""
import json,subprocess,sys,tarfile,tempfile,unittest,io
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BASE=json.loads((ROOT/'docs/archive/reader-baseline/integrity.json').read_text())['base_commit']
class HistoricalSnapshot(unittest.TestCase):
 def test_original_nested_manifests_without_rehashing(self):
  with tempfile.TemporaryDirectory() as temp:
   data=subprocess.check_output(['git','archive',BASE],cwd=ROOT)
   with tarfile.open(fileobj=io.BytesIO(data)) as archive:archive.extractall(temp,filter='data')
   result=subprocess.run([sys.executable,'-c','import sys;sys.path.insert(0,"scripts");import validate_targeted_s5_adjudication as s; errors=s.validate_protected_inputs();assert not errors,errors;print("Original source/domain/S5 protected-input hashes passed")'],cwd=temp,capture_output=True,text=True)
   self.assertEqual(result.returncode,0,result.stdout+result.stderr)
 def test_archived_validators_match_original_bytes(self):
  for name in ['validate_fusion_source_promotion.py','validate_fusion_domain_review.py','validate_targeted_s5_adjudication.py']:
   self.assertEqual((ROOT/'scripts/archive/reader-baseline'/name).read_bytes(),subprocess.check_output(['git','show',f'{BASE}:scripts/{name}'],cwd=ROOT))
