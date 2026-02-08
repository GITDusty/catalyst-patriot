import type { Metadata } from "next";

import { StateBudgetExplorer } from "../../components/StateBudgetExplorer";
import { texasData } from "../data/texas";

export const metadata: Metadata = {
  title: "Texas Budget Dashboard",
  description:
    "Source-verified Texas FY 2024-25 budget data, category-level allocations, and annualized biennial comparisons.",
};

export default function TexasPage() {
  return (
    <main className="page-shell min-h-screen text-white">
      <section className="section-shell pb-6 pt-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
            Texas State Budget Intelligence
          </p>
          <h1 className="state-page-headline mt-2">How Texas spends $160.7B annually.</h1>
          <p className="state-page-subheadline">
            FY 2024-25 biennium budget (annual equivalent) with source-verified categories and
            full methodology.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Note: Texas uses a 2-year budget cycle. Figures shown represent the annual equivalent
            of the FY 2024-25 biennium for comparison purposes.
          </p>
        </div>
      </section>

      <StateBudgetExplorer budget={texasData} />
    </main>
  );
}
