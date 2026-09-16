import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: total },
    { count: published },
    { count: draft },
    { count: featured },
    { count: visitorsAllTime },
    { count: visitorsToday },
    { count: visitors7d },
  ] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("is_featured", true),
    supabase.from("page_views").select("id", { count: "exact", head: true }),
    supabase
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .gte("created_at", oneDayAgo),
    supabase
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo),
  ]);

  const articleStats = [
    { label: "Total Berita", value: total ?? 0 },
    { label: "Published", value: published ?? 0 },
    { label: "Draft", value: draft ?? 0 },
    { label: "Featured", value: featured ?? 0 },
  ];

  const visitorStats = [
    { label: "Kunjungan 24 Jam Terakhir", value: visitorsToday ?? 0 },
    { label: "Kunjungan 7 Hari Terakhir", value: visitors7d ?? 0 },
    { label: "Total Kunjungan (Semua Waktu)", value: visitorsAllTime ?? 0 },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {articleStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-ink/10 bg-surface p-4">
            <p className="text-2xl font-bold text-ink">{s.value}</p>
            <p className="text-xs text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-ink-muted">
        Data Pengunjung
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {visitorStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-ink/10 bg-surface p-4">
            <p className="text-2xl font-bold text-ink">{s.value.toLocaleString("id-ID")}</p>
            <p className="text-xs text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-muted">
        Angka ini menghitung jumlah kunjungan halaman (page views), bukan jumlah orang unik.
      </p>
    </div>
  );
}