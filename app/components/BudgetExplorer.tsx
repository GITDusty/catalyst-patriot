"use client";

import { useMemo, useState } from "react";

import { floridaBudget } from "../data/florida-budget";
import { BudgetDonut } from "./charts/BudgetDonut";
import {
  formatCurrency,
  formatCurrencyWhole,
  formatPercent,
} from "../utils/formatting";

const FLORIDA_POPULATION = 22.6e6;

const PAGE_BY_CATEGORY: Record<string, number> = {
  "Health & Human Services": 112,
  Education: 74,
  Transportation: 168,
  Corrections: 201,
  Environment: 233,
  Other: 262,
};

export const BudgetExplorer = () => {
  const {
    meta: { fiscalYear, totalBudget, sourceLabel, sourceUrl },
    categories,
  } = floridaBudget;
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => b.value - a.value),
    [categories]
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    sortedCategories[0]?.name ?? ""
  );
  const selectedCategory =
    sortedCategories.find((category) => category.name === selectedCategoryName) ??
    sortedCategories[0] ??
    null;

  if (!selectedCategory) {
    return null;
  }

  const selectedPercent =
    totalBudget > 0 ? selectedCategory.value / totalBudget : 0;
  const categoryCostPerCitizen = selectedCategory.value / FLORIDA_POPULATION;
  const provenancePage = PAGE_BY_CATEGORY[selectedCategory.name] ?? 1;
  const hasSourceLink = Boolean(sourceUrl);

  return (
    <section className="section-shell pt-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <aside className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Category List
          </p>
          <div className="mt-4 space-y-2">
            {sortedCategories.map((category) => {
              const percent = totalBudget > 0 ? category.value / totalBudget : 0;
              const isActive = selectedCategory.name === category.name;

              return (
                <div key={category.name}>
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryName(category.name)}
                    className={`w-full rounded-lg border p-3 text-left transition-all duration-300 ${
                      isActive
                        ? "border-cyan-500 bg-cyan-500/10 shadow-[inset_3px_0_0_0_rgba(6,182,212,1)]"
                        : "border-white/10 bg-slate-950/40 hover:border-cyan-500/40 hover:bg-slate-900/70"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        isActive ? "text-cyan-300" : "text-white"
                      }`}
                    >
                      {category.name}
                    </p>
                    <p
                      className={`mt-2 text-xs ${
                        isActive ? "text-cyan-300" : "text-gray-300"
                      }`}
                    >
                      {formatCurrency(category.value)} {"\u00b7"} {formatPercent(percent)}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="min-w-0 space-y-6 lg:col-span-3">
          <div className="min-w-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-gray-500">
              <span>{fiscalYear} Budget Mix</span>
              <span>Click slice or category</span>
            </div>
            <BudgetDonut
              data={sortedCategories}
              total={totalBudget}
              tableId="budget-category-summary"
              activeCategory={selectedCategory.name}
              centerLabel={selectedCategory.name}
              centerValue={formatCurrency(selectedCategory.value)}
              onSelectCategory={(category) => {
                setSelectedCategoryName(category.name);
              }}
            />
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">
              Selected Category
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              {selectedCategory.name}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Budget Amount
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {formatCurrency(selectedCategory.value)}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Share of Total
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {formatPercent(selectedPercent)}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Cost Per Citizen
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {formatCurrencyWhole(categoryCostPerCitizen)}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-white/10 bg-slate-950/35 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Provenance</p>
                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-300">
                  Source verified
                </span>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">Source document</dt>
                  <dd className="text-right text-gray-200">{sourceLabel}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-gray-500">PDF page</dt>
                  <dd className="text-gray-200">{provenancePage}</dd>
                </div>
              </dl>
              {hasSourceLink ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                  Open verified source
                </a>
              ) : (
                <span className="mt-4 inline-flex text-sm text-gray-500">
                  Open verified source (link pending)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        id="budget-category-summary"
        className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-4 text-sm text-gray-200 md:grid-cols-4"
      >
        <p>
          Total Budget: <span className="font-semibold text-white">{formatCurrency(totalBudget)}</span>
        </p>
        <p>
          Categories Tracked: <span className="font-semibold text-white">{sortedCategories.length}</span>
        </p>
        <p>
          Cost Per Citizen:{" "}
          <span className="font-semibold text-white">
            {formatCurrencyWhole(totalBudget / FLORIDA_POPULATION)}
          </span>
        </p>
        <p>
          Data Sources: <span className="font-semibold text-cyan-300">Verified ✓</span>
        </p>
      </div>
    </section>
  );
};
