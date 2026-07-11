import type { Metadata } from "next";
import Link from "next/link";

import { EvidenceChip } from "@/components/ui/EvidenceChip";
import { loadForecastRegister } from "@/lib/registers";

export const metadata: Metadata = {
  title: "Forecasts"
};

export default function ForecastsPage() {
  const forecasts = loadForecastRegister();

  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-strong">
          Forecasts
        </p>
        <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">
          Signposts with deadlines, not predictions.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Each question tests one part of the conversion framework and names
          the observed source that will resolve it. Probability ranges remain
          hidden while{" "}
          <strong className="text-foreground">
            author review is pending
          </strong>{" "}
          — not market prices, model outputs, or institutional estimates.
          Updates are append-only; resolved questions stay visible. Rules in{" "}
          <a
            className="focus-ring underline"
            href="https://github.com/yippy141/AI-Carrying-Capacity/blob/main/data/forecasts/README.md"
            rel="noopener noreferrer"
            target="_blank"
          >
            the register README
          </a>
          .
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {forecasts.map((forecast) => (
          <article
            className="border border-rule bg-white p-6"
            id={forecast.forecast_id}
            key={forecast.forecast_id}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-missing">
              <span className="font-mono">{forecast.forecast_id}</span>
              <EvidenceChip status="forecast" />
              <span className="uppercase tracking-[0.08em]">
                {forecast.status.replaceAll("_", " ")}
              </span>
              <span>· deadline {forecast.deadline}</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-foreground">
              {forecast.question}
            </h2>
            <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm leading-6 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-foreground">Probability range</dt>
                <dd className="text-muted">
                  {forecast.author_review_status === "reviewed"
                    ? forecast.initial_probability_range
                    : "Hidden pending author review"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Resolves via</dt>
                <dd className="text-muted">
                  {forecast.resolution_source}: {forecast.resolution_criteria}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Rationale</dt>
                <dd className="text-muted">{forecast.rationale}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  What it tests · update triggers
                </dt>
                <dd className="text-muted">
                  {forecast.framework_relevance}. Triggers:{" "}
                  {forecast.update_triggers}.
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-missing">
              Update history:{" "}
              {forecast.update_history ? forecast.update_history : "none yet"}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-sm leading-6 text-muted">
        Forecast questions never resolve against official targets or
        announcements — only against the named observed source. Scenario
        reasoning without probabilities lives in the{" "}
        <Link className="focus-ring underline" href="/scenarios">
          scenario assumption browser
        </Link>
        .
      </p>
    </main>
  );
}
