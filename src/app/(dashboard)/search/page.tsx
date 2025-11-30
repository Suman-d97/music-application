"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import AlbumCard from "@/components/Music/AlbumCard";
import SongCard from "@/components/Music/SongCard";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [albums, setAlbums] = useState<any[]>([]);
    const [songs, setSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const search = async () => {
            setLoading(true);
            if (!query) {
                setAlbums([]);
                setSongs([]);
                setLoading(false);
                return;
            }

            // Search Albums
            const { data: albumData } = await supabase
                .from("albums")
                .select("*")
                .ilike("title", `%${query}%`);

            // Search Songs
            const { data: songData } = await supabase
                .from("songs")
                .select("*")
                .ilike("title", `%${query}%`);

            setAlbums(albumData || []);
            setSongs(songData || []);
            setLoading(false);
        };

        search();
    }, [query]);

    return (
        <div className="text-white space-y-8">
            <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>

            {loading ? (
                <p>Searching...</p>
            ) : (
                <>
                    {/* Albums Results */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Albums</h2>
                        {albums.length === 0 ? (
                            <p className="text-gray-400">No albums found.</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {albums.map((a) => (
                                    <AlbumCard
                                        key={a.id}
                                        id={a.id}
                                        title={a.title}
                                        artist={a.artist}
                                        cover={a.cover_url}
                                        onOpen={(id) => (window.location.href = `/albums/${id}`)}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Songs Results */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Songs</h2>
                        {songs.length === 0 ? (
                            <p className="text-gray-400">No songs found.</p>
                        ) : (
                            <div className="space-y-2">
                                {songs.map((s) => (
                                    <SongCard
                                        key={s.id}
                                        song={{
                                            id: s.id,
                                            title: s.title,
                                            artist: s.artist,
                                            cover_url: s.cover_url,
                                            audio_url: s.song_url
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}
