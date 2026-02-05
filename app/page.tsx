import { BudgetExplorer } from "./components/BudgetExplorer";
import { floridaBudget } from "./data/florida-budget";
import { formatCurrency } from "./utils/formatting";

export default function Home() {
  const {
    meta: { fiscalYear, totalBudget },
    categories,
  } = floridaBudget;

  return (
    <main className="page-shell">
      <section className="section-shell pb-4 pt-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Florida state budget intelligence</p>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              Make {formatCurrency(totalBudget)} feel massive yet manageable.
            </h1>
            <p className="mt-3 text-lg text-gray-300">
              Source-verified intelligence for FY 2024-25 spending categories,
              built to explain where every major dollar goes.
            </p>
          </div>

          <div className="meta-card max-w-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Fiscal Year
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {fiscalYear}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Summary
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {formatCurrency(totalBudget)}, {categories.length} categories tracked
              </p>
            </div>
          </div>
        </div>
      </section>

      <BudgetExplorer />
    </main>
  );
}
