import { StateBudgetExplorer } from "../../components/StateBudgetExplorer";
import { illinoisBudget } from "../../lib/data/illinois";

export default function IllinoisPage() {
  return (
    <main className="page-shell min-h-screen text-white">
      <section className="section-shell pb-2 pt-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
            Illinois State Budget Intelligence
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            Track {illinoisBudget.displayTotal} in Illinois General Funds spending.
          </h1>
          <p className="mt-2 text-gray-400">
            FY 2024-25 enacted budget categories with source-level provenance across every displayed amount.
          </p>
        </div>
      </section>

      <StateBudgetExplorer budget={illinoisBudget} />
    </main>
  );
}
