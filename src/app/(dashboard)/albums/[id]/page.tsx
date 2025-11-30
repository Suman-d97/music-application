

"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import SongCard from "@/components/Music/SongCard";
import { useMusic } from "@/store/useMusic";
import { useParams } from "next/navigation";

export default function AlbumDetailsPage() {
  const params = useParams();
  const albumId = params.id as string; // ← FIX: correct ID extraction

  const [album, setAlbum] = useState<any | null>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const { play } = useMusic();

  useEffect(() => {
    if (!albumId) return;

    const loadAlbum = async () => {
      const { data: albumData } = await supabase
        .from("albums")
        .select("*")
        .eq("id", albumId)
        .single();

      setAlbum(albumData);

      const { data: songData } = await supabase
        .from("songs")
        .select("*")
        .eq("album_id", albumId);

      setSongs(songData || []);
    };

    loadAlbum();
  }, [albumId]);

  if (!album) return <p className="text-gray-400">Loading album...</p>;

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">{album.title}</h1>
      <p className="text-gray-400 mb-6">{album.artist}</p>

      {songs.length === 0 ? (
        <p className="text-gray-400">No songs in this album.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={{
                ...song,
                artist: song.artist || album.artist,
                cover_url: song.cover_url || album.cover_url,
              }}
              onPlay={() => play(song.audio_url || song.song_url, song.title)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
