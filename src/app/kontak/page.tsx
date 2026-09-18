export const metadata = { title: "Kontak" };

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Kontak</h1>
      <p className="mt-2 text-sm font-medium text-brand">Hubungi kami</p>

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        <p>
          Punya pertanyaan, kritik, saran, informasi, atau ingin menyampaikan hak
          jawab atas suatu pemberitaan? Tim RUANG BERITA siap membantu melalui kontak
          di bawah ini.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          href="tel:085121341372"
          className="flex flex-col gap-1 rounded-xl border border-ink/10 bg-surface-alt px-4 py-4 transition duration-200 hover:border-brand/40 hover:bg-surface"
        >
          <span className="text-xs font-medium text-ink-muted">Telepon / WhatsApp</span>
          <span className="text-base font-semibold text-ink">085121341372</span>
        </a>
        <a
          href="mailto:sobatruang@gmail.com"
          className="flex flex-col gap-1 rounded-xl border border-ink/10 bg-surface-alt px-4 py-4 transition duration-200 hover:border-brand/40 hover:bg-surface"
        >
          <span className="text-xs font-medium text-ink-muted">Email Redaksi</span>
          <span className="text-base font-semibold text-ink">sobatruang@gmail.com</span>
        </a>
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        Untuk kerja sama iklan, silakan lihat halaman{" "}
        <a href="/pasang-iklan" className="font-medium text-brand hover:underline">
          Pasang Iklan
        </a>
        . Tim kami akan merespons pesan Anda secepat mungkin pada jam kerja.
      </p>
    </div>
  );
}
