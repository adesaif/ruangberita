export default function NewsGridSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-ink/10">
          <div className="aspect-[16/10] w-full animate-pulse bg-surface-alt" />
          <div className="flex flex-col gap-2 p-4">
            <div className="h-3.5 w-full animate-pulse rounded bg-surface-alt" />
            <div className="h-3.5 w-3/4 animate-pulse rounded bg-surface-alt" />
            <div className="mt-1 h-3 w-1/3 animate-pulse rounded bg-surface-alt" />
          </div>
        </div>
      ))}
    </div>
  );
}
