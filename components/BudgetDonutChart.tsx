"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { BudgetCategory } from "../lib/data/types";
import { formatCompactCurrency } from "../lib/data/formatting";

type BudgetDonutChartProps = {
  categories: BudgetCategory[];
  total: number;
  activeCategoryName?: string;
  centerLabel?: string;
  centerValue?: string;
  onSelectCategory: (category: BudgetCategory) => void;
};

type DonutTooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload?: BudgetCategory;
    value?: number;
  }>;
};

function DonutTooltip({ active, payload }: DonutTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const category = payload[0].payload;
  if (!category) {
    return null;
  }

  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/90 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <p className="text-sm font-semibold text-white">{category.name}</p>
      <p className="mt-1 text-gray-300">{formatCompactCurrency(category.amount)}</p>
      <p className="text-gray-400">{category.percentage.toFixed(1)}% of total</p>
    </div>
  );
}

export function BudgetDonutChart({
  categories,
  total,
  activeCategoryName,
  centerLabel,
  centerValue,
  onSelectCategory,
}: BudgetDonutChartProps) {
  const activeIndex = activeCategoryName
    ? categories.findIndex((item) => item.name === activeCategoryName)
    : -1;

  return (
    <div className="w-full" role="img" aria-label="Budget category breakdown">
      <div className="relative h-[350px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={260} minHeight={320}>
          <PieChart>
            <Pie
              data={categories}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={140}
              paddingAngle={2}
              stroke="none"
              onClick={(entry) => {
                const payload = (entry as { payload?: BudgetCategory }).payload;
                if (payload) {
                  onSelectCategory(payload);
                }
              }}
            >
              {categories.map((item, index) => {
                const isMuted =
                  activeIndex >= 0 && index !== activeIndex && activeCategoryName;

                return (
                  <Cell
                    key={item.name}
                    fill={item.color}
                    opacity={isMuted ? 0.35 : 1}
                    stroke="none"
                  />
                );
              })}
            </Pie>
            <Tooltip trigger="click" content={<DonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {centerLabel && centerValue ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="max-w-[11rem] text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{centerLabel}</p>
              <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">{centerValue}</p>
              <p className="mt-1 text-xs text-gray-400">of {formatCompactCurrency(total)}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
