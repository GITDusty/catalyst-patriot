"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { FloridaCompositionDatum } from "@/app/data/voter-stats/florida";

type FloridaCompositionChartProps = {
  data: FloridaCompositionDatum[];
  asOfDate: string;
};

type TooltipPayload = {
  payload?: FloridaCompositionDatum;
};

const numberFormatter = new Intl.NumberFormat("en-US");
const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function ChartTooltip({
  active,
  payload,
  asOfDate,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  asOfDate: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const datum = payload[0]?.payload;
  if (!datum) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-950/95">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{datum.label}</p>
      <p className="mt-1 text-slate-700 dark:text-slate-300">
        {numberFormatter.format(datum.value)} ({percentFormatter.format(datum.percent)})
      </p>
      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">As of {asOfDate}</p>
    </div>
  );
}

export default function FloridaCompositionChart({
  data,
  asOfDate,
}: FloridaCompositionChartProps) {
  return (
    <div className="h-80 w-full" role="img" aria-label="Florida voter registration composition chart">
      <ResponsiveContainer width="100%" height="100%" minWidth={260} minHeight={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius="52%"
            outerRadius="84%"
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((item) => (
              <Cell key={item.key} fill={item.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip asOfDate={asOfDate} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
