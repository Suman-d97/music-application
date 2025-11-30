-- ============================================
-- ADDITIONAL TABLES FOR MUSIC APPLICATION (SAFE VERSION)
-- ============================================
-- This version checks if things exist before creating them

-- ============================================
-- 1. SONGS TABLE (for Submit Music)
-- ============================================
CREATE TABLE IF NOT EXISTS public.songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT,
  audio_url TEXT NOT NULL,
  cover_url TEXT,
  release_date TEXT,
  isrc TEXT,
  production_stage TEXT,
  credit_label TEXT,
  lyrics TEXT,
  instagram TEXT,
  soundcloud TEXT,
  website TEXT,
  twitter TEXT,
  spotify TEXT,
  facebook TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Songs are viewable by everyone" ON public.songs;
DROP POLICY IF EXISTS "Authenticated users can insert songs" ON public.songs;
DROP POLICY IF EXISTS "Users can update their own songs" ON public.songs;
DROP POLICY IF EXISTS "Users can delete their own songs" ON public.songs;

-- Create policies
CREATE POLICY "Songs are viewable by everyone" 
  ON public.songs FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert songs" 
  ON public.songs FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own songs" 
  ON public.songs FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own songs" 
  ON public.songs FOR DELETE 
  USING (auth.uid() = user_id);

-- ============================================
-- 2. ART TABLE (for Submit Art)
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

-- Enable RLS
ALTER TABLE public.art ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Art is viewable by everyone" ON public.art;
DROP POLICY IF EXISTS "Authenticated users can insert art" ON public.art;
DROP POLICY IF EXISTS "Users can update their own art" ON public.art;
DROP POLICY IF EXISTS "Users can delete their own art" ON public.art;

-- Create policies
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
-- 3. TEAM TABLE (for Join Us)
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

-- Enable RLS
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Team applications are viewable by authenticated users" ON public.team;
DROP POLICY IF EXISTS "Anyone can submit team application" ON public.team;

-- Create policies
CREATE POLICY "Team applications are viewable by authenticated users" 
  ON public.team FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can submit team application" 
  ON public.team FOR INSERT 
  WITH CHECK (true);

-- ============================================
-- 4. AUTO-UPDATE TRIGGERS
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
-- SETUP COMPLETE!
-- ============================================
-- Now create storage buckets manually:
-- 1. Go to Storage → New bucket → "music-files" (Public)
-- 2. Go to Storage → New bucket → "art-images" (Public)
