export default function Loading() {
  return (
    <div>
      <div className="mb-6 h-7 w-40 animate-pulse rounded bg-surface-alt" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl border border-ink/10 bg-surface p-4" />
        ))}
      </div>

      <div className="mt-8 h-5 w-56 animate-pulse rounded bg-surface-alt" />
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl border border-ink/10 bg-surface p-4" />
        ))}
      </div>
    </div>
  );
}
