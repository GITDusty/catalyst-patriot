"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { BudgetCategory } from "../../data/budget-types";
import { formatCurrency, formatPercent } from "../../utils/formatting";

const CHART_COLORS = [
  "var(--chart-1, #0f766e)",
  "var(--chart-2, #2563eb)",
  "var(--chart-3, #f97316)",
  "var(--chart-4, #14b8a6)",
  "var(--chart-5, #e11d48)",
  "var(--chart-6, #84cc16)",
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
      <div className="relative h-72 w-full sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={2}
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
                    stroke="var(--background, #ffffff)"
                    strokeWidth={2}
                  />
                );
              })}
            </Pie>
            <Tooltip trigger="click" content={<DonutTooltip total={total} />} />
          </PieChart>
        </ResponsiveContainer>
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
