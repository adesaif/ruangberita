# RUANG BERITA

Portal berita — *"Dinamis, Aktual, Kredibel"* — dibangun dengan **Next.js 14 (App Router)**, **Tailwind CSS**, dan **Supabase** (Postgres, Auth, Storage).

## Fitur

- Homepage: Hero Carousel (autoplay 3 detik) → Berita Terbaru (4) → Berita Populer (4)
- Halaman kategori & subkategori
- Halaman detail berita + berita terkait + hitung views
- Pencarian berita
- Dark / light mode (tersimpan di browser)
- Menu mobile (hamburger) dengan animasi
- Panel admin (dilindungi login Supabase Auth):
  - Dashboard ringkasan
  - CRUD berita (judul, isi, kategori, subkategori, foto, status draft/publish, featured, populer)
  - Upload foto ke Supabase Storage
  - Kelola kategori & subkategori
- Row Level Security (RLS): publik hanya bisa membaca berita berstatus `published`; hanya user yang login (admin) yang bisa menulis/menghapus.

## 1. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **SQL Editor** → **New query**, lalu jalankan seluruh isi file
   `supabase/migrations/0001_init.sql` (klik Run). Ini akan membuat:
   - Tabel `categories`, `subcategories`, `articles`, `profiles`
   - Semua RLS policy
   - Bucket storage `article-images` untuk foto berita
   - 5 kategori contoh (Nasional, Ekonomi, Olahraga, Teknologi, Hiburan)
3. Buka **Authentication → Providers**, pastikan **Email** provider aktif.
4. Buat akun admin pertama:
   - Buka **Authentication → Users → Add user → Create new user**.
   - Isi email & password admin Anda, centang **Auto Confirm User**.
   - Akun ini otomatis mendapat baris di tabel `profiles` (lewat trigger).
5. Ambil kredensial API:
   - Buka **Project Settings → API**.
   - Salin **Project URL** dan **anon public key**.

## 2. Setup project secara lokal

```bash
npm install
cp .env.local.example .env.local
```

Edit `.env.local` dan isi:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Jalankan development server:

```bash
npm run dev
```

Buka `http://localhost:3000` untuk situs publik, dan `http://localhost:3000/admin/login` untuk login admin (gunakan email/password admin yang dibuat di langkah 1.4).

## 3. Mengganti logo & warna

- Ganti komponen `src/components/Logo.tsx` — saat ini memakai wordmark teks sebagai placeholder. Taruh file logo Anda di folder `public/` (misal `public/logo.png`) lalu ganti isi komponen dengan `<Image src="/logo.png" ... />`.
- Warna utama diatur lewat CSS variable di `src/app/globals.css` (`--color-brand`, dst). Sesuaikan dengan warna identitas logo RUANG BERITA.

## 4. Push ke GitHub & deploy ke Vercel

```bash
git init
git add .
git commit -m "Initial commit: RUANG BERITA"
git branch -M main
git remote add origin <url-repo-github-anda>
git push -u origin main
```

Lalu di [vercel.com](https://vercel.com):

1. **Add New Project** → import repo GitHub ini.
2. Di bagian **Environment Variables**, tambahkan `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, dan `NEXT_PUBLIC_SITE_URL` (isi dengan domain Vercel Anda setelah deploy pertama).
3. Klik **Deploy**.

## 5. Struktur folder singkat

```
src/
  app/
    page.tsx                     -> Homepage
    kategori/[slug]/             -> Halaman kategori
    kategori/[slug]/[subslug]/   -> Halaman subkategori
    berita/[slug]/               -> Detail berita
    cari/                        -> Pencarian
    admin/
      login/                     -> Login admin (publik)
      (dashboard)/                -> Semua halaman admin, dilindungi middleware
        page.tsx                 -> Dashboard
        berita/                  -> Daftar & kelola berita
        berita/baru/             -> Tambah berita
        berita/[id]/edit/        -> Edit berita
        kategori/                -> Kelola kategori & subkategori
  components/                    -> Header, Footer, HeroCarousel, NewsCard, dll.
  lib/supabase/                  -> Supabase client (browser, server, middleware)
  middleware.ts                  -> Proteksi route /admin
supabase/migrations/0001_init.sql -> Schema database + RLS
```

## Catatan penting

- Proteksi route admin ditangani oleh `src/middleware.ts`: setiap path `/admin/*` (selain `/admin/login`) akan redirect ke halaman login jika belum ada sesi Supabase Auth yang valid.
- Saat ini hanya ada satu role: `admin`. Semua user yang terdaftar di Supabase Auth dianggap admin dan bisa mengelola seluruh berita.
- Karena lingkungan tempat kode ini dibuat tidak memiliki akses ke registry npm untuk menjalankan build/verifikasi otomatis, jalankan `npm run build` secara lokal setelah `npm install` untuk memastikan tidak ada error sebelum deploy.
