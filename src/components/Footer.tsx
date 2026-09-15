import Link from "next/link";
import type { Category } from "@/lib/types";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Twitter/X", href: "https://twitter.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export default function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-surface-alt">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <span className="font-serif text-lg font-bold text-ink">RUANG BERITA</span>
          <p className="mt-2 max-w-xs text-sm text-ink-muted">
            Dinamis, Aktual, Kredibel. Portal berita terpercaya untuk informasi
            terkini setiap hari.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-ink">Kategori</h3>
          <ul className="flex flex-col gap-2">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/kategori/${c.slug}`}
                  className="text-sm text-ink-muted transition duration-200 hover:text-brand"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-ink">Ikuti Kami</h3>
          <ul className="flex flex-col gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-muted transition duration-200 hover:text-brand"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10 px-4 py-4 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} RUANG BERITA. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
