"use client";

import { useMemo, useState } from "react";

import { getCountyRanking } from "@/app/data/voter-stats/florida";
import type {
  FloridaCountyRegistration,
  FloridaCountySortKey,
} from "@/app/data/voter-stats/types";

const numberFormatter = new Intl.NumberFormat("en-US");
const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const SORT_OPTIONS: Array<{
  value: FloridaCountySortKey;
  label: string;
}> = [
  { value: "total", label: "Total registered" },
  { value: "republican", label: "Republican count" },
  { value: "democratic", label: "Democratic count" },
  { value: "npa", label: "NPA count" },
  { value: "repShare", label: "Republican share" },
  { value: "demShare", label: "Democratic share" },
];

type CountyExplorerProps = {
  counties: FloridaCountyRegistration[];
  asOfDate: string;
};

export default function CountyExplorer({ counties, asOfDate }: CountyExplorerProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<FloridaCountySortKey>("total");
  const [viewAll, setViewAll] = useState(false);

  const rankedRows = useMemo(
    () =>
      getCountyRanking(counties, {
        query,
        sortKey,
        viewAll,
      }),
    [counties, query, sortKey, viewAll]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
            Search county
          </label>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Miami"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:w-64"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
            Sort by
          </label>
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as FloridaCountySortKey)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white/80 dark:border-slate-800 dark:bg-slate-950/60">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-100/80 dark:bg-slate-900/80">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                <th className="px-3 py-3">County</th>
                <th className="px-3 py-3">Total</th>
                <th className="px-3 py-3">Rep</th>
                <th className="px-3 py-3">Dem</th>
                <th className="px-3 py-3">NPA</th>
                <th className="px-3 py-3">Composition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {rankedRows.map((row) => (
                <tr key={row.county}>
                  <td className="px-3 py-3 font-medium text-slate-900 dark:text-slate-100">{row.county}</td>
                  <td className="px-3 py-3 text-slate-700 dark:text-slate-300">
                    {numberFormatter.format(row.total)}
                  </td>
                  <td className="px-3 py-3 text-slate-700 dark:text-slate-300">
                    {numberFormatter.format(row.republican)} ({percentFormatter.format(row.repShare)})
                  </td>
                  <td className="px-3 py-3 text-slate-700 dark:text-slate-300">
                    {numberFormatter.format(row.democratic)} ({percentFormatter.format(row.demShare)})
                  </td>
                  <td className="px-3 py-3 text-slate-700 dark:text-slate-300">
                    {numberFormatter.format(row.npa)} ({percentFormatter.format(row.npaShare)})
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-2 w-36 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className="flex h-full w-full">
                        <div
                          style={{ width: `${row.repShare * 100}%` }}
                          className="bg-[#1f3a5f]"
                          aria-hidden="true"
                        />
                        <div
                          style={{ width: `${row.demShare * 100}%` }}
                          className="bg-[#5f7ea6]"
                          aria-hidden="true"
                        />
                        <div
                          style={{ width: `${row.npaShare * 100}%` }}
                          className="bg-[#a9b7cc]"
                          aria-hidden="true"
                        />
                        <div
                          style={{ width: `${row.minorShare * 100}%` }}
                          className="bg-[#b24c57]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {query.trim().length === 0 ? (
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>
            Showing {rankedRows.length} {viewAll ? "counties" : "counties (top 10 by current sort)"}. Data as of {asOfDate}.
          </span>
          <button
            type="button"
            onClick={() => setViewAll((current) => !current)}
            className="rounded-lg border border-slate-400 px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            {viewAll ? "Show top 10" : "View all"}
          </button>
        </div>
      ) : (
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Showing {rankedRows.length} matching counties. Data as of {asOfDate}.
        </p>
      )}
    </div>
  );
}
