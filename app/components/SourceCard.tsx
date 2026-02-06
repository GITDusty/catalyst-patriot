"use client";

import type { BudgetCategory } from "../data/budget-types";

type SourceCardProps = {
  category: BudgetCategory | null;
};

export const SourceCard = ({ category }: SourceCardProps) => {
  const source = category?.source;
  const sourceHref = source?.url ?? null;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.6)] text-slate-100">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Provenance
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-100">
            {category?.name ?? "Source verification"}
          </h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            category
              ? "border-rose-500/40 bg-rose-500/10 text-rose-100"
              : "border-white/10 bg-white/5 text-slate-400"
          }`}
        >
          {category ? "Source verified" : "Awaiting selection"}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-300">
        <p>
          {source?.description ??
            "Select a category to view the primary budget document and line item."}
        </p>
        {sourceHref ? (
          <a
            href={sourceHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            Open verified source
          </a>
        ) : null}
      </div>
    </div>
  );
};
