-- 1. Create the bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('music-files', 'music-files', true)
on conflict (id) do update set public = true;

-- 2. Policies for music-files
-- We use specific names to avoid conflicts with other policies

-- Public access
drop policy if exists "Public Access Music" on storage.objects;
create policy "Public Access Music"
on storage.objects for select
using ( bucket_id = 'music-files' );

-- Upload
drop policy if exists "Authenticated users can upload music" on storage.objects;
create policy "Authenticated users can upload music"
on storage.objects for insert
with check ( bucket_id = 'music-files' and auth.role() = 'authenticated' );

-- Update
drop policy if exists "Users can update own music files" on storage.objects;
create policy "Users can update own music files"
on storage.objects for update
using ( bucket_id = 'music-files' and auth.uid() = owner );

-- Delete
drop policy if exists "Users can delete own music files" on storage.objects;
create policy "Users can delete own music files"
on storage.objects for delete
using ( bucket_id = 'music-files' and auth.uid() = owner );
