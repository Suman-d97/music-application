
"use client";

import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function UploadMusicForm({ onUploaded }: { onUploaded?: () => void }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function uploadFile(bucket: string, file: File) {
    const filePath = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, { upsert: false });

    if (error) throw error;

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return urlData.publicUrl;
  }

  const submit = async () => {
    if (!title || !artist || !cover || !audio) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    try {
      const cover_url = await uploadFile("music-covers", cover);
      const audio_url = await uploadFile("music-files", audio);

      const userResult = await supabase.auth.getUser();
      const userId = userResult?.data?.user?.id ?? null;

      await supabase.from("songs").insert({
        title,
        artist,
        audio_url,
        cover_url,
        user_id: userId,
      });

      setTitle("");
      setArtist("");
      setCover(null);
      setAudio(null);
      onUploaded?.();
      alert("Upload successful!");
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1b1b1b] p-6 rounded-2xl border border-[#2a2a2a]">
      <h3 className="text-lg font-semibold mb-4">Submit music</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-lg bg-[#222] border border-[#333] text-white"
        />
        <input
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="p-3 rounded-lg bg-[#222] border border-[#333] text-white"
        />
      </div>

      <div className="mt-3 flex gap-3 items-center">
        <label className="cursor-pointer bg-[#222] px-4 py-2 rounded-lg border border-[#333]">
          {cover ? cover.name : "Choose cover image"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setCover(e.target.files?.[0] ?? null)} />
        </label>

        <label className="cursor-pointer bg-[#222] px-4 py-2 rounded-lg border border-[#333]">
          {audio ? audio.name : "Choose audio"}
          <input type="file" accept="audio/*" className="hidden" onChange={(e) => setAudio(e.target.files?.[0] ?? null)} />
        </label>

        <button onClick={submit} className="ml-auto bg-red-500 px-4 py-2 rounded-lg text-white" disabled={loading}>
          {loading ? "Uploading..." : "Upload MP3"}
        </button>
      </div>
    </div>
  );
}
