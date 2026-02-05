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
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {fiscalYear} Florida Budget
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                State spending by category
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Total adopted budget: {formatCurrency(totalBudget)}
              </p>
            </div>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              Tap a slice to explore details
            </div>
          </div>

          <div className="mt-6">
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
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <CategoryTable
            id={tableId}
            caption={`Category totals for ${fiscalYear}`}
            items={categories}
            total={totalBudget}
          />
          <p className="mt-4 text-xs text-slate-500">
            The table mirrors the chart data to provide an accessible text
            alternative.
          </p>
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
