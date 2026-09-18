"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { Article, Category, Subcategory } from "@/lib/types";

type Props = {
  categories: Category[];
  subcategories: Subcategory[];
  initialArticle?: Article;
};

export default function ArticleForm({ categories, subcategories, initialArticle }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialArticle);

  const [title, setTitle] = useState(initialArticle?.title ?? "");
  const [slug, setSlug] = useState(initialArticle?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [authorName, setAuthorName] = useState(initialArticle?.author_name ?? "");
  const [content, setContent] = useState(initialArticle?.content ?? "");
  const [categoryId, setCategoryId] = useState(initialArticle?.category_id ?? "");
  const [subcategoryId, setSubcategoryId] = useState(initialArticle?.subcategory_id ?? "");
  const [status, setStatus] = useState<Article["status"]>(initialArticle?.status ?? "draft");
  const [isFeatured, setIsFeatured] = useState(initialArticle?.is_featured ?? false);
  const [isPopular, setIsPopular] = useState(initialArticle?.is_popular ?? false);
  const [coverUrl, setCoverUrl] = useState(initialArticle?.cover_image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  const filteredSubcategories = useMemo(
    () => subcategories.filter((s) => s.category_id === categoryId),
    [subcategories, categoryId]
  );

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.name.split(".").pop()}`;

    const { error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setError("Gagal upload foto: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("article-images").getPublicUrl(path);
    setCoverUrl(data.publicUrl);
    setUploading(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const autoExcerpt = content
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);

    const payload = {
      title,
      slug,
      excerpt: autoExcerpt ? `${autoExcerpt}${content.length > 160 ? "…" : ""}` : null,
      content,
      cover_image_url: coverUrl || null,
      category_id: categoryId || null,
      subcategory_id: subcategoryId || null,
      status,
      is_featured: isFeatured,
      is_popular: isPopular,
      author_id: user?.id ?? null,
      author_name: authorName.trim() || null,
    };

    const result = isEdit
      ? await supabase.from("articles").update(payload).eq("id", initialArticle!.id)
      : await supabase.from("articles").insert(payload);

    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.push("/admin/berita");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-muted">Judul Berita</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-muted">Slug (URL)</label>
        <input
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          className="w-full rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-muted">
          Nama Penulis/Pengedit
        </label>
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="contoh: Ibnu Naufal"
          className="w-full rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-muted">Isi Berita</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          placeholder="Pisahkan paragraf dengan baris kosong"
          className="w-full rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-muted">Kategori</label>
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setSubcategoryId("");
            }}
            className="w-full rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
          >
            <option value="">Pilih kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-ink-muted">Subkategori</label>
          <select
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            disabled={filteredSubcategories.length === 0}
            className="w-full rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand disabled:opacity-50"
          >
            <option value="">Pilih subkategori</option>
            {filteredSubcategories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-muted">Foto Utama</label>
        <input type="file" accept="image/*" onChange={handleUpload} className="text-sm text-ink" />
        {uploading && <p className="mt-1 text-xs text-ink-muted">Mengunggah...</p>}
        {coverUrl && (
          <div className="relative mt-3 aspect-video w-full max-w-sm overflow-hidden rounded-lg">
            <Image src={coverUrl} alt="Preview" fill className="object-cover" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Featured (tampil di Hero Carousel)
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={isPopular}
            onChange={(e) => setIsPopular(e.target.checked)}
          />
          Populer (tampil di Berita Populer)
        </label>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-muted">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Article["status"])}
          className="w-full max-w-xs rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        >
          <option value="draft">Draft</option>
          <option value="published">Publish</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={saving || uploading}
        className="w-fit rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-brand-dark disabled:opacity-60"
      >
        {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Berita"}
      </button>
    </form>
  );
}
