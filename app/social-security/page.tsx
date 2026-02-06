"use client";

import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  timeline,
  ratioData,
  keyStats,
  sources,
} from "../data/social-security";

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
      <span className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">
        Scroll
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-gray-600"
      >
        <path
          d="M8 3v10M4 9l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SourceLink({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-500/60 hover:text-amber-400 text-xs transition"
    >
      [{label}]
    </a>
  );
}

export default function SocialSecurityPage() {
  return (
    <div className="bg-black text-white snap-y snap-mandatory h-screen overflow-y-auto">
      {/* Slide 1: Hero */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        {/* Diagonal line SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
        >
          <line
            x1="200"
            y1="800"
            x2="800"
            y2="200"
            stroke="white"
            strokeWidth="2"
            opacity="0.1"
          />
          <circle cx="600" cy="400" r="8" fill="#F59E0B" opacity="0.8" />
        </svg>

        <div className="relative z-10 text-center max-w-3xl">
          <p className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            National Issue &middot; Social Security
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            The program built for{" "}
            <span className="text-amber-500">222,000</span>
            <br />
            now serves{" "}
            <span className="text-amber-500">72.9 million</span>.
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            And it&apos;s running out of money.
          </p>
          <p className="mt-8 text-gray-600 text-sm max-w-xl mx-auto">
            Source-verified data from the Social Security Administration,
            <br />
            2025 Trustees Report, and Congressional Research Service.
          </p>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 2: 1935–1940 — The Origin */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase mb-4">
            1935 &ndash; 1940
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            The Origin Story
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            President Roosevelt signs the Social Security Act. Ida May Fuller
            receives the first monthly check: $22.54.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div>
              <p className="text-5xl sm:text-6xl font-bold text-amber-500">
                222,000
              </p>
              <p className="text-gray-500 text-sm mt-2">beneficiaries</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/10" />
            <div>
              <p className="text-5xl sm:text-6xl font-bold text-white">
                159:1
              </p>
              <p className="text-gray-500 text-sm mt-2">
                workers per beneficiary
              </p>
            </div>
          </div>
          <p className="mt-8 text-gray-700 text-xs">
            <SourceLink
              url="https://www.ssa.gov/history/ratios.html"
              label="SSA Ratio Table"
            />
          </p>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 3: 1945–1965 — Growth Era */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-3xl w-full">
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase mb-4">
            1945 &ndash; 1965
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Rapid Expansion
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Post-war America embraces Social Security. Medicare launches in
            1965. Beneficiaries grow from 1.1 million to 20.2 million.
          </p>

          <div className="w-full max-w-2xl mx-auto h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={ratioData.filter((d) => d.year <= 1965)}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="benefGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#F59E0B"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="#F59E0B"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  stroke="#4B5563"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={{ stroke: "#1F2937" }}
                />
                <YAxis
                  stroke="#4B5563"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={{ stroke: "#1F2937" }}
                  tickFormatter={(v: number) => `${v}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [
                    `${value}M`,
                    "Beneficiaries",
                  ]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="beneficiaries"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fill="url(#benefGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-gray-700 text-xs">
            <SourceLink
              url="https://www.ssa.gov/history/ratios.html"
              label="SSA Ratio Table"
            />
          </p>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 4: 1980–2010 — The Ratio Collapse */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-3xl w-full">
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase mb-4">
            1940 &ndash; 2025
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The Ratio Collapse
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Workers per beneficiary fell from 159:1 to 2.5:1. The math that
            made Social Security work has fundamentally changed.
          </p>

          <div className="w-full max-w-2xl mx-auto h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={ratioData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="ratioGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#F59E0B"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="100%"
                      stopColor="#F59E0B"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  stroke="#4B5563"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={{ stroke: "#1F2937" }}
                />
                <YAxis
                  stroke="#4B5563"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={{ stroke: "#1F2937" }}
                  tickFormatter={(v: number) => `${v}:1`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [
                    `${value}:1`,
                    "Workers per Beneficiary",
                  ]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="ratio"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fill="url(#ratioGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-gray-700 text-xs">
            <SourceLink
              url="https://www.ssa.gov/history/ratios.html"
              label="SSA Ratio Table"
            />
          </p>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 5: Today's Numbers */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl w-full">
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase mb-4">
            2025
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            The Big Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyStats.map((stat) => (
              <div
                key={stat.value}
                className="border border-white/5 rounded-lg p-5 text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-amber-500">
                  {stat.value}
                </p>
                <p className="text-white text-sm mt-2 font-medium">
                  {stat.label}
                </p>
                <p className="text-gray-500 text-xs mt-1">{stat.sublabel}</p>
                <div className="mt-3">
                  <SourceLink url={stat.url} label="source" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 6: The Crisis — 2034 */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <p className="text-red-500/80 text-xs tracking-[0.3em] uppercase mb-4">
            The Clock Is Ticking
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            What Happens If Nothing Changes
          </h2>

          <div className="space-y-8 text-left max-w-lg mx-auto">
            <div className="border-l-2 border-amber-500/40 pl-6">
              <p className="text-amber-500 font-bold text-lg">2033</p>
              <p className="text-gray-300">OASI trust fund depleted</p>
              <p className="text-gray-500 text-sm">
                23% automatic cut to retirement benefits
              </p>
            </div>
            <div className="border-l-2 border-red-500/60 pl-6">
              <p className="text-red-400 font-bold text-lg">2034</p>
              <p className="text-gray-300">Combined trust funds depleted</p>
              <p className="text-gray-500 text-sm">
                19% automatic cut to ALL benefits
              </p>
              <p className="text-gray-500 text-sm">
                A typical retiring couple loses{" "}
                <span className="text-white">$16,500/year</span>
              </p>
            </div>
            <div className="border-l-2 border-white/10 pl-6">
              <p className="text-gray-400 font-bold text-lg">2099</p>
              <p className="text-gray-500">
                Only 72% of scheduled benefits payable
              </p>
            </div>
          </div>

          <div className="mt-12 border border-white/5 rounded-lg p-6 max-w-lg mx-auto">
            <p className="text-gray-400 text-sm mb-3">To fix it today:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-500">29%</p>
                <p className="text-gray-500 text-xs">payroll tax increase</p>
              </div>
              <p className="text-gray-600 self-center">&mdash; OR &mdash;</p>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-500">22%</p>
                <p className="text-gray-500 text-xs">
                  benefit cut for all beneficiaries
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-xs mt-4">
              Every year Congress waits, the fix gets harder.
            </p>
          </div>

          <p className="mt-6 text-gray-700 text-xs">
            Sources:{" "}
            <SourceLink
              url="https://www.ssa.gov/oact/TRSUM/"
              label="2025 Trustees Report"
            />
            {" "}
            <SourceLink
              url="https://www.crfb.org/papers/analysis-2025-social-security-trustees-report"
              label="CRFB"
            />
            {" "}
            <SourceLink
              url="https://www.congress.gov/crs-product/IF13045"
              label="CRS"
            />
          </p>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 7: PBD Perspective */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl">
          <div className="border border-amber-500/20 rounded-xl p-8 sm:p-10 bg-amber-500/5">
            <p className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              Why This Matters Now
            </p>
            <blockquote className="text-xl sm:text-2xl text-gray-200 leading-relaxed">
              &ldquo;In 1945, there were 222,000 people on Social Security with
              42 workers supporting each one. Today, 72.9 million people depend
              on it &mdash; and only 2.5 workers support each
              beneficiary.&rdquo;
            </blockquote>
            <p className="mt-6 text-gray-400">
              The math doesn&apos;t lie. This isn&apos;t a political issue
              &mdash; it&apos;s an arithmetic one.
            </p>
            <a
              href="https://www.youtube.com/watch?v=3GJ0MTVnU0k"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-amber-500 hover:text-amber-400 text-sm font-medium transition"
            >
              Learn more: PBD Podcast discussion
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 8: CTA */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Want to do something about it?
          </h2>
          <p className="text-gray-400 mb-10">
            Join a movement of citizens who demand transparency, accountability,
            and action.
          </p>
          <Link
            href="/act"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-lg text-lg transition"
          >
            Join the Movement
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 9: Sources & Methodology */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase mb-4 text-center">
            Radical Sourcing
          </p>
          <h2 className="text-3xl font-bold mb-10 text-center">
            Sources &amp; Methodology
          </h2>
          <p className="text-gray-400 text-sm mb-8 text-center max-w-lg mx-auto">
            Every figure on this page is sourced from official government
            reports and nonpartisan policy organizations. No spin. No
            editorializing. Just data.
          </p>

          <div className="space-y-3">
            {sources.map((src) => (
              <a
                key={src.url}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-white/5 pb-3 group"
              >
                <span className="text-gray-300 text-sm group-hover:text-white transition">
                  {src.name}
                </span>
                <span className="text-amber-500/50 group-hover:text-amber-400 text-xs transition shrink-0 ml-4">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
