export const metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Disclaimer</h1>
      <p className="mt-2 text-sm font-medium text-brand">
        Ketentuan dan batasan tanggung jawab
      </p>

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        <p>
          Seluruh informasi yang dipublikasikan di RUANG BERITA disusun berdasarkan
          data dan sumber yang kami anggap kredibel pada saat berita diterbitkan.
          Meski demikian, RUANG BERITA tidak menjamin bahwa seluruh informasi selalu
          bebas dari kekurangan atau perubahan di kemudian hari.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Konten Pihak Ketiga</h2>
        <p>
          RUANG BERITA dapat menyertakan tautan ke situs pihak ketiga. Kami tidak
          bertanggung jawab atas isi, kebijakan privasi, maupun praktik dari situs
          pihak ketiga tersebut.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Komentar Pembaca</h2>
        <p>
          Pendapat yang disampaikan pembaca melalui kolom komentar merupakan tanggung
          jawab masing-masing individu dan tidak mencerminkan pandangan resmi redaksi
          RUANG BERITA.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Koreksi Pemberitaan</h2>
        <p>
          Apabila Anda menemukan kesalahan dalam suatu pemberitaan, silakan sampaikan
          melalui halaman{" "}
          <a href="/kontak" className="font-medium text-brand hover:underline">
            Kontak
          </a>{" "}
          agar dapat kami tindak lanjuti sesuai Pedoman Pemberitaan Media Siber.
        </p>
      </div>
    </div>
  );
}
