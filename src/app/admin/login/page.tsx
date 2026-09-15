"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      setError("Email atau password salah.");
      return;
    }

    const redirectedFrom = searchParams.get("redirectedFrom") ?? "/admin";
    router.push(redirectedFrom);
    router.refresh();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm"
      >
        <h1 className="mb-1 text-xl font-bold text-ink">Masuk Admin</h1>
        <p className="mb-6 text-sm text-ink-muted">RUANG BERITA — panel administrasi</p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <label className="mb-1 block text-xs font-medium text-ink-muted">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />

        <label className="mb-1 block text-xs font-medium text-ink-muted">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border border-ink/10 bg-surface-alt px-3 py-2 text-sm text-ink outline-none focus:border-brand"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-brand-dark disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
