"use client";

import { useId, useState } from "react";

type SourceIndicatorProps = {
  sourceUrl: string;
  description: string;
  shortLabel?: string;
};

export const SourceIndicator = ({
  sourceUrl,
  description,
  shortLabel = "source",
}: SourceIndicatorProps) => {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  const normalizedUrl = sourceUrl.toLowerCase();
  const isPdf =
    normalizedUrl.includes(".pdf") || normalizedUrl.endsWith("/pdf");

  return (
    <span
      className="group relative inline-flex"
      data-open={open ? "true" : "false"}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        className="ml-1 inline-flex items-center align-super text-[10px] font-medium text-slate-500 transition hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 dark:text-slate-400 dark:hover:text-blue-400"
        aria-label={`Source: ${description}`}
        aria-describedby={tooltipId}
        title={`Source: ${description}`}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
      >
        [{shortLabel}]
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-64 -translate-x-1/2 translate-y-1 rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-[11px] text-slate-700 opacity-0 shadow-lg backdrop-blur transition group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 data-[open=true]:pointer-events-auto data-[open=true]:opacity-100 data-[open=true]:translate-y-0"
      >
        <span className="block font-semibold text-slate-900">Source</span>
        <span className="mt-1 block text-slate-600">{description}</span>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex text-[11px] font-semibold text-blue-600 underline-offset-2 transition hover:underline dark:text-blue-400"
        >
          {isPdf ? "Open PDF" : "Open source"}
        </a>
      </span>
    </span>
  );
};
