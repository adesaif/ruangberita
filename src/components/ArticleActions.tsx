"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getVisitorId, isFavorite, toggleFavorite } from "@/lib/visitor";

type Props = {
  articleId: string;
  slug: string;
  title: string;
  initialLikeCount: number;
};

export default function ArticleActions({ articleId, slug, title, initialLikeCount }: Props) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [favorited, setFavorited] = useState(false);
  const [busy, setBusy] = useState(false);
  const [shareNotice, setShareNotice] = useState("");
  const [likeBump, setLikeBump] = useState(0);
  const [favBump, setFavBump] = useState(0);

  useEffect(() => {
    setFavorited(isFavorite(slug));

    const visitorId = getVisitorId();
    if (!visitorId) return;

    const supabase = createClient();
    supabase
      .from("article_likes")
      .select("id")
      .eq("article_id", articleId)
      .eq("visitor_id", visitorId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setLiked(true);
      });
  }, [articleId, slug]);

  async function handleLike() {
    if (busy) return;
    const visitorId = getVisitorId();
    if (!visitorId) return;
    setBusy(true);

    const supabase = createClient();
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
      setLikeBump((b) => b + 1);
      const { error } = await supabase
        .from("article_likes")
        .insert({ article_id: articleId, visitor_id: visitorId });
      if (error) {
        setLiked(false);
        setLikeCount((c) => c - 1);
      }
    } else {
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
      const { error } = await supabase
        .from("article_likes")
        .delete()
        .eq("article_id", articleId)
        .eq("visitor_id", visitorId);
      if (error) {
        setLiked(true);
        setLikeCount((c) => c + 1);
      }
    }
    setBusy(false);
  }

  function handleFavorite() {
    const next = toggleFavorite(slug);
    setFavorited(next);
    if (next) setFavBump((b) => b + 1);
  }

  async function handleShare() {
    const url = `${window.location.origin}/berita/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // pengguna membatalkan share sheet, tidak masalah
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareNotice("Tautan disalin!");
        setTimeout(() => setShareNotice(""), 2000);
      } catch {
        setShareNotice(url);
      }
    }

    const supabase = createClient();
    void supabase.rpc("increment_share_count", { article_id: articleId }).then(
      () => undefined,
      () => undefined
    );
  }

  function scrollToComments() {
    document.getElementById("komentar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="relative mt-4 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleLike}
        aria-pressed={liked}
        className={`flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-sm font-medium transition duration-200 active:scale-95 ${
          liked ? "bg-brand/10 text-brand" : "text-ink hover:bg-surface-alt"
        }`}
      >
        <svg
          key={likeBump}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={liked ? "animate-pop" : ""}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.5s-7.5-4.6-9.8-9.2C.7 8.1 2 4.8 5.2 4c2-.5 4 .3 5.3 2.1a.7.7 0 0 0 1.1 0C13 4.3 15 3.5 17 4c3.2.8 4.5 4.1 3 7.3-2.3 4.6-9.8 9.2-9.8 9.2Z"
          />
        </svg>
        {likeCount > 0 ? likeCount : "Suka"}
      </button>

      <button
        type="button"
        onClick={scrollToComments}
        className="flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition duration-200 hover:bg-surface-alt active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 11.5a8.4 8.4 0 0 1-1.1 4.2L21 20l-4.3-1.1a8.5 8.5 0 1 1 4.3-7.4Z"
          />
        </svg>
        Komentar
      </button>

      <button
        type="button"
        onClick={handleFavorite}
        aria-pressed={favorited}
        className={`flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-sm font-medium transition duration-200 active:scale-95 ${
          favorited ? "bg-brand/10 text-brand" : "text-ink hover:bg-surface-alt"
        }`}
      >
        <svg
          key={favBump}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={favorited ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={favorited ? "animate-pop" : ""}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75h12v17l-6-3.6-6 3.6v-17Z" />
        </svg>
        {favorited ? "Favorit" : "Simpan"}
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition duration-200 hover:bg-surface-alt active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15V4m0 0 3.5 3.5M12 4 8.5 7.5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"
          />
        </svg>
        Bagikan
      </button>

      {shareNotice && (
        <span className="absolute -bottom-6 left-0 text-xs text-ink-muted">{shareNotice}</span>
      )}
    </div>
  );
}
