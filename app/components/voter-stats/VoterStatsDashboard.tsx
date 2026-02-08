"use client";

import { useEffect, useMemo, useState } from "react";

import {
  buildFloridaCompositionData,
} from "@/app/data/voter-stats/florida";
import {
  buildNationalChartData,
  getNationalRows,
} from "@/app/data/voter-stats/national";
import type {
  ApiError,
  FloridaApiResponse,
  NationalApiResponse,
  NationalDemographicDimension,
} from "@/app/data/voter-stats/types";
import CountyExplorer from "./CountyExplorer";
import FloridaCompositionChart from "./FloridaCompositionChart";
import LoadingSkeleton from "./LoadingSkeleton";
import MethodologyPanel from "./MethodologyPanel";
import NationalDemographicChart from "./NationalDemographicChart";

type DashboardState = {
  florida: FloridaApiResponse["data"];
  national: NationalApiResponse["data"];
  refreshedAt: string;
};

function formatTimestamp(input: string): string {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.valueOf())) {
    return input;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

function parseApiError(payload: unknown): string {
  if (typeof payload !== "object" || payload === null) {
    return "Unable to load voter statistics right now.";
  }

  const errorPayload = payload as ApiError;
  return errorPayload.error?.message ?? "Unable to load voter statistics right now.";
}

export default function VoterStatsDashboard() {
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [twoPartyView, setTwoPartyView] = useState(false);
  const [includeIndependent, setIncludeIndependent] = useState(true);
  const [dimension, setDimension] = useState<NationalDemographicDimension>("gender");

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const [flResponse, nationalResponse] = await Promise.all([
        fetch("/api/voter-stats/fl"),
        fetch("/api/voter-stats/national"),
      ]);

      if (!flResponse.ok) {
        setErrorMessage(parseApiError(await flResponse.json()));
        setIsLoading(false);
        return;
      }

      if (!nationalResponse.ok) {
        setErrorMessage(parseApiError(await nationalResponse.json()));
        setIsLoading(false);
        return;
      }

      const flPayload = (await flResponse.json()) as FloridaApiResponse;
      const nationalPayload = (await nationalResponse.json()) as NationalApiResponse;

      const refreshedAt =
        new Date(flPayload.meta.lastRefreshed) > new Date(nationalPayload.meta.lastRefreshed)
          ? flPayload.meta.lastRefreshed
          : nationalPayload.meta.lastRefreshed;

      setDashboard({
        florida: flPayload.data,
        national: nationalPayload.data,
        refreshedAt,
      });
    } catch {
      setErrorMessage("Unable to load voter statistics right now.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const floridaChartData = useMemo(() => {
    if (!dashboard) {
      return [];
    }

    return buildFloridaCompositionData(dashboard.florida, twoPartyView);
  }, [dashboard, twoPartyView]);

  const nationalRows = useMemo(() => {
    if (!dashboard) {
      return [];
    }

    return getNationalRows(dashboard.national, dimension);
  }, [dashboard, dimension]);

  const nationalChartData = useMemo(
    () => buildNationalChartData(nationalRows, includeIndependent),
    [includeIndependent, nationalRows]
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!dashboard || errorMessage) {
    return (
      <section className="rounded-2xl border border-red-300 bg-red-50/80 p-6 text-sm text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
        <p className="font-semibold">Could not load voter data</p>
        <p className="mt-1">{errorMessage ?? "Unknown error"}</p>
        <button
          type="button"
          onClick={() => void fetchData()}
          className="mt-4 rounded-lg border border-red-400 px-3 py-2 text-xs font-semibold transition hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-900/40"
        >
          Retry
        </button>
      </section>
    );
  }

  const methodologySources = [
    dashboard.florida.sourceMeta.partyTotals,
    dashboard.florida.sourceMeta.countyBreakdown,
    dashboard.national.sourceMeta.pewFactSheet,
    dashboard.national.sourceMeta.pewGender,
    dashboard.national.sourceMeta.gallupPartyId,
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-300 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-slate-600 uppercase dark:text-slate-400">
          Civic Intelligence
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
          Voter Statistics
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
          This dashboard separates Florida&apos;s official voter registration records from national survey-based party
          identification. Registration, turnout, and party ID answer different questions and are labeled separately.
        </p>
        <p className="mt-4 inline-flex rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          Last refreshed: {formatTimestamp(dashboard.refreshedAt)}
        </p>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-300 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-600 dark:text-slate-400">
            Florida voter registration (official)
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50">
            Statewide party composition
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            As of {dashboard.florida.sourceMeta.partyTotals.asOfDate}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTwoPartyView(false)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                twoPartyView
                  ? "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                  : "border-[#1f3a5f] bg-[#1f3a5f] text-white"
              }`}
            >
              Full composition
            </button>
            <button
              type="button"
              onClick={() => setTwoPartyView(true)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                twoPartyView
                  ? "border-[#1f3a5f] bg-[#1f3a5f] text-white"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              2-party view
            </button>
          </div>

          <div className="mt-4 grid gap-2 text-xs text-slate-700 dark:text-slate-300 sm:grid-cols-2">
            <p>
              Republican: {new Intl.NumberFormat("en-US").format(dashboard.florida.totals.republican)}
            </p>
            <p>
              Democratic: {new Intl.NumberFormat("en-US").format(dashboard.florida.totals.democratic)}
            </p>
            <p>
              NPA: {new Intl.NumberFormat("en-US").format(dashboard.florida.totals.npa)}
            </p>
            <p>
              Minor parties: {new Intl.NumberFormat("en-US").format(dashboard.florida.totals.minor)}
            </p>
          </div>
        </div>

        <FloridaCompositionChart
          data={floridaChartData}
          asOfDate={dashboard.florida.sourceMeta.partyTotals.asOfDate}
        />
      </section>

      <section className="rounded-3xl border border-slate-300 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
        <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Florida county explorer</h3>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          Sort by party counts, total registration, or party share. Defaults to top 10 counties by total registered
          voters.
        </p>
        <div className="mt-4">
          <CountyExplorer
            counties={dashboard.florida.byCounty}
            asOfDate={dashboard.florida.sourceMeta.countyBreakdown.asOfDate}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-300 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-600 dark:text-slate-400">
          National party identification (survey)
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50">Latest demographic snapshot</h3>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          As of {dashboard.national.sourceMeta.pewGender.asOfDate} (Pew); Gallup context as of {dashboard.national.sourceMeta.gallupPartyId.asOfDate}.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDimension("gender")}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              dimension === "gender"
                ? "border-[#1f3a5f] bg-[#1f3a5f] text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
            }`}
          >
            Gender
          </button>
          <button
            type="button"
            onClick={() => setDimension("age")}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              dimension === "age"
                ? "border-[#1f3a5f] bg-[#1f3a5f] text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
            }`}
          >
            Age group
          </button>

          <button
            type="button"
            onClick={() => setIncludeIndependent((current) => !current)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            {includeIndependent ? "Hide Independents" : "Include Independents"}
          </button>
        </div>

        <div className="mt-4">
          <NationalDemographicChart
            data={nationalChartData}
            asOfDate={dashboard.national.sourceMeta.pewGender.asOfDate}
            includeIndependent={includeIndependent}
          />
        </div>
      </section>

      <MethodologyPanel
        sources={methodologySources}
        notes={[...dashboard.florida.notes, ...dashboard.national.methodNotes]}
      />
    </div>
  );
}
