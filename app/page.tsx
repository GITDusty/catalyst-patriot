"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

import { SourceCard } from "./components/SourceCard";
import type { BudgetCategory } from "./data/budget-types";
import { floridaBudgetData } from "./data/florida-budget";
import { formatCurrency } from "./utils/formatting";

const CHART_COLORS = [
  "#0F172A",
  "#1E293B",
  "#991B1B",
  "#334155",
  "#475569",
  "#0B1020",
];

export default function Home() {
  const { meta, categories } = floridaBudgetData;
  const defaultCategory =
    categories.find((category) =>
      category.name.toLowerCase().includes("health")
    ) ?? categories[0];
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory>(
    defaultCategory
  );
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activeIndex = categories.findIndex(
    (category) => category.name === selectedCategory.name
  );

  const focusedCategory = useMemo(() => {
    if (hoverIndex !== null && categories[hoverIndex]) {
      return categories[hoverIndex];
    }
    return selectedCategory;
  }, [categories, hoverIndex, selectedCategory]);

  const quickStats = [
    {
      label: "Total Budget",
      value: "$116.5B",
    },
    {
      label: "Cost Per Citizen",
      value: "$5,110",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-14">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="col-span-4 lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.8)]">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                Radical Sourcing • {meta.fiscalYear}
              </p>
              <h1 className="serif-display mt-5 text-4xl font-semibold text-white sm:text-5xl">
                Make $116.5B feel massive yet manageable.
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                Catalyst Patriot distills the Florida budget into a premium,
                source-verified intelligence layer you can trust.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="ledger rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  {formatCurrency(meta.totalBudget)}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300">
                  {categories.length} categories tracked
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-4 lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    The Big Donut
                  </p>
                  <h2 className="serif-display mt-3 text-2xl font-semibold text-white">
                    Budget by Category
                  </h2>
                </div>
                <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-100">
                  Active: {selectedCategory.name}
                </span>
              </div>
              <div className="mt-6 h-72 w-full">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={categories}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="62%"
                      outerRadius="88%"
                      paddingAngle={2}
                      activeIndex={hoverIndex ?? activeIndex}
                      activeShape={(props) => {
                        const {
                          cx,
                          cy,
                          innerRadius,
                          outerRadius,
                          startAngle,
                          endAngle,
                          fill,
                        } = props;
                        return (
                          <Sector
                            cx={cx}
                            cy={cy}
                            innerRadius={innerRadius}
                            outerRadius={outerRadius + 8}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            fill={fill}
                          />
                        );
                      }}
                      onMouseEnter={(_, index) => {
                        setHoverIndex(index);
                      }}
                      onMouseLeave={() => {
                        setHoverIndex(null);
                      }}
                      onClick={(entry) => {
                        const payload = (entry as { payload?: BudgetCategory })
                          .payload;
                        if (payload) {
                          setSelectedCategory(payload);
                        }
                      }}
                    >
                      {categories.map((category, index) => {
                        const isMuted = activeIndex !== index;
                        return (
                          <Cell
                            key={category.name}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                            opacity={isMuted ? 0.45 : 1}
                            stroke="rgba(248,250,252,0.1)"
                            strokeWidth={2}
                          />
                        );
                      })}
                    </Pie>
                    <text
                      x="50%"
                      y="46%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-slate-400 text-[10px] font-semibold uppercase tracking-[0.3em]"
                    >
                      {focusedCategory.name}
                    </text>
                    <text
                      x="50%"
                      y="56%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="ledger fill-white text-lg font-semibold"
                    >
                      {formatCurrency(focusedCategory.value)}
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-4 lg:col-span-2">
            <SourceCard category={selectedCategory} />
          </div>

          <div className="col-span-4 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-6 text-slate-100 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.7)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {stat.label}
                  </p>
                  <p className="ledger mt-3 text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Modeled for clarity, updated with verified sources.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
