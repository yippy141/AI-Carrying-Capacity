#!/usr/bin/env python3
"""Deterministic projection. No new selections; immutable records remain sources."""
import csv
import io
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
PILOT='research/structural-profiles-pilot'
def rows(name):
    with (ROOT/name).open(newline='') as handle:
        return list(csv.DictReader(handle))
def render(data, fields):
    out=io.StringIO(newline='');w=csv.DictWriter(out,fieldnames=fields);w.writeheader();w.writerows(data);return out.getvalue()
def build():
    profiles=rows(f'{PILOT}/worksheet/stage_profiles_template.csv')
    seed=rows(f'{PILOT}/reconciliation/seed_submission_v1.csv')
    independent=rows(f'{PILOT}/reconciliation/independent_submission_v1.csv')
    audit=rows(f'{PILOT}/reconciliation/comparison_audit_v1.csv')
    domain={(r['profile_id'],r['dimension']):r for r in rows(f'{PILOT}/domain-review/fusion_dimension_review_v1.csv')}
    owners={(r['profile_id'],r['s_dimension']):r for r in rows(f'{PILOT}/reconciliation/owner_decisions_v1.csv')}
    s5={r['profile_id']:r for r in rows(f'{PILOT}/adjudication/targeted_s5_adjudication_v1.csv')}
    dims=[]
    for a in audit:
        pid,d=a['profile_id'],a['s_dimension'];dr=domain.get((pid,d),{});owner=owners.get((pid,d),{});adj=s5.get(pid,{}) if d=='S5' else {}
        selected=adj.get('selected_s5','')
        dims.append(dict(disposition_id=f'{pid}-{d.lower()}-v1',profile_id=pid,dimension=d,selected_value=selected,
            selection_basis='historical_provisional_selection' if selected else 'no_selected_value',
            seed_review_id=a['seed_review_id'],independent_review_id=a['independent_review_id'],
            submitted_low=min(int(a['seed_value']),int(a['independent_value'])),submitted_high=max(int(a['seed_value']),int(a['independent_value'])),
            comparison_status=a['comparison_status'],
            recommendation_low=adj.get('recommended_low','') if adj else dr.get('recommended_low',''),
            recommendation_high=adj.get('recommended_high','') if adj else dr.get('recommended_high',''),
            historical_disposition=adj.get('adjudication_outcome') or dr.get('disposition') or owner.get('owner_disposition') or a['comparison_status'],
            domain_review_id=dr.get('dimension_review_id',''),owner_exception_id=owner.get('exception_id',''),
            source_ids=adj.get('source_ids','') if adj else dr.get('source_ids',''),
            confidence=adj.get('adjudication_confidence') or dr.get('recommendation_confidence') or a['independent_confidence'],
            human_review_state='named_specialist_review_not_recorded',
            history_path=f'{PILOT}/adjudication/targeted_s5_adjudication_v1.csv' if adj else f'{PILOT}/domain-review/fusion_dimension_review_v1.csv' if dr else f'{PILOT}/reconciliation/comparison_audit_v1.csv',
            gap=adj.get('source_gap') or dr.get('unresolved_gap_ids') or 'Original submissions have no exact-stage source IDs.',
            revisit_trigger=adj.get('revisit_triggers') or dr.get('revisit_trigger') or 'Obtain exact-stage evidence and a documented dimension selection.'))
    for p in profiles:
        ds=[d for d in dims if d['profile_id']==p['profile_id']]
        for d in ds:p[d['dimension']]=d['selected_value']
        p.update(rationale='Derived representation only. Read all five linked dimension dispositions and original review rationales.',
            source_ids=';'.join(sorted({s for d in ds for s in d['source_ids'].split(';') if s})),
            coding_confidence='low' if any(d['confidence']=='low' for d in ds) else 'medium',
            disagreement_summary='; '.join(f"{d['dimension']}: {d['historical_disposition']}; selected={d['selected_value'] or 'missing'}" for d in ds),
            selected_review_ids=';'.join(d['disposition_id'] for d in ds if d['selected_value']),
            evidence_basis='expert-coded',coding_as_of='2026-09-03',last_reviewed='2026-09-03',
            revisit_triggers='Obtain missing stage evidence and actual specialist review; revisit the exact linked dimension.',
            proposed_by='Codex; derived projection, no new coding',proposed_model='missing: runtime model identifier not asserted',
            reviewed_by='See historical records; release selection review pending',
            independent_review_by='Codex / gpt-5.6; original model submission only',approved_by='',
            coding_status='disputed' if any(d['selected_value']=='' for d in ds) else 'proposed',review_status='staged',version='1.1',
            changelog_note='2026-09-06 reader projection; unselected stays null; model endpoints are not empirical intervals.')
        # selected_review_ids remains submission IDs per controlling method; the
        # disposition IDs provide the selection trail in the companion table.
        p['selected_review_ids']=';'.join(sorted({r for d in ds if d['selected_value'] for r in [d['seed_review_id'],d['independent_review_id']]}))
    return {'stage_profiles.csv':render(profiles,list(profiles[0])),
        'profile_coding_reviews.csv':render(seed+independent,list(seed[0])),
        'dimension_dispositions.csv':render(dims,list(dims[0])),
        'stages.csv':(ROOT/f'{PILOT}/worksheet/stages.csv').read_text()}
if __name__=='__main__':
    for name,content in build().items():
        (ROOT/'data/profiles'/name).write_text(content,newline='')
    print('Projected 31 staged profiles, 62 original reviews, 155 dimension dispositions; only 12 historical S5 selections.')
