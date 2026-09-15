import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/berita", label: "Berita" },
  { href: "/admin/berita/baru", label: "Tambah Berita" },
  { href: "/admin/kategori", label: "Kategori" },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
      <aside className="hidden w-52 shrink-0 md:block">
        <nav className="sticky top-24 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition duration-200 hover:bg-surface-alt hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 border-t border-ink/10 pt-4">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-ink/10 px-3 py-1.5 text-xs font-medium text-ink-muted"
            >
              {item.label}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
