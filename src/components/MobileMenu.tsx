"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import type { Category, Subcategory } from "@/lib/types";

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  home: "m3 11 9-8 9 8M5 10v10h5v-6h4v6h5V10",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  building: "M4 21V6l8-3 8 3v15M4 21h16M9 21v-5h6v5M9 9h.01M15 9h.01M9 13h.01M15 13h.01",
  shieldCheck: "M12 3 4 6v6c0 4.5 3 8 8 9 5-1 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4",
  users: "M17 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 9v-1a4 4 0 0 0-3-3.87M15.5 3.13a4 4 0 0 1 0 7.75",
  phone: "M4 5c0-1 1-2 2-2h2l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v2c0 1-1 2-2 2A16 16 0 0 1 4 5Z",
  megaphone: "M3 11v2a2 2 0 0 0 2 2h1l3 5V6l-3 5H5a2 2 0 0 0-2 2Zm10-6v14l6-3V8l-6-3Z",
  briefcase: "M3 8h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8Zm5 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-9v5m0-8h.01",
  alertTriangle: "M12 3 2 20h20L12 3Zm0 6v5m0 3h.01",
  lock: "M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Zm7 5v2",
  grid: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
  chevronDown: "m6 9 6 6 6-6",
};

const INFO_LINKS = [
  { href: "/tentang-kami", label: "Tentang Kami", icon: ICONS.building },
  { href: "/redaksi", label: "Redaksi", icon: ICONS.users },
  { href: "/kontak", label: "Kontak", icon: ICONS.phone },
  { href: "/pasang-iklan", label: "Pasang Iklan", icon: ICONS.megaphone },
  { href: "/info-iklan", label: "Info Iklan", icon: ICONS.info },
  { href: "/karir", label: "Karir", icon: ICONS.briefcase },
  { href: "/pedoman-media-siber", label: "Pedoman Media Siber", icon: ICONS.shieldCheck },
  { href: "/disclaimer", label: "Disclaimer", icon: ICONS.alertTriangle },
  { href: "/kebijakan-privasi", label: "Kebijakan & Privasi", icon: ICONS.lock },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-6 px-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted first:mt-0">
      {children}
    </p>
  );
}

export default function MobileMenu({
  categories,
  subcategories,
}: {
  categories: Category[];
  subcategories: Subcategory[];
}) {
  const [open, setOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const pathname = usePathname();

  function closeAll() {
    setOpen(false);
    setOpenCategoryId(null);
  }

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  function itemClass(isActive: boolean) {
    return `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ${
      isActive
        ? "bg-brand/10 text-brand"
        : "text-ink hover:bg-surface-alt"
    }`;
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Buka menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-ink/10 active:scale-95"
      >
        <span className="block h-0.5 w-4 bg-ink" />
        <span className="block h-0.5 w-4 bg-ink" />
        <span className="block h-0.5 w-4 bg-ink" />
      </button>

      {/* Backdrop */}
      <div
        onClick={closeAll}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ease-out dark:bg-black/60 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-surface shadow-2xl transition-transform duration-300 ease-out dark:bg-surface-alt dark:shadow-black/50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-ink/10 px-4 py-3.5">
          <Logo />
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={closeAll}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink transition duration-200 hover:bg-surface-alt active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-8 pt-2">
          <SectionLabel>Menu Utama</SectionLabel>
          <div className="flex flex-col gap-0.5">
            <Link href="/" onClick={closeAll} className={itemClass(pathname === "/")}>
              <Icon path={ICONS.home} />
              Beranda
            </Link>
            <Link href="/cari" onClick={closeAll} className={itemClass(pathname === "/cari")}>
              <Icon path={ICONS.search} />
              Cari Berita
            </Link>
          </div>

          <SectionLabel>Kategori</SectionLabel>
          <div className="flex flex-col gap-0.5">
            {categories.map((c) => {
              const subs = subcategories.filter((s) => s.category_id === c.id);
              const hasSubs = subs.length > 0;
              const isOpen = openCategoryId === c.id;
              const isActive = pathname === `/kategori/${c.slug}`;
              return (
                <div key={c.id}>
                  <div className="flex items-center">
                    <Link
                      href={`/kategori/${c.slug}`}
                      onClick={closeAll}
                      className={`${itemClass(isActive)} flex-1`}
                    >
                      <Icon path={ICONS.layers} />
                      {c.name}
                    </Link>
                    {hasSubs && (
                      <button
                        type="button"
                        aria-label={`Buka subkategori ${c.name}`}
                        aria-expanded={isOpen}
                        onClick={() => setOpenCategoryId(isOpen ? null : c.id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center text-ink-muted"
                      >
                        <Icon
                          path={ICONS.chevronDown}
                          className={`h-4 w-4 transition-transform duration-300 ease-out ${
                            isOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSubs && (
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="mb-1 ml-10 flex flex-col gap-0.5 border-l border-ink/10 pl-3">
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
          </div>

          <SectionLabel>Informasi</SectionLabel>
          <div className="flex flex-col gap-0.5">
            {INFO_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeAll}
                className={itemClass(pathname === item.href)}
              >
                <Icon path={item.icon} />
                {item.label}
              </Link>
            ))}
          </div>

          <SectionLabel>Sistem</SectionLabel>
          <div className="flex flex-col gap-0.5">
            <Link href="/admin" onClick={closeAll} className={itemClass(pathname.startsWith("/admin"))}>
              <Icon path={ICONS.grid} />
              Dashboard Admin
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
