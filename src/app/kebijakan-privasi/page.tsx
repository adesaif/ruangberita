export const metadata = { title: "Kebijakan & Privasi" };

export default function KebijakanPrivasiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Kebijakan &amp; Privasi</h1>
      <p className="mt-2 text-sm font-medium text-brand">
        Kebijakan privasi dan perlindungan data pembaca
      </p>

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        <p>
          RUANG BERITA menghargai privasi setiap pengunjung situs. Kebijakan ini
          menjelaskan bagaimana kami memperlakukan data yang diperoleh saat Anda
          mengakses platform kami.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Informasi yang Kami Kumpulkan</h2>
        <p>
          Kami dapat mengumpulkan data teknis non-pribadi seperti jenis perangkat,
          browser, dan halaman yang dikunjungi untuk keperluan analitik guna
          meningkatkan kualitas layanan. Data pribadi hanya dikumpulkan apabila Anda
          secara sukarela memberikannya, misalnya saat menghubungi redaksi.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Penggunaan Data</h2>
        <p>
          Data yang kami peroleh digunakan semata-mata untuk keperluan operasional
          situs, peningkatan konten, dan komunikasi terkait permintaan Anda. RUANG
          BERITA tidak menjual data pribadi pembaca kepada pihak ketiga mana pun.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Tautan Eksternal</h2>
        <p>
          Situs kami dapat memuat tautan ke situs lain. Kebijakan privasi ini hanya
          berlaku untuk platform RUANG BERITA dan tidak mencakup praktik privasi
          situs pihak ketiga tersebut.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Hubungi Kami</h2>
        <p>
          Jika Anda memiliki pertanyaan terkait kebijakan privasi ini, silakan
          hubungi kami melalui email{" "}
          <a href="mailto:sobatruang@gmail.com" className="font-medium text-brand hover:underline">
            sobatruang@gmail.com
          </a>{" "}
          atau halaman{" "}
          <a href="/kontak" className="font-medium text-brand hover:underline">
            Kontak
          </a>
          .
        </p>
      </div>
    </div>
  );
}
