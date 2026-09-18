export const metadata = { title: "Tentang Kami" };

export default function TentangKamiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Tentang Kami</h1>
      <p className="mt-2 text-sm font-medium text-brand">Kenali lebih dekat Ruang Berita</p>

      <div className="prose-article mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
        <p>
          RUANG BERITA adalah portal media daring yang menghadirkan informasi seputar
          peristiwa terkini secara dinamis, aktual, dan kredibel. Kami percaya bahwa
          setiap orang berhak mendapatkan akses informasi yang akurat, mudah dipahami,
          dan disajikan tepat waktu.
        </p>
        <p>
          Sejak awal berdiri, RUANG BERITA berkomitmen untuk menjadi ruang publik yang
          sehat bagi pembacanya — tempat berbagai peristiwa nasional maupun daerah
          diliput dan diberitakan dengan mengutamakan keberimbangan, verifikasi fakta,
          dan tanggung jawab jurnalistik.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Visi</h2>
        <p>
          Menjadi rujukan informasi terpercaya bagi masyarakat luas melalui pemberitaan
          yang jujur, berimbang, dan bermanfaat.
        </p>
        <h2 className="mt-2 text-lg font-semibold text-ink">Misi</h2>
        <p>
          Menyajikan berita yang akurat dan mudah diakses, mendorong literasi digital
          yang sehat, serta menjunjung tinggi kode etik jurnalistik dalam setiap
          pemberitaan yang kami terbitkan.
        </p>
        <p>
          Redaksi RUANG BERITA berupaya menjaga independensi pemberitaan dan terus
          terbuka terhadap masukan, kritik, maupun koreksi dari pembaca demi kualitas
          jurnalisme yang lebih baik.
        </p>
      </div>
    </div>
  );
}
