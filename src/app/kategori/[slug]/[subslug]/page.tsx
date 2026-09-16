import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import { createClient } from "@/lib/supabase/server";
import { getSubcategoryWithCategory } from "@/lib/data";
import type { Article } from "@/lib/types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string; subslug: string };
}) {
  const subcategory = await getSubcategoryWithCategory(params.slug, params.subslug);
  return { title: subcategory?.name ?? "Subkategori" };
}

export default async function SubcategoryPage({
  params,
}: {
  params: { slug: string; subslug: string };
}) {
  const subcategory = await getSubcategoryWithCategory(params.slug, params.subslug);

  if (!subcategory || !subcategory.category) notFound();

  const supabase = createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, cover_image_url, published_at, category:categories(id, name, slug)"
    )
    .eq("status", "published")
    .eq("subcategory_id", subcategory.id)
    .order("published_at", { ascending: false })
    .limit(24);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-sm text-ink-muted">{subcategory.category.name}</p>
      <h1 className="mb-6 text-2xl font-bold text-ink">{subcategory.name}</h1>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {(articles as unknown as Article[]).map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-muted">Belum ada berita pada subkategori ini.</p>
      )}
    </div>
  );
}
