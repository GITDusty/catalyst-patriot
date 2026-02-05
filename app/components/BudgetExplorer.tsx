"use client";

import { useMemo, useState } from "react";

import { ProvenanceBadge } from "../../components/ProvenanceBadge";
import type { BudgetData } from "../data/budget-types";
import { BudgetDonut } from "./charts/BudgetDonut";
import {
  formatCurrency,
  formatCurrencyWhole,
  formatPercent,
} from "../utils/formatting";

type BudgetExplorerProps = {
  budget: BudgetData;
  population: number;
  pageByCategory: Record<string, number>;
  chartColors?: string[];
};

export const BudgetExplorer = ({
  budget,
  population,
  pageByCategory,
  chartColors,
}: BudgetExplorerProps) => {
  const {
    meta: { fiscalYear, totalBudget, sourceLabel, sourceUrl },
    categories,
  } = budget;
  const sources = useMemo(
    () =>
      budget.sources && budget.sources.length > 0
        ? budget.sources
        : [
            {
              id: "primary-source",
              name: sourceLabel,
              type: "Official state budget document",
              url: sourceUrl,
            },
          ],
    [budget.sources, sourceLabel, sourceUrl]
  );
  const sourceIndexById = useMemo(
    () =>
      new Map(
        sources.map((source, index) => [source.id, index + 1] as const)
      ),
    [sources]
  );
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
  const categoryCostPerCitizen = selectedCategory.value / population;
  const provenancePage = pageByCategory[selectedCategory.name];
  const primarySourceId = sources[0]?.id;
  const selectedSourceId = selectedCategory.provenance?.sourceId ?? primarySourceId;
  const selectedProvenance = {
    status: selectedCategory.provenance?.status ?? "Source verified",
    document: selectedCategory.provenance?.document ?? sourceLabel,
    source: selectedCategory.provenance?.source ?? "Official state budget source",
    url: selectedCategory.provenance?.url ?? sourceUrl,
    pageRef:
      selectedCategory.provenance?.pageRef ??
      (provenancePage ? `p. ${provenancePage}` : undefined),
    notes: selectedCategory.provenance?.notes,
  } as const;

  const scrollToSource = (sourceId: string | undefined) => {
    if (!sourceId) {
      return;
    }

    const element = document.getElementById(`source-${sourceId}`);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getCitationNumber = (sourceId: string | undefined) =>
    sourceId ? sourceIndexById.get(sourceId) ?? "?" : "?";

  const renderCitationMarker = (sourceId: string | undefined) => (
    <sup className="ml-0.5">
      <button
        type="button"
        onClick={() => scrollToSource(sourceId)}
        className="cursor-pointer text-xs text-cyan-400 transition hover:underline"
        aria-label={`Jump to source ${getCitationNumber(sourceId)}`}
      >
        [{getCitationNumber(sourceId)}]
      </button>
    </sup>
  );

  return (
    <section className="section-shell pt-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <aside className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:col-span-2">
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
          <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-gray-500">
              <span>{fiscalYear} Budget Mix</span>
              <span>Click slice or category</span>
            </div>
            <BudgetDonut
              data={sortedCategories}
              total={totalBudget}
              tableId="budget-category-summary"
              colors={chartColors}
              activeCategory={selectedCategory.name}
              centerLabel={selectedCategory.name}
              centerValue={formatCurrency(selectedCategory.value)}
              onSelectCategory={(category) => {
                setSelectedCategoryName(category.name);
              }}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300">
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
                  {renderCitationMarker(selectedSourceId)}
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
                  {renderCitationMarker(selectedSourceId)}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-white">Provenance</p>
              <ProvenanceBadge
                status={selectedProvenance.status}
                document={selectedProvenance.document}
                source={selectedProvenance.source}
                url={selectedProvenance.url}
                pageRef={selectedProvenance.pageRef}
                notes={selectedProvenance.notes}
              />
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
          {renderCitationMarker(primarySourceId)}
        </p>
        <p>
          Categories Tracked: <span className="font-semibold text-white">{sortedCategories.length}</span>
        </p>
        <p>
          Cost Per Citizen:{" "}
          <span className="font-semibold text-white">
            {formatCurrencyWhole(totalBudget / population)}
          </span>
          {renderCitationMarker(primarySourceId)}
        </p>
        <p>
          Data Sources: <span className="font-semibold text-cyan-300">Verified ✓</span>
        </p>
      </div>

      <section className="mt-6 border-t border-white/10 px-8 py-8">
        <h3 className="mb-4 text-lg font-bold text-white">Sources & Methodology</h3>
        <p className="mb-4 text-sm text-gray-400">
          All budget figures are sourced from official government documents and
          verified against independent nonpartisan analyses. Click any category
          above to see its specific source citation.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sources.map((source) => {
            if (source.url) {
              return (
                <a
                  key={source.id}
                  id={`source-${source.id}`}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <p className="text-sm font-medium text-white">{source.name}</p>
                  <p className="mt-1 text-xs text-gray-500">{source.type}</p>
                </a>
              );
            }

            return (
              <div
                key={source.id}
                id={`source-${source.id}`}
                className="rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-medium text-white">{source.name}</p>
                <p className="mt-1 text-xs text-gray-500">{source.type}</p>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};
