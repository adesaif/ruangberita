import ArticleForm from "@/components/admin/ArticleForm";
import { createClient } from "@/lib/supabase/server";
import type { Category, Subcategory } from "@/lib/types";

export default async function NewArticlePage() {
  const supabase = createClient();
  const [{ data: categories }, { data: subcategories }] = await Promise.all([
    supabase.from("categories").select("id, name, slug, sort_order").order("sort_order"),
    supabase.from("subcategories").select("id, category_id, name, slug, sort_order").order("sort_order"),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">Tambah Berita</h1>
      <ArticleForm
        categories={(categories ?? []) as Category[]}
        subcategories={(subcategories ?? []) as Subcategory[]}
      />
    </div>
  );
}
