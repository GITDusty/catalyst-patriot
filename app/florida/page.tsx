import { StateBudgetExplorer } from "../../components/StateBudgetExplorer";
import { floridaBudget } from "../../lib/data/florida";

export default function FloridaPage() {
  return (
    <main className="page-shell min-h-screen text-white">
      <section className="section-shell pb-2 pt-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
            Florida State Budget Intelligence
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            Make {floridaBudget.displayTotal} feel massive yet manageable.
          </h1>
          <p className="mt-2 text-gray-400">
            Provenance-aware FY 2024-25 spending categories and a transparent breakdown of major allocations.
          </p>
        </div>
      </section>

      <StateBudgetExplorer budget={floridaBudget} />
    </main>
  );
}
