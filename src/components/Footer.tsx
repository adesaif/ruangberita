import Link from "next/link";
import type { Category } from "@/lib/types";

const INFORMASI = [
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Pedoman Media Siber", href: "/pedoman-media-siber" },
  { label: "Redaksi", href: "/redaksi" },
  { label: "Kontak", href: "/kontak" },
  { label: "Pasang Iklan", href: "/pasang-iklan" },
  { label: "Karir", href: "/karir" },
  { label: "Info Iklan", href: "/info-iklan" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Kebijakan & Privasi", href: "/kebijakan-privasi" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ruang.berita",
    icon: (
      <path d="M12 2c-2.716 0-3.056.012-4.123.06-1.065.049-1.79.218-2.427.465a4.9 4.9 0 0 0-1.771 1.153A4.9 4.9 0 0 0 2.525 5.45c-.247.637-.416 1.362-.465 2.427C2.012 8.944 2 9.284 2 12s.012 3.056.06 4.123c.049 1.065.218 1.79.465 2.427a4.9 4.9 0 0 0 1.153 1.771 4.9 4.9 0 0 0 1.771 1.153c.637.247 1.362.416 2.427.465C8.944 21.988 9.284 22 12 22s3.056-.012 4.123-.06c1.065-.049 1.79-.218 2.427-.465a4.9 4.9 0 0 0 1.771-1.153 4.9 4.9 0 0 0 1.153-1.771c.247-.637.416-1.362.465-2.427.048-1.067.06-1.407.06-4.124s-.012-3.056-.06-4.123c-.049-1.065-.218-1.79-.465-2.427a4.9 4.9 0 0 0-1.153-1.771A4.9 4.9 0 0 0 18.55 2.525c-.637-.247-1.362-.416-2.427-.465C15.056 2.012 14.716 2 12 2Zm0 1.802c2.67 0 2.987.01 4.042.059.976.044 1.505.207 1.858.344.467.182.8.399 1.15.748.35.35.566.683.748 1.15.137.353.3.882.344 1.858.048 1.055.059 1.372.059 4.042s-.01 2.987-.059 4.042c-.044.976-.207 1.505-.344 1.858a3.1 3.1 0 0 1-.748 1.15 3.1 3.1 0 0 1-1.15.748c-.353.137-.882.3-1.858.344-1.054.048-1.371.059-4.042.059s-2.987-.01-4.042-.059c-.976-.044-1.505-.207-1.858-.344a3.1 3.1 0 0 1-1.15-.748 3.1 3.1 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.858-.048-1.055-.059-1.372-.059-4.042s.01-2.987.059-4.042c.044-.976.207-1.505.344-1.858.182-.467.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.858-.344 1.055-.048 1.372-.059 4.042-.059Zm0 3.064a5.134 5.134 0 1 0 0 10.268 5.134 5.134 0 0 0 0-10.268Zm0 8.466a3.332 3.332 0 1 1 0-6.664 3.332 3.332 0 0 1 0 6.664Zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Uqn55UDzW/",
    icon: (
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.856.238-1.44 1.465-1.44h1.565V4.47c-.27-.036-1.2-.117-2.28-.117-2.256 0-3.802 1.377-3.802 3.906v2.18H7.99v2.96h2.454V21h3.056Z" />
    ),
  },
  {
    label: "Twitter/X",
    href: "https://x.com/proxydotco",
    icon: (
      <path d="M13.6 10.62 20.24 3h-1.57l-5.77 6.62L8.29 3H3l6.97 10.06L3 21h1.57l6.09-6.99L15.71 21H21l-7.4-10.38Zm-2.16 2.48-.7-1.01L5.14 4.17h2.41l4.53 6.5.7 1.01 5.9 8.45h-2.41l-4.83-6.93Z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@ruang.beritaa",
    icon: (
      <path d="M21.58 7.19a2.75 2.75 0 0 0-1.93-1.95C17.9 4.75 12 4.75 12 4.75s-5.9 0-7.65.49a2.75 2.75 0 0 0-1.93 1.95A28.8 28.8 0 0 0 2 12a28.8 28.8 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.93 1.95c1.75.49 7.65.49 7.65.49s5.9 0 7.65-.49a2.75 2.75 0 0 0 1.93-1.95A28.8 28.8 0 0 0 22 12a28.8 28.8 0 0 0-.42-4.81ZM10 15.2V8.8L15.5 12 10 15.2Z" />
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@ruang.berita",
    icon: (
      <path d="M16.5 11.14c-.09-.05-.19-.09-.28-.13-.17-3.09-1.88-4.86-4.75-4.88-1.68-.01-3.09.63-3.98 1.82l1.38.95c.61-.77 1.5-1.19 2.61-1.19h.02c1.28.01 2.15.55 2.62 1.46-.55-.09-1.15-.12-1.78-.1-2.62.08-4.32 1.55-4.2 3.55.06 1.02.62 1.89 1.55 2.44.79.46 1.8.68 2.86.62 1.4-.08 2.5-.63 3.28-1.62.59-.75.96-1.72 1.11-2.94.63.38 1.09.88 1.35 1.49.44 1.03.47 2.72-.9 4.08-1.2 1.19-2.64 1.71-4.82 1.72-2.42-.02-4.25-.8-5.45-2.3-1.13-1.42-1.71-3.42-1.73-5.95.02-2.53.6-4.53 1.73-5.95 1.2-1.5 3.03-2.27 5.45-2.29 2.44.02 4.3.79 5.53 2.3.6.74 1.05 1.66 1.35 2.72l1.62-.43c-.36-1.29-.92-2.42-1.68-3.35-1.55-1.9-3.83-2.87-6.79-2.9h-.01c-2.95.02-5.2.99-6.7 2.9C4.3 4.9 3.58 7.29 3.55 10.05v.02c.03 2.76.75 5.15 2.15 6.93 1.5 1.91 3.75 2.88 6.7 2.9h.01c2.62-.02 4.47-.7 6-2.24 2.02-2.03 1.96-4.58 1.29-6.14-.48-1.11-1.4-2-2.7-2.58l-.5.2Zm-4.44 4.85c-1.17.07-2.38-.45-2.44-1.55-.04-.82.58-1.73 2.51-1.85.22-.01.44-.02.65-.02.7 0 1.36.07 1.95.2-.22 2.15-1.23 3.13-2.67 3.22Z" />
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ruang.beritaa",
    icon: (
      <path d="M16.6 5.82c-.93-.97-1.45-2.24-1.45-3.57h-3.02v13.7a2.7 2.7 0 0 1-4.86 1.62 2.7 2.7 0 0 1 2.16-4.34c.28 0 .55.04.8.12V10.3a5.72 5.72 0 0 0-.8-.06 5.72 5.72 0 0 0-3.98 9.83A5.72 5.72 0 0 0 15.15 16V9.01a8.63 8.63 0 0 0 5.03 1.61V7.6a5.34 5.34 0 0 1-3.58-1.78Z" />
    ),
  },
];

export default function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-surface-alt">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
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
          <h3 className="mb-3 text-sm font-semibold text-ink">Informasi</h3>
          <ul className="flex flex-col gap-2">
            {INFORMASI.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-muted transition duration-200 hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-ink">Ikuti Kami</h3>
          <ul className="flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink-muted transition duration-200 hover:bg-brand hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-ink/10 px-4 py-4 text-center text-xs text-ink-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} RUANG BERITA. Seluruh hak cipta dilindungi.</span>
        <Link
          href="/admin"
          className="font-medium text-ink-muted underline-offset-2 transition duration-200 hover:text-brand hover:underline"
        >
          Dashboard Admin
        </Link>
      </div>
    </footer>
  );
}
