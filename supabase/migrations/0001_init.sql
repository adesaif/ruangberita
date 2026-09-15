-- =========================================================
-- RUANG BERITA — initial schema
-- Jalankan file ini di Supabase SQL Editor (Project > SQL Editor > New query)
-- =========================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------
-- 1. PROFILES (admin/editor accounts)
-- Baris ini otomatis dibuat saat user baru daftar lewat Supabase Auth.
-- role: 'admin' bisa mengelola semua berita.
-- ---------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: user can read own row"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: user can update own row"
  on public.profiles for update
  using (auth.uid() = id);

-- auto-create profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------
-- 2. CATEGORIES & SUBCATEGORIES
-- ---------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.subcategories (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid not null references public.categories (id) on delete cascade,
  name text not null,
  slug text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (category_id, slug)
);

alter table public.categories enable row level security;
alter table public.subcategories enable row level security;

create policy "categories: public read"
  on public.categories for select using (true);

create policy "subcategories: public read"
  on public.subcategories for select using (true);

create policy "categories: admin write"
  on public.categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "subcategories: admin write"
  on public.subcategories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- 3. ARTICLES (berita)
-- ---------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  category_id uuid references public.categories (id) on delete set null,
  subcategory_id uuid references public.subcategories (id) on delete set null,
  author_id uuid references public.profiles (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  is_featured boolean not null default false,
  is_popular boolean not null default false,
  view_count int not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_published_idx
  on public.articles (status, published_at desc);
create index if not exists articles_category_idx on public.articles (category_id);
create index if not exists articles_subcategory_idx on public.articles (subcategory_id);
create index if not exists articles_featured_idx on public.articles (is_featured);
create index if not exists articles_popular_idx on public.articles (is_popular);

alter table public.articles enable row level security;

-- publik hanya boleh baca berita yang sudah published
create policy "articles: public read published"
  on public.articles for select
  using (status = 'published');

-- admin (user login) boleh baca semua, termasuk draft
create policy "articles: admin read all"
  on public.articles for select
  using (auth.role() = 'authenticated');

create policy "articles: admin insert"
  on public.articles for insert
  with check (auth.role() = 'authenticated');

create policy "articles: admin update"
  on public.articles for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "articles: admin delete"
  on public.articles for delete
  using (auth.role() = 'authenticated');

-- auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute procedure public.set_updated_at();

-- set published_at otomatis saat status berubah ke published
create or replace function public.set_published_at()
returns trigger language plpgsql as $$
begin
  if new.status = 'published' and (old.status is distinct from 'published') then
    new.published_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists articles_set_published_at on public.articles;
create trigger articles_set_published_at
  before update on public.articles
  for each row execute procedure public.set_published_at();

drop trigger if exists articles_set_published_at_insert on public.articles;
create trigger articles_set_published_at_insert
  before insert on public.articles
  for each row execute procedure public.set_published_at();

-- fungsi untuk menambah view_count dari halaman publik (tanpa perlu login)
create or replace function public.increment_view_count(article_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  update public.articles set view_count = view_count + 1 where id = article_id;
end;
$$;

grant execute on function public.increment_view_count(uuid) to anon, authenticated;

-- ---------------------------------------------------------
-- 4. STORAGE bucket untuk foto berita
-- ---------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

create policy "article-images: public read"
  on storage.objects for select
  using (bucket_id = 'article-images');

create policy "article-images: admin upload"
  on storage.objects for insert
  with check (bucket_id = 'article-images' and auth.role() = 'authenticated');

create policy "article-images: admin update"
  on storage.objects for update
  using (bucket_id = 'article-images' and auth.role() = 'authenticated');

create policy "article-images: admin delete"
  on storage.objects for delete
  using (bucket_id = 'article-images' and auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- 5. SEED contoh kategori (boleh diedit/dihapus dari admin)
-- ---------------------------------------------------------
insert into public.categories (name, slug, sort_order) values
  ('Nasional', 'nasional', 1),
  ('Ekonomi', 'ekonomi', 2),
  ('Olahraga', 'olahraga', 3),
  ('Teknologi', 'teknologi', 4),
  ('Hiburan', 'hiburan', 5)
on conflict (slug) do nothing;
