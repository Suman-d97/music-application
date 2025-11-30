-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 2. ALBUMS TABLE
create table public.albums (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  artist text not null,
  cover_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Albums
alter table public.albums enable row level security;

create policy "Albums are viewable by everyone."
  on albums for select
  using ( true );

create policy "Admins can insert albums."
  on albums for insert
  with check ( auth.role() = 'authenticated' ); --Ideally check for admin role/claim

create policy "Admins can update albums."
  on albums for update
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete albums."
  on albums for delete
  using ( auth.role() = 'authenticated' );

-- 3. SONGS TABLE
create table public.songs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  artist text not null,
  album_id uuid references public.albums(id) on delete set null,
  song_url text not null,
  image_url text,
  duration integer, -- in seconds
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Songs
alter table public.songs enable row level security;

create policy "Songs are viewable by everyone."
  on songs for select
  using ( true );

create policy "Admins can insert songs."
  on songs for insert
  with check ( auth.role() = 'authenticated' );

create policy "Admins can update songs."
  on songs for update
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete songs."
  on songs for delete
  using ( auth.role() = 'authenticated' );

-- 4. STORAGE BUCKETS
-- You need to create these buckets in the Supabase Dashboard: 'avatars', 'covers', 'songs'

-- Storage Policies (Run these in SQL Editor)

-- Avatars Bucket
insert into storage.buckets (id, name) values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

create policy "Anyone can update their own avatar."
  on storage.objects for update
  using ( auth.uid() = owner )
  with check ( bucket_id = 'avatars' );

-- Covers Bucket
insert into storage.buckets (id, name) values ('covers', 'covers');

create policy "Cover images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'covers' );

create policy "Authenticated users can upload covers."
  on storage.objects for insert
  with check ( bucket_id = 'covers' and auth.role() = 'authenticated' );

-- Songs Bucket
insert into storage.buckets (id, name) values ('songs', 'songs');

create policy "Songs are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'songs' );

create policy "Authenticated users can upload songs."
  on storage.objects for insert
  with check ( bucket_id = 'songs' and auth.role() = 'authenticated' );
