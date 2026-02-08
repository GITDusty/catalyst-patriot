export default function LoadingSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading voter statistics">
      <div className="h-28 animate-pulse rounded-2xl border border-slate-300/60 bg-slate-200/60 dark:border-slate-800 dark:bg-slate-900/60" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-2xl border border-slate-300/60 bg-slate-200/60 dark:border-slate-800 dark:bg-slate-900/60" />
        <div className="h-80 animate-pulse rounded-2xl border border-slate-300/60 bg-slate-200/60 dark:border-slate-800 dark:bg-slate-900/60" />
      </div>
      <div className="h-96 animate-pulse rounded-2xl border border-slate-300/60 bg-slate-200/60 dark:border-slate-800 dark:bg-slate-900/60" />
    </div>
  );
}
