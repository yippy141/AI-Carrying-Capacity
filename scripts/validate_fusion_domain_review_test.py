#!/usr/bin/env python3
"""Adversarial regression tests for the bounded issue #39 review package."""
from __future__ import annotations

import copy
import json
import shutil
import sys
import tempfile
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT / 'scripts'))
import validate_fusion_domain_review as review  # noqa: E402
import validate_fusion_source_promotion as promotion  # noqa: E402


class DomainReviewTest(unittest.TestCase):
    def setUp(self):
        self.package = ROOT / review.PACKAGE
        self.profiles, self.dimensions, self.experts = [
            review.read_rows(self.package / f) for f in (review.PROFILE_FILE,review.DIMENSION_FILE,review.EXPERT_FILE)
        ]

    def errors(self):
        return '\n'.join(review.validate_records(self.profiles,self.dimensions,self.experts))

    def test_complete_package_and_nonoverlapping_disposition_denominator(self):
        result = review.validate()
        self.assertEqual(sum(result['dispositions'].values()),90)
        self.assertEqual(sum(result['confidence'].values()),90)
        self.assertEqual(result['range_form'],31)
        self.assertEqual(result['owner_exceptions'],28)
        self.assertEqual(result['expert_packages'],6)
        self.assertLess(result['owner_exceptions'],90)
        self.assertEqual(result['human_experts'],len(self.experts))

    def test_pm_corrections_and_accepted_88_freeze(self):
        by_key={(r['profile_id'],r['dimension']):r for r in self.dimensions}
        for key, expected in review.PM_CORRECTIONS.items():
            with self.subTest(key=key):
                self.assertEqual({field:by_key[key][field] for field in expected},expected)
        original=by_key['sp-0014','S1']['reason']
        by_key['sp-0014','S1']['reason']='unauthorized reopening of an accepted row'
        self.assertIn('88 accepted dimension rows',self.errors())
        by_key['sp-0014','S1']['reason']=original
        by_key['sp-0027','S2']['recommended_low']='0'
        self.assertIn('PM correction changed',self.errors())

    def test_exact_profile_and_cell_coverage(self):
        for target in ('profiles','dimensions'):
            original = copy.deepcopy(getattr(self,target))
            for operation in ('missing','duplicate','wrong_scope'):
                with self.subTest(target=target,operation=operation):
                    rows=copy.deepcopy(original)
                    if operation=='missing': rows.pop()
                    elif operation=='duplicate': rows[-1]=copy.deepcopy(rows[0])
                    else: rows[-1]['profile_id']='sp-0001'
                    setattr(self,target,rows)
                    self.assertIn('Exactly',self.errors())
            setattr(self,target,original)

    def test_no_added_composite_or_approval_columns(self):
        for field,value in [('S_average','2.5'),('sector_score','1'),('coding_status','approved'),('review_status','canonical')]:
            with self.subTest(field=field):
                self.dimensions[0][field]=value
                self.assertIn('exact schema',self.errors())
                del self.dimensions[0][field]

    def test_raw_values_rationales_and_missing_source_ids_preserved(self):
        for field,value in [('seed_value','0'),('independent_value','0'),('seed_rationale','rewritten'),('independent_source_ids','fusion-src-028')]:
            with self.subTest(field=field):
                before=self.dimensions[0][field];self.dimensions[0][field]=value
                self.assertIn('preserved',self.errors());self.dimensions[0][field]=before

    def test_owner_decisions_cannot_be_reinterpreted_or_selected(self):
        row=next(r for r in self.dimensions if r['owner_disposition'])
        for field,value in [('owner_disposition','prefer_seed'),('owner_rationale','model rewrites the owner'),('owner_selected_s_value','1')]:
            if row[field]==value: value='needs_domain_review'
            with self.subTest(field=field):
                before=row[field];row[field]=value
                self.assertIn('preserved owner',self.errors());row[field]=before

    def test_ordinal_range_confidence_and_disposition_contracts(self):
        for field,value,message in [('recommended_low','2.5','ordinal integer'),('recommended_high','5','ordinal integer'),('recommended_low','4','inverted recommended range'),('recommendation_confidence','certain','invalid confidence'),('disposition','approved','invalid disposition'),('current_range_low','1','current range changed')]:
            row=self.dimensions[1]
            with self.subTest(field=field,value=value):
                before=row[field];row[field]=value
                self.assertIn(message,self.errors());row[field]=before

    def test_canonical_source_resolution_and_exclusions(self):
        for sid in ('fusion-src-013','fusion-src-015','fusion-src-999','src-0001'):
            with self.subTest(sid=sid):
                before=self.dimensions[0]['source_ids'];self.dimensions[0]['source_ids']=sid
                self.assertIn('not in reviewed canonical fusion set',self.errors());self.dimensions[0]['source_ids']=before

    def test_source_maturity_locator_and_use_restrictions_survive(self):
        row=self.dimensions[0]; original=row['source_assessments']
        for field,value,message in [('maturity','observed experimental result','source maturity upgraded'),('locator','invented locator','source locator changed'),('use_limit','unrestricted use','promotion use restriction lost')]:
            with self.subTest(field=field):
                values=json.loads(original);values[0][field]=value;row['source_assessments']=json.dumps(values)
                self.assertIn(message,self.errors());row['source_assessments']=original

    def test_stellarator_cannot_be_silently_pooled(self):
        row=next(r for r in self.dimensions if 'fusion-src-032' in r['source_ids'])
        values=json.loads(row['source_assessments'])
        next(a for a in values if a['source_id']=='fusion-src-032')['relation']='exact_stage'
        row['source_assessments']=json.dumps(values)
        self.assertIn('stellarator evidence silently pooled',self.errors())

    def test_frozen_scope_and_profile_summary_are_enforced(self):
        self.dimensions[0]['lifecycle_phase']='commercial_deployment'
        self.assertIn('frozen scope changed',self.errors())
        self.profiles[0]['S1_assessment']='{"S_average": 4}'
        self.assertIn('structured profile assessment differs',self.errors())

    def test_no_false_provenance_or_named_human_review(self):
        self.dimensions[0]['reviewer_type']='human_fusion_expert'
        self.assertIn('false/missing provenance',self.errors())
        self.experts[0]['named_reviewer']='GPT-5.6 Sol'
        self.assertIn('false named-human sign-off',self.errors())

    def test_s5_requires_explicit_unverified_boundary_and_no_adjudication(self):
        row=next(r for r in self.dimensions if r['dimension']=='S5')
        for field,value,message in [('s5_next_boundary','','explicit bounded S5'),('s5_excluded_consequences','','explicit bounded S5'),('s5_boundary_status','verified','falsely verified'),('s5_adjudication_performed','true','out of scope'),('s5_backlog_status','complete','backlog snapshot changed')]:
            with self.subTest(field=field):
                before=row[field];row[field]=value
                self.assertIn(message,self.errors());row[field]=before

    def test_nine_gaps_cannot_disappear(self):
        row=next(r for r in self.dimensions if r['unresolved_gap_ids']=='gap-02')
        row['unresolved_gap_ids']='none'
        self.assertIn('load-bearing gap lost',self.errors())

    def test_exception_and_expert_queues_cannot_omit_or_inflate(self):
        original=copy.deepcopy(self.experts)
        self.experts.pop()
        self.assertIn('exactly match material',self.errors())
        self.experts=original
        self.dimensions[0]['owner_exception']='true'
        self.assertIn('only genuine exceptions',self.errors())
        self.experts.append({**self.experts[0],'profile_id':'sp-0014','dimension':'S1'})
        self.assertIn('exactly match material',self.errors())

    def test_six_expert_packages_and_draft_use_contract(self):
        expected={cell:package_id for package_id,package in review.EXPERT_PACKAGES.items() for cell in package['cells']}
        actual={(r['profile_id'],r['dimension']):r['expert_package_id'] for r in self.experts}
        self.assertEqual(actual,expected)
        self.assertEqual({r['blocking_stage'] for r in self.experts},{'canonical_approval'})
        self.assertEqual({r['draft_use_status'] for r in self.experts},{'allowed_as_expert_coded_draft'})
        for field,value,message in [('expert_package_id','EXP-FUS-99','incorrect expert outreach package'),('blocking_stage','private_use','block canonical approval'),('draft_use_status','blocked','draft-use contract changed')]:
            with self.subTest(field=field):
                before=self.experts[0][field];self.experts[0][field]=value
                self.assertIn(message,self.errors());self.experts[0][field]=before
        before=self.experts[0]['question_for_expert']
        self.experts[0]['question_for_expert']='merged away into a package-level question'
        self.assertIn('retained cell-level expert question',self.errors())
        self.experts[0]['question_for_expert']=before

    def test_note_counts_open_gaps_and_exact_questions(self):
        note=(self.package/review.NOTE_FILE).read_text()
        for before,after,message in [('| `supports_current_record` | 47 |','| `supports_current_record` | 90 |','count mismatch'),('| gap-02 | sp-0020 | completed accepted materials qualification | open |','closed','missing open empirical gap'),(self.experts[0]['question_for_expert'],'question omitted','missing exact expert question'),('EXPERT-CODED · DRAFT','draft label omitted','missing boundary/provenance')]:
            with self.subTest(message=message):
                self.assertIn(message,'\n'.join(review.validate_note(note.replace(before,after),self.dimensions,self.experts)))

    def workbook_mutation(self,xml_name,mutate):
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/'mutated.xlsx'
            with ZipFile(self.package/review.WORKBOOK_FILE) as source, ZipFile(path,'w') as out:
                for name in source.namelist():
                    value=source.read(name)
                    if name==xml_name:
                        element=ET.fromstring(value);mutate(element);value=ET.tostring(element)
                    out.writestr(name,value)
            return '\n'.join(review.validate_workbook(path,self.profiles,self.dimensions,self.experts))

    def test_workbook_rejects_averages_even_between_coders_and_cross_cell_ranges(self):
        ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        for formula in ('AVERAGE(C5:D5)','MIN(C5:D6)','SUM(C5:D5)/2'):
            def mutate(xml):
                xml.find('.//s:c[@r="E5"]/s:f',ns).text=formula
            with self.subTest(formula=formula):
                self.assertIn('unapproved formula/composite',self.workbook_mutation('xl/worksheets/sheet3.xml',mutate))

    def test_workbook_rejects_stale_counts_and_changed_recommendations(self):
        ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        def count(xml): xml.find('.//s:c[@r="B5"]/s:v',ns).text='89'
        self.assertIn('cached count',self.workbook_mutation('xl/worksheets/sheet1.xml',count))
        def value(xml): xml.find('.//s:c[@r="H5"]/s:v',ns).text='3'
        self.assertIn('workbook/CSV content',self.workbook_mutation('xl/worksheets/sheet3.xml',value))

    def test_workbook_rejects_hidden_sheets_rows_and_extra_static_scores(self):
        ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        def sheet(xml): xml.find('s:sheets/s:sheet',ns).set('state','hidden')
        self.assertIn('hidden sheet',self.workbook_mutation('xl/workbook.xml',sheet))
        def row(xml): xml.find('s:sheetData/s:row',ns).set('hidden','1')
        self.assertIn('hidden rows/columns',self.workbook_mutation('xl/worksheets/sheet3.xml',row))
        def extra(xml):
            parent=xml.find('s:sheetData',ns);r=ET.SubElement(parent,'{'+ns['s']+'}row',{'r':'100'})
            c=ET.SubElement(r,'{'+ns['s']+'}c',{'r':'Z100','t':'n'})
            ET.SubElement(c,'{'+ns['s']+'}v').text='2.5'
        self.assertIn('extra composite drift',self.workbook_mutation('xl/worksheets/sheet3.xml',extra))

    def test_protected_inputs_including_additions_deletions_and_promoted_records(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory)
            # Copy parent trees once; this also exercises the original issue #37 freeze.
            for tree in ['data','research/fusion-evidence','research/structural-profiles-pilot','app','components','lib','public','content','docs']:
                shutil.copytree(ROOT/tree,root/tree)
            self.assertEqual(review.validate_protected_inputs(root),[])
            paths=[
                'data/sources/source_register.csv',f'{review.BANK}/source_promotion_decisions_v1.csv',
                f'{review.BANK}/claim_source_map_v1.csv',f'{review.BANK}/profile_evidence_coverage_v1.csv',
                *[f'{review.RECONCILIATION}/{name}' for name in ('seed_submission_v1.csv','independent_submission_v1.csv','comparison_audit_v1.csv','owner_decisions_v1.csv','targeted_s5_adjudication_backlog_v1.csv')],
                'research/structural-profiles-pilot/worksheet/country_stage_modifiers_template.csv',
                'research/structural-profiles-pilot/worksheet/governance_overlay_template.csv',
            ]
            for name in paths:
                with self.subTest(path=name):
                    path=root/name;before=path.read_bytes();path.write_bytes(b'unauthorized\n'+before)
                    self.assertTrue(review.validate_protected_inputs(root));path.write_bytes(before)
            # Authorized evolving app/method presentation and new staged data
            # do not mutate historical evidence. Generic checks own their shape.
            for name in ['app/page.tsx', 'docs/METHOD_PROFILES.md']:
                path=root/name; before=path.read_bytes();path.write_bytes(before+b'\n')
                self.assertEqual(review.validate_protected_inputs(root),[]);path.write_bytes(before)
            path=root/f'{review.RECONCILIATION}/seed_submission_v1.csv';before=path.read_bytes();path.unlink()
            self.assertTrue(review.validate_protected_inputs(root));path.write_bytes(before)
            # Historical content integrity is independent of new-file scope.
            # check_reader_scope owns additions outside the authorized package.


if __name__=='__main__': unittest.main()
