import type { DatasetMeta } from "@/app/data/voter-stats/types";

type MethodologyPanelProps = {
  sources: DatasetMeta[];
  notes: string[];
};

export default function MethodologyPanel({ sources, notes }: MethodologyPanelProps) {
  return (
    <details className="rounded-2xl border border-slate-300 bg-white/85 p-4 dark:border-slate-800 dark:bg-slate-950/60">
      <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-slate-100">
        Methodology &amp; Sources
      </summary>

      <div className="mt-4 space-y-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Registration counts, turnout rates, and survey-based party identification measure different behaviors. This page keeps
          each measure separate and labels sources explicitly.
        </p>

        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-100/80 dark:bg-slate-900/80">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">
                <th className="px-3 py-2">Dataset</th>
                <th className="px-3 py-2">Publisher</th>
                <th className="px-3 py-2">As of</th>
                <th className="px-3 py-2">Last checked</th>
                <th className="px-3 py-2">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {sources.map((source) => (
                <tr key={source.id}>
                  <td className="px-3 py-2 text-slate-900 dark:text-slate-100">{source.name}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{source.publisher}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{source.asOfDate}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{source.lastChecked}</td>
                  <td className="px-3 py-2">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-700 underline-offset-2 hover:underline dark:text-sky-300"
                    >
                      Source
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}
