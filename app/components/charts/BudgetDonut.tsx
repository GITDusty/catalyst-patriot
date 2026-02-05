"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { BudgetCategory } from "../../data/budget-types";
import { formatCurrency, formatPercent } from "../../utils/formatting";

const CHART_COLORS = [
  "var(--chart-1, #1e293b)",
  "var(--chart-2, #dc2626)",
  "var(--chart-3, #94a3b8)",
  "var(--chart-4, #475569)",
  "var(--chart-5, #f59e0b)",
  "var(--chart-6, #6366f1)",
];

type BudgetDonutProps = {
  data: BudgetCategory[];
  total: number;
  onSelectCategory: (category: BudgetCategory) => void;
  tableId: string;
  activeCategory?: string;
  centerLabel?: string;
  centerValue?: string;
};

type DonutTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
    payload?: BudgetCategory;
  }>;
  total: number;
};

const DonutTooltip = ({ active, payload, total }: DonutTooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  const entry = payload[0];
  const item = entry.payload as BudgetCategory | undefined;
  const value = typeof entry.value === "number" ? entry.value : item?.value ?? 0;
  const percent = total > 0 ? value / total : 0;

  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/90 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <div className="text-sm font-semibold text-white">
        {item?.name ?? entry.name}
      </div>
      <div className="mt-1 flex flex-col gap-1 text-gray-300">
        <span>{formatCurrency(value)}</span>
        <span>{formatPercent(percent)} of total</span>
      </div>
    </div>
  );
};

export const BudgetDonut = ({
  data,
  total,
  onSelectCategory,
  tableId,
  activeCategory,
  centerLabel,
  centerValue,
}: BudgetDonutProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeIndex = activeCategory
    ? data.findIndex((item) => item.name === activeCategory)
    : -1;

  return (
    <div
      className="w-full"
      aria-describedby={tableId}
      aria-label="Budget category breakdown"
      role="img"
    >
      <div className="relative h-[350px] w-full min-w-0">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={260} minHeight={320}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
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
                {data.map((item, index) => {
                  const isMuted =
                    activeIndex >= 0 && index !== activeIndex && activeCategory;

                  return (
                    <Cell
                      key={`${item.name}-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                      opacity={isMuted ? 0.35 : 1}
                      stroke="none"
                    />
                  );
                })}
              </Pie>
              <Tooltip trigger="click" content={<DonutTooltip total={total} />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-xl bg-slate-900/30" />
        )}
        {centerLabel && centerValue ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="max-w-[11rem] text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                {centerLabel}
              </p>
              <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                {centerValue}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
