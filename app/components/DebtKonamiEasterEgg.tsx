"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
] as const;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || target.isContentEditable;
}

export default function DebtKonamiEasterEgg() {
  const [matchedCount, setMatchedCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [launchCount, setLaunchCount] = useState(0);

  const stars = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 29) % 100}%`,
        delay: `${(index % 8) * 120}ms`,
      })),
    []
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) {
        return;
      }

      const key = event.key.toLowerCase();
      const expected = KONAMI[matchedCount];

      if (key === expected) {
        const next = matchedCount + 1;
        if (next === KONAMI.length) {
          setOpen(true);
          setLaunchCount((count) => count + 1);
          setMatchedCount(0);
          return;
        }
        setMatchedCount(next);
        return;
      }

      setMatchedCount(key === KONAMI[0] ? 1 : 0);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [matchedCount]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/88 px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(244,114,182,0.2),transparent_42%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.2),transparent_45%)]" />
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-cyan-200/70"
            style={{ left: star.left, top: star.top, animationDelay: star.delay }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-xl rounded-3xl border border-cyan-400/40 bg-slate-900/92 p-6 text-white shadow-[0_0_70px_rgba(34,211,238,0.35)] backdrop-blur">
        <p className="text-xs font-semibold tracking-[0.26em] text-cyan-300 uppercase">Hidden Unlock</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Debt Vault Override</h2>
        <p className="mt-3 text-sm text-slate-300">
          Sequence accepted. You found the third easter egg.
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-cyan-100">
            Konami authenticated
          </span>
          <span className="rounded-full border border-fuchsia-300/35 bg-fuchsia-400/10 px-3 py-1 text-fuchsia-100">
            Unlock count: {launchCount}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/debt"
            className="rounded-xl border border-cyan-300/50 bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/25"
          >
            Enter Debt Vault
          </Link>
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "D", shiftKey: true }));
              setOpen(false);
            }}
            className="rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-700"
          >
            Open Floating Tracker
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            Dismiss
          </button>
        </div>

        <p className="mt-5 text-[11px] text-slate-500">
          Cheat code: Up Up Down Down Left Right Left Right B A
        </p>
      </div>
    </div>
  );
}
