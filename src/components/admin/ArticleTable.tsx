"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/types";

export default function ArticleTable({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function toggleStatus(article: Article) {
    setBusyId(article.id);
    const supabase = createClient();
    const nextStatus = article.status === "published" ? "draft" : "published";
    await supabase.from("articles").update({ status: nextStatus }).eq("id", article.id);
    setBusyId(null);
    startTransition(() => router.refresh());
  }

  async function remove(article: Article) {
    if (!confirm(`Hapus berita "${article.title}"?`)) return;
    setBusyId(article.id);
    const supabase = createClient();
    await supabase.from("articles").delete().eq("id", article.id);
    setBusyId(null);
    startTransition(() => router.refresh());
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-surface-alt text-xs uppercase text-ink-muted">
          <tr>
            <th className="px-4 py-3">Judul</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Tanggal</th>
            <th className="px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/5">
          {articles.map((a) => (
            <tr key={a.id} className={isPending && busyId === a.id ? "opacity-50" : ""}>
              <td className="max-w-xs truncate px-4 py-3 font-medium text-ink">{a.title}</td>
              <td className="px-4 py-3 text-ink-muted">{a.category?.name ?? "-"}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => toggleStatus(a)}
                  disabled={busyId === a.id}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    a.status === "published"
                      ? "bg-green-500/10 text-green-600 dark:bg-green-500/15 dark:text-green-400"
                      : "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/15 dark:text-yellow-400"
                  }`}
                >
                  {a.status === "published" ? "Published" : "Draft"}
                </button>
              </td>
              <td className="px-4 py-3 text-ink-muted">{formatDate(a.published_at ?? a.created_at)}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/admin/berita/${a.id}/edit`}
                    className="text-xs font-medium text-brand hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(a)}
                    disabled={busyId === a.id}
                    className="text-xs font-medium text-red-600 hover:underline dark:text-red-400"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
