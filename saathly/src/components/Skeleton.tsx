export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/[0.06] ${className}`}
      aria-hidden
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="page-top pb-20 px-4 max-w-3xl mx-auto space-y-4">
      <Skeleton className="h-40 w-full rounded-2xl" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="page-top px-4 max-w-lg mx-auto space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
