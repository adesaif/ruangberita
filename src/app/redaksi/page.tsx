export const metadata = { title: "Redaksi" };

const STRUKTUR = [
  { peran: "Pemimpin Redaksi", desc: "Bertanggung jawab atas keseluruhan isi pemberitaan." },
  { peran: "Redaktur Pelaksana", desc: "Mengoordinasikan tim liputan dan alur penerbitan berita." },
  { peran: "Tim Redaksi", desc: "Menulis, menyunting, dan memverifikasi setiap berita yang terbit." },
  { peran: "Tim IT & Media Digital", desc: "Mengelola platform dan distribusi berita RUANG BERITA." },
];

export default function RedaksiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Redaksi</h1>
      <p className="mt-2 text-sm font-medium text-brand">Susunan tim redaksi Ruang Berita</p>

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        <p>
          RUANG BERITA dikelola oleh tim redaksi yang bekerja mengikuti kaidah
          jurnalistik dan Pedoman Pemberitaan Media Siber. Berikut susunan struktur
          redaksi kami secara umum.
        </p>
      </div>

      <div className="mt-6 flex flex-col divide-y divide-ink/10 rounded-xl border border-ink/10 bg-surface-alt">
        {STRUKTUR.map((s) => (
          <div key={s.peran} className="px-4 py-3">
            <p className="text-sm font-semibold text-ink">{s.peran}</p>
            <p className="mt-1 text-sm text-ink-muted">{s.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        Untuk kepentingan hak jawab, koreksi pemberitaan, atau kerja sama redaksional,
        silakan hubungi kami melalui halaman{" "}
        <a href="/kontak" className="font-medium text-brand hover:underline">
          Kontak
        </a>
        .
      </p>
    </div>
  );
}
