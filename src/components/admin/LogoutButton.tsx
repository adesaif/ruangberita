"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition duration-200 hover:bg-red-500/10"
    >
      Keluar
    </button>
  );
}
