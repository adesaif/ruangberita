export const metadata = { title: "Karir" };

export default function KarirPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Karir</h1>
      <p className="mt-2 text-sm font-medium text-brand">Bergabung bersama tim Ruang Berita</p>

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        <p>
          RUANG BERITA terus berkembang dan sesekali membuka kesempatan bagi
          individu-individu yang memiliki minat di bidang jurnalistik, penulisan,
          maupun teknologi digital untuk bergabung bersama tim kami.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Posisi yang Kami Cari</h2>
        <p>
          Reporter/jurnalis, editor konten, serta staf media digital adalah beberapa
          posisi yang secara berkala kami butuhkan. Informasi lowongan yang sedang
          dibuka akan diumumkan melalui kanal resmi RUANG BERITA.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Cara Melamar</h2>
        <p>
          Jika Anda tertarik bergabung, silakan kirimkan CV dan portofolio Anda ke
          email{" "}
          <a href="mailto:sobatruang@gmail.com" className="font-medium text-brand hover:underline">
            sobatruang@gmail.com
          </a>{" "}
          dengan subjek sesuai posisi yang diminati. Anda juga dapat menghubungi kami
          melalui telepon/WhatsApp di{" "}
          <a href="tel:085121341372" className="font-medium text-brand hover:underline">
            085121341372
          </a>{" "}
          untuk informasi lebih lanjut.
        </p>
      </div>
    </div>
  );
}
