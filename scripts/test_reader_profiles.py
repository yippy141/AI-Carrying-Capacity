import csv,sys,unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from build_reader_profiles import build,ROOT
class ReaderProfiles(unittest.TestCase):
 def test_projection_is_deterministic_and_retains_raw_fields(self):
  for name,expected in build().items():
   self.assertEqual((ROOT/'data/profiles'/name).read_bytes(),expected.encode())
 def test_review_rows_are_exact_original_records(self):
  def rows(p):
   with p.open(newline='') as f:return list(csv.DictReader(f))
  original=[]
  for name in ['seed_submission_v1.csv','independent_submission_v1.csv']:
   original+=rows(ROOT/'research/structural-profiles-pilot/reconciliation'/name)
  self.assertEqual(rows(ROOT/'data/profiles/profile_coding_reviews.csv'),original)
