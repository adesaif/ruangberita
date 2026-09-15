"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/types";

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

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
        className={`fixed inset-x-0 top-16 z-40 overflow-hidden border-b border-ink/10 bg-surface shadow-lg transition duration-200 ${
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col divide-y divide-ink/5 px-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/kategori/${c.slug}`}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-ink"
            >
              {c.name}
            </Link>
          ))}
          <Link href="/cari" onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-ink">
            Cari Berita
          </Link>
        </nav>
      </div>
    </div>
  );
}
