"use client";

import { useState } from "react";
import { BudgetDonutChart } from "../../components/BudgetDonutChart";
import { floridaBudget } from "../../lib/data/florida";
import { formatCompactCurrency, formatWholeCurrency } from "../../lib/data/formatting";
import { illinoisBudget } from "../../lib/data/illinois";

const categoryMapping = [
  {
    label: "Health & Human Services",
    floridaKey: "Health & Human Services",
    illinoisKey: "Healthcare & Human Services",
  },
  {
    label: "Education",
    floridaKey: "Education",
    illinoisKey: "Education",
  },
  {
    label: "Transportation & Infrastructure",
    floridaKey: "Transportation",
    illinoisKey: "Infrastructure & Environment",
  },
  {
    label: "Corrections & Public Safety",
    floridaKey: "Corrections",
    illinoisKey: "Public Safety & Corrections",
  },
  {
    label: "Pensions & Debt Service",
    floridaKey: null,
    illinoisKey: "Pensions & Debt Service",
  },
  {
    label: "Government Operations",
    floridaKey: null,
    illinoisKey: "Government Operations",
  },
  {
    label: "Environment",
    floridaKey: "Environment",
    illinoisKey: null,
  },
  {
    label: "Other",
    floridaKey: "Other",
    illinoisKey: null,
  },
];

function formatSignedCurrency(value: number, perCitizen: boolean) {
  if (perCitizen) {
    const abs = formatWholeCurrency(Math.abs(value));
    return value >= 0 ? `+${abs}` : `-${abs}`;
  }
  const abs = formatCompactCurrency(Math.abs(value));
  return value >= 0 ? `+${abs}` : `-${abs}`;
}

function formatSignedNumber(value: number) {
  const abs = Math.abs(value).toLocaleString();
  return value >= 0 ? `+${abs}` : `-${abs}`;
}

function formatValue(value: number | null, perCitizen: boolean, population: number) {
  if (value === null) return null;
  if (perCitizen && population > 0) {
    return formatWholeCurrency(value / population);
  }
  return formatCompactCurrency(value);
}

export default function ComparePage() {
  const [viewMode, setViewMode] = useState<"total" | "perCitizen">("total");
  const perCitizen = viewMode === "perCitizen";

  return (
    <main className="page-shell min-h-screen text-white">
      <section className="section-shell pt-8">
        <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Comparison</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">Florida vs Illinois</h1>
        <p className="mt-2 text-gray-400">
          Side-by-side totals and category deltas, with differences calculated as Florida minus Illinois.
        </p>

        {/* Side-by-side Donut Charts */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="mb-4 text-center">
              <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Florida</p>
              <p className="mt-1 text-2xl font-bold text-white">{floridaBudget.displayTotal}</p>
            </div>
            <BudgetDonutChart
              categories={floridaBudget.categories}
              total={floridaBudget.totalBudget}
              onSelectCategory={() => {}}
            />
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="mb-4 text-center">
              <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Illinois</p>
              <p className="mt-1 text-2xl font-bold text-white">{illinoisBudget.displayTotal}</p>
            </div>
            <BudgetDonutChart
              categories={illinoisBudget.categories}
              total={illinoisBudget.totalBudget}
              onSelectCategory={() => {}}
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="mt-8 flex gap-2">
          <button
            onClick={() => setViewMode("total")}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              viewMode === "total"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            Total Spend
          </button>
          <button
            onClick={() => setViewMode("perCitizen")}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              viewMode === "perCitizen"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            Per Citizen
          </button>
        </div>

        {/* Comparison Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-slate-950/40 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Metric</th>
                <th className="px-4 py-3 font-semibold">Florida</th>
                <th className="px-4 py-3 font-semibold">Illinois</th>
                <th className="px-4 py-3 font-semibold">Difference (FL - IL)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-200">
              <tr>
                <td className="px-4 py-3 font-medium text-white">
                  {perCitizen ? "Budget Per Citizen" : "Total Budget"}
                </td>
                <td className="px-4 py-3">
                  {perCitizen
                    ? floridaBudget.displayCostPerCitizen
                    : floridaBudget.displayTotal}
                </td>
                <td className="px-4 py-3">
                  {perCitizen
                    ? illinoisBudget.displayCostPerCitizen
                    : illinoisBudget.displayTotal}
                </td>
                <td className="px-4 py-3 text-cyan-300">
                  {formatSignedCurrency(
                    perCitizen
                      ? floridaBudget.costPerCitizen - illinoisBudget.costPerCitizen
                      : floridaBudget.totalBudget - illinoisBudget.totalBudget,
                    perCitizen
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Population</td>
                <td className="px-4 py-3">{floridaBudget.population.toLocaleString()}</td>
                <td className="px-4 py-3">{illinoisBudget.population.toLocaleString()}</td>
                <td className="px-4 py-3 text-cyan-300">
                  {formatSignedNumber(floridaBudget.population - illinoisBudget.population)}
                </td>
              </tr>
              {categoryMapping.map((mapping) => {
                const floridaCategory = mapping.floridaKey
                  ? floridaBudget.categories.find((c) => c.name === mapping.floridaKey)
                  : null;
                const illinoisCategory = mapping.illinoisKey
                  ? illinoisBudget.categories.find((c) => c.name === mapping.illinoisKey)
                  : null;

                const floridaAmount = floridaCategory?.amount ?? null;
                const illinoisAmount = illinoisCategory?.amount ?? null;

                const floridaDisplay = formatValue(
                  floridaAmount,
                  perCitizen,
                  floridaBudget.population
                );
                const illinoisDisplay = formatValue(
                  illinoisAmount,
                  perCitizen,
                  illinoisBudget.population
                );

                // Calculate difference
                let differenceDisplay: string;
                if (floridaAmount !== null && illinoisAmount !== null) {
                  const diff = perCitizen
                    ? floridaAmount / floridaBudget.population -
                      illinoisAmount / illinoisBudget.population
                    : floridaAmount - illinoisAmount;
                  differenceDisplay = formatSignedCurrency(diff, perCitizen);
                } else {
                  differenceDisplay = "—";
                }

                return (
                  <tr key={mapping.label}>
                    <td className="px-4 py-3 font-medium text-white">{mapping.label}</td>
                    <td className="px-4 py-3">
                      {floridaDisplay ?? <span className="text-gray-600">N/A</span>}
                    </td>
                    <td className="px-4 py-3">
                      {illinoisDisplay ?? <span className="text-gray-600">N/A</span>}
                    </td>
                    <td className="px-4 py-3 text-cyan-300">{differenceDisplay}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
