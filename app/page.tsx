import { BudgetExplorer } from "./components/BudgetExplorer";
import { floridaBudget } from "./data/florida-budget";
import { formatCurrency } from "./utils/formatting";

export default function Home() {
  const { meta, categories } = floridaBudget;
  const topCategories = categories.slice(0, 3);

  return (
    <main className="page-shell relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6rem] top-20 h-[22rem] w-[22rem] rounded-full bg-emerald-400/20 blur-3xl"
      />
      <section className="section-shell relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm">
              {meta.fiscalYear} Budget Atlas
            </div>
            <h1 className="mt-6 text-4xl font-semibold text-slate-900 sm:text-5xl">
              See how Florida allocates every dollar in one glance.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Explore the state budget by category, compare major priorities,
              and tap any slice to drill into subcategory details.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-700 shadow-sm">
                Total budget {formatCurrency(meta.totalBudget)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-700 shadow-sm">
                {categories.length} priority areas
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Top spend categories
            </p>
            <div className="mt-4 grid gap-4">
              {topCategories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {category.name}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {formatCurrency(category.value)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Data source: {meta.sourceLabel}
            </p>
          </div>
        </div>
      </section>

      <BudgetExplorer />

      <section className="section-shell">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-600 shadow-lg">
          <p className="font-semibold text-slate-800">Attribution</p>
          <p className="mt-2">
            Budget figures reflect the Florida FY 2024-25 enacted plan. Data is
            provided as a public summary for civic education and will be
            updated with a verified source link.
          </p>
        </div>
      </section>
    </main>
  );
}
