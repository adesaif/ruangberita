import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types";

export const revalidate = 60;
export const metadata = { title: "Berita Terbaru" };

const PAGE_SIZE = 12;

export default async function BeritaTerbaruPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createClient();
  const { data: articles, count } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, cover_image_url, published_at, category:categories(id, name, slug)",
      { count: "exact" }
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, to);

  const totalPages = count ? Math.max(1, Math.ceil(count / PAGE_SIZE)) : 1;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-ink md:text-3xl">Berita Terbaru</h1>

      {(!articles || articles.length === 0) && (
        <p className="text-sm text-ink-muted">Belum ada berita.</p>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {(articles ?? []).map((a) => (
          <NewsCard key={a.id} article={a as unknown as Article} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/berita-terbaru?page=${page - 1}`}
              className="rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition duration-200 hover:bg-surface-alt"
            >
              ← Sebelumnya
            </Link>
          )}
          <span className="px-3 text-sm text-ink-muted">
            Halaman {page} dari {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/berita-terbaru?page=${page + 1}`}
              className="rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition duration-200 hover:bg-surface-alt"
            >
              Selanjutnya →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
