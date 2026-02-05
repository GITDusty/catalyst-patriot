import { BudgetExplorer } from "./components/BudgetExplorer";
import { floridaBudget } from "./data/florida-budget";
import { formatCurrency } from "./utils/formatting";

export default function Home() {
  const {
    meta: { totalBudget },
  } = floridaBudget;

  return (
    <main className="page-shell min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <section className="section-shell pb-2 pt-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
            Florida State Budget Intelligence
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            Make {formatCurrency(totalBudget)} feel massive yet manageable.
          </h1>
          <p className="mt-2 text-gray-400">
            Source-verified intelligence for FY 2024-25 spending categories,
            built to explain where every major dollar goes.
          </p>
        </div>
      </section>

      <BudgetExplorer />
    </main>
  );
}
