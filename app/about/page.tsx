"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

function FadeInSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="snap-y snap-mandatory bg-black text-white">
      <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden bg-black px-8">
        <FadeInSection className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <p className="mb-8 text-xs tracking-[0.32em] text-amber-400 uppercase">ABOUT CATALYST PATRIOT</p>
          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            Data doesn&apos;t have an agenda.
            <br />
            Numbers don&apos;t lie.
            <br />
            People do.
          </h1>
          <p className="mx-auto mt-10 max-w-3xl text-xl text-gray-400 md:text-2xl">
            We built this for the Americans who are tired of being lied to.
          </p>
        </FadeInSection>

        <svg
          className="pointer-events-none absolute bottom-28 left-1/2 h-24 w-40 -translate-x-1/2"
          viewBox="0 0 160 96"
          aria-hidden="true"
        >
          <line x1="16" y1="80" x2="128" y2="16" stroke="white" strokeWidth="2" opacity="0.8" />
          <circle cx="140" cy="10" r="7" fill="#F59E0B" />
        </svg>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce text-center">
          <p className="text-[10px] tracking-[0.35em] text-gray-500">SCROLL ↓</p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-8 py-24">
        <FadeInSection className="mx-auto max-w-[65ch]">
          <h2 className="mb-8 text-4xl font-bold text-white">The Problem</h2>
          <div className="space-y-6 text-lg leading-relaxed text-gray-300 md:text-xl">
            <p>
              Turn on the news and you&apos;ll hear a lot of numbers. Budget deficits. Spending bills.
              Social Security insolvency dates. Housing crises.
            </p>
            <p>But where do those numbers actually come from?</p>
            <p>
              Too often, they&apos;re cherry-picked, decontextualized, or flat-out wrong. One side inflates.
              The other deflates. Everyone has an agenda. And the average American is left guessing who to
              believe.
            </p>
            <p>We got tired of guessing.</p>
            <p>
              So we built something different: a platform where every single number is traced back to its
              original government document. No spin. No aggregators. No partisan think tanks. Just the raw
              data, presented clearly, with full source citations you can verify yourself.
            </p>
            <p className="text-2xl font-bold text-amber-400">We call it Radical Sourcing.</p>
          </div>
        </FadeInSection>
      </section>

      <section className="relative overflow-hidden bg-black px-8 py-32">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[120px]"
          aria-hidden="true"
        />
        <FadeInSection className="relative mx-auto max-w-4xl rounded-2xl border border-amber-400/30 bg-white/5 p-8 shadow-2xl shadow-amber-500/10 backdrop-blur-md md:p-12">
          <p className="mb-4 text-sm tracking-widest text-amber-400 uppercase">OUR MISSION</p>
          <h2 className="mb-8 text-3xl leading-tight font-bold text-white md:text-5xl">
            To arm every American with source-verified data on the issues that shape their lives so they can
            demand better from their government, regardless of party.
          </h2>
          <div className="mb-8 h-px w-full bg-amber-400/70" />
          <p className="mb-6 text-xl text-gray-300 italic md:text-2xl">
            We believe transparency isn&apos;t partisan. Accountability isn&apos;t radical. And the truth
            doesn&apos;t care about your vote.
          </p>
          <p className="text-lg leading-relaxed text-gray-400">
            This platform exists to help citizens cut through the noise, understand the numbers that matter,
            and take informed action on the policies that affect their families, their communities, and their
            country.
          </p>
        </FadeInSection>
      </section>

      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-8 py-24">
        <FadeInSection className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-4xl font-bold text-white">What We Stand For</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <article className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-amber-400/50">
              <p className="mb-4 text-6xl text-amber-400" aria-hidden="true">
                🔍
              </p>
              <h3 className="mb-4 text-2xl font-bold text-white">RADICAL TRANSPARENCY</h3>
              <p className="leading-relaxed text-gray-300">
                Every number on this site links back to its source document. No aggregators. No &quot;studies
                say.&quot; No Wikipedia citations. If we can&apos;t trace it to an official government record, we
                don&apos;t publish it.
              </p>
              <p className="mt-4 leading-relaxed text-gray-300">
                You shouldn&apos;t have to trust us. You should be able to verify us in two clicks.
              </p>
            </article>

            <article className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-amber-400/50">
              <p className="mb-4 text-6xl text-amber-400" aria-hidden="true">
                ⚖️
              </p>
              <h3 className="mb-4 text-2xl font-bold text-white">NONPARTISAN ACCOUNTABILITY</h3>
              <p className="leading-relaxed text-gray-300">
                We don&apos;t care if you&apos;re red or blue. We care if your government is spending your money
                wisely, keeping its promises, and telling you the truth about it.
              </p>
              <p className="mt-4 leading-relaxed text-gray-300">
                Left and right both screw up budgets. Both make promises they can&apos;t keep. We hold both
                accountable.
              </p>
            </article>

            <article className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-amber-400/50">
              <p className="mb-4 text-6xl text-amber-400" aria-hidden="true">
                🧭
              </p>
              <h3 className="mb-4 text-2xl font-bold text-white">CITIZEN-FIRST DESIGN</h3>
              <p className="leading-relaxed text-gray-300">
                Government data is intentionally hard to read. Buried in 500-page PDFs. Hidden in Excel
                sheets with no labels. Written in bureaucrat-speak.
              </p>
              <p className="mt-4 leading-relaxed text-gray-300">
                We translate it into plain English, clean visuals, and interactive charts so you can actually
                understand what your government is doing.
              </p>
            </article>
          </div>
        </FadeInSection>
      </section>

      <section className="bg-black px-8 py-24">
        <FadeInSection className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-4xl font-bold text-white">What We&apos;re Building</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-8">
              <h3 className="mb-6 text-xl font-bold text-emerald-300">🟢 LIVE NOW</h3>
              <ul className="space-y-3 text-lg text-gray-300">
                <li>- State Budgets (Florida, Illinois)</li>
                <li>- Social Security Crisis</li>
                <li>- Housing Affordability Crisis</li>
              </ul>
              <p className="mt-8 text-lg text-gray-300">Every page includes:</p>
              <ul className="mt-3 space-y-2 text-lg text-gray-300">
                <li>✓ Source-verified data</li>
                <li>✓ Interactive charts</li>
                <li>✓ Full methodology</li>
                <li>✓ Download links to original documents</li>
              </ul>
            </div>

            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-8">
              <h3 className="mb-6 text-xl font-bold text-amber-300">🟡 COMING SOON</h3>
              <ul className="space-y-3 text-lg text-gray-300">
                <li>- More States (Arizona, Texas, Missouri, Wyoming)</li>
                <li>- Federal Budget Breakdown</li>
                <li>- Healthcare Costs &amp; Medicare</li>
                <li>- Tax Policy Comparisons</li>
                <li>- Infrastructure Spending</li>
                <li>- Education Funding</li>
              </ul>
              <Link
                href="/act"
                className="mt-8 inline-flex rounded-lg border border-amber-400/50 px-5 py-3 font-semibold text-amber-200 transition hover:border-amber-300 hover:bg-amber-400/10"
              >
                Join the Waitlist →
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-8 py-24">
        <FadeInSection className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">Who We Are</h2>
          <div className="space-y-6 text-lg leading-relaxed text-gray-300">
            <p>
              Catalyst Patriot is a project of Catalyst USA, a civic intelligence initiative founded by Dusty
              Bruggeman.
            </p>
            <p>
              I&apos;m not a politician. I&apos;m not a think tank researcher. I&apos;m a life insurance broker
              from St. Louis, Missouri who got fed up with the gap between what politicians promise and what
              the data actually shows.
            </p>
            <p>
              I built this platform because I believe most Americans, regardless of political affiliation, want
              the same basic things:
            </p>
            <ul className="space-y-2 pl-5">
              <li><span className="text-amber-400">•</span> Honest information about how their tax dollars are spent</li>
              <li><span className="text-amber-400">•</span> Transparency from their elected officials</li>
              <li><span className="text-amber-400">•</span> The tools to hold government accountable</li>
              <li><span className="text-amber-400">•</span> A way to cut through partisan spin and see the actual numbers</li>
            </ul>
            <p>
              This started as a side project built with AI assistance (shoutout to Claude and Cursor).
              It&apos;s grown into something bigger: a movement of citizens who refuse to accept lazy narratives
              and demand source-level proof.
            </p>
            <p>
              We&apos;re not left or right. We&apos;re pro-transparency, pro-accountability, and
              pro-citizen.
            </p>
            <p>If that resonates with you, join us.</p>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/act"
              className="w-full rounded-lg bg-amber-500 px-8 py-4 text-center text-lg font-bold text-black transition hover:bg-amber-400 sm:w-auto"
            >
              Join the Movement
            </Link>
            <Link
              href="/"
              className="w-full rounded-lg border border-white/30 px-8 py-4 text-center text-lg text-white transition hover:border-amber-400 sm:w-auto"
            >
              Explore the Data
            </Link>
          </div>
        </FadeInSection>
      </section>
    </main>
  );
}
