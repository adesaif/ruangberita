import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function NewsCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/berita/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-surface transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-alt">
        {article.cover_image_url ? (
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover transition duration-200 group-hover:scale-105"
          />
        ) : null}
        {article.category?.name && (
          <span className="absolute left-2 top-2 rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {article.category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-ink group-hover:text-brand md:text-base">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="line-clamp-2 text-xs text-ink-muted">{article.excerpt}</p>
        )}
        <span className="mt-auto text-[11px] text-ink-muted">{formatDate(article.published_at)}</span>
      </div>
    </Link>
  );
}
