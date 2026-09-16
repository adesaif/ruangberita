"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category, Subcategory } from "@/lib/types";

export default function MobileMenu({
  categories,
  subcategories,
}: {
  categories: Category[];
  subcategories: Subcategory[];
}) {
  const [open, setOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  function closeAll() {
    setOpen(false);
    setOpenCategoryId(null);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Buka menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-ink/10 active:scale-95"
      >
        <span
          className={`block h-0.5 w-4 bg-ink transition duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-4 bg-ink transition duration-200 ${open ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`block h-0.5 w-4 bg-ink transition duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      <div
        className={`fixed inset-x-0 top-16 z-40 overflow-hidden border-b border-ink/10 bg-surface shadow-lg transition-all duration-300 ease-out ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex max-h-[80vh] flex-col divide-y divide-ink/5 overflow-y-auto px-4">
          {categories.map((c) => {
            const subs = subcategories.filter((s) => s.category_id === c.id);
            const isOpen = openCategoryId === c.id;
            return (
              <div key={c.id}>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/kategori/${c.slug}`}
                    onClick={closeAll}
                    className="flex-1 py-3 text-sm font-medium text-ink"
                  >
                    {c.name}
                  </Link>
                  {subs.length > 0 && (
                    <button
                      type="button"
                      aria-label={`Buka subkategori ${c.name}`}
                      aria-expanded={isOpen}
                      onClick={() => setOpenCategoryId(isOpen ? null : c.id)}
                      className="px-2 py-3 text-ink-muted"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 transition-transform duration-300 ease-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {subs.length > 0 && (
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mb-2 flex flex-col gap-0.5 pl-3">
                        {subs.map((s) => (
                          <Link
                            key={s.id}
                            href={`/kategori/${c.slug}/${s.slug}`}
                            onClick={closeAll}
                            className="rounded-lg px-3 py-2 text-xs font-medium text-ink-muted transition duration-200 hover:bg-surface-alt hover:text-brand"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <Link href="/cari" onClick={closeAll} className="py-3 text-sm font-medium text-ink">
            Cari Berita
          </Link>
        </nav>
      </div>
    </div>
  );
}
