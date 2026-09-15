"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/cari?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="Cari berita..."
        className={`rounded-full border border-ink/10 bg-surface-alt px-4 py-2 text-sm text-ink outline-none focus:border-brand ${
          compact ? "w-48" : "w-full"
        }`}
      />
    </form>
  );
}
