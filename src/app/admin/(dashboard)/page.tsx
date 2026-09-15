import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const [{ count: total }, { count: published }, { count: draft }, { count: featured }] =
    await Promise.all([
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
    ]);

  const stats = [
    { label: "Total Berita", value: total ?? 0 },
    { label: "Published", value: published ?? 0 },
    { label: "Draft", value: draft ?? 0 },
    { label: "Featured", value: featured ?? 0 },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-ink/10 bg-surface p-4">
            <p className="text-2xl font-bold text-ink">{s.value}</p>
            <p className="text-xs text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
