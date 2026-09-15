import CategoryManager from "@/components/admin/CategoryManager";
import { createClient } from "@/lib/supabase/server";
import type { Category, Subcategory } from "@/lib/types";

export default async function AdminCategoryPage() {
  const supabase = createClient();
  const [{ data: categories }, { data: subcategories }] = await Promise.all([
    supabase.from("categories").select("id, name, slug, sort_order").order("sort_order"),
    supabase.from("subcategories").select("id, category_id, name, slug, sort_order").order("sort_order"),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">Kelola Kategori</h1>
      <CategoryManager
        categories={(categories ?? []) as Category[]}
        subcategories={(subcategories ?? []) as Subcategory[]}
      />
    </div>
  );
}
