import NewsGridSkeleton from "@/components/skeletons/NewsGridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 h-8 w-56 animate-pulse rounded bg-surface-alt" />
      <NewsGridSkeleton rows={8} />
    </div>
  );
}
