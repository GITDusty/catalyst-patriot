"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type DebtSnapshot = {
  amount: number;
  asOfDate: string;
  previousAmount: number | null;
  previousDate: string | null;
  perSecondEstimate: number;
};

type DebtApiSuccess = {
  data: DebtSnapshot;
  meta: {
    source: string;
  };
};

type DebtApiError = {
  error: {
    code: string;
    message: string;
  };
};

function formatDateLabel(input: string): string {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.valueOf())) {
    return input;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export default function DebtVaultClient() {
  const [snapshot, setSnapshot] = useState<DebtSnapshot | null>(null);
  const [liveAmount, setLiveAmount] = useState<number | null>(null);
  const [sourceLabel, setSourceLabel] = useState("U.S. Treasury Fiscal Data");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    []
  );

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/us-debt", { cache: "no-store" });
        const payload = (await response.json()) as DebtApiSuccess | DebtApiError;

        if (!response.ok || !("data" in payload)) {
          if (!cancelled) {
            const message =
              "error" in payload ? payload.error.message : "Unable to load debt data.";
            setErrorMessage(message);
          }
          return;
        }

        if (!cancelled) {
          setErrorMessage(null);
          setSnapshot(payload.data);
          setLiveAmount(payload.data.amount);
          setSourceLabel(payload.meta.source);
        }
      } catch {
        if (!cancelled) {
          setErrorMessage("Unable to load debt data.");
        }
      }
    };

    void load();
    const pollId = window.setInterval(load, 300_000);

    return () => {
      cancelled = true;
      window.clearInterval(pollId);
    };
  }, []);

  useEffect(() => {
    if (!snapshot || snapshot.perSecondEstimate === 0) {
      return;
    }

    const tickId = window.setInterval(() => {
      setLiveAmount((current) => (current ?? snapshot.amount) + snapshot.perSecondEstimate);
    }, 1_000);

    return () => window.clearInterval(tickId);
  }, [snapshot]);

  const previousDelta =
    snapshot?.previousAmount != null ? snapshot.amount - snapshot.previousAmount : null;
  const previousDeltaPct =
    snapshot?.previousAmount && snapshot.previousAmount > 0 && previousDelta != null
      ? (previousDelta / snapshot.previousAmount) * 100
      : null;
  const formattedAmount = currencyFormatter.format(Math.max(0, Math.round(liveAmount ?? 0)));

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.2),transparent_48%),radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.16),transparent_42%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.16),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-size:70px_70px] [background-image:linear-gradient(to_right,rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.1)_1px,transparent_1px)]" />

      <section className="relative mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        <p className="text-xs font-semibold tracking-[0.24em] text-cyan-300 uppercase">
          Classified Economic Signal
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">The Debt Vault</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Hidden tracker view. Live estimate updates every second, sourced from the U.S. Treasury&apos;s Debt to the
          Penny dataset.
        </p>

        <div className="mt-8 rounded-2xl border border-cyan-400/30 bg-slate-900/70 p-5 shadow-[0_0_40px_rgba(34,211,238,0.2)] backdrop-blur">
          {errorMessage ? (
            <p className="rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </p>
          ) : (
            <>
              <p className="text-xs tracking-[0.16em] text-slate-400 uppercase">Total Public Debt (Estimated)</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-cyan-100 sm:text-5xl">{formattedAmount}</p>
              <p className="mt-2 text-xs text-slate-400">
                As of {snapshot ? formatDateLabel(snapshot.asOfDate) : "Loading..."}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm">
                  <p className="text-xs text-slate-400">Per second (est.)</p>
                  <p className="mt-1 font-semibold text-slate-100">
                    {snapshot
                      ? currencyFormatter.format(Math.max(0, Math.round(snapshot.perSecondEstimate)))
                      : "—"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm">
                  <p className="text-xs text-slate-400">Per minute (est.)</p>
                  <p className="mt-1 font-semibold text-slate-100">
                    {snapshot
                      ? currencyFormatter.format(Math.max(0, Math.round(snapshot.perSecondEstimate * 60)))
                      : "—"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm">
                  <p className="text-xs text-slate-400">From prior report</p>
                  <p
                    className={`mt-1 font-semibold ${
                      (previousDelta ?? 0) >= 0 ? "text-rose-200" : "text-emerald-200"
                    }`}
                  >
                    {previousDelta != null
                      ? `${previousDelta >= 0 ? "+" : ""}${currencyFormatter.format(Math.round(previousDelta))}`
                      : "—"}
                  </p>
                  {previousDeltaPct != null ? (
                    <p className="mt-0.5 text-xs text-slate-400">
                      {previousDeltaPct >= 0 ? "+" : ""}
                      {previousDeltaPct.toFixed(3)}%
                    </p>
                  ) : null}
                </div>
              </div>
            </>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span>{sourceLabel}</span>
            <Link
              href="https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/debt-to-the-penny"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 transition hover:text-cyan-100"
            >
              View source
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 text-sm">
          <Link href="/" className="text-slate-300 transition hover:text-white">
            Return Home
          </Link>
          <span className="text-slate-600">|</span>
          <p className="text-slate-500">Hint: `Shift + D` also opens the floating tracker on any page.</p>
        </div>
      </section>
    </main>
  );
}
