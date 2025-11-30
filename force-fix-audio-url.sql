-- ============================================
-- FORCE FIX MISSING AUDIO_URL COLUMN
-- ============================================

-- 1. Add 'audio_url' column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'songs' AND column_name = 'audio_url'
  ) THEN
    ALTER TABLE public.songs ADD COLUMN audio_url TEXT;
  END IF;
END $$;

-- 2. Make sure it's nullable initially to avoid errors with existing rows, 
--    then we can make it NOT NULL if we want, but let's keep it flexible for now.
ALTER TABLE public.songs ALTER COLUMN audio_url DROP NOT NULL;

-- 3. Verify other critical columns just in case
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'user_id') THEN
    ALTER TABLE public.songs ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'title') THEN
    ALTER TABLE public.songs ADD COLUMN title TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'songs' AND column_name = 'artist') THEN
    ALTER TABLE public.songs ADD COLUMN artist TEXT;
  END IF;
END $$;

-- 4. Refresh the schema cache (this is a comment, but running the ALTERS usually triggers a refresh on the Supabase side)
NOTIFY pgrst, 'reload schema';
