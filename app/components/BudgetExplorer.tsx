"use client";

import { useId, useState } from "react";

import type { BudgetCategory } from "../data/budget-types";
import { floridaBudget } from "../data/florida-budget";
import { BudgetDonut } from "./charts/BudgetDonut";
import { CategoryDialog } from "./modals/CategoryDialog";
import { CategoryTable } from "./tables/CategoryTable";
import { formatCurrency } from "../utils/formatting";

export const BudgetExplorer = () => {
  const tableId = useId();
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(
    null
  );
  const {
    meta: { fiscalYear, totalBudget },
    categories,
  } = floridaBudget;

  return (
    <section className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white/90 p-8 shadow-[0_40px_120px_-80px_rgba(15,23,42,0.65)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {fiscalYear} Florida Budget
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
                State spending by category
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Total adopted budget: {formatCurrency(totalBudget)}
              </p>
            </div>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              Tap a slice to explore details
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 shadow-inner">
            <BudgetDonut
              data={categories}
              total={totalBudget}
              tableId={tableId}
              activeCategory={selectedCategory?.name}
              onSelectCategory={(category) => {
                setSelectedCategory(category);
              }}
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Interaction
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Select any slice to view subcategory details in the modal.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Insight
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Compare share of total to spot the biggest priorities quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg">
          <CategoryTable
            id={tableId}
            caption={`Category totals for ${fiscalYear}`}
            items={categories}
            total={totalBudget}
          />
          <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-xs text-slate-600">
            The table mirrors the chart data to provide an accessible text
            alternative.
          </div>
        </div>
      </div>

      <CategoryDialog
        open={Boolean(selectedCategory)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCategory(null);
          }
        }}
        category={selectedCategory}
        fiscalYear={fiscalYear}
        total={totalBudget}
      />
    </section>
  );
};
