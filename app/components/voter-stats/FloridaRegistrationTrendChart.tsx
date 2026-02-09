"use client";

import { useMemo, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  getDomain,
  toIndexed,
  toShare,
} from "@/app/data/voter-stats/florida-trend";
import type {
  FloridaRegistrationTrendChartPoint,
  FloridaTrendSeriesKey,
  FloridaTrendViewMode,
} from "@/app/data/voter-stats/florida-trend";

type FloridaRegistrationTrendChartProps = {
  data: FloridaRegistrationTrendChartPoint[];
  asOfLabel: string;
  twoPartyView: boolean;
  viewMode: FloridaTrendViewMode;
  onViewModeChange: (mode: FloridaTrendViewMode) => void;
};

type TrendRange = "12m" | "24m" | "all";

type TrendSeries = {
  key: FloridaTrendSeriesKey;
  name: string;
  stroke: string;
  fillId: string;
  glow: string;
  activeDotStroke: string;
};

const countFormatter = new Intl.NumberFormat("en-US");
const decimalFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function formatXAxisDate(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.valueOf())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "2-digit",
  }).format(parsed);
}

function formatTooltipDate(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.valueOf())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function formatYAxisCount(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (abs >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k`;
  }

  return countFormatter.format(Math.round(value));
}

function getSeriesValue(point: FloridaRegistrationTrendChartPoint, key: FloridaTrendSeriesKey): number {
  switch (key) {
    case "republican":
      return point.republican;
    case "democratic":
      return point.democratic;
    case "npa":
      return point.npa ?? 0;
    case "minor":
      return point.minor ?? 0;
    case "other":
      return point.other ?? 0;
    default:
      return 0;
  }
}

function getRawValue(point: FloridaRegistrationTrendChartPoint, key: FloridaTrendSeriesKey): number {
  switch (key) {
    case "republican":
      return point.rawRepublican;
    case "democratic":
      return point.rawDemocratic;
    case "npa":
      return point.rawNpa;
    case "minor":
      return point.rawMinor;
    case "other":
      return point.rawOther ?? point.rawNpa + point.rawMinor;
    default:
      return 0;
  }
}

function TrendTooltip({
  active,
  payload,
  label,
  asOfLabel,
  mode,
}: {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
    color?: string;
    dataKey?: string;
    payload?: FloridaRegistrationTrendChartPoint;
  }>;
  label?: string;
  asOfLabel: string;
  mode: FloridaTrendViewMode;
}) {
  if (!active || !payload?.length || !label) {
    return null;
  }

  const point = payload[0]?.payload;
  const total = point?.total ?? 0;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur">
      <p className="text-sm font-bold text-slate-100">{formatTooltipDate(label)}</p>
      <div className="mt-1 space-y-1 text-slate-300">
        {payload
          .filter((entry) => entry.dataKey !== "total")
          .map((entry) => {
            const dataKey = (entry.dataKey ?? "") as FloridaTrendSeriesKey;
            const rawValue = point ? getRawValue(point, dataKey) : 0;
            const displayedValue = point ? getSeriesValue(point, dataKey) : Number(entry.value ?? 0);
            const percent = total > 0 ? (rawValue / total) * 100 : 0;
            const primary =
              mode === "absolute"
                ? countFormatter.format(Math.round(rawValue))
                : mode === "indexed"
                  ? decimalFormatter.format(displayedValue)
                  : `${decimalFormatter.format(displayedValue)}%`;
            const secondary =
              mode === "share"
                ? countFormatter.format(Math.round(rawValue))
                : mode === "indexed"
                  ? `${percent.toFixed(1)}%, ${countFormatter.format(Math.round(rawValue))}`
                  : `${percent.toFixed(1)}%`;

            return (
              <p key={`${entry.dataKey}-${entry.name}`}>
                <span
                  className="mr-2 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color ?? "#94a3b8" }}
                  aria-hidden="true"
                />
                {entry.name}: {primary} ({secondary})
              </p>
            );
          })}
      </div>
      <p className="mt-1 text-[11px] text-slate-400">{asOfLabel}</p>
    </div>
  );
}

export default function FloridaRegistrationTrendChart({
  data,
  asOfLabel,
  twoPartyView,
  viewMode,
  onViewModeChange,
}: FloridaRegistrationTrendChartProps) {
  const [range, setRange] = useState<TrendRange>("all");

  const series = useMemo<TrendSeries[]>(
    () =>
      twoPartyView
        ? [
            {
              key: "republican",
              name: "Republican",
              stroke: "#1f3a5f",
              fillId: "trendRepFill",
              glow: "drop-shadow(0 0 6px rgba(31,58,95,0.45))",
              activeDotStroke: "#dbeafe",
            },
            {
              key: "democratic",
              name: "Democratic",
              stroke: "#5f7ea6",
              fillId: "trendDemFill",
              glow: "drop-shadow(0 0 6px rgba(95,126,166,0.4))",
              activeDotStroke: "#dbeafe",
            },
            {
              key: "other",
              name: "Other (NPA + Minor)",
              stroke: "#c05b67",
              fillId: "trendOtherFill",
              glow: "drop-shadow(0 0 6px rgba(192,91,103,0.35))",
              activeDotStroke: "#fee2e2",
            },
          ]
        : [
            {
              key: "republican",
              name: "Republican",
              stroke: "#1f3a5f",
              fillId: "trendRepFill",
              glow: "drop-shadow(0 0 6px rgba(31,58,95,0.45))",
              activeDotStroke: "#dbeafe",
            },
            {
              key: "democratic",
              name: "Democratic",
              stroke: "#5f7ea6",
              fillId: "trendDemFill",
              glow: "drop-shadow(0 0 6px rgba(95,126,166,0.4))",
              activeDotStroke: "#dbeafe",
            },
            {
              key: "npa",
              name: "No Party Affiliation",
              stroke: "#96a9c4",
              fillId: "trendNpaFill",
              glow: "drop-shadow(0 0 6px rgba(150,169,196,0.35))",
              activeDotStroke: "#e2e8f0",
            },
            {
              key: "minor",
              name: "Minor Parties",
              stroke: "#b24c57",
              fillId: "trendMinorFill",
              glow: "drop-shadow(0 0 6px rgba(178,76,87,0.35))",
              activeDotStroke: "#fee2e2",
            },
          ],
    [twoPartyView]
  );

  const transformedData = useMemo(() => {
    if (viewMode === "indexed") {
      return toIndexed(data);
    }
    if (viewMode === "share") {
      return toShare(data);
    }
    return data;
  }, [data, viewMode]);

  const slicedData = useMemo(() => {
    if (viewMode !== "absolute" || range === "all") {
      return transformedData;
    }

    const sliceCount = range === "12m" ? 12 : 24;
    return transformedData.slice(-Math.min(sliceCount, transformedData.length));
  }, [range, transformedData, viewMode]);

  const yDomain = useMemo<[number, number]>(() => {
    if (viewMode === "share") {
      return [0, 1];
    }

    return getDomain(
      slicedData,
      series.map((item) => item.key),
      viewMode === "indexed" ? 0.08 : 0.06
    );
  }, [series, slicedData, viewMode]);

  const isShare = viewMode === "share";
  const isIndexed = viewMode === "indexed";

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-lg border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
          {([
            { key: "absolute", label: "Absolute" },
            { key: "indexed", label: "Indexed" },
            { key: "share", label: "Share %" },
          ] as const).map((modeOption) => (
            <button
              key={modeOption.key}
              type="button"
              onClick={() => onViewModeChange(modeOption.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                viewMode === modeOption.key
                  ? "bg-[#1f3a5f] text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {modeOption.label}
            </button>
          ))}
        </div>

        {viewMode === "absolute" ? (
          <div className="inline-flex rounded-lg border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
            {([
              { key: "12m", label: "12M" },
              { key: "24m", label: "24M" },
              { key: "all", label: "All" },
            ] as const).map((rangeOption) => (
              <button
                key={rangeOption.key}
                type="button"
                onClick={() => setRange(rangeOption.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  range === rangeOption.key
                    ? "bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {rangeOption.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div
        className="h-[280px] w-full sm:h-[360px]"
        role="img"
        aria-label="Florida voter registration trend chart"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={260} minHeight={260}>
          {isIndexed ? (
            <LineChart data={slicedData} margin={{ top: 6, right: 10, left: -6, bottom: 0 }}>
              <CartesianGrid stroke="rgba(100,116,139,0.24)" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickFormatter={formatXAxisDate}
                tickLine={false}
                axisLine={false}
                minTickGap={24}
              />
              <YAxis
                domain={yDomain}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => decimalFormatter.format(value)}
              />
              <Tooltip
                cursor={{ stroke: "#94a3b8", strokeOpacity: 0.18, strokeWidth: 1 }}
                content={<TrendTooltip asOfLabel={asOfLabel} mode={viewMode} />}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", paddingTop: "4px", lineHeight: "16px" }}
              />
              {series.map((item) => (
                <Line
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  name={item.name}
                  stroke={item.stroke}
                  strokeWidth={2.6}
                  style={{ filter: item.glow }}
                  activeDot={{
                    r: 4,
                    stroke: item.activeDotStroke,
                    strokeWidth: 1.8,
                    fill: item.stroke,
                  }}
                  dot={false}
                />
              ))}
            </LineChart>
          ) : (
            <AreaChart
              data={slicedData}
              margin={{ top: 6, right: 10, left: -6, bottom: 0 }}
              stackOffset={isShare ? "expand" : "none"}
            >
              <defs>
                <linearGradient id="trendRepFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1f3a5f" stopOpacity={0.38} />
                  <stop offset="100%" stopColor="#1f3a5f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="trendDemFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5f7ea6" stopOpacity={0.33} />
                  <stop offset="100%" stopColor="#5f7ea6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="trendNpaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#96a9c4" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#96a9c4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="trendMinorFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b24c57" stopOpacity={0.24} />
                  <stop offset="100%" stopColor="#b24c57" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="trendOtherFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c05b67" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#c05b67" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="rgba(100,116,139,0.24)" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickFormatter={formatXAxisDate}
                tickLine={false}
                axisLine={false}
                minTickGap={24}
              />
              <YAxis
                domain={isShare ? [0, 1] : yDomain}
                ticks={isShare ? [0, 0.25, 0.5, 0.75, 1] : undefined}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) =>
                  isShare ? `${Math.round(value * 100)}%` : formatYAxisCount(value)
                }
              />
              <Tooltip
                cursor={{ stroke: "#94a3b8", strokeOpacity: 0.18, strokeWidth: 1 }}
                content={<TrendTooltip asOfLabel={asOfLabel} mode={viewMode} />}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", paddingTop: "4px", lineHeight: "16px" }}
              />

              {series.map((item) => (
                <Area
                  key={item.key}
                  type="monotone"
                  stackId={isShare ? "share" : undefined}
                  dataKey={item.key}
                  name={item.name}
                  stroke={item.stroke}
                  fill={`url(#${item.fillId})`}
                  strokeWidth={2.4}
                  style={{ filter: item.glow }}
                  activeDot={{
                    r: 4,
                    stroke: item.activeDotStroke,
                    strokeWidth: 1.8,
                    fill: item.stroke,
                  }}
                  dot={false}
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
