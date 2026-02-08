import { StateBudgetExplorer } from "../../components/StateBudgetExplorer";
import { floridaBudget } from "../../lib/data/florida";

export default function FloridaPage() {
  return (
    <main className="page-shell min-h-screen text-white">
      <section className="section-shell pb-6 pt-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
            Florida State Budget Intelligence
          </p>
          <h1 className="state-page-headline mt-2">Where does Florida&apos;s $116.5B go?</h1>
          <p className="state-page-subheadline">
            FY 2024-25 budget breakdown with source-verified data on every dollar spent.
          </p>
        </div>
      </section>

      <StateBudgetExplorer budget={floridaBudget} />
    </main>
  );
}
