import type { BudgetCategory } from "../lib/data/types";
import { formatWholeCurrency } from "../lib/data/formatting";
import { ProvenanceBadge } from "./ProvenanceBadge";

type CategoryDetailProps = {
  category: BudgetCategory;
  population: number;
};

export function CategoryDetail({ category, population }: CategoryDetailProps) {
  const perCitizen = population > 0 ? category.amount / population : 0;

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300">
      <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">Selected Category</p>
      <h3 className="mt-2 text-2xl font-bold text-white">{category.name}</h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Budget Amount</p>
          <p className="mt-1 text-lg font-semibold text-white">{category.displayAmount}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Share of Total</p>
          <p className="mt-1 text-lg font-semibold text-white">{category.percentage.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Cost Per Citizen</p>
          <p className="mt-1 text-lg font-semibold text-white">{formatWholeCurrency(perCitizen)}</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-slate-950/35 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">Provenance</p>
          <ProvenanceBadge
            status={category.provenance.status}
            document={category.provenance.document}
            source={category.provenance.source}
            url={category.provenance.url}
            pageRef={category.provenance.pageRef}
            notes={category.provenance.notes}
          />
        </div>
        <dl className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-gray-500">Source document</dt>
            <dd className="text-right text-gray-200">{category.provenance.document}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-gray-500">Source</dt>
            <dd className="text-right text-gray-200">{category.provenance.source}</dd>
          </div>
          {category.provenance.pageRef ? (
            <div className="flex items-center justify-between gap-3">
              <dt className="text-gray-500">Page reference</dt>
              <dd className="text-right text-gray-200">{category.provenance.pageRef}</dd>
            </div>
          ) : null}
          {category.provenance.notes ? (
            <div>
              <dt className="text-gray-500">Notes</dt>
              <dd className="mt-1 text-gray-200">{category.provenance.notes}</dd>
            </div>
          ) : null}
        </dl>

        {category.provenance.url ? (
          <a
            href={category.provenance.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Open verified source
          </a>
        ) : (
          <span className="mt-4 inline-flex text-sm text-gray-500">Open verified source (link pending)</span>
        )}
      </div>
    </div>
  );
}
