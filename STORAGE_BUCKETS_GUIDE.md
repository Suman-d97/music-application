# 📦 How to Create Storage Buckets in Supabase

## Step-by-Step Guide

### 1. Open Supabase Storage
I've opened the Storage page for you in your browser:
https://supabase.com/dashboard/project/lcnhkftjrrekbckipbxo/storage/buckets

### 2. Create First Bucket: `music-files`

1. Click the **"New bucket"** button (top right)
2. Fill in the form:
   - **Name**: `music-files`
   - **Public bucket**: ✅ **Check this box** (IMPORTANT!)
   - **File size limit**: Leave default or set to 50MB
   - **Allowed MIME types**: Leave empty (allows all)
3. Click **"Create bucket"**

### 3. Create Second Bucket: `art-images`

1. Click **"New bucket"** again
2. Fill in the form:
   - **Name**: `art-images`
   - **Public bucket**: ✅ **Check this box** (IMPORTANT!)
   - **File size limit**: Leave default or set to 10MB
   - **Allowed MIME types**: Leave empty (allows all)
3. Click **"Create bucket"**

### 4. Verify Buckets

After creating both buckets, you should see:
- ✅ `music-files` (Public)
- ✅ `art-images` (Public)

### 5. Set Bucket Policies (If needed)

If uploads still fail, you may need to add storage policies:

**For `music-files` bucket:**
```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload music"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'music-files');

-- Allow public access to files
CREATE POLICY "Public access to music files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'music-files');
```

**For `art-images` bucket:**
```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload art"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'art-images');

-- Allow public access to files
CREATE POLICY "Public access to art images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'art-images');
```

## ✅ After Creating Buckets

Once both buckets are created, test your pages:
1. Go to `/submit-music` and try uploading an MP3
2. Go to `/submit-art` and try uploading an image
3. Go to `/join` and submit the form

All three pages should work perfectly! 🎉
