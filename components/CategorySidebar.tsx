"use client";

import type { BudgetCategory } from "../lib/data/types";

type CategorySidebarProps = {
  categories: BudgetCategory[];
  selectedCategoryName: string;
  onSelectCategory: (category: BudgetCategory) => void;
};

export function CategorySidebar({
  categories,
  selectedCategoryName,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <aside className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 lg:col-span-2">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Category List</p>
      <div className="mt-4 space-y-2">
        {categories.map((category) => {
          const isActive = selectedCategoryName === category.name;

          return (
            <button
              key={category.name}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`w-full rounded-lg border p-3 text-left transition-all duration-300 ${
                isActive
                  ? "border-cyan-500 bg-cyan-500/10 shadow-[inset_3px_0_0_0_rgba(6,182,212,1)]"
                  : "border-white/10 bg-slate-950/40 hover:border-cyan-500/40 hover:bg-slate-900/70"
              }`}
            >
              <p className={`text-sm font-semibold ${isActive ? "text-cyan-300" : "text-white"}`}>
                {category.name}
              </p>
              <p className={`mt-2 text-xs ${isActive ? "text-cyan-300" : "text-gray-300"}`}>
                {category.displayAmount} {"\u00b7"} {category.percentage.toFixed(1)}%
              </p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
