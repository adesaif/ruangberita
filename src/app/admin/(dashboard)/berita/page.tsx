import Link from "next/link";
import ArticleTable from "@/components/admin/ArticleTable";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types";

export default async function AdminArticleListPage() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, status, published_at, created_at, category:categories(id, name, slug)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Kelola Berita</h1>
        <Link
          href="/admin/berita/baru"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-dark"
        >
          + Tambah Berita
        </Link>
      </div>

      {articles && articles.length > 0 ? (
        <ArticleTable articles={articles as unknown as Article[]} />
      ) : (
        <p className="text-sm text-ink-muted">Belum ada berita.</p>
      )}
    </div>
  );
}
