import type { StateBudget } from "../lib/data/types";

type StatsBarProps = {
  budget: StateBudget;
};

export function StatsBar({ budget }: StatsBarProps) {
  return (
    <div className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-4 text-sm text-gray-200 md:grid-cols-4">
      <p>
        Total Budget: <span className="font-semibold text-white">{budget.displayTotal}</span>
      </p>
      <p>
        Categories Tracked: <span className="font-semibold text-white">{budget.categoriesTracked}</span>
      </p>
      <p>
        Cost Per Citizen: <span className="font-semibold text-white">{budget.displayCostPerCitizen}</span>
      </p>
      <p>
        Data Sources: <span className="font-semibold text-cyan-300">Mixed status</span>
      </p>
    </div>
  );
}
