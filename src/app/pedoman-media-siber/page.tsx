export const metadata = { title: "Pedoman Media Siber" };

export default function PedomanMediaSiberPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Pedoman Media Siber</h1>
      <p className="mt-2 text-sm font-medium text-brand">
        Standar etika jurnalistik yang kami pegang
      </p>

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        <p>
          RUANG BERITA berpedoman pada Pedoman Pemberitaan Media Siber yang ditetapkan
          oleh Dewan Pers sebagai acuan dalam setiap proses peliputan, penulisan, dan
          publikasi berita di platform kami.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">1. Verifikasi dan Keberimbangan</h2>
        <p>
          Setiap berita yang kami terbitkan diupayakan melalui proses verifikasi
          terhadap sumber informasi dan disajikan secara berimbang, kecuali untuk berita
          yang menyangkut kepentingan publik yang sifatnya mendesak dan tetap disertai
          keterangan bahwa berita tersebut masih dalam proses konfirmasi.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">2. Isi Buatan Pengguna</h2>
        <p>
          Untuk kolom komentar atau isi yang berasal dari pengguna, redaksi berhak
          menyunting atau menghapus isi yang bertentangan dengan Pedoman Pemberitaan
          Media Siber, seperti ujaran kebencian, fitnah, dan konten yang melanggar
          hukum yang berlaku.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">3. Ralat, Koreksi, dan Hak Jawab</h2>
        <p>
          Kami memberikan ruang koreksi apabila terdapat kesalahan dalam pemberitaan,
          serta membuka hak jawab bagi pihak yang merasa dirugikan atas suatu
          pemberitaan. Permohonan koreksi dan hak jawab dapat disampaikan melalui
          halaman{" "}
          <a href="/kontak" className="font-medium text-brand hover:underline">
            Kontak
          </a>{" "}
          kami.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">4. Pencabutan Berita</h2>
        <p>
          Berita yang telah dipublikasikan hanya dapat dicabut apabila menyangkut
          masalah SARA, kesusilaan, keselamatan seseorang, atau berdasarkan alasan lain
          sesuai ketentuan perundang-undangan yang berlaku.
        </p>
      </div>
    </div>
  );
}
