"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ArticleComment } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Props = {
  articleId: string;
  initialComments: ArticleComment[];
};

const NAME_KEY = "rb_commenter_name";

export default function ArticleComments({ articleId, initialComments }: Props) {
  const [comments, setComments] = useState<ArticleComment[]>(initialComments);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(NAME_KEY);
      if (saved) setName(saved);
    } catch {
      // ignore
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContent = content.trim();

    if (!trimmedName || !trimmedContent) {
      setError("Nama dan komentar wajib diisi.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from("article_comments")
      .insert({ article_id: articleId, name: trimmedName, content: trimmedContent })
      .select("id, article_id, name, content, created_at")
      .single();

    setSubmitting(false);

    if (insertError || !data) {
      setError("Gagal mengirim komentar. Coba lagi sebentar.");
      return;
    }

    try {
      localStorage.setItem(NAME_KEY, trimmedName);
    } catch {
      // ignore
    }

    setComments((prev) => [data as ArticleComment, ...prev]);
    setContent("");
  }

  return (
    <div id="komentar" className="mt-10 border-t border-ink/10 pt-8">
      <h2 className="text-lg font-semibold text-ink">
        Komentar {comments.length > 0 && `(${comments.length})`}
      </h2>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
        {error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:bg-red-500/15 dark:text-red-400">{error}</p>
        )}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
          maxLength={80}
          className="w-full max-w-xs rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis komentar Anda..."
          rows={3}
          maxLength={1000}
          className="w-full rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-fit rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-dark disabled:opacity-60"
        >
          {submitting ? "Mengirim..." : "Kirim Komentar"}
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-4">
        {comments.length === 0 && (
          <p className="text-sm text-ink-muted">Belum ada komentar. Jadilah yang pertama!</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="rounded-xl border border-ink/10 bg-surface-alt px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-ink">{c.name}</span>
              <span className="text-xs text-ink-muted">{formatDate(c.created_at)}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-ink">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
