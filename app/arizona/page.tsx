import type { Metadata } from "next";

import { StateBudgetExplorer } from "../../components/StateBudgetExplorer";
import { arizonaData } from "../data/arizona";

export const metadata: Metadata = {
  title: "Arizona Budget Dashboard",
  description:
    "Source-verified Arizona FY 2025-26 budget data, category-level allocations, and transparent provenance.",
};

export default function ArizonaPage() {
  return (
    <main className="page-shell min-h-screen text-white">
      <section className="section-shell pb-6 pt-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
            Arizona State Budget Intelligence
          </p>
          <h1 className="state-page-headline mt-2">
            Arizona&apos;s $18.0B budget, category by category.
          </h1>
          <p className="state-page-subheadline">
            FY 2025-26 General Fund appropriations with transparent sourcing and verified data.
          </p>
        </div>
      </section>

      <StateBudgetExplorer budget={arizonaData} />
    </main>
  );
}
