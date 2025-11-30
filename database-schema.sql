-- ============================================
-- MUSIC APPLICATION - COMPLETE DATABASE SCHEMA
-- ============================================
-- Run this entire script in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run

-- ============================================
-- 1. PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- ============================================
-- 2. ALBUMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.albums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  cover_url TEXT,
  release_year INTEGER,
  genre TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;

-- RLS Policies for albums
CREATE POLICY "Albums are viewable by everyone" 
  ON public.albums FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert albums" 
  ON public.albums FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update albums" 
  ON public.albums FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete albums" 
  ON public.albums FOR DELETE 
  USING (auth.role() = 'authenticated');

-- ============================================
-- 3. SONGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album_id UUID REFERENCES public.albums(id) ON DELETE SET NULL,
  song_url TEXT NOT NULL,
  image_url TEXT,
  duration INTEGER,
  genre TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for songs
CREATE POLICY "Songs are viewable by everyone" 
  ON public.songs FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert songs" 
  ON public.songs FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update songs" 
  ON public.songs FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete songs" 
  ON public.songs FOR DELETE 
  USING (auth.role() = 'authenticated');

-- ============================================
-- 4. AUTO-UPDATE TIMESTAMP FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. TRIGGERS FOR AUTO-UPDATE
-- ============================================
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_albums_updated_at
  BEFORE UPDATE ON public.albums
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_songs_updated_at
  BEFORE UPDATE ON public.songs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 6. STORAGE BUCKETS (Run these separately in Storage section)
-- ============================================
-- Go to Storage → Create new bucket for each:
-- 1. "avatars" - for user profile pictures (Public)
-- 2. "covers" - for album cover images (Public)
-- 3. "songs" - for music files (Public)

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Tables created:
-- ✅ profiles - User profile data
-- ✅ albums - Music albums
-- ✅ songs - Individual songs
--
-- All tables have RLS enabled with proper policies
-- Auto-updating timestamps configured
