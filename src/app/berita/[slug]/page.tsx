import Image from "next/image";
import { notFound } from "next/navigation";
import NewsGrid from "@/components/NewsGrid";
import { createClient } from "@/lib/supabase/server";
import { getArticleBySlug } from "@/lib/data";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) return { title: "Berita tidak ditemukan" };

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.cover_image_url ? [article.cover_image_url] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) notFound();

  const supabase = createClient();

  // fire-and-forget view counter (best-effort, tidak menahan render)
  void supabase.rpc("increment_view_count", { article_id: article.id }).then(
    () => undefined,
    () => undefined
  );

  const { data: related } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, cover_image_url, published_at, category:categories(id, name, slug)"
    )
    .eq("status", "published")
    .eq("category_id", article.category_id ?? "")
    .neq("id", article.id)
    .order("published_at", { ascending: false })
    .limit(4);

  const paragraphs = article.content.split(/\n{2,}/).filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {article.category?.name && (
        <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {article.category.name}
        </span>
      )}
      <h1 className="mt-3 text-2xl font-bold leading-snug text-ink md:text-3xl">
        {article.title}
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        {formatDate(article.published_at)}
        {article.author_name && (
          <>
            {" · "}
            Oleh <span className="font-medium text-ink">{article.author_name}</span>
          </>
        )}
      </p>

      {article.cover_image_url && (
        <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            sizes="768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {related && related.length > 0 && (
        <div className="-mx-4">
          <NewsGrid title="Berita Terkait" articles={related as unknown as Article[]} />
        </div>
      )}
    </article>
  );
}
