import { EvidenceChip } from "@/components/ui/EvidenceChip";

type ChainCell = {
  text: string;
  status: "observed" | "official claim" | "hypothesis" | "missing";
  ref?: string;
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
      text: "Leading labs, cloud platforms, and the deepest software ecosystem. The benchmark gap with China has effectively closed.",
      status: "observed",
      ref: "Stanford AI Index (src-0001, clm-0026); benchmark performance is not deployed capability"
    },
    china: {
      text: "Near-frontier models under chip export controls; open-weight releases narrow the accessible gap.",
      status: "observed",
      ref: "Stanford AI Index (src-0001, clm-0026)"
    }
  },
  {
    stage: "Buildout",
    us: {
      text: "Data-center investment now a leading driver of private investment growth, but interconnection queues run to years and reliability assessments flag load growth.",
      status: "observed",
      ref: "LBNL Queued Up (src-0012), NERC LTRA (src-0013, clm-0014); capex-share estimate staged (clm-0021)"
    },
    china: {
      text: "State-directed compute buildout at scale under East-Data-West-Computing; reported utilization of some centers is low.",
      status: "official claim",
      ref: "NDRC hub plan (src-0024); utilization reporting is a staged lead (src-v2-dr-020), not yet evidence"
    }
  },
  {
    stage: "Organisational uptake",
    us: {
      text: "The government itself names slow adoption inside large organizations and critical sectors as the bottleneck; federal procurement is an explicit policy channel.",
      status: "official claim",
      ref: "AI Action Plan (src-0018, clm-0013); OMB memos (src-0019/0020, clm-0016)"
    },
    china: {
      text: "AI+ penetration targets of 70% by 2027 and 90% by 2030 are policy targets, not adoption statistics. No public, recurring, representative firm AI-use survey exists.",
      status: "official claim",
      ref: "State Council AI+ opinion (src-0023, clm-0006); measurement gap per staged China evidence map"
    }
  },
  {
    stage: "Industrial conversion",
    us: {
      text: "Robot density 307 per 10k manufacturing workers (8th worldwide), most robots imported; conversion deep at the median but thin in domestic supply.",
      status: "observed",
      ref: "IFR World Robotics 2025 (src-0016, clm-0003)"
    },
    china: {
      text: "World's largest robot stock (2M+) and 54% of 2024 installations — but density revised to 166 per 10k (22nd) on updated workforce data. Immense in aggregate, thin at the median.",
      status: "observed",
      ref: "IFR (src-0016, clm-0001–0003); clustered-diffusion reading is a hypothesis (clm-0004)"
    }
  },
  {
    stage: "Measured output gains",
    us: {
      text: "Task-level gains real but uneven; no defensible national productivity attribution yet.",
      status: "missing",
      ref: "Model estimates staged (clm-0020); task RCT evidence staged (src-v2-dr-010)"
    },
    china: {
      text: "Independent evidence thin exactly where the story gets interesting; academic work suggests very few firms achieve deep digital reinvention.",
      status: "missing",
      ref: "Management World study staged (clm-0010); official outcome claims not independently validated"
    }
  },
  {
    stage: "Distribution",
    us: {
      text: "Early gains concentrate in large firms, high-skill sectors, and digitized regions; entry-level exposed work softening first is an early, fragile signal.",
      status: "hypothesis",
      ref: "ILO/OECD exposure (src-0036/0037, clm-0028); hiring-cohort evidence staged"
    },
    china: {
      text: "Labor restructuring pressure acknowledged by the state itself: employment-impact policy document in drafting, retraining funded at scale.",
      status: "official claim",
      ref: "MOHRSS signals staged (clm-0012); TFP-labor mechanism staged (clm-0011)"
    }
  }
];

/**
 * Finding 3 figure: the same conversion chain, two national systems.
 * Each cell states the best current characterization and its evidence
 * status. No composite score, no winner. See docs/FIGURE_REGISTER.md (F3).
 */
export function ConversionChainCompare() {
  return (
    <div className="overflow-x-auto" tabIndex={0}>
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-foreground">
            <th className="w-40 py-3 pr-4 align-bottom text-xs font-semibold uppercase tracking-[0.1em] text-muted">
              Chain stage
            </th>
            <th className="w-[38%] py-3 pr-4 align-bottom font-display text-xl font-semibold text-foreground">
              United States
            </th>
            <th className="w-[38%] py-3 align-bottom font-display text-xl font-semibold text-foreground">
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
                  <div className="mb-1.5">
                    <EvidenceChip status={cell.status} />
                  </div>
                  {cell.text}
                  {cell.ref ? (
                    <div className="mt-1.5 text-xs leading-5 text-missing">{cell.ref}</div>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
