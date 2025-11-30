-- ============================================
-- FIX MISSING COLUMNS IN EXISTING TABLES
-- ============================================
-- Run this to add missing columns to existing tables

-- ============================================
-- 1. ADD MISSING COLUMNS TO SONGS TABLE
-- ============================================
-- Add user_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'songs' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE public.songs ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add other missing columns
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'album') THEN
    ALTER TABLE public.songs ADD COLUMN album TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'release_date') THEN
    ALTER TABLE public.songs ADD COLUMN release_date TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'isrc') THEN
    ALTER TABLE public.songs ADD COLUMN isrc TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'production_stage') THEN
    ALTER TABLE public.songs ADD COLUMN production_stage TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'credit_label') THEN
    ALTER TABLE public.songs ADD COLUMN credit_label TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'lyrics') THEN
    ALTER TABLE public.songs ADD COLUMN lyrics TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'instagram') THEN
    ALTER TABLE public.songs ADD COLUMN instagram TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'soundcloud') THEN
    ALTER TABLE public.songs ADD COLUMN soundcloud TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'website') THEN
    ALTER TABLE public.songs ADD COLUMN website TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'twitter') THEN
    ALTER TABLE public.songs ADD COLUMN twitter TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'spotify') THEN
    ALTER TABLE public.songs ADD COLUMN spotify TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'facebook') THEN
    ALTER TABLE public.songs ADD COLUMN facebook TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'updated_at') THEN
    ALTER TABLE public.songs ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
  END IF;
END $$;

-- Enable RLS on songs
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies for songs
DROP POLICY IF EXISTS "Songs are viewable by everyone" ON public.songs;
DROP POLICY IF EXISTS "Authenticated users can insert songs" ON public.songs;
DROP POLICY IF EXISTS "Users can update their own songs" ON public.songs;
DROP POLICY IF EXISTS "Users can delete their own songs" ON public.songs;

CREATE POLICY "Songs are viewable by everyone" 
  ON public.songs FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert songs" 
  ON public.songs FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own songs" 
  ON public.songs FOR UPDATE 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete their own songs" 
  ON public.songs FOR DELETE 
  USING (auth.uid() = user_id OR user_id IS NULL);

-- ============================================
-- 2. CREATE ART TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.art (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_name TEXT NOT NULL,
  art_type TEXT,
  credit_url TEXT,
  image_url TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.art ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Art is viewable by everyone" ON public.art;
DROP POLICY IF EXISTS "Authenticated users can insert art" ON public.art;
DROP POLICY IF EXISTS "Users can update their own art" ON public.art;
DROP POLICY IF EXISTS "Users can delete their own art" ON public.art;

CREATE POLICY "Art is viewable by everyone" 
  ON public.art FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert art" 
  ON public.art FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own art" 
  ON public.art FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own art" 
  ON public.art FOR DELETE 
  USING (auth.uid() = user_id);

-- ============================================
-- 3. CREATE TEAM TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.team (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fullname TEXT NOT NULL,
  age TEXT,
  location TEXT,
  discord TEXT,
  instagram TEXT,
  twitter TEXT,
  soundcloud TEXT,
  spotify TEXT,
  website TEXT,
  facebook TEXT,
  q1 TEXT,
  q2 TEXT,
  q3 TEXT,
  q4 TEXT,
  q5 TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Team applications are viewable by authenticated users" ON public.team;
DROP POLICY IF EXISTS "Anyone can submit team application" ON public.team;

CREATE POLICY "Team applications are viewable by authenticated users" 
  ON public.team FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can submit team application" 
  ON public.team FOR INSERT 
  WITH CHECK (true);

-- ============================================
-- 4. CREATE TRIGGERS
-- ============================================
DROP TRIGGER IF EXISTS set_songs_updated_at ON public.songs;
CREATE TRIGGER set_songs_updated_at
  BEFORE UPDATE ON public.songs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_art_updated_at ON public.art;
CREATE TRIGGER set_art_updated_at
  BEFORE UPDATE ON public.art
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- DONE! Now create storage buckets:
-- 1. Storage → New bucket → "music-files" (Public)
-- 2. Storage → New bucket → "art-images" (Public)
-- ============================================
