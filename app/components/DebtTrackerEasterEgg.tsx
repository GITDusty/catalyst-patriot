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
    fetchedAt: string;
  };
};

type DebtApiError = {
  error: {
    code: string;
    message: string;
  };
};

const positions = ["bottom-5 left-5", "bottom-5 right-5", "top-24 right-5", "top-24 left-5"] as const;

function formatDateLabel(input: string): string {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.valueOf())) {
    return input;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export default function DebtTrackerEasterEgg() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [positionClass, setPositionClass] = useState<(typeof positions)[number]>("bottom-5 right-5");
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
    const positionIndex = Math.floor(Math.random() * positions.length);
    setPositionClass(positions[positionIndex]);

    const hasSeen = window.localStorage.getItem("debt-easter-egg-seen") === "1";
    const shouldShow = hasSeen || Math.random() < 0.42;
    setVisible(shouldShow);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === "d") {
        setVisible(true);
        setOpen((current) => !current);
        window.localStorage.setItem("debt-easter-egg-seen", "1");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/us-debt", { cache: "no-store" });
        const payload = (await response.json()) as DebtApiSuccess | DebtApiError;

        if (!response.ok) {
          const message =
            "error" in payload ? payload.error.message : "Unable to load live debt data.";
          if (!cancelled) {
            setErrorMessage(message);
          }
          return;
        }

        if (!("data" in payload)) {
          if (!cancelled) {
            setErrorMessage("Unable to load live debt data.");
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
          setErrorMessage("Unable to load live debt data.");
        }
      }
    };

    void load();
    const pollId = window.setInterval(load, 300_000);

    return () => {
      cancelled = true;
      window.clearInterval(pollId);
    };
  }, [visible]);

  useEffect(() => {
    if (!snapshot) {
      return;
    }

    setLiveAmount(snapshot.amount);
    if (snapshot.perSecondEstimate === 0) {
      return;
    }

    const tickId = window.setInterval(() => {
      setLiveAmount((current) => (current ?? snapshot.amount) + snapshot.perSecondEstimate);
    }, 1_000);

    return () => window.clearInterval(tickId);
  }, [snapshot]);

  if (!visible) {
    return null;
  }

  const previousDelta =
    snapshot?.previousAmount != null ? snapshot.amount - snapshot.previousAmount : null;
  const previousDeltaPct =
    snapshot?.previousAmount && snapshot.previousAmount > 0 && previousDelta != null
      ? (previousDelta / snapshot.previousAmount) * 100
      : null;
  const formattedAmount = currencyFormatter.format(Math.max(0, Math.round(liveAmount ?? 0)));

  return (
    <div className={`fixed z-40 ${positionClass}`}>
      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);
          window.localStorage.setItem("debt-easter-egg-seen", "1");
        }}
        aria-label="Toggle U.S. debt tracker"
        className="group h-10 w-10 rounded-full border border-cyan-500/40 bg-black/70 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur transition hover:border-cyan-300 hover:text-cyan-100"
      >
        <span className="text-sm font-bold tracking-wider">US$</span>
      </button>

      {open ? (
        <div className="mt-2 w-[320px] max-w-[86vw] rounded-2xl border border-cyan-500/30 bg-slate-950/95 p-4 text-slate-100 shadow-2xl backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-cyan-300 uppercase">Easter Egg</p>
              <p className="mt-1 text-sm font-semibold">U.S. Debt Tracker</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Close
            </button>
          </div>

          {errorMessage ? (
            <p className="mt-3 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
              {errorMessage}
            </p>
          ) : (
            <>
              <p className="mt-4 text-[11px] text-slate-400">Estimated Total Public Debt</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-cyan-100">{formattedAmount}</p>
              <p className="mt-1 text-[11px] text-slate-400">
                As of {snapshot ? formatDateLabel(snapshot.asOfDate) : "Loading..."}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
                  <p className="text-slate-400">Per minute (est.)</p>
                  <p className="mt-1 font-semibold text-slate-100">
                    {snapshot
                      ? currencyFormatter.format(Math.max(0, Math.round(snapshot.perSecondEstimate * 60)))
                      : "—"}
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
                  <p className="text-slate-400">Since prior report</p>
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
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {previousDeltaPct >= 0 ? "+" : ""}
                      {previousDeltaPct.toFixed(3)}%
                    </p>
                  ) : null}
                </div>
              </div>
            </>
          )}

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>{sourceLabel}</span>
            <div className="flex items-center gap-3">
              <Link href="/debt" className="text-fuchsia-300 transition hover:text-fuchsia-100">
                Vault
              </Link>
              <Link
                href="https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/debt-to-the-penny"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 transition hover:text-cyan-100"
              >
                Source
              </Link>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-slate-500">Tip: press Shift + D to toggle this panel.</p>
        </div>
      ) : null}
    </div>
  );
}
