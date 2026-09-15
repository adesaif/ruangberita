import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types";

export const metadata = { title: "Cari Berita" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q?.trim() ?? "";
  const supabase = createClient();

  let articles: Article[] = [];
  if (q) {
    const { data } = await supabase
      .from("articles")
      .select(
        "id, title, slug, excerpt, cover_image_url, published_at, category:categories(id, name, slug)"
      )
      .eq("status", "published")
      .or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,content.ilike.%${q}%`)
      .order("published_at", { ascending: false })
      .limit(24);
    articles = (data ?? []) as unknown as Article[];
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold text-ink">Cari Berita</h1>
      <div className="mb-6 max-w-md">
        <SearchBar />
      </div>

      {q && (
        <p className="mb-4 text-sm text-ink-muted">
          Menampilkan hasil untuk <span className="font-medium text-ink">&ldquo;{q}&rdquo;</span>
        </p>
      )}

      {q && articles.length === 0 && (
        <p className="text-sm text-ink-muted">Tidak ada berita yang cocok.</p>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {articles.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
