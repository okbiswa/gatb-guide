export function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-16 mx-auto mb-2" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-20 mx-auto" />
          </div>
        ))}
      </div>

      {/* Notice skeleton */}
      <div className="h-12 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900" />

      {/* Cards skeleton */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/3" />
            </div>
            <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-full w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
