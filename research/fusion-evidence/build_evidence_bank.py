#!/usr/bin/env python3
"""Build the issue #35 fusion evidence inventory from reviewed source metadata.

This builder is intentionally limited to source inventory, claim extraction, and
coverage metadata. It never writes the canonical source register or any S1-S5
coding value.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "research" / "fusion-evidence"
ACCESS_DATE = "2026-08-31"
PACK_CUTOFF = "2026-08-12"
PACK_SHA256 = "ab6e2cec6ac9f58fcc03e65a5c73bd1fb0d508f0041c887048e24da0a5611347"

INVENTORY_HEADER = [
    "pack_source_id", "candidate_source_id", "title_original", "title_english",
    "authors_org", "publication_date", "access_date", "last_verified",
    "archive_url", "language", "source_type", "method_type", "claim_owner",
    "official_claim_status", "independent_validation_status", "url_or_doi",
    "original_language_url", "translation_reviewer", "translation_note",
    "reliability_tier", "evidence_basis", "geo_scope", "pathway_scope",
    "stage_ids", "profile_ids", "s_dimensions", "key_claims",
    "numerical_claims_and_locators", "limitations", "verification_status",
    "promotion_recommendation", "notes",
]

CLAIM_HEADER = [
    "claim_id", "profile_id", "stage_id", "s_dimension", "claim_text",
    "claim_type", "evidence_basis", "pack_source_ids", "candidate_source_ids",
    "support_direction", "directness", "scope_match", "pathway_match",
    "lifecycle_match", "quantitative_value", "unit", "denominator",
    "time_period", "source_locator", "counterevidence_or_confounder",
    "verification_status", "review_route", "notes",
]

STAGED_HEADER = [
    "source_id", "title_original", "title_english", "authors_org", "year",
    "publication_date", "access_date", "last_verified", "archive_url",
    "language", "source_type", "method_type", "claim_owner",
    "official_claim_status", "independent_validation_status", "url_or_doi",
    "original_language_url", "translation_reviewer", "translation_note",
    "reliability_tier", "geo_scope", "sector_scope", "key_claims",
    "useful_indicators", "limitations", "date_added", "added_by",
    "review_status", "placeholder", "notes",
]

REJECTED_HEADER = [
    "record_id", "pack_source_id", "candidate_source_id", "title_or_claim",
    "url_or_doi", "disposition", "reason_code", "reason", "permitted_limited_use",
    "affected_profile_ids", "affected_s_dimensions", "last_verified", "notes",
]

CHANGE_HEADER = [
    "change_id", "source_or_claim", "old_status_at_cutoff", "current_status",
    "change_date", "affected_profile_ids", "affected_s_dimensions",
    "materiality", "smallest_action", "candidate_source_ids", "source_locator",
    "notes",
]

EVIDENCE_BASES = {
    "observed experimental result", "observed facility milestone", "official target",
    "company target", "programme announcement", "proof of concept",
    "model or scenario estimate", "inference", "commentary",
}

PROFILES = [
    ("sp-0014", "theory_and_system_design", "Theory and system design", "research", "routine"),
    ("sp-0015", "simulation", "Simulation", "research", "routine"),
    ("sp-0016", "experiment_selection", "Experiment selection", "research", "priority"),
    ("sp-0017", "diagnostics", "Diagnostics", "research", "routine"),
    ("sp-0018", "plasma_control", "Plasma control", "development", "priority"),
    ("sp-0019", "materials_discovery_and_screening", "Materials discovery and screening", "research", "routine"),
    ("sp-0020", "materials_qualification", "Materials qualification", "qualification", "priority"),
    ("sp-0021", "magnets", "Magnets", "development", "routine"),
    ("sp-0022", "heating_and_current_drive", "Heating and current drive", "development", "routine"),
    ("sp-0023", "plasma_facing_components", "Plasma-facing components", "development", "routine"),
    ("sp-0024", "tritium_and_fuel_cycle", "Tritium and fuel cycle", "development", "priority"),
    ("sp-0025", "blankets", "Blankets", "development", "priority"),
    ("sp-0026", "component_fabrication", "Component fabrication", "scale_up", "routine"),
    ("sp-0027", "construction", "Construction", "demonstration", "routine"),
    ("sp-0028", "commissioning", "Commissioning", "demonstration", "priority"),
    ("sp-0029", "reliability_demonstration", "Reliability demonstration", "demonstration", "priority"),
    ("sp-0030", "licensing", "Licensing", "qualification", "priority"),
    ("sp-0031", "grid_integration", "Grid integration", "demonstration", "priority"),
]

S_DEFINITIONS = {
    "S1": "information intensity",
    "S2": "feedback speed",
    "S3": "experiment affordability and throughput",
    "S4": "physical flexibility or elapsed-time floors",
    "S5": "intrinsic error tolerance",
}


def source(
    candidate_source_id: str,
    pack_source_id: str,
    title_original: str,
    title_english: str,
    authors_org: str,
    publication_date: str,
    language: str,
    source_type: str,
    method_type: str,
    claim_owner: str,
    official_claim_status: str,
    independent_validation_status: str,
    url_or_doi: str,
    reliability_tier: str,
    evidence_basis: str,
    geo_scope: str,
    stage_ids: str,
    profile_ids: str,
    s_dimensions: str,
    key_claims: str,
    numerical_claims_and_locators: str,
    limitations: str,
    verification_status: str,
    promotion_recommendation: str,
    *,
    original_language_url: str = "missing",
    translation_note: str = "not_applicable",
    notes: str = "",
) -> dict[str, str]:
    return {
        "pack_source_id": pack_source_id,
        "candidate_source_id": candidate_source_id,
        "title_original": title_original,
        "title_english": title_english,
        "authors_org": authors_org,
        "publication_date": publication_date,
        "access_date": ACCESS_DATE,
        "last_verified": ACCESS_DATE,
        "archive_url": "missing",
        "language": language,
        "source_type": source_type,
        "method_type": method_type,
        "claim_owner": claim_owner,
        "official_claim_status": official_claim_status,
        "independent_validation_status": independent_validation_status,
        "url_or_doi": url_or_doi,
        "original_language_url": original_language_url,
        "translation_reviewer": "missing",
        "translation_note": translation_note,
        "reliability_tier": reliability_tier,
        "evidence_basis": evidence_basis,
        "geo_scope": geo_scope,
        "pathway_scope": "tokamak_research_to_pilot_plant_demonstration",
        "stage_ids": stage_ids,
        "profile_ids": profile_ids,
        "s_dimensions": s_dimensions,
        "key_claims": key_claims,
        "numerical_claims_and_locators": numerical_claims_and_locators,
        "limitations": limitations,
        "verification_status": verification_status,
        "promotion_recommendation": promotion_recommendation,
        "notes": notes,
    }


SOURCES = [
    source("fusion-src-001", "S-CN-EAST", "全超导托卡马克EAST装置实现亿度千秒高约束模等离子体运行", "EAST achieves a 100-million-degree 1,000-second high-confinement plasma", "Institute of Plasma Physics, Chinese Academy of Sciences", "2025-01-20", "zh", "official_facility_release", "administrative_data", "official_research_institute", "official_observed_statistic", "not_applicable", "https://www.ipp.cas.cn/xwdt/ttxw/202501/t20250120_410191.html", "B", "observed facility milestone", "China", "plasma_control;reliability_demonstration", "sp-0018;sp-0029", "S2;S3;S4", "EAST reported a 1,066-second high-confinement plasma and earlier long-pulse milestones.", "1,066 s H-mode; article body paragraph 2. More than 150,000 discharges; paragraph 4.", "A long plasma pulse is not net energy, plant availability, component life, or an AI result.", "verified_official_primary", "stage_scope_limited", original_language_url="https://www.ipp.cas.cn/xwdt/ttxw/202501/t20250120_410191.html", translation_note="Machine-assisted translation checked against the Chinese page; native-language review required before public quotation."),
    source("fusion-src-002", "S-CN-CRAFT-TF", "CRAFT项目环向场（TF）磁体绕组制造顺利完工", "CRAFT toroidal-field magnet winding manufacturing completed", "Institute of Plasma Physics, Chinese Academy of Sciences", "2026-03-09", "zh", "official_facility_release", "administrative_data", "official_research_institute", "official_program_claim", "not_applicable", "https://www.ipp.cas.cn/hnxny/kyxm/202603/t20260309_825283.html", "B", "observed facility milestone", "China", "magnets;component_fabrication", "sp-0021;sp-0026", "S2;S3;S4;S5", "The CRAFT TF winding completed manufacturing and passed the stated project milestone.", "Completion event 2026-02-26; article paragraphs 1-2. Dimensions and mass are in paragraph 3.", "Component completion is not integrated tokamak or power-plant performance.", "verified_official_primary", "stage_scope_limited", original_language_url="https://www.ipp.cas.cn/hnxny/kyxm/202603/t20260309_825283.html", translation_note="Machine-assisted translation checked against the Chinese page; engineering terms need native specialist review if quoted."),
    source("fusion-src-003", "S-CN-ROADMAP", "核能技术方向研究及发展路线图丨中国工程科学", "Research and development roadmap for nuclear energy technologies", "State Administration of Science, Technology and Industry for National Defense / Chinese Academy of Engineering authors", "2023-05-15", "zh", "official_roadmap_republication", "government_strategy", "government_and_named_experts", "official_program_claim", "not_applicable", "https://www.sastind.gov.cn/n10086205/n10086408/n10104280/c10386340/content.html", "B", "commentary", "China", "theory_and_system_design;materials_qualification;tritium_and_fuel_cycle;blankets", "sp-0014;sp-0020;sp-0024;sp-0025", "S2;S3;S4;S5", "The text identifies long-pulse operation, neutron-resistant materials, and tritium self-sufficiency as unresolved requirements and says no shortcut has been found.", "CFETR demonstration target around 2050; section 磁约束聚变能.", "The page republishes a 2018 China Engineering Science article in 2023; it is not a newly issued 2023 roadmap or an observed result.", "verified_official_primary", "stage_scope_limited", original_language_url="https://www.sastind.gov.cn/n10086205/n10086408/n10104280/c10386340/content.html", translation_note="Machine-assisted translation checked against the Chinese text; preserve the 2018-origin/2023-republication distinction."),
    source("fusion-src-004", "S-CN-LAW", "中华人民共和国原子能法", "Atomic Energy Law of the People's Republic of China", "National People's Congress (Ministry of Commerce legal database mirror)", "2025-09-12", "zh", "official_legal_text", "law_or_regulation", "legislature", "official_program_claim", "not_applicable", "https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=103716", "A", "programme announcement", "China", "licensing", "sp-0030", "S2;S3;S4;S5", "The law includes controlled thermonuclear fusion within the national atomic-energy legal framework.", "Effective 2026-01-15; promulgation and effective dates in header. Controlled thermonuclear fusion provision: Article 37.", "A statute establishes authority and duties; it is not a completed fusion licensing case or evidence of review duration.", "verified_official_primary", "stage_scope_limited", original_language_url="https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=103716", translation_note="Article number and dates checked in the Chinese legal text; legal interpretation requires a qualified reviewer."),
    source("fusion-src-005", "S-CN-HL3", "中国核工业报：新一代人造太阳“中国环流三号”再创我国可控核聚变新纪录", "CNNC newspaper: HL-3 sets a new Chinese controlled-fusion record", "China National Nuclear Corporation / Southwestern Institute of Physics", "2025-05-28", "zh", "official_company_newspaper", "corporate_report", "state_owned_enterprise", "official_observed_statistic", "not_independently_validated", "https://www.cnnc.com.cn/cnnc/resource/cms/article/1373577/836c94bef055494188026fb7cef9c850/2025060311055363962.pdf", "B", "observed facility milestone", "China", "heating_and_current_drive;plasma_control", "sp-0022;sp-0018", "S2;S3;S4", "HL-3 reported simultaneous high ion and electron temperatures after heating-system upgrades.", "Ion temperature 117 million °C and electron temperature 160 million °C; newspaper page containing the 28 May HL-3 article, lead paragraphs.", "Official operator reporting, not independent validation; temperature milestones are not net energy or reliability.", "verified_official_primary", "stage_scope_limited", original_language_url="https://www.cnnc.com.cn/cnnc/resource/cms/article/1373577/836c94bef055494188026fb7cef9c850/2025060311055363962.pdf", translation_note="Machine-assisted translation checked against the Chinese PDF; precise heating-power values were not promoted."),
    source("fusion-src-006", "S-CN-HL3-ROAD", "聚变堆主机关键系统综合研究设施建设进展", "Progress toward an HL-3 burning-plasma experiment", "China Atomic Energy Authority", "missing", "zh", "official_program_release", "government_strategy", "government", "official_target", "not_applicable", "https://www.caea.gov.cn/n6760338/n6760342/c10711680/content.html", "B", "official target", "China", "plasma_control;commissioning", "sp-0018;sp-0028", "S2;S3;S4;S5", "The official page states a target for an HL-3 burning-plasma experiment in 2027.", "2027 target; article body.", "The date is an official target, not an observed experiment, completion milestone, or schedule guarantee.", "verified_official_primary", "stage_scope_limited", original_language_url="https://www.caea.gov.cn/n6760338/n6760342/c10711680/content.html", translation_note="Machine-assisted translation checked against the Chinese page; retain target language."),
    source("fusion-src-007", "S-CN-HL3-AI", "High-fidelity data-driven dynamics model for reinforcement learning-based control in HL-3 tokamak", "High-fidelity data-driven dynamics model for reinforcement learning-based control in HL-3 tokamak", "Wu et al.; Communications Physics", "2025-10-03", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1038/s42005-025-02302-y", "A", "observed experimental result", "China", "simulation;plasma_control", "sp-0015;sp-0018", "S1;S2;S3", "A learned dynamics model trained an RL controller that ran live on HL-3 at 1 kHz and tracked targets in reported shots.", "1 kHz controller and 400 ms duration; Methods and Results, HL-3 experiments. Shot identifiers #12781 and #6698; figure captions.", "Research-device demonstration; no nuclear-safety case, plant reliability, or transfer to pilot conditions.", "verified_peer_reviewed", "stage"),
    source("fusion-src-008", "S-CN-EAST-AI", "Interpretability analysis and real-time prediction of locked mode-induced disruptions in EAST", "Interpretability analysis and real-time prediction of locked mode-induced disruptions in EAST", "EAST research team; Plasma Physics and Controlled Fusion", "2025-06-26", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1088/1361-6587/ade5c5", "A", "proof of concept", "China", "diagnostics;plasma_control", "sp-0017;sp-0018", "S1;S2;S3;S5", "The paper reports an interpretable predictor for locked-mode disruptions using EAST data and a real-time test configuration.", "AUC 0.997; 94% successful alarm rate; mean 137 ms warning; 10% false-alarm rate; abstract and Results section.", "Prediction performance is not autonomous avoidance, safe termination, or pilot-plant error tolerance.", "verified_peer_reviewed", "stage_scope_limited"),
    source("fusion-src-009", "S-CN-EAST-AI", "Automatic identification of tokamak plasma confinement states with multi-task learning neural network", "Automatic identification of tokamak plasma confinement states with multi-task learning neural network", "EAST research team; Nuclear Fusion", "2025-06-23", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1088/1741-4326/ade3ed", "A", "proof of concept", "China", "diagnostics", "sp-0017", "S1;S2;S3", "The paper reports automated classification of three EAST confinement states from diagnostic data.", "96.7% classification accuracy and 3.6 percentage-point improvement; abstract.", "Classification benchmark; not a closed-loop control or safety demonstration.", "verified_peer_reviewed", "stage_scope_limited"),
    source("fusion-src-010", "S-CN-CFEC", "China Fusion Energy Co., Ltd. inaugurated in Shanghai", "China Fusion Energy Co., Ltd. inaugurated in Shanghai", "China National Nuclear Corporation", "2025-07-31", "en", "official_company_release", "corporate_report", "state_owned_enterprise", "official_program_claim", "not_applicable", "https://en.cnnc.com.cn/2025-07/31/c_1113670.htm", "B", "programme announcement", "China", "theory_and_system_design;component_fabrication;construction", "sp-0014;sp-0026;sp-0027", "S2;S3;S4", "CNNC announced a dedicated fusion-energy company covering system design, technology verification, and digital R&D.", "Inauguration date 2025-07-22; article lead.", "Organizational formation is not a facility, manufacturing, or power milestone.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-011", "S-CN-HH70-XH", "Chinese fusion device sustains plasma operation for over 1,000 seconds", "Chinese fusion device sustains plasma operation for over 1,000 seconds", "Xinhua", "2026-04-10", "en", "official_media_report", "media_report", "official_media", "official_program_claim", "not_independently_validated", "https://www.sh.news.cn/20260410/696d097c4a6c41b9af5f654314252a04/c.html", "B", "observed facility milestone", "China", "magnets;plasma_control;reliability_demonstration", "sp-0021;sp-0018;sp-0029", "S2;S3;S4", "Xinhua reports the HH70 project chronology and a 1,337-second low-parameter plasma operation, attributing data to the company.", "1,337 s; article section on Dec 2025-Jan 2026 tests. Project start March 2022 and first plasma June 2024; chronology paragraphs.", "Official media repeats company data and explicitly describes low-parameter operation; not independent experimental validation, net energy, or plant availability.", "verified_official_secondary", "stage_scope_limited"),
    source("fusion-src-012", "S-CN-HH70-CO", "HH70 achieves first plasma", "HH70 achieves first plasma", "Energy Singularity", "2024-06-18", "en", "company_release", "corporate_report", "company", "not_official_claim", "not_independently_validated", "https://energysingularity.cn/en/news/news-025.html", "C", "observed facility milestone", "China", "magnets;construction;commissioning", "sp-0021;sp-0027;sp-0028", "S2;S3;S4", "The company reports first plasma in its full-HTS research tokamak.", "0.6 T design field and stated magnet count; device description. First plasma date in release header/body.", "First-party milestone; small non-DT device without blanket, tritium plant, turbine, or commercial licensing.", "verified_company_primary", "stage_scope_limited"),
    source("fusion-src-013", "S-CN-HH70-CO", "基于AI的等离子体反馈控制不断优化，洪荒70完成1337秒等离子体稳态运行！", "AI-based plasma feedback control optimized as HH70 completes 1,337-second steady operation", "Energy Singularity", "2026-02-02", "zh", "company_release", "corporate_report", "company", "not_official_claim", "not_independently_validated", "https://energysingularity.cn/news/news-001.html", "C", "commentary", "China", "plasma_control;reliability_demonstration", "sp-0018;sp-0029", "S2;S3;S4", "The primary company page explicitly attributes the 1,337-second result to optimization of AI-based feedback control.", "1,337 s; headline and article lead.", "No method, model, counterfactual, independent validation, or peer-reviewed analysis establishes AI's material causal contribution; not plant reliability.", "verified_company_primary", "defer", original_language_url="https://energysingularity.cn/news/news-001.html", translation_note="Headline and causal wording checked in Chinese; classify only as a company claim."),
    source("fusion-src-014", "S-CN-HH70-CO", "Development and construction of magnet system for world's first full high temperature superconducting tokamak", "Development and construction of magnet system for world's first full high temperature superconducting tokamak", "Energy Singularity authors; Superconductivity", "2024-12", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1016/j.supcon.2024.100137", "A", "proof of concept", "China", "magnets;component_fabrication", "sp-0021;sp-0026", "S2;S3;S4;S5", "The paper documents design, manufacture, and construction of the HH70 HTS magnet system.", "Device dimensions and magnet-system parameters; design and construction sections.", "Magnet engineering does not validate the 1,337-second AI causal claim or a fusion power plant.", "verified_peer_reviewed", "stage_scope_limited"),
    source("fusion-src-015", "S-CN-STARTORUS", "SUNIST-2球形托卡马克首次等离子体放电成功", "SUNIST-2 spherical tokamak achieves first plasma", "Startorus Fusion", "2023-07-12", "zh", "company_release", "corporate_report", "company", "not_official_claim", "not_independently_validated", "https://startorus.com/progress-news/154.html", "C", "observed facility milestone", "China", "construction;commissioning", "sp-0027;sp-0028", "S2;S3;S4", "The company reports first plasma in the SUNIST-2 research device.", "100 kA stated target/parameter and first-plasma date; article body.", "First-party research-device milestone; no stable independent experimental source located in the bounded pass.", "verified_company_primary", "defer", original_language_url="https://startorus.com/progress-news/154.html", translation_note="Machine-assisted translation checked; retain company-claim status."),
    source("fusion-src-016", "S-CN-MFG", "上海电气下属核电集团在BEST紧凑型聚变能实验装置核心设备研制上取得关键突破", "Shanghai Electric Nuclear Power Group reports BEST core-equipment milestones", "Shanghai State-owned Assets Supervision and Administration Commission", "2026-08-14", "zh", "official_industrial_release", "administrative_data", "government", "official_observed_statistic", "not_applicable", "https://www.gzw.sh.gov.cn/shgzw_zxzx_gqdt/20260814/67baeb6d5610423b90eeb0f3039f7cd3.html", "B", "observed facility milestone", "China", "component_fabrication;construction", "sp-0026;sp-0027", "S2;S3;S4;S5", "A second one-eighth BEST vacuum-vessel sector passed acceptance and was delivered; a third one-eighth cold-shield sector completed factory ring assembly.", "Second 1/8 vacuum-vessel sector and third 1/8 cold-shield sector; article paragraphs 2-3.", "Post-cutoff component milestones; not full system assembly, commissioning, or power operation.", "verified_official_primary", "stage_scope_limited", original_language_url="https://www.gzw.sh.gov.cn/shgzw_zxzx_gqdt/20260814/67baeb6d5610423b90eeb0f3039f7cd3.html", translation_note="Machine-assisted translation checked against the Chinese page; component fractions and acceptance verbs preserved."),
    source("fusion-src-017", "S-AI-TCV", "Magnetic control of tokamak plasmas through deep reinforcement learning", "Magnetic control of tokamak plasmas through deep reinforcement learning", "Degrave et al.; Nature", "2022-02-16", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1038/s41586-021-04301-9", "A", "observed experimental result", "Switzerland", "simulation;plasma_control", "sp-0015;sp-0018", "S1;S2;S3", "A deep-RL controller ran live on TCV and controlled multiple plasma shapes.", "10 kHz control cycle and 19 controlled coils; Methods and Figure 1.", "Research tokamak; does not establish pilot-plant transfer, safety, reliability, or reduced nuclear commissioning time.", "verified_peer_reviewed", "stage"),
    source("fusion-src-018", "S-AI-DIII-D", "Avoiding fusion plasma tearing instability with deep reinforcement learning", "Avoiding fusion plasma tearing instability with deep reinforcement learning", "Seo et al.; Nature", "2024-02-21", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1038/s41586-024-07024-9", "A", "observed experimental result", "United States", "experiment_selection;diagnostics;plasma_control", "sp-0016;sp-0017;sp-0018", "S1;S2;S3;S5", "A deep-RL policy ran live on DIII-D to avoid tearing instability by controlling beam power and plasma shape.", "Actuators and experimental sequence; main text and Methods. Paper labels the work proof of concept.", "Early proof of concept on a research device; not universal disruption avoidance or a nuclear-safety system.", "verified_peer_reviewed", "stage"),
    source("fusion-src-019", "S-AI-KSTAR-D3D", "Highest fusion performance without harmful edge energy bursts in tokamak", "Highest fusion performance without harmful edge energy bursts in tokamak", "Kim et al.; Nature Communications", "2024-05-11", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1038/s41467-024-48415-w", "A", "observed experimental result", "South Korea;United States", "experiment_selection;diagnostics;plasma_control", "sp-0016;sp-0017;sp-0018", "S1;S2;S3", "Machine-learning-enabled adaptive 3-D-field optimization was tested across KSTAR and DIII-D discharges.", "More than 30 discharges; Methods/experimental dataset description. Reported performance changes must be read with metric-specific denominators in Results.", "Device- and scenario-specific experiment; the pack's simplified 'up to 90%' line is not promoted without a metric-matched locator.", "verified_peer_reviewed", "stage_scope_limited"),
    source("fusion-src-020", "S-AI-TRANSFER", "Disruption prediction for future tokamaks using parameter-based transfer learning", "Disruption prediction for future tokamaks using parameter-based transfer learning", "Zheng et al.; Communications Physics", "2023-07-17", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1038/s42005-023-01296-9", "A", "proof of concept", "China", "diagnostics;plasma_control", "sp-0017;sp-0018", "S1;S2;S3;S5", "Parameter-based transfer learning was evaluated from J-TEXT to a small EAST dataset for disruption prediction.", "20 EAST shots; dataset/Methods section.", "Offline, small-target-domain proof of concept; not live transfer to a future pilot plant.", "verified_peer_reviewed", "stage_scope_limited"),
    source("fusion-src-021", "S-AI-DIAG", "Multimodal super-resolution: discovering hidden physics and its application to fusion plasmas", "Multimodal super-resolution: discovering hidden physics and its application to fusion plasmas", "Jalalvand et al.; Nature Communications", "2025-09-26", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1038/s41467-025-63492-1", "A", "proof of concept", "United States", "diagnostics", "sp-0017", "S1;S2;S3", "A multimodal model reconstructed high-frequency diagnostic structure from DIII-D historical data.", "4,000 DIII-D discharges from 2017-2022; Methods, Data acquisition. Diagnostic sampling frequencies from 200 Hz to 2 MHz; same section.", "Retrospective/synthetic diagnostic reconstruction; not a qualified replacement for safety instrumentation.", "verified_peer_reviewed", "stage_scope_limited"),
    source("fusion-src-022", "unassigned_pack_table", "GS-DeepNet: mastering tokamak plasma equilibria with deep neural networks and the Grad–Shafranov equation", "GS-DeepNet: mastering tokamak plasma equilibria with deep neural networks and the Grad–Shafranov equation", "Joung et al.; Scientific Reports", "2023-09-22", "en", "peer_reviewed_paper", "peer_reviewed_paper", "research_authors", "not_official_claim", "independently_validated", "https://doi.org/10.1038/s41598-023-42991-5", "A", "proof of concept", "international", "simulation;diagnostics", "sp-0015;sp-0017", "S1;S2;S3", "The paper presents a learned equilibrium-reconstruction surrogate for real-time use.", "50 KSTAR discharges and about 10,000 time slices; Methods, 'How to train GS-DeepNet'.", "Model benchmark; not a closed-loop or safety-qualified deployment.", "verified_peer_reviewed", "stage_scope_limited"),
    source("fusion-src-023", "unassigned_pack_table", "HEAT-ML research highlight", "HEAT-ML research highlight", "Princeton Plasma Physics Laboratory", "missing", "en", "official_research_highlight", "expert_commentary", "official_research_institute", "official_program_claim", "unknown", "https://www.pppl.gov/news/2026", "B", "proof of concept", "United States", "simulation;plasma_facing_components", "sp-0015;sp-0023", "S1;S2;S3", "The pack describes a surrogate for magnetic-shadow calculations relevant to plasma-facing components.", "missing; the pack did not supply a DOI and the bounded verification pass did not recover a stable article URL.", "Publisher page/DOI and exact paper title were not stably verified.", "unverified_locator", "defer", notes="No promotion until the original PPPL article and Fusion Engineering and Design DOI resolve."),
    source("fusion-src-024", "S-US-STELLAR", "PPPL launches STELLAR-AI platform to accelerate fusion energy research", "PPPL launches STELLAR-AI platform to accelerate fusion energy research", "Princeton Plasma Physics Laboratory", "2026-01-22", "en", "official_program_release", "government_strategy", "official_research_institute", "official_program_claim", "not_applicable", "https://www.pppl.gov/news/2026/pppl-launches-stellar-ai-platform-accelerate-fusion-energy-research", "B", "programme announcement", "United States", "theory_and_system_design;simulation;experiment_selection", "sp-0014;sp-0015;sp-0016", "S1;S2;S3", "PPPL announced a platform linking AI, high-performance computing, and future NSTX-U experiments.", "No demonstrated schedule reduction. Source says some simulations/training exercises can take months; article body.", "Programme announcement and capability intent, not an observed AI-shortened research cycle; its 'NSTX-U this year' wording was superseded by a 2027 experiment target.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-025", "S-US-STELLFOUNDRY", "Bringing fusion energy to the grid using artificial intelligence", "Bringing fusion energy to the grid using artificial intelligence", "Princeton Plasma Physics Laboratory", "2026-02-03", "en", "official_program_release", "government_strategy", "official_research_institute", "official_program_claim", "not_applicable", "https://www.pppl.gov/news/2026/bringing-fusion-energy-grid-using-artificial-intelligence", "B", "programme announcement", "United States", "theory_and_system_design;simulation;experiment_selection", "sp-0014;sp-0015;sp-0016", "S1;S2;S3", "PPPL announced the StellFoundry collaboration for AI-enabled stellarator design and surrogate modelling.", "30 researchers and 10 organizations; article lead/body.", "Programme announcement; no observed plant-design, construction, or grid schedule reduction.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-026", "S-US-MPEX", "MPEX user research forum 2026", "MPEX user research forum 2026", "Oak Ridge National Laboratory", "2026-03-20", "en", "official_facility_page", "administrative_data", "official_research_institute", "official_program_claim", "not_applicable", "https://mpex.ornl.gov/murf-2026/", "B", "programme announcement", "United States", "materials_qualification;plasma_facing_components", "sp-0020;sp-0023", "S2;S3;S4", "MPEX is under assembly and is intended to expose materials, including neutron-irradiated samples, to reactor-edge-like plasma conditions.", "Up to 1,000,000 s exposure capability; facility description on page.", "MPEX does not itself supply a fusion-spectrum neutron field; intended capability is not an observed qualification programme.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-027", "S-US-MPEX-AI", "AI-accelerated fusion materials test facility", "AI-accelerated fusion materials test facility", "Oak Ridge National Laboratory", "2026-06-15", "en", "official_research_highlight", "government_strategy", "official_research_institute", "official_program_claim", "not_applicable", "https://www.ornl.gov/research-highlight/ai-accelerated-fusion-materials-test-facility", "B", "programme announcement", "United States", "simulation;materials_qualification;plasma_facing_components", "sp-0015;sp-0020;sp-0023", "S1;S2;S3;S4", "ORNL describes digital twins and AI methods being developed for MPEX.", "No observed AI-shortening value reported; page text.", "Announced/developing capability, not demonstrated materials qualification or component-life acceleration.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-028", "S-US-DOE-ROAD;S-US-DCP", "Fusion Science and Technology Roadmap", "Fusion Science and Technology Roadmap", "U.S. Department of Energy", "2026-06-09", "en", "official_roadmap", "government_strategy", "government", "official_program_claim", "not_applicable", "https://www.energy.gov/documents/fusion-science-and-technology-roadmap", "A", "programme announcement", "United States", "theory_and_system_design;simulation;experiment_selection;materials_qualification;tritium_and_fuel_cycle;blankets", "sp-0014;sp-0015;sp-0016;sp-0020;sp-0024;sp-0025", "S1;S2;S3;S4;S5", "The roadmap defines six challenge areas and an AI-Fusion Digital Convergence Platform as a programme direction.", "AI-Fusion DCP and six challenge areas; roadmap PDF page 26 and challenge-area sections.", "Official roadmap and targets, not observed reductions in materials, blanket, tritium, licensing, or construction time.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-029", "S-US-DIII-D", "DIII-D National Fusion Program completes facility upgrade", "DIII-D National Fusion Program completes facility upgrade", "General Atomics", "2024-05-08", "en", "facility_operator_release", "corporate_report", "facility_operator", "not_official_claim", "not_independently_validated", "https://www.ga.com/diii-d-national-fusion-program-completes-facility-upgrade", "C", "observed facility milestone", "United States", "diagnostics;heating_and_current_drive;commissioning", "sp-0017;sp-0022;sp-0028", "S2;S3;S4", "The operator reports completion of an eight-month facility upgrade and return toward operation.", "Eight-month upgrade; release lead. Installed systems listed in body.", "Facility milestone, not an AI result or a directly comparable nuclear commissioning programme.", "verified_company_primary", "stage_scope_limited"),
    source("fusion-src-030", "S-US-NSTXU", "Delivery of magnet bundle signals new age of fusion research", "Delivery of magnet bundle signals new age of fusion research", "Princeton Plasma Physics Laboratory", "2026-06-08", "en", "official_facility_release", "administrative_data", "official_research_institute", "official_target", "not_applicable", "https://www.pppl.gov/news/2026/delivery-magnet-bundle-signals-new-age-fusion-research", "B", "official target", "United States", "magnets;component_fabrication;construction;commissioning", "sp-0021;sp-0026;sp-0027;sp-0028", "S2;S3;S4;S5", "PPPL reports delivery of the central magnet bundle and now expects experiments in 2027.", "2027 experiment target; article lead/body.", "Target, not completed recommissioning; the pack's 93% figure was not located on this page and is not promoted.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-031", "S-US-SPARC", "SPARC technology page", "SPARC technology page", "Commonwealth Fusion Systems", "missing", "en", "company_program_page", "corporate_report", "company", "not_official_claim", "not_independently_validated", "https://www.cfs.energy/technology/", "C", "company target", "United States", "magnets;construction;commissioning;grid_integration", "sp-0021;sp-0027;sp-0028;sp-0031", "S2;S3;S4", "CFS describes SPARC construction and a target for plasma energy gain greater than one.", "No stable publication date on the living page; performance target described on page.", "Company target and living page; no observed Q>1 result or grid connection.", "verified_company_primary", "stage_scope_limited", notes="Freshness must be rechecked at promotion because the page is undated and mutable."),
    source("fusion-src-032", "S-DE-W7X", "Neue Bestwerte Wendelstein 7-X", "New best values at Wendelstein 7-X", "Max Planck Institute for Plasma Physics", "2025-06-03", "de", "official_facility_release", "administrative_data", "official_research_institute", "official_observed_statistic", "not_applicable", "https://www.ipp.mpg.de/5532474/w7x", "B", "observed experimental result", "Germany", "plasma_control;plasma_facing_components;reliability_demonstration", "sp-0018;sp-0023;sp-0029", "S2;S3;S4", "W7-X reported a long-pulse triple-product result and a separate high-energy-turnover discharge.", "43 s triple-product result and 360 s / 1.8 GJ energy turnover; article sections 'Weltbestes Tripelprodukt' and energy turnover.", "Different discharges/metrics; neither is net energy, DT operation, plant availability, or blanket life.", "verified_official_primary", "stage_scope_limited", original_language_url="https://www.ipp.mpg.de/5532474/w7x", translation_note="German source checked; preserve that 43 s and 360 s / 1.8 GJ describe different records."),
    source("fusion-src-033", "S-JP-JT60", "First plasma 23 October", "First plasma 23 October", "JT-60SA Organization (QST/Fusion for Energy)", "2023-10-24", "en", "official_facility_release", "administrative_data", "international_program", "official_observed_statistic", "not_applicable", "https://www.jt60sa.org/wp/first-plasma-23-october/", "B", "observed facility milestone", "Japan;European Union", "construction;commissioning", "sp-0027;sp-0028", "S2;S3;S4;S5", "JT-60SA achieved first plasma during integrated commissioning.", "First plasma 2023-10-23; release lead.", "Low-power research commissioning milestone; not high-power operation, DT commissioning, or commercial reliability.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-034", "S-JP-JT60", "OP2 has started", "OP2 has started", "JT-60SA Organization (QST/Fusion for Energy)", "2026-04-28", "en", "official_facility_release", "administrative_data", "international_program", "official_target", "not_applicable", "https://www.jt60sa.org/wp/op2-has-started/", "B", "official target", "Japan;European Union", "heating_and_current_drive;commissioning", "sp-0022;sp-0028", "S2;S3;S4;S5", "OP2 component commissioning began, with plasma operations including ECRH and NBI targeted by end-2026.", "End-2026 plasma-operations target; final paragraph. Commissioning sequence; middle paragraphs.", "Mixed current facility milestone and future target; not proof that the experimental campaign or high-power commissioning is complete.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-035", "S-UK-STEP", "About STEP", "About STEP", "UK Industrial Fusion Solutions / UK Atomic Energy Authority", "missing", "en", "official_program_page", "government_strategy", "government_program", "official_target", "not_applicable", "https://step.ukaea.uk/about/", "B", "official target", "United Kingdom", "theory_and_system_design;construction;tritium_and_fuel_cycle;grid_integration", "sp-0014;sp-0027;sp-0024;sp-0031", "S2;S3;S4;S5", "STEP targets first operations around 2040 and net energy in the 2040s at West Burton.", "2040 first-operations target; page section 'Our vision'. Net-energy-in-2040s statement; UKIFS section.", "Undated living programme page and official target; no observed construction, tritium self-sufficiency, or grid output.", "verified_official_primary", "stage_scope_limited", notes="Recheck living-page wording before promotion."),
    source("fusion-src-036", "S-ITER-BASE", "ITER Machine Assembly Overview", "ITER Machine Assembly Overview", "ITER Organization", "missing", "en", "official_program_page", "government_strategy", "international_program", "official_target", "not_applicable", "https://www.iter.org/project/assembly-overview", "B", "official target", "international", "component_fabrication;construction;commissioning", "sp-0026;sp-0027;sp-0028", "S2;S3;S4;S5", "ITER's revised staged baseline separates assembly, integrated commissioning, research operation, and later DT preparation.", "Cryostat closure 2033; integrated commissioning 2033-34; start of research operation 2034; page timeline. Dates labeled baseline proposal.", "Official baseline proposal, not observed completion; later phases add nuclear/tritium systems.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-037", "S-ITER-2026", "ITER Machine Assembly Overview", "ITER Machine Assembly Overview", "ITER Organization", "missing", "en", "official_program_page", "administrative_data", "international_program", "official_program_claim", "not_applicable", "https://www.iter.org/project/assembly-overview", "B", "observed facility milestone", "international", "component_fabrication;construction;commissioning", "sp-0026;sp-0027;sp-0028", "S2;S3;S4", "The current page documents the assembly/commissioning topology but does not substantiate the pack's 'sixth of nine sectors' July-2026 numerical claim.", "missing for sixth-of-nine claim; no precise locator recovered on the stable page.", "Use for phase definitions only; defer the July-2026 sector-count claim pending the exact original news page.", "partially_verified_scope_only", "defer"),
    source("fusion-src-038", "S-ITER-TRITIUM", "Tritium breeding", "Tritium breeding", "ITER Organization", "missing", "en", "official_program_page", "government_strategy", "international_program", "official_program_claim", "not_applicable", "https://www.iter.org/machine/supporting-systems/tritium-breeding", "B", "programme announcement", "international", "tritium_and_fuel_cycle;blankets;grid_integration", "sp-0024;sp-0025;sp-0031", "S2;S3;S4;S5", "ITER will test breeding-blanket mockups; large-scale tritium production and recycling still require further research.", "Four TBM concepts and two equatorial ports; TBM Program section. No quantitative performance result claimed.", "Future test programme; ITER is not a tritium-self-sufficient power plant and testing is not qualification of a commercial blanket.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-039", "S-US-NRC", "Regulatory Framework for Fusion Machines; Proposed Rule", "Regulatory Framework for Fusion Machines; Proposed Rule", "U.S. Nuclear Regulatory Commission / Federal Register", "2026-02-26", "en", "official_proposed_rule", "law_or_regulation", "regulator", "official_program_claim", "not_applicable", "https://www.federalregister.gov/documents/2026/02/26/2026-03865/regulatory-framework-for-fusion-machines", "A", "programme announcement", "United States", "licensing", "sp-0030", "S2;S3;S4;S5", "The NRC proposed a Part 30-based, technology-neutral licensing framework for fusion machines.", "91 FR 9476; Federal Register citation and document header. 90-day comment period ending 2026-05-27; Dates section.", "Proposed rule and draft guidance, not a final rule or an observed plant licence review.", "verified_official_primary", "stage"),
    source("fusion-src-040", "S-US-NRC", "Fusion Machine Rulemaking Status", "Fusion Machine Rulemaking Status", "U.S. Nuclear Regulatory Commission", "2026-08-27", "en", "official_regulator_status_page", "administrative_data", "regulator", "official_program_claim", "not_applicable", "https://www.nrc.gov/materials/fusion/rulemaking-status", "A", "programme announcement", "United States", "licensing", "sp-0030", "S2;S3;S4;S5", "As of 27 August 2026, the NRC still lists the February proposed rule and draft guidance; a final fusion rule is not listed.", "Page Last Reviewed/Updated 2026-08-27; footer. Proposed-rule milestone 2026-02-26; table.", "Regulatory status, not evidence of licence throughput or a completed plant application.", "verified_official_primary", "stage"),
    source("fusion-src-041", "S-IAEA-SAFE", "Technical Meeting on Design Safety, Safety Assessment and Regulatory Considerations for Fusion Facilities", "Technical Meeting on Design Safety, Safety Assessment and Regulatory Considerations for Fusion Facilities", "International Atomic Energy Agency", "missing", "en", "official_meeting_document", "government_strategy", "international_organization", "official_program_claim", "not_applicable", "https://www.iaea.org/sites/default/files/25/02/evt2405228_information_sheet_.pdf", "B", "programme announcement", "international", "licensing", "sp-0030", "S2;S3;S4;S5", "The meeting document states that an IAEA safety report on fusion design and regulation was being finalized.", "Meeting dates and objective; information sheet pages 1-2.", "Meeting/programme document, not a published fusion-specific safety standard or an observed licensing result.", "verified_official_primary", "stage_scope_limited"),
    source("fusion-src-042", "S-TOKAMAK-ENERGY", "Fusion energy technology", "Fusion energy technology", "Tokamak Energy", "missing", "en", "company_program_page", "corporate_report", "company", "not_official_claim", "not_independently_validated", "https://tokamakenergy.com/our-fusion-energy-and-hts-technology/fusion-energy-technology/", "C", "company target", "United Kingdom", "magnets;heating_and_current_drive;plasma_control", "sp-0021;sp-0022;sp-0018", "S2;S3;S4", "The company reports ST40 and Demo4 milestones and presents their relevance to future fusion systems.", "1 MA plasma current and 100 million °C ion temperature; ST40 section. Living page has no stable publication date.", "First-party company page; metric definitions and independent validation must be checked before any outcome claim.", "verified_company_primary", "stage_scope_limited", notes="Treat observed items as company-reported; not evidence of a commercial plant."),
    source("fusion-src-043", "S-TYPEONE", "Fusion With a Twist", "Fusion With a Twist", "Type One Energy", "missing", "en", "company_program_page", "corporate_report", "company", "not_official_claim", "not_independently_validated", "https://typeoneenergy.com/our-technology/", "C", "company target", "United States", "theory_and_system_design;magnets;construction;commissioning;grid_integration", "sp-0014;sp-0021;sp-0027;sp-0028;sp-0031", "S2;S3;S4", "The company targets Infinity One commissioning/startup in 2029 and describes an Infinity Two 400 MWe design.", "2029 Infinity One target and 400 MWe Infinity Two design; page sections 'Infinity One' and 'Infinity Two'.", "Company targets and design claims; Infinity One will not generate electricity and no grid outcome is observed.", "verified_company_primary", "stage_scope_limited", notes="Preserve the testbed-versus-power-plant distinction."),
    source("fusion-src-044", "S-PROXIMA", "Alpha Alliance: 30+ European industrial companies join forces to deliver fusion demonstrator Alpha", "Alpha Alliance: 30+ European industrial companies join forces to deliver fusion demonstrator Alpha", "Proxima Fusion", "2026-02-25", "en", "company_release", "corporate_report", "company", "not_official_claim", "not_independently_validated", "https://www.proximafusion.com/press-news/alpha-alliance-30-european-industrial-companies-join-forces-to-deliver-fusion-demonstrator-alpha", "C", "company target", "Germany", "theory_and_system_design;component_fabrication;construction;grid_integration", "sp-0014;sp-0026;sp-0027;sp-0031", "S2;S3;S4", "Proxima announced an industrial consortium for its planned Alpha net-energy stellarator demonstrator.", "More than 30 companies; headline/lead. No observed construction or performance value.", "Company programme announcement and target; pathway is stellarator, not the frozen tokamak pathway, so use only as pathway contrast.", "verified_company_primary", "stage_scope_limited"),
]


PROFILE_EVIDENCE = {
    "sp-0014": {
        "best": "fusion-src-024;fusion-src-025;fusion-src-028",
        "statuses": ["indirectly supported/analogy", "indirectly supported/analogy", "indirectly supported/analogy", "contradicted or complicated", "no suitable source located"],
        "maturity": "official programme evidence only",
    },
    "sp-0015": {
        "best": "fusion-src-007;fusion-src-017;fusion-src-022;fusion-src-024",
        "statuses": ["directly supported", "indirectly supported/analogy", "indirectly supported/analogy", "contradicted or complicated", "no suitable source located"],
        "maturity": "peer-reviewed proof of concept plus programme evidence",
    },
    "sp-0016": {
        "best": "fusion-src-018;fusion-src-019;fusion-src-024;fusion-src-025",
        "statuses": ["indirectly supported/analogy", "indirectly supported/analogy", "indirectly supported/analogy", "no suitable source located", "no suitable source located"],
        "maturity": "adjacent experimental evidence; no experiment-selection outcome study",
    },
    "sp-0017": {
        "best": "fusion-src-008;fusion-src-009;fusion-src-020;fusion-src-021;fusion-src-022",
        "statuses": ["directly supported", "directly supported", "indirectly supported/analogy", "no suitable source located", "contradicted or complicated"],
        "maturity": "peer-reviewed diagnostic proof of concept",
    },
    "sp-0018": {
        "best": "fusion-src-007;fusion-src-017;fusion-src-018;fusion-src-019",
        "statuses": ["directly supported", "directly supported", "directly supported", "contradicted or complicated", "contradicted or complicated"],
        "maturity": "peer-reviewed live-device experiments on research tokamaks",
    },
    "sp-0019": {
        "best": "fusion-src-027;fusion-src-028",
        "statuses": ["indirectly supported/analogy", "no suitable source located", "no suitable source located", "contradicted or complicated", "no suitable source located"],
        "maturity": "programme announcement; no fusion-qualified material outcome",
    },
    "sp-0020": {
        "best": "fusion-src-003;fusion-src-026;fusion-src-027;fusion-src-028;fusion-src-038",
        "statuses": ["indirectly supported/analogy", "contradicted or complicated", "contradicted or complicated", "directly supported", "no suitable source located"],
        "maturity": "official requirements and planned facilities; no completed qualification case",
    },
    "sp-0021": {
        "best": "fusion-src-002;fusion-src-012;fusion-src-014;fusion-src-030",
        "statuses": ["indirectly supported/analogy", "directly supported", "contradicted or complicated", "directly supported", "contradicted or complicated"],
        "maturity": "observed component/facility milestones with scope limits",
    },
    "sp-0022": {
        "best": "fusion-src-005;fusion-src-029;fusion-src-034",
        "statuses": ["indirectly supported/analogy", "directly supported", "contradicted or complicated", "directly supported", "contradicted or complicated"],
        "maturity": "observed subsystem milestones and an official commissioning target",
    },
    "sp-0023": {
        "best": "fusion-src-026;fusion-src-027;fusion-src-032;fusion-src-038",
        "statuses": ["indirectly supported/analogy", "contradicted or complicated", "contradicted or complicated", "directly supported", "no suitable source located"],
        "maturity": "facility/programme evidence; no fusion-neutron lifetime qualification",
    },
    "sp-0024": {
        "best": "fusion-src-003;fusion-src-028;fusion-src-038",
        "statuses": ["indirectly supported/analogy", "contradicted or complicated", "contradicted or complicated", "directly supported", "contradicted or complicated"],
        "maturity": "official gap statements and future test programme",
    },
    "sp-0025": {
        "best": "fusion-src-003;fusion-src-028;fusion-src-038",
        "statuses": ["indirectly supported/analogy", "contradicted or complicated", "contradicted or complicated", "directly supported", "contradicted or complicated"],
        "maturity": "official gap statements and future TBM programme",
    },
    "sp-0026": {
        "best": "fusion-src-002;fusion-src-014;fusion-src-016;fusion-src-030",
        "statuses": ["contradicted or complicated", "directly supported", "contradicted or complicated", "directly supported", "directly supported"],
        "maturity": "observed fusion-component manufacture and acceptance milestones",
    },
    "sp-0027": {
        "best": "fusion-src-010;fusion-src-012;fusion-src-016;fusion-src-033;fusion-src-036",
        "statuses": ["contradicted or complicated", "directly supported", "contradicted or complicated", "directly supported", "directly supported"],
        "maturity": "observed facility milestones plus official baseline",
    },
    "sp-0028": {
        "best": "fusion-src-006;fusion-src-012;fusion-src-029;fusion-src-030;fusion-src-033;fusion-src-034;fusion-src-036",
        "statuses": ["contradicted or complicated", "directly supported", "contradicted or complicated", "directly supported", "directly supported"],
        "maturity": "observed research-facility commissioning with nuclear-scope gap",
    },
    "sp-0029": {
        "best": "fusion-src-001;fusion-src-011;fusion-src-032",
        "statuses": ["no suitable source located", "contradicted or complicated", "contradicted or complicated", "contradicted or complicated", "no suitable source located"],
        "maturity": "long-pulse milestones only; no commercial availability case",
    },
    "sp-0030": {
        "best": "fusion-src-004;fusion-src-039;fusion-src-040;fusion-src-041",
        "statuses": ["contradicted or complicated", "directly supported", "no suitable source located", "directly supported", "indirectly supported/analogy"],
        "maturity": "enacted authority and proposed framework; no pilot-plant licence case",
    },
    "sp-0031": {
        "best": "fusion-src-031;fusion-src-035;fusion-src-038;fusion-src-043;fusion-src-044",
        "statuses": ["not assessable under current scope", "no suitable source located", "no suitable source located", "indirectly supported/analogy", "no suitable source located"],
        "maturity": "official/company targets only; no fusion-grid operating case",
    },
}

OWNER_EXCEPTION_ROUTES = {
    ("sp-0020", "S2"): "owner_promotion_scope_exception",
    ("sp-0020", "S4"): "owner_promotion_scope_exception",
    ("sp-0030", "S2"): "regulatory_domain_review_exception",
    ("sp-0030", "S3"): "regulatory_domain_review_exception",
    ("sp-0030", "S5"): "regulatory_domain_review_exception",
    ("sp-0031", "S3"): "grid_domain_review_exception",
    ("sp-0031", "S4"): "grid_domain_review_exception",
}


def coverage_header() -> list[str]:
    header = ["profile_id", "stage_id", "workflow", "pathway_id", "lifecycle_phase", "priority_route"]
    for dim in S_DEFINITIONS:
        header.extend([
            f"{dim}_status", f"{dim}_load_bearing_claim", f"{dim}_best_candidate_source_ids",
            f"{dim}_evidence_maturity", f"{dim}_missingness_reason", f"{dim}_next_action",
        ])
    return header


def _claim_text(stage_label: str, dim: str, status: str) -> str:
    concept = S_DEFINITIONS[dim]
    if status == "directly supported":
        return f"The verified source set directly informs {concept} for {stage_label} within the frozen research-to-pilot pathway."
    if status == "indirectly supported/analogy":
        return f"The verified source set informs {concept} for {stage_label} only by bounded analogy or adjacent-stage evidence."
    if status == "contradicted or complicated":
        return f"The verified source set complicates any simple claim about {concept} for {stage_label}; physical scope and lifecycle distinctions remain load-bearing."
    if status == "not assessable under current scope":
        return f"The current source-inventory scope does not permit assessment of {concept} for {stage_label}."
    return f"A bounded first-pass search located no suitable source directly supporting a claim about {concept} for {stage_label}; this is not evidence of absence."


def build_coverage_and_claims() -> tuple[list[dict[str, str]], list[dict[str, str]]]:
    coverage_rows: list[dict[str, str]] = []
    claim_rows: list[dict[str, str]] = []
    source_by_id = {row["candidate_source_id"]: row for row in SOURCES}
    claim_number = 1
    for profile_id, stage_id, workflow, lifecycle, priority in PROFILES:
        evidence = PROFILE_EVIDENCE[profile_id]
        best_ids = evidence["best"]
        best_sources = [source_by_id[source_id] for source_id in best_ids.split(";")]
        pack_ids = ";".join(dict.fromkeys(source["pack_source_id"] for source in best_sources))
        row = {
            "profile_id": profile_id,
            "stage_id": stage_id,
            "workflow": workflow,
            "pathway_id": "tokamak_research_to_pilot_plant_demonstration",
            "lifecycle_phase": lifecycle,
            "priority_route": priority,
        }
        for index, dim in enumerate(S_DEFINITIONS):
            status = evidence["statuses"][index]
            claim_text = _claim_text(workflow, dim, status)
            if status == "directly supported":
                claim_type = best_sources[0]["evidence_basis"].split(";")[0]
                evidence_basis = claim_type
                support_direction = "supports"
                directness = "direct"
                missing_reason = "not_missing"
                next_action = "domain_review_before_any_S_adjudication"
            elif status == "indirectly supported/analogy":
                claim_type = "inference"
                evidence_basis = "inference"
                support_direction = "supports_with_limits"
                directness = "indirect"
                missing_reason = "only_adjacent_stage_or_pathway_evidence_located"
                next_action = "seek_stage_and_lifecycle_matched_primary_evidence"
            elif status == "contradicted or complicated":
                claim_type = "inference"
                evidence_basis = "inference"
                support_direction = "complicates"
                directness = "indirect"
                missing_reason = "available_evidence_does_not_resolve_scope_or_lifecycle_confounds"
                next_action = "preserve_complication_for_domain_review"
            else:
                claim_type = "commentary"
                evidence_basis = "commentary"
                support_direction = "unresolved"
                directness = "none"
                missing_reason = "bounded_search_no_suitable_source_located_not_evidence_of_absence"
                next_action = "targeted_primary_source_search_only_if_load_bearing"
            review_route = OWNER_EXCEPTION_ROUTES.get((profile_id, dim), "routine_domain_review_no_owner_action")
            row.update({
                f"{dim}_status": status,
                f"{dim}_load_bearing_claim": claim_text,
                f"{dim}_best_candidate_source_ids": best_ids if directness != "none" else "missing",
                f"{dim}_evidence_maturity": evidence["maturity"],
                f"{dim}_missingness_reason": missing_reason,
                f"{dim}_next_action": review_route if review_route != "routine_domain_review_no_owner_action" else next_action,
            })
            claim_rows.append({
                "claim_id": f"fusion-clm-{claim_number:03d}",
                "profile_id": profile_id,
                "stage_id": stage_id,
                "s_dimension": dim,
                "claim_text": claim_text,
                "claim_type": claim_type,
                "evidence_basis": evidence_basis,
                "pack_source_ids": pack_ids if directness != "none" else "missing",
                "candidate_source_ids": best_ids if directness != "none" else "missing",
                "support_direction": support_direction,
                "directness": directness,
                "scope_match": "exact_stage" if directness == "direct" else ("partial" if directness == "indirect" else "not_assessable"),
                "pathway_match": "frozen_tokamak_pathway" if profile_id not in {"sp-0031"} else "mixed_targets_only",
                "lifecycle_match": "matched" if directness == "direct" else ("partial" if directness == "indirect" else "not_assessable"),
                "quantitative_value": "missing",
                "unit": "missing",
                "denominator": "missing",
                "time_period": "through_2026-08-31",
                "source_locator": "See source_inventory_v1.csv key_claims and numerical_claims_and_locators fields." if directness != "none" else "missing",
                "counterevidence_or_confounder": "Pathway, lifecycle, jurisdiction, denominator, and metric definitions must not be collapsed."
                if directness != "none" else "No evidence located is not evidence of absence.",
                "verification_status": "verified_inventory_mapping" if directness != "none" else "unresolved_bounded_search",
                "review_route": review_route,
                "notes": "Coverage statement only; this row does not select or recode an S value.",
            })
            claim_number += 1
        coverage_rows.append(row)
    return coverage_rows, claim_rows


NUMERICAL_CLAIMS = [
    ("sp-0018", "plasma_control", "S2", "EAST reported a 1,066-second high-confinement plasma.", "observed facility milestone", "S-CN-EAST", "fusion-src-001", "supports_with_limits", "direct", "partial", "frozen_tokamak_pathway", "research_not_pilot", "1066", "seconds", "single reported H-mode discharge", "2025-01-20", "Article body paragraph 2.", "Duration is not AI causation, net energy, or availability."),
    ("sp-0018", "plasma_control", "S2", "A learned controller ran at 1 kHz during reported HL-3 experiments.", "observed experimental result", "S-CN-HL3-AI", "fusion-src-007", "supports", "direct", "exact_stage", "frozen_tokamak_pathway", "research_device", "1000", "hertz", "controller update rate", "2025", "Methods and Results, HL-3 experimental deployment.", "Research-device controller; no pilot transfer established."),
    ("sp-0018", "plasma_control", "S5", "The DIII-D tearing-instability paper describes its live-device result as an early proof of concept.", "observed experimental result", "S-AI-DIII-D", "fusion-src-018", "complicates", "direct", "exact_stage", "frozen_tokamak_pathway", "research_device", "missing", "missing", "missing", "2024", "Main text discussion and Methods.", "Proof of concept is not a universal safety controller."),
    ("sp-0017", "diagnostics", "S2", "The EAST locked-mode predictor reported a mean warning time of 137 ms.", "proof of concept", "S-CN-EAST-AI", "fusion-src-008", "supports_with_limits", "direct", "exact_stage", "frozen_tokamak_pathway", "research_device", "137", "milliseconds", "mean warning time for evaluated alarms", "EAST 2015-2022 data", "Abstract and Results.", "Prediction is not avoidance or safe termination."),
    ("sp-0021", "magnets", "S4", "CRAFT reported completion of TF magnet winding manufacture on 26 February 2026.", "observed facility milestone", "S-CN-CRAFT-TF", "fusion-src-002", "supports", "direct", "exact_stage", "frozen_tokamak_pathway", "component_fabrication", "2026-02-26", "date", "one CRAFT TF winding milestone", "2026-02-26", "Article paragraphs 1-2.", "A component milestone is not integrated-plant operation."),
    ("sp-0026", "component_fabrication", "S4", "A second one-eighth BEST vacuum-vessel sector passed acceptance and was delivered after the pack cut-off.", "observed facility milestone", "S-CN-MFG", "fusion-src-016", "supports", "direct", "exact_stage", "frozen_tokamak_pathway", "component_fabrication", "1/8", "vessel sector", "second reported sector", "2026-08-14", "Article paragraph 2.", "Not full vessel completion or construction completion."),
    ("sp-0029", "reliability_demonstration", "S4", "W7-X reported 1.8 GJ energy turnover during a 360-second discharge.", "observed experimental result", "S-DE-W7X", "fusion-src-032", "complicates", "direct", "partial", "stellarator_pathway_contrast", "research_device", "1.8", "gigajoules", "energy turnover in a 360-second discharge", "2025 campaign", "Article energy-turnover section.", "Different metric/discharge from the 43-second triple-product result; not availability."),
    ("sp-0028", "commissioning", "S4", "ITER's baseline proposal schedules integrated commissioning in 2033-34 before research operation in 2034.", "official target", "S-ITER-BASE", "fusion-src-036", "supports_with_limits", "direct", "exact_stage", "frozen_tokamak_pathway", "future_international_facility", "2033-2034", "calendar years", "baseline proposal", "current baseline page", "Assembly overview timeline.", "Target schedule, not observed duration or completion."),
    ("sp-0030", "licensing", "S2", "The NRC proposed rule opened a 90-day public-comment period ending 27 May 2026.", "programme announcement", "S-US-NRC", "fusion-src-039", "supports_with_limits", "direct", "exact_stage", "frozen_tokamak_pathway", "rulemaking_not_licence", "90", "days", "public-comment period", "2026-02-26 to 2026-05-27", "Federal Register Dates section.", "Rulemaking interval is not a plant-licence review duration."),
    ("sp-0031", "grid_integration", "S4", "STEP targets first operations for 2040; this is not an observed grid milestone.", "official target", "S-UK-STEP", "fusion-src-035", "complicates", "direct", "partial", "spherical_tokamak_contrast", "future_program", "2040", "year", "programme target", "living page verified 2026-08-31", "About page section 'Our vision'.", "Undated living page; target is not an outcome."),
]


def append_numerical_claims(claim_rows: list[dict[str, str]]) -> None:
    start = len(claim_rows) + 1
    for offset, item in enumerate(NUMERICAL_CLAIMS):
        (
            profile_id, stage_id, dim, text, basis, pack_ids, source_ids,
            direction, directness, scope, pathway, lifecycle, value, unit,
            denominator, period, locator, confounder,
        ) = item
        claim_rows.append({
            "claim_id": f"fusion-clm-{start + offset:03d}",
            "profile_id": profile_id,
            "stage_id": stage_id,
            "s_dimension": dim,
            "claim_text": text,
            "claim_type": basis,
            "evidence_basis": basis,
            "pack_source_ids": pack_ids,
            "candidate_source_ids": source_ids,
            "support_direction": direction,
            "directness": directness,
            "scope_match": scope,
            "pathway_match": pathway,
            "lifecycle_match": lifecycle,
            "quantitative_value": value,
            "unit": unit,
            "denominator": denominator,
            "time_period": period,
            "source_locator": locator,
            "counterevidence_or_confounder": confounder,
            "verification_status": "verified_against_original",
            "review_route": "routine_domain_review_no_owner_action",
            "notes": "Atomic numerical or status claim; no S value is selected.",
        })


REJECTED_ROWS = [
    {
        "record_id": "fusion-rej-001", "pack_source_id": "S-CN-HH70-CO",
        "candidate_source_id": "fusion-src-013", "title_or_claim": "HH70 1,337-second operation as an independently established AI result",
        "url_or_doi": "https://energysingularity.cn/news/news-001.html", "disposition": "deferred",
        "reason_code": "unvalidated_company_ai_causation",
        "reason": "The original company page explicitly makes the AI-feedback claim, but supplies no method, counterfactual, model description, or independent validation establishing AI's material contribution.",
        "permitted_limited_use": "Company claim only, with the 1,337-second low-parameter and non-availability caveats.",
        "affected_profile_ids": "sp-0018;sp-0029", "affected_s_dimensions": "S2;S3;S4", "last_verified": ACCESS_DATE,
        "notes": "Corrects the pack's source-characterization statement without promoting the causal claim.",
    },
    {
        "record_id": "fusion-rej-002", "pack_source_id": "S-CN-STARTORUS",
        "candidate_source_id": "fusion-src-015", "title_or_claim": "SUNIST-2 first plasma as independently validated evidence",
        "url_or_doi": "https://startorus.com/progress-news/154.html", "disposition": "deferred",
        "reason_code": "company_milestone_no_independent_validation",
        "reason": "The first-party source is real and relevant, but no stable independent experimental publication was located in the bounded pass.",
        "permitted_limited_use": "Company-reported research-device milestone only.",
        "affected_profile_ids": "sp-0027;sp-0028", "affected_s_dimensions": "S2;S3;S4", "last_verified": ACCESS_DATE, "notes": "Do not extrapolate to plant construction or commissioning.",
    },
    {
        "record_id": "fusion-rej-003", "pack_source_id": "unassigned_pack_table",
        "candidate_source_id": "fusion-src-023", "title_or_claim": "HEAT-ML simulation claim",
        "url_or_doi": "https://www.pppl.gov/news/2026", "disposition": "deferred",
        "reason_code": "unverified_url_or_doi",
        "reason": "The pack did not provide a stable PPPL article URL or DOI, and the exact publisher page/paper could not be recovered in the bounded pass.",
        "permitted_limited_use": "Research lead only; no claim support or source-register promotion.",
        "affected_profile_ids": "sp-0015;sp-0023", "affected_s_dimensions": "S1;S2;S3", "last_verified": ACCESS_DATE, "notes": "Verify exact Fusion Engineering and Design paper before reuse.",
    },
    {
        "record_id": "fusion-rej-004", "pack_source_id": "S-ITER-2026",
        "candidate_source_id": "fusion-src-037", "title_or_claim": "ITER July 2026 sixth-of-nine sector count",
        "url_or_doi": "https://www.iter.org/project/assembly-overview", "disposition": "deferred",
        "reason_code": "unverified_numeric_claim",
        "reason": "The stable assembly page verifies phase topology but not the pack's July-2026 sixth-of-nine numerical claim; the exact original news page was not recovered.",
        "permitted_limited_use": "Use the stable page for assembly and commissioning phase definitions only.",
        "affected_profile_ids": "sp-0026;sp-0027;sp-0028", "affected_s_dimensions": "S2;S3;S4", "last_verified": ACCESS_DATE, "notes": "No numerical promotion without a precise locator.",
    },
    {
        "record_id": "fusion-rej-005", "pack_source_id": "S-AI-KSTAR-D3D",
        "candidate_source_id": "fusion-src-019", "title_or_claim": "Simplified 'up to 90%' fusion-performance improvement",
        "url_or_doi": "https://doi.org/10.1038/s41467-024-48415-w", "disposition": "rejected_as_worded",
        "reason_code": "denominator_and_metric_mismatch",
        "reason": "The paper reports several device- and metric-specific changes; the pack's compressed percentage omits the exact metric, denominator, device, and condition.",
        "permitted_limited_use": "Cite the peer-reviewed cross-device experiment qualitatively or extract a metric-specific value with a Results/figure locator.",
        "affected_profile_ids": "sp-0016;sp-0017;sp-0018", "affected_s_dimensions": "S2;S3", "last_verified": ACCESS_DATE, "notes": "The source remains staged; only the simplified number is rejected.",
    },
    {
        "record_id": "fusion-rej-006", "pack_source_id": "S-US-NSTXU",
        "candidate_source_id": "fusion-src-030", "title_or_claim": "NSTX-U is 93% complete",
        "url_or_doi": "https://www.pppl.gov/news/2026/delivery-magnet-bundle-signals-new-age-fusion-research", "disposition": "deferred",
        "reason_code": "unverified_numeric_claim",
        "reason": "The verified PPPL page supports a central-magnet delivery and a 2027 experiment target, but not the 93% value.",
        "permitted_limited_use": "Use the verified delivery milestone and target with their exact status labels.",
        "affected_profile_ids": "sp-0021;sp-0026;sp-0027;sp-0028", "affected_s_dimensions": "S2;S3;S4", "last_verified": ACCESS_DATE, "notes": "Do not infer overall completion percentage.",
    },
    {
        "record_id": "fusion-rej-007", "pack_source_id": "S-CN-CRAFT-TF",
        "candidate_source_id": "fusion-src-002", "title_or_claim": "CRAFT TF system is the world's largest/strongest without a definition-matched comparison",
        "url_or_doi": "https://www.ipp.cas.cn/hnxny/kyxm/202603/t20260309_825283.html", "disposition": "rejected_as_worded",
        "reason_code": "unsupported_superlative",
        "reason": "Dimensions, mass, current, stored energy, and field are different metrics; no stable comparison table establishes a single common 'largest/strongest' category.",
        "permitted_limited_use": "Use individual parameters with their exact component definition and article locator.",
        "affected_profile_ids": "sp-0021;sp-0026", "affected_s_dimensions": "S3;S4", "last_verified": ACCESS_DATE, "notes": "The component milestone remains staged.",
    },
    {
        "record_id": "fusion-rej-008", "pack_source_id": "S-CN-MFG",
        "candidate_source_id": "missing", "title_or_claim": "Aggregate Chinese steel, cement, reactor count, or heavy-industry scale as fusion-grade capacity",
        "url_or_doi": "missing", "disposition": "rejected",
        "reason_code": "generic_industrial_scale_scope_mismatch",
        "reason": "Bulk industrial output does not establish qualified fusion magnets, RAFM/advanced alloys, nuclear welding/NDE, blankets, tritium systems, or plasma-facing components.",
        "permitted_limited_use": "Adjacent industrial-mobilization context only, explicitly outside profile evidence.",
        "affected_profile_ids": "sp-0020;sp-0021;sp-0023;sp-0024;sp-0025;sp-0026;sp-0027", "affected_s_dimensions": "S2;S3;S4;S5", "last_verified": ACCESS_DATE, "notes": "No national score or bilateral ranking follows from adjacent scale.",
    },
    {
        "record_id": "fusion-rej-009", "pack_source_id": "S-CN-HH70-XH;S-CN-HH70-CO",
        "candidate_source_id": "fusion-src-011;fusion-src-012", "title_or_claim": "HH70's roughly two-year build as a fusion power-plant construction floor",
        "url_or_doi": "https://www.sh.news.cn/20260410/696d097c4a6c41b9af5f654314252a04/c.html", "disposition": "rejected",
        "reason_code": "lifecycle_and_system_scope_mismatch",
        "reason": "HH70 is a small, non-DT research tokamak without a breeder blanket, turbine, integrated tritium plant, or commercial nuclear commissioning.",
        "permitted_limited_use": "Optimistic analogue for small research-device iteration only.",
        "affected_profile_ids": "sp-0027;sp-0028", "affected_s_dimensions": "S2;S4", "last_verified": ACCESS_DATE, "notes": "Do not transfer elapsed time to a pilot plant.",
    },
    {
        "record_id": "fusion-rej-010", "pack_source_id": "S-CN-EAST;S-CN-HH70-XH;S-DE-W7X",
        "candidate_source_id": "fusion-src-001;fusion-src-011;fusion-src-032", "title_or_claim": "Long plasma duration as commercial reliability or availability",
        "url_or_doi": "https://www.ipp.cas.cn/xwdt/ttxw/202501/t20250120_410191.html", "disposition": "rejected",
        "reason_code": "metric_category_error",
        "reason": "Pulse duration and energy-turnover metrics omit blanket life, tritium-plant availability, component replacement, turbine/grid systems, downtime, and capacity factor.",
        "permitted_limited_use": "Plasma/facility milestone with device, discharge, and metric definitions preserved.",
        "affected_profile_ids": "sp-0029", "affected_s_dimensions": "S2;S3;S4;S5", "last_verified": ACCESS_DATE, "notes": "No evidence of plant availability is implied.",
    },
    {
        "record_id": "fusion-rej-011", "pack_source_id": "S-US-MPEX",
        "candidate_source_id": "fusion-src-026", "title_or_claim": "MPEX as an operating fusion-spectrum neutron qualification facility",
        "url_or_doi": "https://mpex.ornl.gov/murf-2026/", "disposition": "rejected_as_worded",
        "reason_code": "facility_function_scope_mismatch",
        "reason": "MPEX is a plasma-materials exposure facility under assembly; it can test already neutron-irradiated specimens but is not itself a fusion-spectrum neutron source.",
        "permitted_limited_use": "Official intended capability for reactor-edge plasma exposure.",
        "affected_profile_ids": "sp-0020;sp-0023", "affected_s_dimensions": "S2;S3;S4", "last_verified": ACCESS_DATE, "notes": "Do not call intended capability completed qualification.",
    },
    {
        "record_id": "fusion-rej-012", "pack_source_id": "S-IAEA-SAFE",
        "candidate_source_id": "fusion-src-041", "title_or_claim": "A completed fusion-specific IAEA safety standard exists",
        "url_or_doi": "https://www.iaea.org/sites/default/files/25/02/evt2405228_information_sheet_.pdf", "disposition": "rejected_as_worded",
        "reason_code": "programme_announcement_not_standard",
        "reason": "The verified document describes a meeting and a safety report in development; it is not a published fusion-specific Safety Standard.",
        "permitted_limited_use": "Evidence of international safety/regulatory work in progress.",
        "affected_profile_ids": "sp-0030", "affected_s_dimensions": "S2;S3;S4;S5", "last_verified": ACCESS_DATE, "notes": "Keep IAEA general safety standards separate from fusion-specific guidance.",
    },
    {
        "record_id": "fusion-rej-013", "pack_source_id": "S-US-SPARC;S-UK-STEP;S-TYPEONE;S-PROXIMA",
        "candidate_source_id": "fusion-src-031;fusion-src-035;fusion-src-043;fusion-src-044", "title_or_claim": "Company or official programme dates as observed fusion-grid outcomes",
        "url_or_doi": "multiple_verified_primary_pages", "disposition": "rejected",
        "reason_code": "target_not_observed_outcome",
        "reason": "Targets and programme announcements do not demonstrate net energy, electricity export, fuel self-sufficiency, availability, or grid connection.",
        "permitted_limited_use": "Target tracking with owner, date, pathway, and target status preserved.",
        "affected_profile_ids": "sp-0027;sp-0028;sp-0031", "affected_s_dimensions": "S2;S3;S4", "last_verified": ACCESS_DATE, "notes": "No target is typed as an observed result.",
    },
    {
        "record_id": "fusion-rej-014", "pack_source_id": "all",
        "candidate_source_id": "missing", "title_or_claim": "No evidence located as evidence of absence",
        "url_or_doi": "missing", "disposition": "rejected",
        "reason_code": "absence_inference_not_supported",
        "reason": "A bounded search result does not establish that evidence or capability does not exist.",
        "permitted_limited_use": "Report 'no suitable source located in this bounded pass' with next search action.",
        "affected_profile_ids": "sp-0014;sp-0015;sp-0016;sp-0017;sp-0018;sp-0019;sp-0020;sp-0021;sp-0022;sp-0023;sp-0024;sp-0025;sp-0026;sp-0027;sp-0028;sp-0029;sp-0030;sp-0031", "affected_s_dimensions": "S1;S2;S3;S4;S5", "last_verified": ACCESS_DATE, "notes": "This is a method guardrail, not a source rejection.",
    },
]


CHANGE_ROWS = [
    {
        "change_id": "fusion-change-001", "source_or_claim": "BEST core-equipment fabrication status",
        "old_status_at_cutoff": "The 2026-08-12 pack did not include the 14 August component acceptance/delivery milestone.",
        "current_status": "Shanghai SASAC reports acceptance and delivery of a second one-eighth vacuum-vessel sector and factory ring assembly of a third one-eighth cold-shield sector.",
        "change_date": "2026-08-14", "affected_profile_ids": "sp-0026;sp-0027", "affected_s_dimensions": "S2;S3;S4;S5",
        "materiality": "material_source_refresh_not_profile_recode", "smallest_action": "Add fusion-src-016 to the staged source set and retain component-level scope.",
        "candidate_source_ids": "fusion-src-016", "source_locator": "Article paragraphs 2-3.",
        "notes": "No change to S values, owner dispositions, or construction-completion status.",
    },
    {
        "change_id": "fusion-change-002", "source_or_claim": "HH70 AI-causation source characterization",
        "old_status_at_cutoff": "The pack said the primary Energy Singularity source did not establish AI causation.",
        "current_status": "The primary company page explicitly attributes the 1,337-second result to AI-based feedback-control optimization, but provides no independent or methodological validation.",
        "change_date": "2026-02-02", "affected_profile_ids": "sp-0018;sp-0029", "affected_s_dimensions": "S2;S3;S4",
        "materiality": "material_source_characterization_correction", "smallest_action": "Correct the source description; defer promotion of the AI causal claim and permit company-claim use only.",
        "candidate_source_ids": "fusion-src-013", "source_locator": "Headline and article lead.",
        "notes": "This is a verification correction, not a post-cutoff event or observed AI result.",
    },
    {
        "change_id": "fusion-change-003", "source_or_claim": "U.S. fusion rulemaking status",
        "old_status_at_cutoff": "Proposed NRC Part 30-based rule and draft guidance; no final rule.",
        "current_status": "The NRC page updated 27 August 2026 still lists the February proposed rule; no final fusion rule is listed.",
        "change_date": "2026-08-27", "affected_profile_ids": "sp-0030", "affected_s_dimensions": "S2;S3;S4;S5",
        "materiality": "freshness_check_no_material_change", "smallest_action": "Refresh last_verified and keep proposed-rule status.",
        "candidate_source_ids": "fusion-src-040", "source_locator": "Page update footer and rulemaking-milestones table.",
        "notes": "Do not infer licensing throughput from rulemaking status.",
    },
]


def staged_rows() -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for item in SOURCES:
        if not item["promotion_recommendation"].startswith("stage"):
            continue
        publication_date = item["publication_date"]
        year = publication_date[:4] if publication_date != "missing" else "missing"
        rows.append({
            "source_id": item["candidate_source_id"],
            "title_original": item["title_original"],
            "title_english": item["title_english"],
            "authors_org": item["authors_org"],
            "year": year,
            "publication_date": publication_date,
            "access_date": item["access_date"],
            "last_verified": item["last_verified"],
            "archive_url": item["archive_url"],
            "language": item["language"],
            "source_type": item["source_type"],
            "method_type": item["method_type"],
            "claim_owner": item["claim_owner"],
            "official_claim_status": item["official_claim_status"],
            "independent_validation_status": item["independent_validation_status"],
            "url_or_doi": item["url_or_doi"],
            "original_language_url": item["original_language_url"],
            "translation_reviewer": item["translation_reviewer"],
            "translation_note": item["translation_note"],
            "reliability_tier": item["reliability_tier"],
            "geo_scope": item["geo_scope"],
            "sector_scope": "Fusion, magnetic confinement",
            "key_claims": item["key_claims"],
            "useful_indicators": item["numerical_claims_and_locators"],
            "limitations": item["limitations"],
            "date_added": ACCESS_DATE,
            "added_by": "Codex issue #35 source inventory",
            "review_status": "staged",
            "placeholder": "false",
            "notes": f"Provisional candidate ID; not canonical until source-register review. Evidence category: {item['evidence_basis']}. Pack source: {item['pack_source_id']}. Promotion recommendation: {item['promotion_recommendation']}.",
        })
    return rows


def write_csv(path: Path, header: list[str], rows: list[dict[str, str]]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=header,
            extrasaction="raise",
            lineterminator="\n",
        )
        writer.writeheader()
        writer.writerows(rows)


def bank_pack(source_path: Path) -> None:
    raw = source_path.read_bytes()
    digest = hashlib.sha256(raw).hexdigest()
    if digest != PACK_SHA256:
        raise SystemExit(f"Attachment hash changed: expected {PACK_SHA256}, got {digest}")
    header = (
        "<!--\n"
        "BANKING HEADER — ISSUE #35\n"
        "Document status: internal research synthesis and source-discovery map\n"
        f"Research cut-off: {PACK_CUTOFF}\n"
        "Canonical evidence status: not canonical\n"
        "Promotion rule: every candidate must be verified against the original publisher page, official document, dataset, or DOI before recommendation.\n"
        f"Original attachment SHA-256: {PACK_SHA256}\n"
        "The attachment begins after the marker below and is preserved byte-for-byte.\n"
        "-->\n\n"
        "<!-- BEGIN LOSSLESS BANKED ATTACHMENT -->\n"
    ).encode("utf-8")
    (OUT / "fusion_test_evidence_pack_2026-08-12.md").write_bytes(header + raw)


def write_readme() -> None:
    text = f"""# Fusion evidence bank

This folder is the issue #35 first-pass source inventory for **The Fusion Test — Evidence Pack for Frontier Is Not Fate**. The banked pack has a research cut-off of **{PACK_CUTOFF}**. It is an internal synthesis and source-discovery map, not a canonical evidence source.

## What was done

Every candidate in the pack's prioritized source register was checked against an original publisher page, official document, company primary page, or DOI. Chinese claims were checked against original-language primary sources first. The resulting inventory keeps these categories separate: observed experimental result, observed facility milestone, official target, company target, programme announcement, proof of concept, model or scenario estimate, inference, and commentary.

The outputs do not alter the canonical source register. `staged_source_register_additions_v1.csv` contains only provisional candidate IDs and `review_status=staged`; it is a review queue, not a promotion. Rejected or deferred claims remain visible in `rejected_and_deferred_sources_v1.csv`, including valid sources that do not support the pack's stronger wording.

## Why source verification is separate from S adjudication

A real source can still be irrelevant to a profile, mismatched to a lifecycle phase, or unable to support a particular S dimension. Source verification answers whether the document, metadata, claim wording, and locator are real. Domain review determines whether that evidence is technically transferable. Only a later S-adjudication gate may select or recode an S1-S5 value. No S value or owner disposition is changed here.

## Files

- `fusion_test_evidence_pack_2026-08-12.md`: losslessly banked internal pack with a provenance header.
- `source_inventory_v1.csv`: candidate-by-candidate verification and promotion recommendation.
- `claim_source_map_v1.csv`: atomic profile/S-dimension claim mappings, including explicit missingness.
- `profile_evidence_coverage_v1.csv`: exactly 18 frozen fusion profiles with S1-S5 coverage statuses, load-bearing claims, maturity, missingness, and next actions.
- `staged_source_register_additions_v1.csv`: schema-compatible, noncanonical staging rows.
- `rejected_and_deferred_sources_v1.csv`: rejected wording, scope errors, and deferred sources with permitted limited uses.
- `refresh_and_change_log_v1.csv`: load-bearing freshness changes after the cut-off and verification corrections.
- `fusion_source_review_v1.xlsx`: owner-facing workbook; only genuine exceptions are surfaced by default and no approval field is prefilled.
- `VERIFICATION_REPORT.md`: counts, unresolved gaps, material changes, and the next gate.

## Owner exceptions only

The owner is not asked to inspect every uncontested source. The workbook surfaces only seven claim-level exceptions already routed by the authoritative reconciliation inputs: materials-qualification S2/S4 promotion scope, licensing S2/S3/S5 regulatory review, and grid-integration S3/S4 review. A separate HH70 source-characterization correction is shown as a source exception; it does not ask for S adjudication.

## Exact next gate

Review the proposed staging rows for source-register promotion and obtain native-language or regulatory review only where the exception queue says it is load-bearing. After promotion decisions, run the already-planned 18-profile fusion domain review. S adjudication remains a later, separate gate.
"""
    (OUT / "README.md").write_text(text, encoding="utf-8")


def write_report(
    inventory: list[dict[str, str]],
    claims: list[dict[str, str]],
    coverage: list[dict[str, str]],
    staged: list[dict[str, str]],
) -> None:
    verification_counts = Counter(row["verification_status"] for row in inventory)
    evidence_counts = Counter(row["evidence_basis"] for row in inventory)
    rejection_counts = Counter(row["reason_code"] for row in REJECTED_ROWS)
    coverage_counts = Counter()
    for row in coverage:
        for dim in S_DEFINITIONS:
            coverage_counts[row[f"{dim}_status"]] += 1
    exception_count = sum(
        1 for row in claims if row["review_route"] != "routine_domain_review_no_owner_action"
    )
    report = f"""# Fusion evidence verification report

Verification date: **{ACCESS_DATE}**
Pack cut-off: **{PACK_CUTOFF}**
Scope: source inventory and verification only

## Required counts

- Candidate sources inventoried: **{len(inventory)}**
- Unique pack source labels represented: **{len({pack for row in inventory for pack in row['pack_source_id'].split(';')})}**
- Verified peer-reviewed sources: **{verification_counts['verified_peer_reviewed']}**
- Verified official-primary sources: **{verification_counts['verified_official_primary']}**
- Verified official-secondary sources: **{verification_counts['verified_official_secondary']}**
- Verified company-primary sources: **{verification_counts['verified_company_primary']}**
- Partially verified or unresolved-locator candidates: **{verification_counts['partially_verified_scope_only'] + verification_counts['unverified_locator']}**
- Proposed staged rows: **{len(staged)}**
- Rejected/deferred records: **{len(REJECTED_ROWS)}**
- Atomic claim-source rows: **{len(claims)}**
- Frozen fusion profile coverage rows: **{len(coverage)}**
- S-dimension coverage cells: **{len(coverage) * len(S_DEFINITIONS)}**
- Genuine owner-facing claim exceptions: **{exception_count}**
- Material post-cut-off source changes: **1**
- Material source-characterization corrections: **1**

## Inventory evidence categories

"""
    for key in sorted(EVIDENCE_BASES):
        report += f"- {key}: **{evidence_counts[key]}**\n"
    report += "\n## Rejected/deferred by reason\n\n"
    for key, count in sorted(rejection_counts.items()):
        report += f"- `{key}`: **{count}**\n"
    report += "\n## Coverage across 18 profiles × S1-S5\n\n"
    for key in [
        "directly supported", "indirectly supported/analogy",
        "contradicted or complicated", "no suitable source located",
        "not assessable under current scope",
    ]:
        report += f"- {key}: **{coverage_counts[key]}**\n"
    report += """

These are source-coverage statuses, not S values and not a recoding recommendation.

## Unresolved load-bearing gaps

1. **Experiment selection (sp-0016):** live control and diagnostic papers are adjacent evidence, but no primary study was located that measures an AI-driven reduction in the elapsed or costly physical experiment-selection loop.
2. **Materials qualification (sp-0020):** no completed, qualification-grade fusion-spectrum neutron programme with an accepted pilot-plant material dataset was located. MPEX is under assembly and does not itself generate a fusion-spectrum neutron field.
3. **Plasma-facing components (sp-0023):** no source demonstrates pilot-relevant lifetime under the combined neutron, heat-flux, cycling, erosion, and maintainability envelope.
4. **Tritium and fuel cycle (sp-0024):** no integrated, self-sufficient breeder/extraction/processing/inventory loop at pilot scale was located.
5. **Blankets (sp-0025):** ITER's TBM programme is future testing; no integrated power-plant blanket has been qualified in a representative fusion environment.
6. **Commissioning (sp-0028):** no evidence was located that AI has shortened nuclear/tritium commissioning; research-device first plasma and subsystem tests are not comparable cases.
7. **Reliability demonstration (sp-0029):** EAST, HH70, and W7-X pulse records do not supply commercial availability, maintenance-life, or capacity-factor evidence.
8. **Licensing (sp-0030):** China has enacted authority and the NRC has a proposed rule, but no directly comparable completed pilot-plant licensing case, review duration, or accepted full safety case was located.
9. **Grid integration (sp-0031):** only official and company targets were located; no magnetic-confinement fusion plant has an observed electricity-export and grid-operation case in this source set.

“No suitable source located” records the result of this bounded pass; it is not evidence of absence.

## Material changes and corrections

- **BEST, 14 August 2026:** an official Shanghai SASAC page reports acceptance/delivery of a second one-eighth vacuum-vessel sector and factory ring assembly of a third one-eighth cold-shield sector. This updates component-fabrication evidence only; it does not establish plant completion.
- **HH70 source characterization:** the original Energy Singularity page does explicitly make the AI-feedback causal claim. Because it supplies no method or independent validation, the correction changes the description of the source but does not promote the claim as an observed AI result.
- **NRC freshness check, 27 August 2026:** the regulator still lists a proposed rule and draft guidance, not a final fusion rule.

## Exact next gate

Run exception-based source-register review on the staged rows. Require native-language, regulatory, or scope review only for the surfaced promotion exceptions. Do not merge any row into the canonical register automatically. After source promotion decisions, perform the existing 18-profile fusion domain review, and only then route evidence into the separate S-adjudication process.
"""
    (OUT / "VERIFICATION_REPORT.md").write_text(report, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pack-source", type=Path, required=True)
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    coverage, claims = build_coverage_and_claims()
    append_numerical_claims(claims)
    staged = staged_rows()
    bank_pack(args.pack_source)
    write_csv(OUT / "source_inventory_v1.csv", INVENTORY_HEADER, SOURCES)
    write_csv(OUT / "claim_source_map_v1.csv", CLAIM_HEADER, claims)
    write_csv(OUT / "profile_evidence_coverage_v1.csv", coverage_header(), coverage)
    write_csv(OUT / "staged_source_register_additions_v1.csv", STAGED_HEADER, staged)
    write_csv(OUT / "rejected_and_deferred_sources_v1.csv", REJECTED_HEADER, REJECTED_ROWS)
    write_csv(OUT / "refresh_and_change_log_v1.csv", CHANGE_HEADER, CHANGE_ROWS)
    write_readme()
    write_report(SOURCES, claims, coverage, staged)
    print(
        f"Built fusion evidence bank: {len(SOURCES)} sources, {len(staged)} staged, "
        f"{len(claims)} claims, {len(coverage)} profiles."
    )


if __name__ == "__main__":
    main()
