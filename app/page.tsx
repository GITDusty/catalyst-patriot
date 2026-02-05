import Link from "next/link";

import { floridaBudget } from "../lib/data/florida";
import { illinoisBudget } from "../lib/data/illinois";

const states = [floridaBudget, illinoisBudget];

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen text-white">
      <section className="section-shell pb-2 pt-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
            State Budget Intelligence
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            Explore where public dollars go across states.
          </h1>
          <p className="mt-2 text-gray-400">
            Select a state dashboard or open the side-by-side comparison.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {states.map((state) => (
            <Link
              key={state.abbreviation}
              href={`/${state.state.toLowerCase()}`}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:border-cyan-500/40"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">{state.fiscalYear}</p>
              <h2 className="mt-2 text-2xl font-bold text-white">{state.state}</h2>
              <p className="mt-3 text-sm text-gray-300">Total Budget: {state.displayTotal}</p>
              <p className="text-sm text-gray-300">Population: {state.population.toLocaleString()}</p>
              <p className="text-sm text-gray-300">Cost per citizen: {state.displayCostPerCitizen}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/compare"
          className="mt-6 inline-flex rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
        >
          Open Florida vs Illinois comparison
        </Link>
      </section>
    </main>
  );
}
