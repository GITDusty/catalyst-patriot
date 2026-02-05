import { BudgetExplorer } from "./components/BudgetExplorer";
import { SourceIndicator } from "./components/SourceIndicator";
import { floridaBudget } from "./data/florida-budget";
import { formatCurrency } from "./utils/formatting";

export default function Home() {
  const { meta } = floridaBudget;

  return (
    <main className="page-shell">
      <section className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Florida FY 2024-25 Budget</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
              See how Florida allocates every dollar.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Explore the state budget by category, compare major priorities,
              and tap any slice to drill into subcategory details.
            </p>
          </div>

          <div className="meta-card">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Fiscal year
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {meta.fiscalYear}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Total budget
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                <span className="inline-flex items-center">
                  {formatCurrency(meta.totalBudget)}
                  {meta.source ? (
                    <SourceIndicator
                      sourceUrl={meta.source.url}
                      description={meta.source.description}
                    />
                  ) : null}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Data source
              </p>
              <p className="mt-2 text-sm text-slate-600">{meta.sourceLabel}</p>
            </div>
          </div>
        </div>
      </section>

      <BudgetExplorer />

      <section className="section-shell">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-600">
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
