export const metadata = { title: "Info Iklan" };

const FORMAT_IKLAN = [
  { nama: "Banner Display", desc: "Tampil di halaman beranda, kategori, atau halaman berita." },
  { nama: "Advertorial", desc: "Konten kerja sama yang ditulis dan diterbitkan seperti artikel berita." },
  { nama: "Peliputan Acara", desc: "Dokumentasi dan pemberitaan untuk acara atau kegiatan Anda." },
];

export default function InfoIklanPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Info Iklan</h1>
      <p className="mt-2 text-sm font-medium text-brand">
        Informasi format dan ketentuan iklan
      </p>

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        <p>
          Berikut adalah gambaran umum format kerja sama iklan yang tersedia di
          RUANG BERITA. Tarif dan paket dapat disesuaikan dengan kebutuhan dan durasi
          kampanye Anda.
        </p>
      </div>

      <div className="mt-6 flex flex-col divide-y divide-ink/10 rounded-xl border border-ink/10 bg-surface-alt">
        {FORMAT_IKLAN.map((f) => (
          <div key={f.nama} className="px-4 py-3">
            <p className="text-sm font-semibold text-ink">{f.nama}</p>
            <p className="mt-1 text-sm text-ink-muted">{f.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        Untuk penawaran harga dan proses pemesanan, silakan hubungi kami melalui
        halaman{" "}
        <a href="/pasang-iklan" className="font-medium text-brand hover:underline">
          Pasang Iklan
        </a>{" "}
        atau langsung melalui email{" "}
        <a href="mailto:sobatruang@gmail.com" className="font-medium text-brand hover:underline">
          sobatruang@gmail.com
        </a>
        .
      </p>
    </div>
  );
}
