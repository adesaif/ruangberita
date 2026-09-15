import Link from "next/link";
import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import { createClient } from "@/lib/supabase/server";
import type { Article, Category, Subcategory } from "@/lib/types";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("name")
    .eq("slug", params.slug)
    .single();

  return { title: category?.name ?? "Kategori" };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("id, name, slug, sort_order")
    .eq("slug", params.slug)
    .single<Category>();

  if (!category) notFound();

  const [{ data: subcategories }, { data: articles }] = await Promise.all([
    supabase
      .from("subcategories")
      .select("id, category_id, name, slug, sort_order")
      .eq("category_id", category.id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("articles")
      .select(
        "id, title, slug, excerpt, cover_image_url, published_at, category:categories(id, name, slug)"
      )
      .eq("status", "published")
      .eq("category_id", category.id)
      .order("published_at", { ascending: false })
      .limit(24),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-ink">{category.name}</h1>

      {subcategories && subcategories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {(subcategories as Subcategory[]).map((s) => (
            <Link
              key={s.id}
              href={`/kategori/${category.slug}/${s.slug}`}
              className="rounded-full border border-ink/10 px-3 py-1.5 text-xs font-medium text-ink-muted transition duration-200 hover:border-brand hover:text-brand"
            >
              {s.name}
            </Link>
          ))}
        </div>
      )}

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {(articles as unknown as Article[]).map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-muted">Belum ada berita pada kategori ini.</p>
      )}
    </div>
  );
}
