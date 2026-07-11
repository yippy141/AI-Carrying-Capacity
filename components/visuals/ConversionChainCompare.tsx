import { EvidenceChip } from "@/components/ui/EvidenceChip";

type ChainCell = {
  fact: string;
  interpretation: string;
  missingEvidence: string;
  status:
    | "observed"
    | "official claim"
    | "official target"
    | "hypothesis"
    | "staged"
    | "missing";
  ref: string;
};

type ChainStage = {
  stage: string;
  us: ChainCell;
  china: ChainCell;
};

const STAGES: ChainStage[] = [
  {
    stage: "Frontier capability",
    us: {
      fact: "The canonical AI Index records US frontier-lab concentration and reports a much smaller US–China benchmark gap.",
      interpretation:
        "Benchmark leadership is not the same as deployed national capability.",
      missingEvidence:
        "A reviewed country-level measure of legally and economically accessible capability.",
      status: "observed",
      ref: "Stanford AI Index (src-0001, clm-0026); benchmark performance is not deployed capability"
    },
    china: {
      fact: "The canonical AI Index reports Chinese model benchmark performance close to the US frontier.",
      interpretation:
        "Benchmark compression alone does not establish equal access, cost, reliability, or deployment.",
      missingEvidence:
        "A reviewed capability-at-cost and access series; no open-weight compression claim is treated as observed here.",
      status: "observed",
      ref: "Stanford AI Index (src-0001, clm-0026)"
    }
  },
  {
    stage: "Buildout",
    us: {
      fact: "Reviewed grid sources document multi-year interconnection queues and reliability assessments that flag load growth.",
      interpretation:
        "Grid absorption may constrain buildout even when financing and equipment are available.",
      missingEvidence:
        "A canonical AI-specific capex contribution series; staged capex estimates are excluded.",
      status: "observed",
      ref: "LBNL Queued Up (src-0012), NERC LTRA (src-0013, clm-0014)"
    },
    china: {
      fact: "The NDRC implementation plan documents a state-directed national compute-hub program.",
      interpretation:
        "Program scale does not establish utilization or productive output.",
      missingEvidence:
        "Reviewed utilization and task-adjusted output data; staged utilization leads support no visible claim.",
      status: "official claim",
      ref: "NDRC hub plan (src-0024); src-v2-dr-020 remains a staged lead and is excluded"
    }
  },
  {
    stage: "Organisational uptake",
    us: {
      fact: "The US AI Action Plan names slow organizational adoption as a bottleneck, and OMB memoranda establish a federal procurement channel.",
      interpretation:
        "These documents establish policy intent, not adoption depth or realized gains.",
      missingEvidence:
        "Reviewed comparable firm-level intensity and procurement-outcome measures.",
      status: "official claim",
      ref: "AI Action Plan (src-0018, clm-0013); OMB memos (src-0019/0020, clm-0016)"
    },
    china: {
      fact: "The State Council sets AI+ penetration targets; they are targets, not adoption statistics.",
      interpretation:
        "This review did not identify a recurring, nationally representative all-firm survey comparable to BTOS or Eurostat. The Fifth National Economic Census provides a one-time above-scale-enterprise measure.",
      missingEvidence:
        "A recurring all-firm use-and-intensity series and independent outcome validation.",
      status: "staged",
      ref: "State Council AI+ opinion (src-0023, clm-0006); survey-comparability assessment remains staged"
    }
  },
  {
    stage: "Industrial conversion",
    us: {
      fact: "IFR reports 307 industrial robots per 10,000 manufacturing workers in the United States.",
      interpretation:
        "Aggregate density measures automation intensity, not the firm-level distribution or depth of AI use.",
      missingEvidence:
        "A reviewed firm-distribution series linking robot density to productivity outcomes.",
      status: "observed",
      ref: "IFR World Robotics 2025 (src-0016, clm-0003)"
    },
    china: {
      fact: "IFR reports more than two million robots in operation, about 54% of 2024 installations, and a revised density of 166 per 10,000 manufacturing workers.",
      interpretation:
        "Aggregate stock, installations, and density cannot establish whether conversion is deep or thin at the median firm.",
      missingEvidence:
        "Reviewed plant-level or representative firm-distribution evidence.",
      status: "observed",
      ref: "IFR (src-0016, clm-0001–0003); no median-firm inference"
    }
  },
  {
    stage: "Measured output gains",
    us: {
      fact: "No canonical source in the ledger supports a national AI-productivity attribution.",
      interpretation:
        "The early-2025 METR slowdown result is historical and METR marks it out of date for current tools; its 2026 follow-up is too selection-biased to estimate the current effect.",
      missingEvidence:
        "Current, representative, independently reviewed productivity estimates across domains.",
      status: "missing",
      ref: "Historical src-v2-dr-010; February 2026 methodology update src-v2-dr-025; both staged"
    },
    china: {
      fact: "No canonical direct-use panel in the ledger supports a broad Chinese productivity claim.",
      interpretation:
        "Listed-firm and digital-transformation proxies are research leads, not direct measures of national conversion.",
      missingEvidence:
        "Representative direct-use data linked to firm productivity and service outcomes.",
      status: "missing",
      ref: "Staged studies (including clm-0010) support no visible empirical claim"
    }
  },
  {
    stage: "Distribution",
    us: {
      fact: "Reviewed ILO and OECD sources measure occupational exposure and adjustment context, not realized AI-caused employment effects.",
      interpretation:
        "Concentrated adjustment in exposed cognitive work remains a comparative hypothesis.",
      missingEvidence:
        "Causal or transparently controlled outcome data by exposure and career stage.",
      status: "hypothesis",
      ref: "ILO/OECD exposure (src-0036/0037, clm-0028)"
    },
    china: {
      fact: "No canonical source in the ledger directly measures AI-caused distribution outcomes in China.",
      interpretation:
        "Labor restructuring and retraining claims remain hypotheses or official-program leads.",
      missingEvidence:
        "Reviewed employment, wage, and worker-welfare outcomes tied to observed AI use.",
      status: "missing",
      ref: "MOHRSS and TFP-labor claims remain staged (clm-0011/0012)"
    }
  }
];

/**
 * The same conversion chain, audited cell by cell. Each cell separates the
 * direct record, interpretation, and missing evidence; the chip describes the
 * strongest evidence supporting its visible record. No score or winner.
 */
export function ConversionChainCompare() {
  return (
    <div className="overflow-x-auto" tabIndex={0}>
      <table className="w-full min-w-[820px] border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-foreground">
            <th className="w-40 py-3 pr-4 align-bottom text-xs font-semibold uppercase tracking-[0.1em] text-muted">
              Chain stage
            </th>
            <th className="w-[40%] py-3 pr-4 align-bottom font-display text-xl font-semibold text-foreground">
              United States
            </th>
            <th className="w-[40%] py-3 align-bottom font-display text-xl font-semibold text-foreground">
              China
            </th>
          </tr>
        </thead>
        <tbody>
          {STAGES.map((row) => (
            <tr className="border-b border-rule align-top" key={row.stage}>
              <th className="py-4 pr-4 text-sm font-semibold text-foreground" scope="row">
                {row.stage}
              </th>
              {[row.us, row.china].map((cell, index) => (
                <td className="py-4 pr-4 text-sm leading-6 text-muted" key={index}>
                  <div className="mb-2">
                    <EvidenceChip status={cell.status} />
                  </div>
                  <p>
                    <span className="font-semibold text-foreground">Direct record:</span>{" "}
                    {cell.fact}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-foreground">Interpretation:</span>{" "}
                    {cell.interpretation}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-foreground">Missing evidence:</span>{" "}
                    {cell.missingEvidence}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-missing">{cell.ref}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
