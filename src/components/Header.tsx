import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import type { Category } from "@/lib/types";

export default function Header({ categories }: { categories: Category[] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {categories.slice(0, 6).map((c) => (
            <Link
              key={c.id}
              href={`/kategori/${c.slug}`}
              className="text-sm font-medium text-ink-muted transition duration-200 hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <SearchBar compact />
          </div>
          <ThemeToggle />
          <MobileMenu categories={categories} />
        </div>
      </div>
    </header>
  );
}
