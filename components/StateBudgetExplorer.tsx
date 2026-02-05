"use client";

import { useMemo, useState } from "react";

import { BudgetDonutChart } from "./BudgetDonutChart";
import { CategoryDetail } from "./CategoryDetail";
import { CategorySidebar } from "./CategorySidebar";
import { SourcesFooter } from "./SourcesFooter";
import { StatsBar } from "./StatsBar";
import type { StateBudget } from "../lib/data/types";

type StateBudgetExplorerProps = {
  budget: StateBudget;
};

export function StateBudgetExplorer({ budget }: StateBudgetExplorerProps) {
  const sortedCategories = useMemo(
    () => [...budget.categories].sort((a, b) => b.amount - a.amount),
    [budget.categories]
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

  return (
    <section className="section-shell pt-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <CategorySidebar
          categories={sortedCategories}
          selectedCategoryName={selectedCategory.name}
          onSelectCategory={(category) => setSelectedCategoryName(category.name)}
        />

        <div className="min-w-0 space-y-6 lg:col-span-3">
          <div className="min-w-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-gray-500">
              <span>{budget.fiscalYear} Budget Mix</span>
              <span>Click slice or category</span>
            </div>
            <BudgetDonutChart
              categories={sortedCategories}
              total={budget.totalBudget}
              activeCategoryName={selectedCategory.name}
              centerLabel={selectedCategory.name}
              centerValue={selectedCategory.displayAmount}
              onSelectCategory={(category) => setSelectedCategoryName(category.name)}
            />
          </div>

          <CategoryDetail category={selectedCategory} population={budget.population} />
        </div>
      </div>

      <StatsBar budget={budget} />
      <SourcesFooter budget={budget} />
    </section>
  );
}
