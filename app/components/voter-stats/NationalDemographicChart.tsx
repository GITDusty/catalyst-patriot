"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { NationalChartDatum } from "@/app/data/voter-stats/national";

type NationalDemographicChartProps = {
  data: NationalChartDatum[];
  asOfDate: string;
  includeIndependent: boolean;
};

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

function NationalTooltip({
  active,
  payload,
  label,
  asOfDate,
}: {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
    fill?: string;
  }>;
  label?: string;
  asOfDate: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-950/95">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</p>
      <div className="mt-1 space-y-1">
        {payload.map((entry) => {
          const value = entry.value ?? 0;
          return (
            <p key={entry.name} className="text-slate-700 dark:text-slate-300">
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.fill }}
                aria-hidden="true"
              />
              {entry.name}: {value.toFixed(1)}% ({percentFormatter.format(value / 100)})
            </p>
          );
        })}
      </div>
      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">As of {asOfDate}</p>
    </div>
  );
}

export default function NationalDemographicChart({
  data,
  asOfDate,
  includeIndependent,
}: NationalDemographicChartProps) {
  return (
    <div
      className="h-96 w-full"
      role="img"
      aria-label="National party identification demographic chart"
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={260} minHeight={320}>
        <BarChart
          data={data}
          margin={{
            top: 8,
            right: 16,
            left: 0,
            bottom: 8,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="rgba(100,116,139,0.3)" />
          <XAxis dataKey="group" tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<NationalTooltip asOfDate={asOfDate} />} />
          <Legend />
          <Bar dataKey="democratic" name="Democratic" fill="#5f7ea6" radius={[6, 6, 0, 0]} />
          <Bar dataKey="republican" name="Republican" fill="#1f3a5f" radius={[6, 6, 0, 0]} />
          {includeIndependent ? (
            <Bar
              dataKey="independent"
              name="Independent"
              fill="#b24c57"
              radius={[6, 6, 0, 0]}
            />
          ) : null}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
