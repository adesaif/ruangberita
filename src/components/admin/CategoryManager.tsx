"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { Category, Subcategory } from "@/lib/types";

export default function CategoryManager({
  categories,
  subcategories,
}: {
  categories: Category[];
  subcategories: Subcategory[];
}) {
  const router = useRouter();
  const [newCategory, setNewCategory] = useState("");
  const [subName, setSubName] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const [editingSubId, setEditingSubId] = useState<string | null>(null);
  const [editSubName, setEditSubName] = useState("");

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategory.trim()) return;
    const supabase = createClient();
    const { error: err } = await supabase.from("categories").insert({
      name: newCategory.trim(),
      slug: slugify(newCategory),
      sort_order: categories.length + 1,
    });
    if (err) setError(err.message);
    else {
      setNewCategory("");
      router.refresh();
    }
  }

  async function addSubcategory(categoryId: string) {
    const name = subName[categoryId]?.trim();
    if (!name) return;
    const supabase = createClient();
    const count = subcategories.filter((s) => s.category_id === categoryId).length;
    const { error: err } = await supabase.from("subcategories").insert({
      category_id: categoryId,
      name,
      slug: slugify(name),
      sort_order: count + 1,
    });
    if (err) setError(err.message);
    else {
      setSubName((prev) => ({ ...prev, [categoryId]: "" }));
      router.refresh();
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Hapus kategori ini beserta subkategorinya?")) return;
    const supabase = createClient();
    await supabase.from("categories").delete().eq("id", id);
    router.refresh();
  }

  async function deleteSubcategory(id: string) {
    if (!confirm("Hapus subkategori ini?")) return;
    const supabase = createClient();
    await supabase.from("subcategories").delete().eq("id", id);
    router.refresh();
  }

  function startEditCategory(c: Category) {
    setEditingCategoryId(c.id);
    setEditCategoryName(c.name);
  }

  function cancelEditCategory() {
    setEditingCategoryId(null);
    setEditCategoryName("");
  }

  async function saveCategory(id: string) {
    const name = editCategoryName.trim();
    if (!name) return;
    const supabase = createClient();
    const { error: err } = await supabase
      .from("categories")
      .update({ name, slug: slugify(name) })
      .eq("id", id);
    if (err) setError(err.message);
    else {
      setEditingCategoryId(null);
      setEditCategoryName("");
      router.refresh();
    }
  }

  function startEditSub(s: Subcategory) {
    setEditingSubId(s.id);
    setEditSubName(s.name);
  }

  function cancelEditSub() {
    setEditingSubId(null);
    setEditSubName("");
  }

  async function saveSubcategory(id: string) {
    const name = editSubName.trim();
    if (!name) return;
    const supabase = createClient();
    const { error: err } = await supabase
      .from("subcategories")
      .update({ name, slug: slugify(name) })
      .eq("id", id);
    if (err) setError(err.message);
    else {
      setEditingSubId(null);
      setEditSubName("");
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={addCategory} className="flex gap-2">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nama kategori baru"
          className="flex-1 rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-dark"
        >
          Tambah
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {categories.map((c) => (
          <div key={c.id} className="rounded-xl border border-ink/10 bg-surface p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              {editingCategoryId === c.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <input
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    autoFocus
                    className="flex-1 rounded-lg border border-brand bg-surface-alt px-3 py-1.5 text-sm text-ink outline-none"
                  />
                  <button
                    onClick={() => saveCategory(c.id)}
                    className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={cancelEditCategory}
                    className="rounded-lg border border-ink/10 px-3 py-1.5 text-xs font-medium text-ink-muted"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-semibold text-ink">{c.name}</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => startEditCategory(c)}
                      className="text-xs font-medium text-brand hover:underline"
                    >
                      Edit nama
                    </button>
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Hapus kategori
                    </button>
                  </div>
                </>
              )}
            </div>

            <ul className="mb-3 flex flex-wrap gap-2">
              {subcategories
                .filter((s) => s.category_id === c.id)
                .map((s) =>
                  editingSubId === s.id ? (
                    <li
                      key={s.id}
                      className="flex items-center gap-2 rounded-full bg-surface-alt px-2 py-1 text-xs text-ink"
                    >
                      <input
                        value={editSubName}
                        onChange={(e) => setEditSubName(e.target.value)}
                        autoFocus
                        className="w-28 rounded-full border border-brand bg-surface px-2 py-0.5 text-xs text-ink outline-none"
                      />
                      <button
                        onClick={() => saveSubcategory(s.id)}
                        className="font-semibold text-brand"
                        aria-label={`Simpan ${s.name}`}
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelEditSub}
                        className="text-ink-muted"
                        aria-label="Batal"
                      >
                        ×
                      </button>
                    </li>
                  ) : (
                    <li
                      key={s.id}
                      className="flex items-center gap-2 rounded-full bg-surface-alt px-3 py-1 text-xs text-ink"
                    >
                      {s.name}
                      <button
                        onClick={() => startEditSub(s)}
                        className="text-brand"
                        aria-label={`Edit ${s.name}`}
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => deleteSubcategory(s.id)}
                        className="text-red-500"
                        aria-label={`Hapus ${s.name}`}
                      >
                        ×
                      </button>
                    </li>
                  )
                )}
            </ul>

            <div className="flex gap-2">
              <input
                value={subName[c.id] ?? ""}
                onChange={(e) => setSubName((prev) => ({ ...prev, [c.id]: e.target.value }))}
                placeholder="Subkategori baru"
                className="flex-1 rounded-lg border border-ink/10 bg-surface-alt px-3 py-1.5 text-xs text-ink outline-none focus:border-brand"
              />
              <button
                onClick={() => addSubcategory(c.id)}
                className="rounded-lg border border-ink/10 px-3 py-1.5 text-xs font-medium text-ink transition duration-200 hover:border-brand hover:text-brand"
              >
                Tambah
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}