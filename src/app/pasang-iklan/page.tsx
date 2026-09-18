export const metadata = { title: "Pasang Iklan" };

export default function PasangIklanPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Pasang Iklan</h1>
      <p className="mt-2 text-sm font-medium text-brand">Beriklan bersama Ruang Berita</p>

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        <p>
          RUANG BERITA membuka kesempatan bagi perusahaan, instansi, maupun perorangan
          yang ingin memasang iklan atau menjalin kerja sama promosi di platform kami.
          Dengan pembaca yang tersebar di berbagai kategori berita, iklan Anda dapat
          menjangkau audiens yang tepat.
        </p>
        <p>
          Kami menyediakan beberapa bentuk kerja sama, mulai dari banner iklan,
          konten kerja sama (advertorial), hingga peliputan acara. Untuk rincian
          format dan tarif iklan, silakan kunjungi halaman{" "}
          <a href="/info-iklan" className="font-medium text-brand hover:underline">
            Info Iklan
          </a>
          .
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Cara Memasang Iklan</h2>
        <p>
          Hubungi tim kami melalui email{" "}
          <a href="mailto:sobatruang@gmail.com" className="font-medium text-brand hover:underline">
            sobatruang@gmail.com
          </a>{" "}
          atau telepon/WhatsApp{" "}
          <a href="tel:085121341372" className="font-medium text-brand hover:underline">
            085121341372
          </a>{" "}
          dengan menyertakan jenis iklan, durasi tayang, dan materi yang ingin
          dipublikasikan. Tim kami akan menghubungi Anda kembali untuk proses
          selanjutnya.
        </p>
      </div>
    </div>
  );
}
