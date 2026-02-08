interface ProvenanceBadgeProps {
  status: "Source verified" | "Estimated" | "Pending verification";
  document: string;
  source: string;
  url?: string;
  pageRef?: string;
  notes?: string;
}

const STATUS_STYLES: Record<
  ProvenanceBadgeProps["status"],
  {
    icon: string;
    accentText: string;
    accentBg: string;
    accentBorder: string;
  }
> = {
  "Source verified": {
    icon: "\u2713",
    accentText: "text-emerald-300",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
  },
  Estimated: {
    icon: "\u2248",
    accentText: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
  },
  "Pending verification": {
    icon: "\u25cb",
    accentText: "text-slate-300",
    accentBg: "bg-slate-500/10",
    accentBorder: "border-slate-500/30",
  },
};

export const ProvenanceBadge = ({
  status,
  document,
  source,
  url,
  pageRef,
  notes,
}: ProvenanceBadgeProps) => {
  const style = STATUS_STYLES[status];

  return (
    <div className="provenance-badge rounded-lg border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-medium ${style.accentText} ${style.accentBg} ${style.accentBorder}`}
        >
          <span aria-hidden="true">{style.icon}</span>
          <span>{status}</span>
        </span>
      </div>

      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-gray-500">Document</dt>
          <dd className="text-gray-100">{document}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Source</dt>
          <dd className="text-gray-100">{source}</dd>
        </div>
        {pageRef ? (
          <div>
            <dt className="text-gray-500">Reference</dt>
            <dd className="text-gray-100">{pageRef}</dd>
          </div>
        ) : null}
        {notes ? (
          <div>
            <dt className="text-gray-500">Notes</dt>
            <dd className="text-gray-300">{notes}</dd>
          </div>
        ) : null}
      </dl>

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
        >
          Open verified source {"\u2192"}
        </a>
      ) : (
        <span className="mt-4 inline-flex text-sm text-gray-500">
          Open verified source (link pending)
        </span>
      )}
    </div>
  );
};

export type { ProvenanceBadgeProps };
