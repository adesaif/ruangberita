export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-4 h-3 w-40 animate-pulse rounded bg-surface-alt" />
      <div className="h-5 w-24 animate-pulse rounded-full bg-surface-alt" />
      <div className="mt-3 h-7 w-full animate-pulse rounded bg-surface-alt" />
      <div className="mt-2 h-7 w-2/3 animate-pulse rounded bg-surface-alt" />
      <div className="mt-3 h-4 w-48 animate-pulse rounded bg-surface-alt" />

      <div className="mt-4 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-surface-alt" />
        ))}
      </div>

      <div className="mt-6 aspect-video w-full animate-pulse rounded-xl bg-surface-alt" />

      <div className="mt-6 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full animate-pulse rounded bg-surface-alt" />
        ))}
        <div className="h-4 w-2/3 animate-pulse rounded bg-surface-alt" />
      </div>
    </div>
  );
}
