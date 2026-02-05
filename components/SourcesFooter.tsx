import type { StateBudget } from "../lib/data/types";

type SourcesFooterProps = {
  budget: StateBudget;
};

export function SourcesFooter({ budget }: SourcesFooterProps) {
  return (
    <section className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
        Sources & Methodology
      </h2>
      <p className="mt-3 text-sm text-gray-300">
        Top-level budget figures are presented for {budget.fiscalYear}. Categories reflect high-level
        reporting groups and are intended for exploratory comparison.
      </p>

      <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/30 p-4">
        <p className="text-xs uppercase tracking-[0.14em] text-gray-400">Primary source</p>
        <p className="mt-1 text-sm font-semibold text-white">{budget.topLevelSource.name}</p>
        <p className="mt-1 text-sm text-gray-300">{budget.topLevelSource.document}</p>
        <p className="mt-1 text-sm text-gray-300">
          Signed: {budget.topLevelSource.signedDate} by {budget.topLevelSource.governor}
        </p>
        <a
          href={budget.topLevelSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex text-sm font-medium text-cyan-400 hover:text-cyan-300"
        >
          Open primary source
        </a>
      </div>

      {budget.additionalSources.length > 0 ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {budget.additionalSources.map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-slate-950/30 p-4 transition hover:border-cyan-500/40"
            >
              <p className="text-sm font-semibold text-white">{source.name}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">{source.type}</p>
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
