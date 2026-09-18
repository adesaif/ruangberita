-- =========================================================
-- RUANG BERITA — Like, Komentar, dan Share untuk setiap berita
-- Jalankan file ini di Supabase SQL Editor (satu kali saja)
-- =========================================================

-- ---------------------------------------------------------
-- 1. LIKE
-- Setiap pengunjung (tanpa perlu login) diberi id anonim yang
-- disimpan di browser mereka, supaya bisa like/batal-like dan
-- tombolnya tetap "menyala" saat mereka kembali ke berita itu.
-- ---------------------------------------------------------
create table if not exists public.article_likes (
  id uuid primary key default uuid_generate_v4(),
  article_id uuid not null references public.articles (id) on delete cascade,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  unique (article_id, visitor_id)
);

create index if not exists article_likes_article_idx on public.article_likes (article_id);

alter table public.article_likes enable row level security;

drop policy if exists "article_likes: public read" on public.article_likes;
create policy "article_likes: public read"
  on public.article_likes for select
  using (true);

drop policy if exists "article_likes: public insert" on public.article_likes;
create policy "article_likes: public insert"
  on public.article_likes for insert
  with check (true);

drop policy if exists "article_likes: public delete" on public.article_likes;
create policy "article_likes: public delete"
  on public.article_likes for delete
  using (true);

-- ---------------------------------------------------------
-- 2. KOMENTAR
-- Pengunjung mengisi nama + komentar tanpa perlu login.
-- Komentar langsung tampil (tanpa moderasi dulu) — bisa
-- ditambah fitur moderasi admin di kemudian hari kalau perlu.
-- ---------------------------------------------------------
create table if not exists public.article_comments (
  id uuid primary key default uuid_generate_v4(),
  article_id uuid not null references public.articles (id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  content text not null check (char_length(trim(content)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists article_comments_article_idx
  on public.article_comments (article_id, created_at desc);

alter table public.article_comments enable row level security;

drop policy if exists "article_comments: public read" on public.article_comments;
create policy "article_comments: public read"
  on public.article_comments for select
  using (true);

drop policy if exists "article_comments: public insert" on public.article_comments;
create policy "article_comments: public insert"
  on public.article_comments for insert
  with check (true);

-- hanya admin yang login yang boleh menghapus komentar (moderasi)
drop policy if exists "article_comments: admin delete" on public.article_comments;
create policy "article_comments: admin delete"
  on public.article_comments for delete
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- 3. SHARE (hitungan saja, tanpa perlu login)
-- ---------------------------------------------------------
alter table public.articles
  add column if not exists share_count integer not null default 0;

create or replace function public.increment_share_count(article_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  update public.articles set share_count = share_count + 1 where id = article_id;
end;
$$;

grant execute on function public.increment_share_count(uuid) to anon, authenticated;
