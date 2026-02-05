import { floridaBudget } from "../../lib/data/florida";
import { formatCompactCurrency } from "../../lib/data/formatting";
import { illinoisBudget } from "../../lib/data/illinois";

function formatSignedCurrency(value: number) {
  const abs = formatCompactCurrency(Math.abs(value));
  return value >= 0 ? `+${abs}` : `-${abs}`;
}

function formatSignedNumber(value: number) {
  const abs = Math.abs(value).toLocaleString();
  return value >= 0 ? `+${abs}` : `-${abs}`;
}

const allCategoryNames = Array.from(
  new Set([
    ...floridaBudget.categories.map((category) => category.name),
    ...illinoisBudget.categories.map((category) => category.name),
  ])
);

export default function ComparePage() {
  return (
    <main className="page-shell min-h-screen text-white">
      <section className="section-shell pt-8">
        <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Comparison</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">Florida vs Illinois</h1>
        <p className="mt-2 text-gray-400">
          Side-by-side totals and category deltas, with differences calculated as Florida minus Illinois.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-slate-950/40 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Metric</th>
                <th className="px-4 py-3 font-semibold">Florida</th>
                <th className="px-4 py-3 font-semibold">Illinois</th>
                <th className="px-4 py-3 font-semibold">Difference (FL - IL)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-200">
              <tr>
                <td className="px-4 py-3 font-medium text-white">Total Budget</td>
                <td className="px-4 py-3">{floridaBudget.displayTotal}</td>
                <td className="px-4 py-3">{illinoisBudget.displayTotal}</td>
                <td className="px-4 py-3 text-cyan-300">
                  {formatSignedCurrency(floridaBudget.totalBudget - illinoisBudget.totalBudget)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Population</td>
                <td className="px-4 py-3">{floridaBudget.population.toLocaleString()}</td>
                <td className="px-4 py-3">{illinoisBudget.population.toLocaleString()}</td>
                <td className="px-4 py-3 text-cyan-300">
                  {formatSignedNumber(floridaBudget.population - illinoisBudget.population)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Cost Per Citizen</td>
                <td className="px-4 py-3">{floridaBudget.displayCostPerCitizen}</td>
                <td className="px-4 py-3">{illinoisBudget.displayCostPerCitizen}</td>
                <td className="px-4 py-3 text-cyan-300">
                  {formatSignedCurrency(floridaBudget.costPerCitizen - illinoisBudget.costPerCitizen)}
                </td>
              </tr>
              {allCategoryNames.map((name) => {
                const floridaCategory = floridaBudget.categories.find((category) => category.name === name);
                const illinoisCategory = illinoisBudget.categories.find((category) => category.name === name);
                const floridaAmount = floridaCategory?.amount ?? 0;
                const illinoisAmount = illinoisCategory?.amount ?? 0;

                return (
                  <tr key={name}>
                    <td className="px-4 py-3 font-medium text-white">{name}</td>
                    <td className="px-4 py-3">{formatCompactCurrency(floridaAmount)}</td>
                    <td className="px-4 py-3">{formatCompactCurrency(illinoisAmount)}</td>
                    <td className="px-4 py-3 text-cyan-300">
                      {formatSignedCurrency(floridaAmount - illinoisAmount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
