

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import AlbumCard from "@/components/Music/AlbumCard";

export default function AlbumsPage() {
  const router = useRouter();
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlbums = async () => {
      const { data, error } = await supabase
        .from("albums")
        .select("*")  // ← FIX: fetch all fields
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      if (data) setAlbums(data);
      setLoading(false);
    };

    loadAlbums();
  }, []);

  const goToAlbum = (id: string) => {
    router.push(`/albums/${id}`); // ← FIXED ROUTE
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">Albums</h1>

      {loading ? (
        <p className="text-gray-400">Loading albums...</p>
      ) : albums.length === 0 ? (
        <p className="text-gray-400">No albums found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {albums.map((a) => (
            <AlbumCard
              key={a.id}
              id={a.id}
              title={a.title}
              artist={a.artist}
              cover={a.cover_path}  // ← FIX: use correct column
              onOpen={goToAlbum}
            />
          ))}
        </div>
      )}
    </div>
  );
}
