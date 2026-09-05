#!/usr/bin/env python3
"""Issue #39: validate recommendations without granting profile approval.

The freeze is against merged PR #38, a85267ce3a0c6ec598554e45b9bc4a82a74f9e95.
Issue #41 explicitly authorizes the one-line PROJECT_STATE entry pointer in
AGENT_BRIEF; its replacement digest below pins that sole control-plane edit.
Never refresh these digests to conceal production/evidence/input mutations.
"""
from __future__ import annotations

import csv
import hashlib
import json
import re
import sys
import posixpath
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path
from zipfile import ZipFile

from validate_fusion_source_promotion import (
    DOMAIN_REVIEW_OUTPUTS, validate_protected_inputs as validate_promotion_inputs,
)

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = "research/structural-profiles-pilot/domain-review"
RECONCILIATION = "research/structural-profiles-pilot/reconciliation"
BANK = "research/fusion-evidence"
PROFILE_FILE = "fusion_domain_review_v1.csv"
DIMENSION_FILE = "fusion_dimension_review_v1.csv"
EXPERT_FILE = "fusion_human_expert_queue_v1.csv"
NOTE_FILE = "FUSION_DOMAIN_REVIEW_NOTE.md"
WORKBOOK_FILE = "fusion_domain_review_v1.xlsx"
PROFILES = {f"sp-{n:04d}" for n in range(14, 32)}
DIMENSIONS = {f"S{n}" for n in range(1, 6)}
DISPOSITIONS = {
    "supports_current_record", "recommends_value_change", "recommends_range",
    "insufficient_evidence", "requires_human_expert", "requires_pathway_variant",
    "requires_jurisdiction_variant",
}
RELATIONS = {"exact_stage", "adjacent_stage_analogy", "pathway_contrast", "target_programme_status"}
PROVENANCE = {
    "reviewer_type": "model_domain_synthesis", "reviewer_agent": "Codex Desktop",
    "reviewer_model": "gpt-5.6-sol", "reasoning_effort": "xhigh",
    "runtime_version": "0.151.0-alpha.7.2", "evidence_as_of": "2026-08-31",
    "reviewed_at": "2026-09-01", "recommendation_basis": "qualitative_coded",
    "approval_status": "recommendation_only",
}
PROFILE_FIELDS = set("""profile_id stage_id parent_stage_id workflow pathway_id
application_context lifecycle_phase frozen_scope critical_path_role review_completion
source_ids unresolved_gap_ids unresolved_gaps S1_assessment S2_assessment S3_assessment
S4_assessment S5_assessment""".split()) | PROVENANCE.keys()
DIMENSION_FIELDS = set("""dimension_review_id profile_id stage_id workflow pathway_id
application_context lifecycle_phase dimension seed_review_id seed_value seed_rationale
seed_source_ids independent_review_id independent_value independent_rationale independent_source_ids
owner_exception_id owner_disposition owner_rationale owner_decision_state owner_selected_s_value
current_range_low current_range_high comparison_status source_ids source_assessments
evidence_relation evidence_maturity technical_transferability technical_assessment recommended_low
recommended_high recommendation_confidence disposition reason revisit_trigger unresolved_gap_ids
prior_coverage_status s5_next_boundary s5_bounded_consequence s5_excluded_consequences
s5_boundary_status s5_backlog_status s5_adjudication_performed named_expert_required
variant_type variant_question owner_exception""".split()) | PROVENANCE.keys()
EXPERT_FIELDS = set("""profile_id dimension question_for_expert why_load_bearing source_ids
requested_expertise named_reviewer status reviewer_type expert_package_id blocking_stage
draft_use_status""".split())
ASSESSMENT_FIELDS = """dimension_review_id seed_value independent_value owner_disposition
current_range_low current_range_high source_ids evidence_relation technical_assessment
recommended_low recommended_high recommendation_confidence disposition reason revisit_trigger""".split()
GAPS = {
    "sp-0016": ("gap-01", "experiment-selection cycle reduction"),
    "sp-0020": ("gap-02", "completed accepted materials qualification"),
    "sp-0023": ("gap-03", "combined-environment plasma-facing-component qualification"),
    "sp-0024": ("gap-04", "integrated self-sufficient tritium/fuel cycle"),
    "sp-0025": ("gap-05", "qualified integrated blanket"),
    "sp-0028": ("gap-06", "AI-shortened nuclear/tritium commissioning"),
    "sp-0029": ("gap-07", "commercial reliability/availability"),
    "sp-0030": ("gap-08", "comparable completed fusion licensing"),
    "sp-0031": ("gap-09", "observed fusion grid export"),
}
ACCEPTED_88_DIGEST = "5b890c585935666497830380d19aba2da2914ec7076a0aea80adf90e2819c994"
EXPERT_QUESTION_DIGEST = "572eb98d132085e91cfb13359aede7eebdafc0c66fbcac74c1a7a68fdc8433ab"
EXPERT_QUESTION_FIELDS = ('profile_id','dimension','question_for_expert','why_load_bearing',
                          'source_ids','requested_expertise','named_reviewer','status','reviewer_type')
PM_CORRECTIONS = {
    ('sp-0024','S2'): {
        'recommended_low':'1', 'recommended_high':'1',
        'disposition':'supports_current_record', 'recommendation_confidence':'low',
        'owner_exception':'false', 'source_ids':'fusion-src-038;fusion-src-028',
    },
    ('sp-0027','S2'): {
        'recommended_low':'1', 'recommended_high':'1',
        'disposition':'recommends_value_change', 'recommendation_confidence':'medium',
        'owner_exception':'true', 'source_ids':'fusion-src-037;fusion-src-036',
    },
}
EXPERT_PACKAGES = {
    'EXP-FUS-01': {
        'theme':'Experiment campaigns, plasma control and machine protection',
        'cells':(('sp-0016','S2'),('sp-0018','S5')),
        'primary_expertise':'Tokamak campaign scientist; plasma-control and machine-protection engineer',
        'purpose':'Resolve experiment-selection cadence and the bounded machine-protection consequence boundary.',
    },
    'EXP-FUS-02': {
        'theme':'Materials qualification and plasma-facing components',
        'cells':(('sp-0020','S3'),('sp-0020','S5'),('sp-0023','S4'),('sp-0023','S5')),
        'primary_expertise':'Fusion irradiation/materials-qualification and plasma-material-interaction specialists',
        'purpose':'Resolve representative throughput, irreversible evidence loss, combined-environment floors, and PFC assurance boundaries.',
    },
    'EXP-FUS-03': {
        'theme':'Tritium and blankets',
        'cells':(('sp-0024','S4'),('sp-0024','S5'),('sp-0025','S2'),('sp-0025','S5')),
        'primary_expertise':'Tritium processing/confinement and blanket engineering/test-safety specialists',
        'purpose':'Separate intrinsic process floors from access delays and define direct fuel-cycle/blanket consequences.',
    },
    'EXP-FUS-04': {
        'theme':'Commissioning and reliability',
        'cells':(('sp-0028','S5'),('sp-0029','S2'),('sp-0029','S5')),
        'primary_expertise':'Fusion commissioning, nuclear/tritium systems safety, reliability and maintainability specialists',
        'purpose':'Define pilot commissioning protection boundaries and the reliability claim/test protocol.',
    },
    'EXP-FUS-05': {
        'theme':'Licensing and regulation',
        'cells':(('sp-0030','S2'),('sp-0030','S3'),('sp-0030','S5')),
        'primary_expertise':'Fusion licensing practitioner/regulator; qualified Chinese legal reviewer for PRC wording',
        'purpose':'Define jurisdiction-specific review cycles, formal attempts, and the next genuinely independent authorization boundary.',
    },
    'EXP-FUS-06': {
        'theme':'Grid integration and protection',
        'cells':(('sp-0031','S3'),('sp-0031','S4'),('sp-0031','S5')),
        'primary_expertise':'Grid-interconnection, power-plant electrical, construction/commissioning, and protection engineers',
        'purpose':'Resolve greenfield versus reused-site topology, physical connection floors, and the utility/plant protection boundary.',
    },
}
FROZEN_TREES = {
    "data": "156c6f8c2b0923cdb869bfc2e64eb56842763184285562e44aed47056eaa77a6",
    BANK: "3553b06e7f5d8e7c9ff0d419b77bf156e81c1eac9fe4ca64916b36a81a72e59e",
    "research/structural-profiles-pilot/worksheet": "6bd50168016e4bb70f36796fe11e2e63504258ad95b1efa043e334826479f56a",
    RECONCILIATION: "6d3b31a688ea9a43400a26c96cd81a3323a11360b2206247e0d0ca048ebca130",
    "app": "87fca33fd46750df80f27487cd00946bac72c752050d360fef14d5449ecf3d1f",
    "components": "dfcabdefcf0845c9871d2646438bbb9a0cf4170c8f74253ed931d998b32508f4",
    "lib": "81f6cba975a33af17b9dd0da61f17ebfcf4d421563791acdd603c564613093ac",
    "public": "73f495b5bf2b686cac518679dca1ab28689647cd86a5b2418d7dc550d87a701c",
    "content": "736b1bd4eccf143b538b36e473402c2227e0270a64c3e7a8c29d1a8824d9bf39",
}
FROZEN_FILES = {
    "docs/AUTHORITATIVE_DOCS.md": "0f2626eb9060f99d070cf276694c765808da01e13259e061dc60c4cfcf28f459",
    "docs/METHOD_PROFILES.md": "4b14d1ee6f263ac328652afa271e53594433066e523ffc65d2ed1bcb27654fd6",
    "docs/METHOD_GATE_REVIEW.md": "403f4c75b6b3262fa879616b505c8526204bf5239978b5f6c32b7af7540eb040",
    "docs/FRESHNESS_PROTOCOL.md": "f83077c3fee1e34e586cb53305232994c064eb5e84581a443ec23946f9aba37e",
    "docs/AGENT_BRIEF.md": "f47a6b624c3b171585f9c188c3e89a3c5f4fcec08c438d2a1aa3d5376807e8da",
}


class DomainReviewValidationError(ValueError):
    """A recommendation or frozen-input contract failed."""


def read_rows(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        header = reader.fieldnames or []
        if not header or len(header) != len(set(header)):
            raise DomainReviewValidationError(f"{path.name}: empty/duplicate CSV header")
        rows = list(reader)
        if any(None in row or any(value is None for value in row.values()) for row in rows):
            raise DomainReviewValidationError(f"{path.name}: malformed CSV row")
        return rows


def tree_digest(root: Path, directory: str) -> str:
    digest = hashlib.sha256()
    for path in sorted((root / directory).rglob("*")):
        if path.is_file() and "__pycache__" not in path.parts and path.name != ".DS_Store":
            digest.update(path.relative_to(root).as_posix().encode() + b"\0")
            digest.update(hashlib.sha256(path.read_bytes()).digest())
    return digest.hexdigest()


def validate_protected_inputs(root: Path = ROOT) -> list[str]:
    # Completed-package app-tree bans are archived, not rehashed. See
    # docs/READER_EDITION_BOUNDARY.md and test_historical_reader_snapshot.py.
    from reader_integrity import validate_current_integrity
    return validate_current_integrity(root)


def source_ids(value: str) -> set[str]:
    return set() if value == "missing" else set(value.split(";"))


def validate_records(profiles: list[dict[str, str]], dimensions: list[dict[str, str]],
                     experts: list[dict[str, str]], root: Path = ROOT) -> list[str]:
    errors: list[str] = []

    def check(condition: bool, message: str) -> None:
        if not condition:
            errors.append(message)

    def key(row: dict[str, str]) -> tuple[str, str]:
        return row.get("profile_id", ""), row.get("dimension", "")

    for rows, fields, label in ((profiles, PROFILE_FIELDS, "profile"),
                                (dimensions, DIMENSION_FIELDS, "dimension"),
                                (experts, EXPERT_FIELDS, "expert")):
        for row in rows:
            check(set(row) == fields, f"{label}: exact schema required; no extra score/composite/approval fields")
    check(len(profiles) == 18 and {r.get('profile_id') for r in profiles} == PROFILES,
          "Exactly 18 unique frozen fusion profiles required")
    check(len(dimensions) == 90 and {key(r) for r in dimensions} == {(p, d) for p in PROFILES for d in DIMENSIONS},
          "Exactly 90 unique profile-by-dimension cells required")
    check(len(experts) == len({key(r) for r in experts}), "Duplicate human-expert question key")
    if errors:
        return errors
    q = {r['profile_id']: r for r in read_rows(root / RECONCILIATION / 'fusion_domain_review_queue_v1.csv')}
    submissions = {label: {r['profile_id']: r for r in read_rows(root / RECONCILIATION / f'{label}_submission_v1.csv')}
                   for label in ('seed', 'independent')}
    owners = {(r['profile_id'], r['s_dimension']): r for r in read_rows(root / RECONCILIATION / 'owner_decisions_v1.csv')}
    audit = {(r['profile_id'], r['s_dimension']): r for r in read_rows(root / RECONCILIATION / 'comparison_audit_v1.csv')}
    backlog = {r['profile_id']: r for r in read_rows(root / RECONCILIATION / 'targeted_s5_adjudication_backlog_v1.csv')}
    sources = {r['source_id']: r for r in read_rows(root / 'data/sources/source_register.csv')}
    inv = {r['candidate_source_id']: r for r in read_rows(root / BANK / 'source_inventory_v1.csv')}
    ledger = {r['canonical_source_id']: r for r in read_rows(root / BANK / 'source_promotion_decisions_v1.csv')}
    coverage = {r['profile_id']: r for r in read_rows(root / BANK / 'profile_evidence_coverage_v1.csv')}
    stages = {r['stage_id']: r for r in read_rows(root / 'research/structural-profiles-pilot/worksheet/stages.csv')}
    by_key = {key(r): r for r in dimensions}
    accepted = [r for r in dimensions if key(r) not in PM_CORRECTIONS]
    accepted_digest = hashlib.sha256(json.dumps(
        accepted, ensure_ascii=False, sort_keys=True, separators=(',',':')
    ).encode()).hexdigest()
    check(len(accepted) == 88 and accepted_digest == ACCEPTED_88_DIGEST,
          'PM correction pass changed one of the 88 accepted dimension rows')
    for correction_key, expected in PM_CORRECTIONS.items():
        row = by_key[correction_key]
        for field, value in expected.items():
            check(row[field] == value, f'{correction_key}: PM correction changed ({field})')
    construction = by_key['sp-0027','S2']
    check('ordinary learn-test-revise cycle' in construction['technical_assessment'] and
          'major assembly/work-package loop' in construction['technical_assessment'] and
          'not canonical here' in construction['technical_transferability'],
          'sp-0027/S2: PM construction learning-unit rationale or evidence boundary lost')
    check(construction['revisit_trigger'] ==
          'Revisit if a different construction learning unit is frozen, or if reviewed work-package/module cycle data support a materially different ordinary loop.',
          'sp-0027/S2: PM revisit trigger changed')
    fuel_cycle = by_key['sp-0024','S2']
    check('gap-04' in fuel_cycle['technical_assessment'] and
          'pre-integration development stage' in fuel_cycle['technical_assessment'] and
          fuel_cycle['unresolved_gap_ids'] == 'gap-04',
          'sp-0024/S2: pre-integration boundary or open gap-04 lost')
    for r in profiles + dimensions:
        p = r['profile_id']
        for field in ('stage_id', 'workflow', 'pathway_id', 'application_context', 'lifecycle_phase'):
            check(r[field] == q[p][field], f"{p}: frozen scope changed ({field})")
        for field, value in PROVENANCE.items():
            check(r[field] == value, f"{p}: false/missing provenance or approval ({field})")
        expected_gap = GAPS[p][0] if p in GAPS else 'none'
        check(r['unresolved_gap_ids'] == expected_gap, f"{p}: load-bearing gap lost or reassigned")
        for sid in source_ids(r['source_ids']):
            check(sid in ledger and sid in sources and sid not in {'fusion-src-013', 'fusion-src-015'},
                  f"{p}: source ID is not in reviewed canonical fusion set: {sid}")
            check(sources.get(sid, {}).get('review_status') == 'reviewed', f"{p}: source not reviewed: {sid}")
    for r in dimensions:
        p, d = key(r); label = f'{p}/{d}'
        check(r['dimension_review_id'] == f'dr-{p}-{d.lower()}-v1', f'{label}: unstable review ID')
        for role in ('seed', 'independent'):
            original = submissions[role][p]
            for dest, origin in (('review_id','review_id'), ('value',d), ('rationale','rationale'), ('source_ids','source_ids')):
                check(r[f'{role}_{dest}'] == original[origin], f'{label}: preserved {role} {dest} changed')
        owner = owners.get((p,d), {})
        for dest, origin in (('owner_exception_id','exception_id'), ('owner_disposition','owner_disposition'),
                             ('owner_rationale','owner_rationale'), ('owner_decision_state','decision_state'),
                             ('owner_selected_s_value','selected_s_value')):
            check(r[dest] == owner.get(origin,''), f'{label}: preserved owner field changed ({dest})')
        vals = [int(submissions[role][p][d]) for role in ('seed','independent')]
        check((r['current_range_low'],r['current_range_high']) == (str(min(vals)),str(max(vals))), f'{label}: per-dimension current range changed')
        check(r['comparison_status'] == audit[p,d]['comparison_status'], f'{label}: comparison audit snapshot changed')
        check(r['prior_coverage_status'] == coverage[p][d+'_status'], f'{label}: prior coverage snapshot changed')
        check(all(re.fullmatch('[0-4]', r[f]) for f in ('recommended_low','recommended_high')), f'{label}: ordinal integer 0-4 recommendations only')
        check(r['recommended_low'] <= r['recommended_high'], f'{label}: inverted recommended range')
        check(r['disposition'] in DISPOSITIONS, f'{label}: invalid disposition')
        check(r['recommendation_confidence'] in {'low','medium','high'}, f'{label}: invalid confidence')
        for field in ('technical_transferability','technical_assessment','reason','revisit_trigger'):
            check(len(r[field].strip()) >= 20, f'{label}: empty or inadequate {field}')
        if r['disposition'] == 'supports_current_record':
            check(r['recommended_low'] == r['recommended_high'] and r['recommended_low'] in map(str, vals), f'{label}: support contradicts preserved values')
        if r['disposition'] == 'recommends_range':
            check(r['recommended_low'] < r['recommended_high'], f'{label}: range disposition requires a range')
        if r['disposition'] == 'recommends_value_change':
            check(r['recommended_low'] == r['recommended_high'] and any(str(v) != r['recommended_low'] for v in vals), f'{label}: change must be a distinct point preference')
        try:
            assessments = json.loads(r['source_assessments'])
            assert isinstance(assessments, list)
            check({a['source_id'] for a in assessments} == source_ids(r['source_ids']) and len(assessments) == len(source_ids(r['source_ids'])), f'{label}: source assessments/IDs mismatch')
            relations = list(dict.fromkeys(a['relation'] for a in assessments))
            check(r['evidence_relation'] == (';'.join(relations) or 'absent'), f'{label}: evidence relation mismatch')
            maturity = '; '.join(dict.fromkeys(a['maturity'] for a in assessments)) or 'No directly relevant canonical source located'
            check(r['evidence_maturity'] == maturity, f'{label}: evidence maturity summary mismatch')
            for a in assessments:
                sid = a['source_id']
                check(set(a) == {'source_id','relation','maturity','locator','use_limit'}, f'{label}: source assessment schema drift')
                check(a['relation'] in RELATIONS, f'{label}: invalid source relation')
                check(a['maturity'] == inv.get(sid,{}).get('evidence_basis'), f'{label}: source maturity upgraded')
                check(a['locator'] == inv.get(sid,{}).get('numerical_claims_and_locators'), f'{label}: source locator changed')
                check(a['use_limit'] == ledger.get(sid,{}).get('remaining_use_restriction'), f'{label}: promotion use restriction lost')
                if sid in {'fusion-src-025','fusion-src-032','fusion-src-043','fusion-src-044'}:
                    check(a['relation'] == 'pathway_contrast', f'{label}: stellarator evidence silently pooled')
        except (ValueError, TypeError, KeyError, AssertionError):
            errors.append(f'{label}: malformed source assessment JSON')
        check(r['s5_adjudication_performed'] == 'false', f'{label}: S5 adjudication is out of scope')
        expected_backlog = backlog[p]['adjudication_status'] if d == 'S5' and p in backlog else 'not_in_existing_backlog'
        check(r['s5_backlog_status'] == expected_backlog, f'{label}: S5 backlog snapshot changed')
        for field in ('s5_next_boundary','s5_bounded_consequence','s5_excluded_consequences'):
            check(len(r[field]) >= 20 if d == 'S5' else r[field] == 'not_applicable', f'{label}: explicit bounded S5 fields required')
        check(r['s5_boundary_status'] == ('assumed_not_verified' if d == 'S5' else 'not_applicable'), f'{label}: S5 boundary falsely verified')
        check(r['named_expert_required'] in {'true','false'}, f'{label}: invalid expert flag')
        if r['disposition'] == 'requires_human_expert':
            check(r['named_expert_required'] == 'true', f'{label}: required human expert missing')
        expected_variant = {'requires_pathway_variant':'pathway','requires_jurisdiction_variant':'jurisdiction'}.get(r['disposition'],'none')
        check(r['variant_type'] == expected_variant, f'{label}: variant route mismatch')
        check(bool(r['variant_question']) == (expected_variant != 'none'), f'{label}: variant question mismatch')
        exceptional = r['named_expert_required'] == 'true' or expected_variant != 'none' or r['disposition'] == 'recommends_value_change' or r['owner_decision_state'] == 'unresolved'
        check(r['owner_exception'] == str(exceptional).lower(), f'{label}: owner view must contain only genuine exceptions')
    for r in profiles:
        p = r['profile_id']; cells = [by_key[p,d] for d in sorted(DIMENSIONS)]
        check(r['parent_stage_id'] == q[p]['parent_stage_id'] and r['frozen_scope'] == stages[r['stage_id']]['description'], f'{p}: profile scope/hierarchy changed')
        check(r['critical_path_role'] == 'not_assessed' and r['review_completion'] == 'five_dimensions_reviewed', f'{p}: hidden stage scoring/approval')
        check(source_ids(r['source_ids']) == set().union(*(source_ids(c['source_ids']) for c in cells)), f'{p}: profile source union mismatch')
        check(len(r['unresolved_gaps']) > 20, f'{p}: missing gap explanation')
        for d in sorted(DIMENSIONS):
            try:
                assessment = json.loads(r[d+'_assessment'])
                check(assessment == {k:by_key[p,d][k] for k in ASSESSMENT_FIELDS}, f'{p}/{d}: structured profile assessment differs from dimension row')
            except (ValueError, TypeError):
                errors.append(f'{p}/{d}: malformed profile assessment')
    expected_experts = {key(r) for r in dimensions if r['named_expert_required'] == 'true'}
    check({key(r) for r in experts} == expected_experts, 'Human-expert queue must exactly match material named-expert cells')
    expected_package_by_cell = {
        cell: package_id for package_id, package in EXPERT_PACKAGES.items()
        for cell in package['cells']
    }
    check(len(expected_package_by_cell) == 19 and len(experts) == 19,
          'Exactly 19 cell questions in six expert packages required')
    question_digest = hashlib.sha256(json.dumps(
        [{field:r[field] for field in EXPERT_QUESTION_FIELDS} for r in experts],
        ensure_ascii=False, sort_keys=True, separators=(',',':')
    ).encode()).hexdigest()
    check(question_digest == EXPERT_QUESTION_DIGEST,
          'PM correction pass changed or deleted a retained cell-level expert question')
    for r in experts:
        c = by_key.get(key(r), {})
        check(r['source_ids'] == c.get('source_ids'), f'{key(r)}: expert source IDs mismatch')
        check(r['named_reviewer'] == 'missing' and r['status'] == 'pending_named_specialist' and r['reviewer_type'] == 'model_domain_synthesis', f'{key(r)}: false named-human sign-off')
        check(r['expert_package_id'] == expected_package_by_cell.get(key(r)),
              f'{key(r)}: incorrect expert outreach package')
        check(r['blocking_stage'] == 'canonical_approval',
              f'{key(r)}: expert question must block canonical approval')
        check(r['draft_use_status'] == 'allowed_as_expert_coded_draft',
              f'{key(r)}: labelled draft-use contract changed')
        for field in ('question_for_expert','why_load_bearing','requested_expertise'):
            check(len(r[field].strip()) > 20, f'{key(r)}: inadequate expert {field}')
    prc_expert = next((r['requested_expertise'] for r in experts
                       if key(r) == ('sp-0030','S2')), '')
    check('qualified Chinese legal reviewer' in prc_expert,
          'EXP-FUS-05: PRC legal specialist sub-question lost')
    expected_dispositions = {
        'supports_current_record':47, 'recommends_value_change':4,
        'recommends_range':12, 'insufficient_evidence':5,
        'requires_human_expert':14, 'requires_pathway_variant':6,
        'requires_jurisdiction_variant':2,
    }
    expected_confidence = {'high':12,'medium':28,'low':50}
    check(dict(Counter(r['disposition'] for r in dimensions)) == expected_dispositions,
          'PM disposition counts changed')
    check(dict(Counter(r['recommendation_confidence'] for r in dimensions)) == expected_confidence,
          'PM confidence counts changed')
    check(sum(r['recommended_low'] != r['recommended_high'] for r in dimensions) == 31,
          'PM range-form count changed')
    check(sum(r['owner_exception'] == 'true' for r in dimensions) == 28,
          'PM owner-exception count changed')
    return errors


def counts(dimensions: list[dict[str, str]], experts: list[dict[str, str]] | tuple = ()) -> dict:
    return {
        'dispositions': Counter(r['disposition'] for r in dimensions),
        'confidence': Counter(r['recommendation_confidence'] for r in dimensions),
        'range_form': sum(r['recommended_low'] != r['recommended_high'] for r in dimensions),
        'human_experts': sum(r['named_expert_required'] == 'true' for r in dimensions),
        'expert_packages': len({r['expert_package_id'] for r in experts}),
        'owner_exceptions': sum(r['owner_exception'] == 'true' for r in dimensions),
    }


def validate_note(note: str, dimensions: list[dict[str, str]], experts: list[dict[str, str]]) -> list[str]:
    errors = []
    normalized_note = re.sub(r'\s+', ' ', note)
    summary = counts(dimensions,experts)
    for category, value in (summary['dispositions'] | summary['confidence']).items():
        if f'| `{category}` | {value} |' not in note:
            errors.append(f'Review note count mismatch: {category}')
    for p, (gid, name) in GAPS.items():
        if f'| {gid} | {p} | {name} | open |' not in note:
            errors.append(f'Review note missing open empirical gap: {gid}')
    for r in experts:
        if f"| {r['profile_id']} | {r['dimension']} | {r['question_for_expert']} |" not in note:
            errors.append(f"Review note missing exact expert question: {r['profile_id']}/{r['dimension']}")
    for package_id, package in EXPERT_PACKAGES.items():
        cells = '; '.join(f'{p}/{d}' for p,d in package['cells'])
        if f'| `{package_id}` | {package["theme"]} | {cells} |' not in note:
            errors.append(f'Review note missing expert outreach package: {package_id}')
    for required in ('model_domain_synthesis', 'gpt-5.6-sol', 'xhigh', 'not human expert sign-off',
                     'No S-value was written', 'No WP2 implementation', '3c8987175f6975347cc01a768c21d3386ff27cd6',
                     'EXPERT-CODED · DRAFT', 'blocking_stage=canonical_approval',
                     'draft_use_status=allowed_as_expert_coded_draft',
                     'do not block staged WP2 construction', 'do not block private use',
                     'unqualified public claim or value',
                     'All recommendations/routes other than the two corrected S2 rows were accepted'):
        if required not in normalized_note:
            errors.append(f'Review note missing boundary/provenance: {required}')
    for label, value in (('range-form recommendations',summary['range_form']),
                         ('human-expert rows',summary['human_experts']),
                         ('expert outreach packages',summary['expert_packages']),
                         ('owner exceptions',summary['owner_exceptions'])):
        if f'**{value}** {label}' not in note:
            errors.append(f'Review note count mismatch: {label}')
    return errors


def recommendation(row: dict[str, str]) -> str:
    lo, hi = row['recommended_low'], row['recommended_high']
    return lo if lo == hi else f'{lo}-{hi}'


def workbook_tables(profiles, dimensions, experts, root=ROOT) -> dict:
    """Expected visible data: mirrors CSV content, never computes an S composite."""
    by_key = {(r['profile_id'],r['dimension']):r for r in dimensions}
    expert_by_key = {(r['profile_id'],r['dimension']):r for r in experts}
    variant_rows = [r for r in dimensions if r['variant_type'] != 'none']
    exceptions = [r for r in dimensions if r['owner_exception'] == 'true']
    tables = {}
    tables['Dimension review'] = (
        ['Profile ID','Dimension','Seed','Independent','Current low','Current high','Owner disposition','Recommended low','Recommended high','Form','Confidence','Disposition','Reason','Canonical source IDs','Revisit trigger','Named expert required','Owner exception','Workflow','Evidence relation','Evidence maturity','Technical assessment','Technical transferability','S5 bounded consequence','S5 next independent boundary','S5 excluded consequences','S5 boundary status','Review ID'],
        [[r['profile_id'],r['dimension'],r['seed_value'],r['independent_value'],r['current_range_low'],r['current_range_high'],r['owner_disposition'] or 'missing',r['recommended_low'],r['recommended_high'],'value' if r['recommended_low']==r['recommended_high'] else 'range',r['recommendation_confidence'],r['disposition'],r['reason'],r['source_ids'],r['revisit_trigger'],r['named_expert_required'],r['owner_exception'],r['workflow'],r['evidence_relation'],r['evidence_maturity'],r['technical_assessment'],r['technical_transferability'],r['s5_bounded_consequence'],r['s5_next_boundary'],r['s5_excluded_consequences'],r['s5_boundary_status'],r['dimension_review_id']] for r in dimensions],
    )
    profile_rows = []
    for p in profiles:
        summaries = []
        for d in sorted(DIMENSIONS):
            r = by_key[p['profile_id'],d]
            summaries.append(f"{recommendation(r)} | {r['recommendation_confidence']}\n{r['disposition']}\n{r['reason']}")
        profile_rows.append([p['profile_id'],p['workflow'],p['lifecycle_phase'],p['frozen_scope'],*summaries,p['unresolved_gap_ids'],p['unresolved_gaps'],p['source_ids'],p['pathway_id'],p['application_context'],p['critical_path_role']])
    tables['Profile review'] = (['Profile ID','Workflow','Lifecycle','Frozen scope','S1 assessment','S2 assessment','S3 assessment','S4 assessment','S5 assessment','Open gap IDs','Unresolved empirical gaps','Canonical source IDs','Pathway','Application context','Critical path role'], profile_rows)
    tables['Human experts'] = (
        ['Profile ID','Dimension','Outreach package','Question for named specialist','Why load-bearing','Canonical source IDs','Requested expertise','Blocking stage','Draft-use status','Named reviewer','Status'],
        [[r[k] for k in ('profile_id','dimension','expert_package_id','question_for_expert','why_load_bearing','source_ids','requested_expertise','blocking_stage','draft_use_status','named_reviewer','status')] for r in experts],
    )
    tables['Outreach packages'] = (
        ['Package ID','Theme','Cell-level questions','Question count','Primary expertise','Blocking stage','Draft-use status','Purpose'],
        [[package_id,package['theme'],'; '.join(f'{p}/{d}' for p,d in package['cells']),len(package['cells']),package['primary_expertise'],'canonical_approval','allowed_as_expert_coded_draft',package['purpose']]
         for package_id,package in EXPERT_PACKAGES.items()],
    )
    tables['Variants'] = (
        ['Profile ID','Dimension','Variant type','Recommended interval','Scope question for later work','Technical constraint','Canonical source IDs'],
        [[r['profile_id'],r['dimension'],r['variant_type'],recommendation(r),r['variant_question'],r['technical_transferability'],r['source_ids']] for r in variant_rows],
    )
    tables['Owner exceptions'] = (
        ['Profile ID','Dimension','Recommended interval','Disposition','Preserved owner disposition','Owner rationale (verbatim)','Question / action','Reason','Canonical source IDs'],
        [[r['profile_id'],r['dimension'],recommendation(r),r['disposition'],r['owner_disposition'] or 'missing',r['owner_rationale'] or 'No owner decision recorded.',expert_by_key.get((r['profile_id'],r['dimension']),{}).get('question_for_expert') or r['variant_question'] or r['revisit_trigger'],r['reason'],r['source_ids']] for r in exceptions],
    )
    preserved = ['profile_id','dimension','seed_review_id','independent_review_id','seed_source_ids','independent_source_ids','owner_exception_id','owner_disposition','owner_rationale','owner_selected_s_value','owner_decision_state','seed_rationale','independent_rationale','comparison_status','s5_backlog_status']
    tables['Preserved record'] = (
        ['Profile ID','Dimension','Seed review ID','Independent review ID','Seed source IDs','Independent source IDs','Owner exception ID','Owner disposition','Owner rationale (verbatim)','Owner selected S value','Owner decision state','Seed rationale (verbatim)','Independent rationale (verbatim)','Comparison status','Existing S5 backlog status'],
        [[r[k] for k in preserved] for r in dimensions],
    )
    source_register = {r['source_id']:r for r in read_rows(root / 'data/sources/source_register.csv')}
    assessments = {a['source_id']:a for r in dimensions for a in json.loads(r['source_assessments'])}
    source_rows = []
    for sid in sorted(assessments):
        s, a = source_register[sid], assessments[sid]
        source_rows.append([sid,s['title_english'],s['url_or_doi'],s['independent_validation_status'],a['maturity'],s['last_verified'],s['limitations'],a['use_limit']])
    tables['Sources'] = (['Canonical source ID','Title','Primary / publisher URL','Independent-validation status','Evidence basis (bank)','Last verified','Source limitation','Promotion use restrictions'],source_rows)
    # Gap descriptions must equal the profile CSV, not a second mutable narrative.
    pmap = {p['profile_id']:p for p in profiles}
    tables['Load-bearing gaps'] = (
        ['Gap ID','Profile ID','Empirical outcome still missing','Status','Why it remains open','Canonical context IDs'],
        [[gid,p,name,'open',pmap[p]['unresolved_gaps'],pmap[p]['source_ids']] for p,(gid,name) in GAPS.items()],
    )
    return tables


def column_name(index: int) -> str:
    result = ''
    while index:
        index, remainder = divmod(index-1,26)
        result = chr(65+remainder) + result
    return result


def validate_workbook(path: Path, profiles, dimensions, experts, root=ROOT) -> list[str]:
    """Inspect OOXML with stdlib only; prohibit hidden sheets, cells and formulas.

    All permitted formulas are enumerated by exact cell and expression. MIN/MAX
    are permitted only between the two submissions for ONE dimension. No sum,
    mean, composite, hidden helper score or arbitrary formula is permitted.
    """
    errors = []
    ns = {'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    rns = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    expected = workbook_tables(profiles,dimensions,experts,root)
    summary = counts(dimensions,experts)
    formula_cells = {}
    for i, _ in enumerate(dimensions,5):
        for col, formula in [('E',f'MIN(C{i}:D{i})'),('F',f'MAX(C{i}:D{i})'),('J',f'IF(H{i}=I{i},"value","range")')]:
            formula_cells['Dimension review',f'{col}{i}'] = formula
    overview = {
        'B4': ("COUNTA('Profile review'!A5:A22)",18),
        'B5': ("COUNTA('Dimension review'!A5:A94)",90),
        'B6': ('COUNTIF(\'Load-bearing gaps\'!D5:D13,"open")',9),
        'B7': ('COUNTIF(\'Dimension review\'!J5:J94,"range")',summary['range_form']),
        'B8': (f"COUNTA('Human experts'!A5:A{len(experts)+4})",len(experts)),
        'B9': (f"COUNTA('Owner exceptions'!A5:A{summary['owner_exceptions']+4})",summary['owner_exceptions']),
        'B10': ("COUNTA('Outreach packages'!A5:A10)",summary['expert_packages']),
    }
    disposition_order = ['supports_current_record','recommends_value_change','recommends_range','insufficient_evidence','requires_human_expert','requires_pathway_variant','requires_jurisdiction_variant']
    for i, d in enumerate(disposition_order,12):
        overview[f'B{i}'] = (f"COUNTIF('Dimension review'!L5:L94,A{i})",summary['dispositions'][d])
    for i, confidence in enumerate(('high','medium','low'),21):
        overview[f'B{i}'] = (f"COUNTIF('Dimension review'!K5:K94,A{i})",summary['confidence'][confidence])
    formula_cells.update({('Overview',c):f for c,(f,_) in overview.items()})
    with ZipFile(path) as archive:
        book = ET.fromstring(archive.read('xl/workbook.xml'))
        rels = {e.attrib['Id']:e.attrib['Target'] for e in ET.fromstring(archive.read('xl/_rels/workbook.xml.rels'))}
        shared = []
        if 'xl/sharedStrings.xml' in archive.namelist():
            shared = [''.join(si.itertext()) for si in ET.fromstring(archive.read('xl/sharedStrings.xml'))]
        sheet_nodes = book.findall('s:sheets/s:sheet',ns)
        if {s.attrib['name'] for s in sheet_nodes} != set(expected) | {'Overview'} or len(sheet_nodes)!=10:
            return ['Workbook must contain exactly the ten documented visible review sheets']
        if book.find('s:definedNames',ns) is not None or any('externalLink' in name or 'vbaProject' in name for name in archive.namelist()):
            errors.append('Workbook contains unapproved named/linked/hidden computation')
        seen_formulas = set()
        for sheet in sheet_nodes:
            name = sheet.attrib['name']
            if sheet.get('state','visible') != 'visible':
                errors.append(f'{name}: hidden sheet prohibited')
            target = rels[sheet.attrib[f'{{{rns}}}id']]
            target = target.lstrip('/') if target.startswith('/') else posixpath.normpath('xl/'+target)
            xml = ET.fromstring(archive.read(target))
            if any(e.get('hidden') in {'1','true'} for e in [*xml.findall('.//s:row',ns),*xml.findall('.//s:col',ns)]):
                errors.append(f'{name}: hidden rows/columns prohibited')
            cells = {}
            for c in xml.findall('s:sheetData/s:row/s:c',ns):
                addr = c.attrib['r']; raw = c.findtext('s:v',default='',namespaces=ns)
                typ = c.get('t','n')
                value = shared[int(raw)] if typ == 's' else ''.join(c.find('s:is',ns).itertext()) if typ == 'inlineStr' else raw
                formula = c.findtext('s:f',default='',namespaces=ns)
                cells[addr] = value
                if formula:
                    seen_formulas.add((name,addr))
                    if formula_cells.get((name,addr)) != formula:
                        errors.append(f'{name}!{addr}: unapproved formula/composite')
                if typ == 'e':
                    errors.append(f'{name}!{addr}: spreadsheet formula error')
                if typ == 'n' and value and name == 'Overview' and addr not in overview:
                    errors.append(f'{name}!{addr}: unapproved numeric output')
            if name == 'Overview':
                for addr, (_, count) in overview.items():
                    if cells.get(addr) != str(count):
                        errors.append(f'Overview!{addr}: stale/incorrect cached count')
                for i,d in enumerate(disposition_order,12):
                    if cells.get(f'A{i}') != d:
                        errors.append('Overview disposition label mismatch')
                for i,d in enumerate(('high','medium','low'),21):
                    if cells.get(f'A{i}') != d:
                        errors.append('Overview confidence label mismatch')
                continue
            headers, rows = expected[name]
            expected_cells = {f'{column_name(j)}{i}':str(v) for i,row in enumerate([headers,*rows],4) for j,v in enumerate(row,1)}
            actual_data = {addr:value for addr,value in cells.items() if int(re.search(r'\d+',addr).group())>=4 and value}
            if actual_data != {a:v for a,v in expected_cells.items() if v}:
                mismatches = [a for a in set(actual_data)|set(expected_cells) if actual_data.get(a,'') != expected_cells.get(a,'')]
                errors.append(f'{name}: workbook/CSV content or extra composite drift at {", ".join(sorted(mismatches)[:5])}')
            for c in xml.findall('s:sheetData/s:row/s:c',ns):
                if int(re.search(r'\d+',c.attrib['r']).group())<4 and c.get('t','n')=='n' and c.findtext('s:v',default='',namespaces=ns):
                    errors.append(f'{name}: numeric helper outside visible table prohibited')
        if seen_formulas != set(formula_cells):
            errors.append('Workbook formulas missing/replaced: counts and per-dimension ranges must remain auditable')
    return errors


def validate(root: Path = ROOT) -> dict:
    errors = validate_protected_inputs(root)
    package = root / PACKAGE
    names = {p.name for p in package.iterdir() if p.name != '.DS_Store'} if package.exists() else set()
    if names != {Path(p).name for p in DOMAIN_REVIEW_OUTPUTS}:
        errors.append('Domain review must contain exactly the five issue #39 deliverables')
    if errors:
        raise DomainReviewValidationError('\n'.join(errors))
    profiles, dimensions, experts = [read_rows(package / f) for f in (PROFILE_FILE,DIMENSION_FILE,EXPERT_FILE)]
    errors = validate_records(profiles,dimensions,experts,root)
    if not errors:
        errors.extend(validate_note((package / NOTE_FILE).read_text(encoding='utf-8'),dimensions,experts))
        errors.extend(validate_workbook(package / WORKBOOK_FILE,profiles,dimensions,experts,root))
    if errors:
        raise DomainReviewValidationError('\n'.join(errors))
    return counts(dimensions,experts)


if __name__ == '__main__':
    try:
        result = validate()
    except (DomainReviewValidationError, OSError, ValueError) as exc:
        print(f'Fusion domain review validation failed:\n{exc}',file=sys.stderr)
        raise SystemExit(1)
    print('Fusion domain review validation passed: 18 profiles, 90 separate cells; no protected-input mutation.')
    print(json.dumps(result,sort_keys=True))
