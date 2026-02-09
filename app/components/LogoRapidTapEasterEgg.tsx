"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const REQUIRED_TAPS = 5;
const WINDOW_MS = 3800;

export default function LogoRapidTapEasterEgg() {
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const logoElement = target.closest("[data-secret-logo='true']");
      if (!logoElement) {
        return;
      }

      const now = Date.now();
      setTapTimes((current) => {
        const next = [...current, now].filter((time) => now - time <= WINDOW_MS);
        if (next.length >= REQUIRED_TAPS) {
          setOpen(true);
          return [];
        }
        return next;
      });
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-emerald-500/45 bg-[#04100b]/95 p-5 shadow-[0_0_45px_rgba(16,185,129,0.28)]">
        <p className="text-[11px] font-semibold tracking-[0.24em] text-emerald-300 uppercase">
          Hidden Console
        </p>
        <h2 className="mt-2 text-2xl font-bold text-emerald-100 sm:text-3xl">Access Terminal</h2>
        <p className="mt-3 text-sm text-emerald-200/90">
          Rapid logo sequence accepted. Routing unlocked.
        </p>

        <div className="mt-4 rounded-xl border border-emerald-400/30 bg-black/45 p-3 font-mono text-xs text-emerald-300">
          <p>&gt; auth.check: PASS</p>
          <p>&gt; route.unlock: /debt</p>
          <p>&gt; beacon.signal: ONLINE</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/debt"
            className="rounded-lg border border-emerald-300/50 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
          >
            Launch Vault
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg border border-emerald-700/60 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:border-emerald-500/70 hover:text-emerald-100"
          >
            Close
          </button>
        </div>

        <p className="mt-4 text-[11px] text-emerald-500/80">
          Hint: tap the top logo 5 times quickly.
        </p>
      </div>
    </div>
  );
}
