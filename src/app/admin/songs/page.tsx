"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Trash2, Plus, ArrowLeft, Play, Pause } from "lucide-react";
import Link from "next/link";

export default function ManageSongsPage() {
    const [songs, setSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState<string | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        loadSongs();
        return () => {
            if (audio) audio.pause();
        };
    }, []);

    const loadSongs = async () => {
        const { data } = await supabase
            .from("songs")
            .select("*, albums(title)")
            .order("created_at", { ascending: false });
        if (data) setSongs(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this song?")) return;

        try {
            const { error } = await supabase.from("songs").delete().eq("id", id);
            if (error) throw error;

            setSongs(songs.filter((s) => s.id !== id));
        } catch (err: any) {
            alert("Error deleting song: " + err.message);
        }
    };

    const togglePlay = (url: string, id: string) => {
        if (playing === id) {
            audio?.pause();
            setPlaying(null);
        } else {
            if (audio) audio.pause();
            const newAudio = new Audio(url);
            newAudio.play();
            setAudio(newAudio);
            setPlaying(id);
            newAudio.onended = () => setPlaying(null);
        }
    };

    return (
        <div className="p-8 text-white">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="text-gray-400 hover:text-white">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold">Manage Songs</h1>
                </div>
                <Link
                    href="/admin/songs/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} /> Add Song
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#222] text-gray-400 text-sm uppercase">
                            <tr>
                                <th className="p-4">Play</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Artist</th>
                                <th className="p-4">Album</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2a2a2a]">
                            {songs.map((song) => (
                                <tr key={song.id} className="hover:bg-[#222] transition-colors">
                                    <td className="p-4">
                                        <button
                                            onClick={() => togglePlay(song.song_url, song.id)}
                                            className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                        >
                                            {playing === song.id ? <Pause size={14} /> : <Play size={14} />}
                                        </button>
                                    </td>
                                    <td className="p-4 font-medium">{song.title}</td>
                                    <td className="p-4 text-gray-400">{song.artist}</td>
                                    <td className="p-4 text-gray-400">{song.albums?.title || "-"}</td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(song.id)}
                                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
