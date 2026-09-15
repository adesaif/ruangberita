import type { Article } from "@/lib/types";
import NewsCard from "./NewsCard";

export default function NewsGrid({
  title,
  articles,
  viewAllHref,
}: {
  title: string;
  articles: Article[];
  viewAllHref?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink md:text-xl">
          <span className="h-5 w-1.5 rounded-full bg-brand" />
          {title}
        </h2>
        {viewAllHref && (
          <a href={viewAllHref} className="text-sm font-medium text-brand hover:underline">
            Lihat semua
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {articles.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
