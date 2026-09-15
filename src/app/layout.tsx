import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RUANG BERITA — Dinamis, Aktual, Kredibel",
    template: "%s | RUANG BERITA",
  },
  description:
    "RUANG BERITA adalah portal berita yang menyajikan informasi terkini, aktual, dan terpercaya seputar nasional, ekonomi, olahraga, teknologi, dan hiburan.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
};

export const revalidate = 60;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let categories: Category[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name, slug, sort_order")
      .order("sort_order", { ascending: true });
    categories = data ?? [];
  } catch {
    categories = [];
  }

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen antialiased">
        <Header categories={categories} />
        <main>{children}</main>
        <Footer categories={categories} />
      </body>
    </html>
  );
}
