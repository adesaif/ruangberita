"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category, Subcategory } from "@/lib/types";

const PINNED_NAMES = ["Politik", "Ekonomi", "Teknologi", "Hukum"];

function pickPinned(categories: Category[]): Category[] {
  const used = new Set<string>();
  const result: Category[] = [];
  for (const target of PINNED_NAMES) {
    const match = categories.find(
      (c) => !used.has(c.id) && c.name.toLowerCase().includes(target.toLowerCase())
    );
    if (match) {
      result.push(match);
      used.add(match.id);
    }
  }
  return result;
}

export default function MobileCategoryBar({
  categories,
  subcategories,
}: {
  categories: Category[];
  subcategories: Subcategory[];
}) {
  const pinned = pickPinned(categories);
  const [openId, setOpenId] = useState<string | null>(null);

  if (pinned.length === 0) return null;

  return (
    <nav className="flex items-stretch gap-1 px-2 pb-2.5 md:hidden">
      {pinned.map((c) => {
        const subs = subcategories.filter((s) => s.category_id === c.id);
        const isOpen = openId === c.id;
        return (
          <div key={c.id} className="relative flex-1">
            <div className="flex items-center justify-center gap-0.5 rounded-full bg-surface-alt/60 transition duration-200 hover:bg-surface-alt">
              <Link
                href={`/kategori/${c.slug}`}
                className="flex-1 truncate py-2 pl-3 text-center text-[13px] font-semibold text-ink transition duration-200"
              >
                {c.name}
              </Link>
              {subs.length > 0 && (
                <button
                  type="button"
                  aria-label={`Buka subkategori ${c.name}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : c.id)}
                  className="py-2 pr-2.5 text-ink-muted"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-3.5 w-3.5 transition-transform duration-300 ease-out ${
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
                className={`absolute left-0 right-0 top-full z-40 grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-1 flex flex-col gap-0.5 rounded-xl border border-ink/10 bg-surface p-1.5 shadow-lg">
                    {subs.map((s) => (
                      <Link
                        key={s.id}
                        href={`/kategori/${c.slug}/${s.slug}`}
                        onClick={() => setOpenId(null)}
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
    </nav>
  );
}
