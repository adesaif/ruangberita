import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Article, Category, Subcategory } from "@/lib/types";

/**
 * Fungsi-fungsi di file ini dibungkus React `cache()` supaya kalau dipanggil
 * lebih dari sekali dalam satu request yang sama (misalnya dari
 * generateMetadata DAN dari komponen halaman), Next.js hanya benar-benar
 * menjalankan satu query ke Supabase, bukan dua. Ini mengurangi jeda
 * (lag) saat berpindah halaman.
 */

export const getCategoryBySlug = cache(async (slug: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("categories")
    .select("id, name, slug, sort_order")
    .eq("slug", slug)
    .single<Category>();
  return data ?? null;
});

export const getSubcategoryWithCategory = cache(
  async (categorySlug: string, subSlug: string) => {
    const supabase = createClient();
    const { data } = await supabase
      .from("subcategories")
      .select("id, category_id, name, slug, category:categories(id, name, slug)")
      .eq("slug", subSlug)
      .single();

    if (!data) return null;
    const row = data as unknown as Subcategory & { category: Category | null };
    if (!row.category || row.category.slug !== categorySlug) return null;
    return row;
  }
);

export const getArticleBySlug = cache(async (slug: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, content, cover_image_url, published_at, category_id, author_name, share_count, category:categories(id, name, slug)"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single<Article>();
  return data ?? null;
});
