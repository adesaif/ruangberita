import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";
import { createClient } from "@/lib/supabase/server";
import type { Article, Category, Subcategory } from "@/lib/types";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: article }, { data: categories }, { data: subcategories }] = await Promise.all([
    supabase.from("articles").select("*").eq("id", params.id).single<Article>(),
    supabase.from("categories").select("id, name, slug, sort_order").order("sort_order"),
    supabase.from("subcategories").select("id, category_id, name, slug, sort_order").order("sort_order"),
  ]);

  if (!article) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">Edit Berita</h1>
      <ArticleForm
        categories={(categories ?? []) as Category[]}
        subcategories={(subcategories ?? []) as Subcategory[]}
        initialArticle={article}
      />
    </div>
  );
}
