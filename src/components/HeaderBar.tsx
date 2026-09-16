"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import MobileCategoryBar from "./MobileCategoryBar";
import type { Category, Subcategory } from "@/lib/types";

function SearchIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function HeaderBar({
  categories,
  subcategories,
}: {
  categories: Category[];
  subcategories: Subcategory[];
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/cari?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
    setQ("");
  }

  return (
    <header className="sticky top-0 z-50 bg-surface">
      <div className="relative">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
          <Logo />

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Cari berita"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-ink transition duration-200 hover:bg-surface-alt active:scale-95 ${
                searchOpen ? "bg-surface-alt text-brand" : ""
              }`}
            >
              <SearchIcon />
            </button>
            <ThemeToggle />
            <MobileMenu categories={categories} subcategories={subcategories} />
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            searchOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 pb-4">
              <form
                onSubmit={submitSearch}
                className="flex items-center gap-2 rounded-full border border-brand/60 bg-surface px-4 py-2.5 transition duration-200 focus-within:border-brand"
              >
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  type="search"
                  placeholder="Apa yang kamu cari?"
                  autoFocus={searchOpen}
                  className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                />
                <button
                  type="submit"
                  aria-label="Cari"
                  className="flex h-7 w-7 shrink-0 items-center justify-center text-brand"
                >
                  <SearchIcon className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <nav className="mx-auto hidden max-w-6xl items-center gap-6 px-4 pb-3 md:flex">
          {categories.slice(0, 6).map((c) => {
            const hasSubs = subcategories.some((s) => s.category_id === c.id);
            return (
              <Link
                key={c.id}
                href={`/kategori/${c.slug}`}
                className="inline-flex items-center gap-0.5 text-sm font-semibold text-ink-muted transition duration-200 hover:text-brand"
              >
                {c.name}
                {hasSubs && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <MobileCategoryBar categories={categories} subcategories={subcategories} />

      <div
        className="pointer-events-none absolute inset-x-0 top-full h-6 bg-gradient-to-b from-black/[0.06] to-transparent dark:from-black/30"
        aria-hidden="true"
      />
    </header>
  );
}
