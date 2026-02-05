"use client";

import type { BudgetCategory } from "../data/budget-types";

type SourceCardProps = {
  category: BudgetCategory | null;
};

export const SourceCard = ({ category }: SourceCardProps) => {
  const source = category?.source;

  return (
    <div className="glass-card fade-up rounded-3xl border border-slate-200/70 p-6 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Provenance
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            {category?.name ?? "Source verification"}
          </h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            category
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white/70 text-slate-500"
          }`}
        >
          {category ? "Source verified" : "Awaiting selection"}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <p>
          {source?.label ??
            "Select a category to view the primary budget document and line item."}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1">
            {source?.page ?? "PDF page"}
          </span>
        </div>
        {source?.href ? (
          <a
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:shadow"
          >
            Open verified source
          </a>
        ) : null}
      </div>
    </div>
  );
};
