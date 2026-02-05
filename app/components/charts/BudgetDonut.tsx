"use client";

import { useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

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
    <div className="rounded-2xl border border-slate-200/70 bg-white/95 px-4 py-3 text-xs shadow-xl backdrop-blur">
      <div className="text-sm font-semibold text-slate-900">
        {item?.name ?? entry.name}
      </div>
      <div className="mt-1 flex flex-col gap-1 text-slate-600">
        <span className="font-semibold text-slate-900">
          {formatCurrency(value)}
        </span>
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
}: BudgetDonutProps) => {
  const activeIndex = activeCategory
    ? data.findIndex((item) => item.name === activeCategory)
    : -1;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const focusedItem = useMemo(() => {
    if (hoverIndex !== null && data[hoverIndex]) {
      return data[hoverIndex];
    }
    if (activeIndex >= 0) {
      return data[activeIndex];
    }
    return null;
  }, [activeIndex, data, hoverIndex]);

  const centerLabel = focusedItem
    ? focusedItem.name
    : "Total Budget";
  const centerValue = focusedItem ? focusedItem.value : total;

  return (
    <div
      className="w-full"
      aria-describedby={tableId}
      aria-label="Budget category breakdown"
      role="img"
    >
      <div className="h-72 w-full min-w-0 sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height={320} minWidth={0} minHeight={0}>
          <PieChart>
            <defs>
              <filter id="donutGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(15,23,42,0.12)" />
                <stop offset="60%" stopColor="rgba(15,23,42,0.05)" />
                <stop offset="100%" stopColor="rgba(15,23,42,0)" />
              </radialGradient>
            </defs>
            <circle cx="50%" cy="50%" r="35%" fill="url(#innerGlow)" />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="58%"
              outerRadius="85%"
              paddingAngle={2}
              activeIndex={hoverIndex ?? activeIndex}
              activeShape={(props) => {
                const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
                  props;
                return (
                  <g>
                    <Sector
                      cx={cx}
                      cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius + 6}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      fill={fill}
                      filter="url(#donutGlow)"
                    />
                  </g>
                );
              }}
              onMouseEnter={(_, index) => {
                setHoverIndex(index);
              }}
              onMouseLeave={() => {
                setHoverIndex(null);
              }}
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
            <text
              x="50%"
              y="46%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-500 text-[10px] font-semibold uppercase tracking-[0.3em]"
            >
              {centerLabel}
            </text>
            <text
              x="50%"
              y="56%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="ledger fill-slate-900 text-lg font-semibold"
            >
              {formatCurrency(centerValue)}
            </text>
            <Tooltip
              trigger="hover"
              content={<DonutTooltip total={total} />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
