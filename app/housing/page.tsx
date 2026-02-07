"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { housingData } from "../data/housing";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce text-center">
      <p className="text-[10px] tracking-[0.35em] text-gray-500">SCROLL ↓</p>
    </div>
  );
}

function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="h-screen snap-start snap-always relative flex items-center justify-center px-6 sm:px-10 py-16">
      {children}
    </section>
  );
}

export default function HousingPage() {
  const timelineStart = housingData.timeline[0];
  const timelineEnd = housingData.timeline[housingData.timeline.length - 1];

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory bg-black text-white">
      <Section>
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <line
            x1="80"
            y1="920"
            x2="430"
            y2="560"
            stroke="white"
            strokeWidth="2"
            opacity="0.3"
          />
          <circle cx="455" cy="535" r="10" fill="#F59E0B" />
        </svg>

        <FadeIn className="relative z-10 text-center max-w-5xl space-y-8">
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-amber-400">
            NATIONAL ISSUE &middot; HOUSING
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight">
            The American Dream
            <br />
            now costs <span className="text-amber-400">5x your income.</span>
          </h1>
          <p className="text-2xl sm:text-3xl text-gray-300">It used to cost 3.7x.</p>
          <p className="text-sm sm:text-base text-gray-500 max-w-3xl mx-auto">
            Source-verified data from U.S. Census Bureau, Federal Reserve,
            National Association of Realtors, and Bureau of Labor Statistics.
          </p>
        </FadeIn>
        <ScrollIndicator />
      </Section>

      <Section>
        <FadeIn className="w-full max-w-6xl text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-bold">From $92K to $417K in 40 years</h2>
            <p className="text-xl text-gray-400">
              That&apos;s a 353% increase. Inflation accounts for only 190%.
            </p>
          </div>

          <div className="relative px-2 sm:px-8">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 -translate-y-1/2" />
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
              {housingData.timeline.map((point) => (
                <div key={point.year} className="flex flex-col items-center gap-4">
                  <div className="h-5 w-5 rounded-full border border-amber-300 bg-amber-500 shadow-[0_0_24px_rgba(245,158,11,0.55)]" />
                  <p className="text-3xl sm:text-4xl font-bold text-amber-300">
                    {formatCurrency(point.price)}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base">{point.year}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <ScrollIndicator />
      </Section>

      <Section>
        <FadeIn className="w-full max-w-6xl space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl sm:text-6xl font-bold">Home prices grew 353%. Incomes grew 233%.</h2>
            <p className="text-xl text-gray-400">The gap widens every year.</p>
          </div>

          <div className="h-[300px] sm:h-[420px] w-full rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={housingData.chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="homePriceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  stroke="#6b7280"
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#6b7280"
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickLine={false}
                  tickFormatter={(value) => `$${Number(value).toLocaleString("en-US")}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0a0a0a",
                    border: "1px solid #374151",
                    borderRadius: "0.75rem",
                    color: "#ffffff",
                  }}
                  labelStyle={{ color: "#e5e7eb" }}
                  formatter={(
                    value: number | string | undefined,
                    name: string | undefined
                  ) => {
                    const label =
                      name === "homePrice"
                        ? "Median Home Price"
                        : "Median Household Income";
                    return [formatCurrency(Number(value ?? 0)), label];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="homePrice"
                  stroke="#F59E0B"
                  fill="url(#homePriceFill)"
                  strokeWidth={3}
                  name="homePrice"
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#22D3EE"
                  fill="url(#incomeFill)"
                  strokeWidth={3}
                  name="income"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-500">
            Sources: U.S. Census Bureau (home prices) | Federal Reserve FRED
            (median household income)
          </p>
        </FadeIn>
        <ScrollIndicator />
      </Section>

      <Section>
        <FadeIn className="w-full max-w-6xl space-y-10 text-center">
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-6xl font-bold">
              It takes 5 years of income to buy a median home.
            </h2>
            <p className="text-xl text-gray-400">In 1986, it took 3.7 years.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {housingData.timeline.map((point) => (
              <div
                key={point.year}
                className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 space-y-3"
              >
                <p className="text-sm tracking-[0.25em] uppercase text-gray-400">
                  {point.year}
                </p>
                <p className="text-5xl sm:text-6xl font-bold text-amber-400">
                  {point.ratio.toFixed(1)}x
                </p>
                <p className="text-sm text-gray-400">
                  Median home price divided by median household income
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
        <ScrollIndicator />
      </Section>

      <Section>
        <FadeIn className="w-full max-w-6xl text-center space-y-10">
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-6xl font-bold">
              First-time buyers are now 10 years older.
            </h2>
            <p className="text-xl text-gray-400">
              The delay costs a decade of equity building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 space-y-5">
              <div className="mx-auto h-16 w-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                <div className="h-7 w-7 rounded-full bg-white/70" />
              </div>
              <p className="text-xs tracking-[0.28em] uppercase text-gray-400">
                {housingData.homeownerAge.past.era}
              </p>
              <p className="text-4xl sm:text-5xl font-bold">
                Age {housingData.homeownerAge.past.range}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-8 space-y-5">
              <div className="mx-auto h-16 w-16 rounded-full border border-amber-300/50 bg-amber-400/20 flex items-center justify-center">
                <div className="h-7 w-7 rounded-full bg-amber-300" />
              </div>
              <p className="text-xs tracking-[0.28em] uppercase text-amber-200">
                {housingData.homeownerAge.current.era}
              </p>
              <p className="text-4xl sm:text-5xl font-bold text-amber-300">
                Age {housingData.homeownerAge.current.range}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-500">
            Source: National Association of Realtors (Homebuyer Age Trends)
          </p>
        </FadeIn>
        <ScrollIndicator />
      </Section>

      <Section>
        <FadeIn className="w-full max-w-6xl text-center space-y-10">
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-6xl font-bold">Breaking down the crisis</h2>
            <p className="text-xl text-gray-400">
              Why owning and renting are both harder than ever.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {housingData.supportingStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-7 text-left"
              >
                <p className="text-xs tracking-[0.24em] uppercase text-gray-400">
                  {stat.label}
                </p>
                <p className="text-4xl sm:text-5xl font-bold text-amber-300 mt-3">
                  {stat.value}
                </p>
                <p className="text-gray-400 mt-2">{stat.context}</p>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-gray-500">
            Sources: Freddie Mac (rates/supply) | HUD (rent burden) | NAR (down
            payment) | Up for Growth (shortage)
          </p>
        </FadeIn>
        <ScrollIndicator />
      </Section>

      <Section>
        <FadeIn className="w-full max-w-5xl">
          <div className="text-center space-y-5 mb-10">
            <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-gray-500">
              Radical Sourcing
            </p>
            <h2 className="text-4xl sm:text-6xl font-bold">Sources and Methodology</h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto">
              All figures sourced from official government agencies, Federal
              Reserve data, and industry-standard real estate research.
              Inflation adjustments calculated using BLS CPI. Price-to-income
              ratios calculated as median home price divided by median household
              income for the given year.
            </p>
          </div>

          <div className="space-y-3 mb-12">
            {housingData.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
              >
                <div>
                  <p className="text-sm sm:text-base text-gray-200 group-hover:text-white transition">
                    {source.name}
                  </p>
                  <p className="text-xs text-gray-500">{source.description}</p>
                </div>
                <span className="text-amber-400 text-sm">LINK</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/"
              className="w-full sm:w-auto text-center rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-amber-400 hover:text-amber-300 transition"
            >
              Explore State Budgets -&gt;
            </Link>
            <Link
              href="/social-security"
              className="w-full sm:w-auto text-center rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-amber-400 hover:text-amber-300 transition"
            >
              See Social Security Crisis -&gt;
            </Link>
            <Link
              href="/act"
              className="w-full sm:w-auto text-center rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-black hover:bg-amber-400 transition"
            >
              Join the Movement -&gt;
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3 text-center text-gray-500 text-sm">
            <Image
              src="/brand/logo-horizontal-mono-light.png"
              alt="Catalyst Patriot"
              width={180}
              height={32}
              className="h-6 w-auto"
            />
            <p>Catalyst Patriot - A Catalyst USA Project</p>
            <p className="text-xs text-gray-600">
              1986: {formatCurrency(timelineStart.price)} / {formatCurrency(timelineStart.income)} ({timelineStart.ratio.toFixed(1)}x)
            </p>
            <p className="text-xs text-gray-600">
              2025: {formatCurrency(timelineEnd.price)} / {formatCurrency(timelineEnd.income)} ({timelineEnd.ratio.toFixed(1)}x)
            </p>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}
