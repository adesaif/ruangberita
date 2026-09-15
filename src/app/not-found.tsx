import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-brand">404</h1>
      <p className="mt-2 text-ink-muted">Halaman atau berita yang Anda cari tidak ditemukan.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-dark"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
