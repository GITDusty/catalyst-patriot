import Link from "next/link";
import StateCarousel from "./components/StateCarousel";
import { availableStates } from "./data/states";

export default function Home() {
  return (
    <main className="page-shell min-h-screen text-white">
      <section className="section-shell pt-16 pb-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
            Radical Sourcing · Catalyst Patriot
            <span className="text-gray-600"> · A Catalyst USA Project</span>
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Civic Intelligence
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Source-verified data on state budgets and national issues — built for citizens who want answers.
          </p>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-center text-sm font-semibold tracking-widest text-cyan-400 uppercase">
            State Budgets
          </p>
          <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
            State Budget Intelligence
          </h2>
          <p className="mx-auto mt-4 mb-12 max-w-3xl text-center text-xl text-gray-400">
            Source-verified budget data. Choose your state.
          </p>

          <StateCarousel states={availableStates} />

          <p className="mt-8 text-center text-sm text-gray-500">More states coming soon: Missouri</p>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="mx-auto mt-2 max-w-2xl">
          <Link
            href="/compare"
            className="group flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all text-center"
          >
            <span className="text-3xl mb-3">⚖️</span>
            <span className="text-lg font-semibold text-white">
              Compare States Side-by-Side
            </span>
            <span className="text-sm text-gray-400 mt-1">
              Side-by-side budget analysis across states
            </span>
            <div className="mt-4 flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition text-sm font-medium">
              Side-by-side <span aria-hidden="true">→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* National Issues Section */}
      <section className="section-shell py-8">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
            National Issues
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Beyond State Budgets
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Social Security Card */}
          <Link
            href="/social-security"
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏛️</span>
              <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
                Social Security
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              The program built for 222,000 now serves 72.9 million — and
              it&apos;s running out of money. A source-verified deep dive.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Beneficiaries</span>
                <span className="text-gray-200">72.9 million</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Worker Ratio</span>
                <span className="text-gray-200">2.5:1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Projected Insolvency</span>
                <span className="text-red-400">2034</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-amber-500 group-hover:text-amber-400 transition text-sm font-medium">
              Explore <span aria-hidden="true">&rarr;</span>
            </div>
          </Link>

          {/* Housing Card */}
          <Link
            href="/housing"
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏠</span>
              <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
                Housing
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              The cost of homeownership has drastically outpaced income
              growth, pricing out millions of Americans.
            </p>
            <div className="space-y-2 my-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Median Home Price</span>
                <span className="text-white font-semibold">$417,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Price-to-Income Ratio</span>
                <span className="text-amber-400 font-semibold">5.0x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">1986 Ratio</span>
                <span className="text-white font-semibold">3.7x</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-amber-500 group-hover:text-amber-400 transition text-sm font-medium">
              Explore <span aria-hidden="true">&rarr;</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
