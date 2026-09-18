import NewsGridSkeleton from "@/components/skeletons/NewsGridSkeleton";

export default function Loading() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="aspect-[16/9] w-full animate-pulse rounded-2xl bg-surface-alt md:aspect-[21/9]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-5 h-6 w-40 animate-pulse rounded bg-surface-alt" />
        <NewsGridSkeleton rows={8} />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-5 h-6 w-40 animate-pulse rounded bg-surface-alt" />
        <NewsGridSkeleton rows={8} />
      </div>
    </>
  );
}
