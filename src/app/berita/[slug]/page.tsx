import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsGrid from "@/components/NewsGrid";
import ArticleActions from "@/components/ArticleActions";
import ArticleComments from "@/components/ArticleComments";
import { createClient } from "@/lib/supabase/server";
import { getArticleBySlug } from "@/lib/data";
import type { Article, ArticleComment } from "@/lib/types";
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

  const publishedAt = article.published_at ?? new Date().toISOString();

  const [
    { data: related },
    { count: likeCount },
    { data: comments },
    { data: prevArticle },
    { data: nextArticle },
  ] = await Promise.all([
    supabase
      .from("articles")
      .select(
        "id, title, slug, excerpt, cover_image_url, published_at, category:categories(id, name, slug)"
      )
      .eq("status", "published")
      .eq("category_id", article.category_id ?? "")
      .neq("id", article.id)
      .order("published_at", { ascending: false })
      .limit(4),
    supabase
      .from("article_likes")
      .select("id", { count: "exact", head: true })
      .eq("article_id", article.id),
    supabase
      .from("article_comments")
      .select("id, article_id, name, content, created_at")
      .eq("article_id", article.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("articles")
      .select("title, slug")
      .eq("status", "published")
      .lt("published_at", publishedAt)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("articles")
      .select("title, slug")
      .eq("status", "published")
      .gt("published_at", publishedAt)
      .order("published_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  const paragraphs = article.content.split(/\n{2,}/).filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-ink-muted">
        <Link href="/" className="transition duration-200 hover:text-brand">
          Beranda
        </Link>
        {article.category?.name && (
          <>
            <span>/</span>
            <Link
              href={`/kategori/${article.category.slug}`}
              className="transition duration-200 hover:text-brand"
            >
              {article.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="truncate text-ink-muted/70">{article.title}</span>
      </nav>

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

      <ArticleActions
        articleId={article.id}
        slug={article.slug}
        title={article.title}
        initialLikeCount={likeCount ?? 0}
      />

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

      {(prevArticle || nextArticle) && (
        <div className="mt-8 grid gap-3 border-t border-ink/10 pt-6 sm:grid-cols-2">
          {prevArticle ? (
            <Link
              href={`/berita/${prevArticle.slug}`}
              className="flex flex-col gap-1 rounded-xl border border-ink/10 bg-surface-alt px-4 py-3 transition duration-200 hover:border-brand/40"
            >
              <span className="text-xs font-medium text-ink-muted">← Berita Sebelumnya</span>
              <span className="line-clamp-2 text-sm font-semibold text-ink">
                {prevArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <Link
              href={`/berita/${nextArticle.slug}`}
              className="flex flex-col gap-1 rounded-xl border border-ink/10 bg-surface-alt px-4 py-3 text-right transition duration-200 hover:border-brand/40 sm:items-end"
            >
              <span className="text-xs font-medium text-ink-muted">Berita Selanjutnya →</span>
              <span className="line-clamp-2 text-sm font-semibold text-ink">
                {nextArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}

      <ArticleComments
        articleId={article.id}
        initialComments={(comments ?? []) as ArticleComment[]}
      />

      {related && related.length > 0 && (
        <div className="-mx-4">
          <NewsGrid title="Berita Terkait" articles={related as unknown as Article[]} />
        </div>
      )}
    </article>
  );
}
