"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const AUTOPLAY_MS = 3000;

export default function HeroCarousel({ articles }: { articles: Article[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (i: number) => setIndex((i + articles.length) % articles.length),
    [articles.length]
  );

  useEffect(() => {
    if (articles.length <= 1 || !playing) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % articles.length), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [articles.length, playing]);

  if (articles.length === 0) return null;

  return (
    <section className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl md:aspect-[21/9]">
      {articles.map((article, i) => (
        <Link
          key={article.id}
          href={`/berita/${article.slug}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-carousel ease-out ${
            i === index ? "opacity-100 z-10" : "pointer-events-none opacity-0 z-0"
          }`}
        >
          {article.cover_image_url ? (
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-surface-alt" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
            {article.category?.name && (
              <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {article.category.name}
              </span>
            )}
            <h2 className="mt-3 max-w-3xl text-xl font-bold leading-snug text-white md:text-3xl">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-white/70">{formatDate(article.published_at)}</p>
          </div>
        </Link>
      ))}

      {articles.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 md:bottom-6 md:right-6">
          <button
            type="button"
            aria-label={playing ? "Hentikan slide otomatis" : "Putar slide otomatis"}
            aria-pressed={!playing}
            onClick={() => setPlaying((p) => !p)}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white transition duration-200 hover:bg-black/60"
          >
            {playing ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4.5v15l13-7.5-13-7.5Z" />
              </svg>
            )}
          </button>

          <div className="flex gap-2">
            {articles.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition duration-200 ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
