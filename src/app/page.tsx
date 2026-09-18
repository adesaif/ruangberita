import HeroCarousel from "@/components/HeroCarousel";
import NewsGrid from "@/components/NewsGrid";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types";

export const revalidate = 60;

const ARTICLE_SELECT =
  "id, title, slug, excerpt, cover_image_url, published_at, is_featured, is_popular, category:categories(id, name, slug)";

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: featured }, { data: popular }, { data: latest }] = await Promise.all([
    supabase
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("status", "published")
      .eq("is_featured", true)
      .order("published_at", { ascending: false })
      .limit(6),
    supabase
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("status", "published")
      .eq("is_popular", true)
      .order("published_at", { ascending: false })
      .limit(8),
    supabase
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(8),
  ]);

  const heroArticles = (featured?.length ? featured : latest) as unknown as Article[];

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <HeroCarousel articles={(heroArticles ?? []).slice(0, 6)} />
      </div>

      <NewsGrid
        title="Berita Terbaru"
        articles={(latest ?? []) as unknown as Article[]}
        viewAllHref="/berita-terbaru"
      />

      <NewsGrid
        title="Berita Populer"
        articles={(popular ?? []) as unknown as Article[]}
        viewAllHref="/berita-populer"
      />
    </>
  );
}
