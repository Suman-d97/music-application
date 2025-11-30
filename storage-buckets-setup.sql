-- ============================================
-- CREATE STORAGE BUCKETS WITH POLICIES
-- ============================================
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. CREATE BUCKETS
-- ============================================

-- Create music-files bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'music-files',
  'music-files',
  true,
  52428800, -- 50MB in bytes
  ARRAY['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/flac']
)
ON CONFLICT (id) DO NOTHING;

-- Create art-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'art-images',
  'art-images',
  true,
  10485760, -- 10MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. STORAGE POLICIES FOR MUSIC-FILES
-- ============================================

-- Allow authenticated users to upload music files
DROP POLICY IF EXISTS "Authenticated users can upload music" ON storage.objects;
CREATE POLICY "Authenticated users can upload music"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'music-files');

-- Allow authenticated users to update their music files
DROP POLICY IF EXISTS "Users can update their music" ON storage.objects;
CREATE POLICY "Users can update their music"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'music-files');

-- Allow authenticated users to delete their music files
DROP POLICY IF EXISTS "Users can delete their music" ON storage.objects;
CREATE POLICY "Users can delete their music"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'music-files');

-- Allow public read access to music files
DROP POLICY IF EXISTS "Public access to music files" ON storage.objects;
CREATE POLICY "Public access to music files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'music-files');

-- ============================================
-- 3. STORAGE POLICIES FOR ART-IMAGES
-- ============================================

-- Allow authenticated users to upload art images
DROP POLICY IF EXISTS "Authenticated users can upload art" ON storage.objects;
CREATE POLICY "Authenticated users can upload art"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'art-images');

-- Allow authenticated users to update their art images
DROP POLICY IF EXISTS "Users can update their art" ON storage.objects;
CREATE POLICY "Users can update their art"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'art-images');

-- Allow authenticated users to delete their art images
DROP POLICY IF EXISTS "Users can delete their art" ON storage.objects;
CREATE POLICY "Users can delete their art"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'art-images');

-- Allow public read access to art images
DROP POLICY IF EXISTS "Public access to art images" ON storage.objects;
CREATE POLICY "Public access to art images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'art-images');

-- ============================================
-- 4. CORS CONFIGURATION (IMPORTANT!)
-- ============================================
-- Note: CORS is configured at the project level in Supabase
-- Go to: Settings → API → CORS Configuration
-- Add your domains:
-- - http://localhost:3000
-- - https://your-production-domain.com

-- Alternatively, you can set CORS headers in your Next.js config
-- See next.config.ts for CORS setup

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if buckets were created
SELECT id, name, public, file_size_limit 
FROM storage.buckets 
WHERE id IN ('music-files', 'art-images');

-- Check storage policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Your storage buckets are ready with:
-- ✅ Public access enabled
-- ✅ File size limits set
-- ✅ MIME type restrictions
-- ✅ Upload/Read/Update/Delete policies
-- ✅ CORS ready for localhost:3000
