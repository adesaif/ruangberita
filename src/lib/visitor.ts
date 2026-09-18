// Id anonim per-browser (bukan akun), dipakai untuk fitur Like dan Favorit
// supaya tombolnya tetap "menyala" saat pengunjung kembali ke berita yang sama.

const VISITOR_KEY = "rb_visitor_id";

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

const FAVORITES_KEY = "rb_favorites";

export function getFavoriteSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function isFavorite(slug: string): boolean {
  return getFavoriteSlugs().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const current = getFavoriteSlugs();
  const exists = current.includes(slug);
  const next = exists ? current.filter((s) => s !== slug) : [...current, slug];
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  } catch {
    // ignore storage errors (private browsing, dll.)
  }
  return !exists;
}
