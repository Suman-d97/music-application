"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { Upload, Save, ArrowLeft, Music } from "lucide-react";

export default function AddSongPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [songFile, setSongFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [albums, setAlbums] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        album_id: "",
    });

    useEffect(() => {
        const loadAlbums = async () => {
            const { data } = await supabase.from("albums").select("id, title");
            if (data) setAlbums(data);
        };
        loadAlbums();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!songFile) return alert("Please upload a song file");
        if (!coverFile) return alert("Please upload a cover image");

        setLoading(true);
        try {
            // 1. Upload Song
            const songExt = songFile.name.split(".").pop();
            const songName = `songs/${Date.now()}.${songExt}`;
            const { error: songError } = await supabase.storage
                .from("songs")
                .upload(songName, songFile);
            if (songError) throw songError;

            const { data: songUrlData } = supabase.storage.from("songs").getPublicUrl(songName);

            // 2. Upload Cover
            const coverExt = coverFile.name.split(".").pop();
            const coverName = `covers/${Date.now()}.${coverExt}`;
            const { error: coverError } = await supabase.storage
                .from("covers")
                .upload(coverName, coverFile);
            if (coverError) throw coverError;

            const { data: coverUrlData } = supabase.storage.from("covers").getPublicUrl(coverName);

            // 3. Create Song Record
            const { error: dbError } = await supabase.from("songs").insert([
                {
                    title: formData.title,
                    artist: formData.artist,
                    album_id: formData.album_id || null,
                    song_url: songUrlData.publicUrl,
                    cover_url: coverUrlData.publicUrl,
                    duration: 0, // You might want to extract duration using a library
                },
            ]);

            if (dbError) throw dbError;

            alert("Song added successfully!");
            router.push("/admin");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 text-white max-w-2xl mx-auto">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
            >
                <ArrowLeft size={20} /> Back
            </button>

            <h1 className="text-3xl font-bold mb-8">Add New Song</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-2 gap-6">
                    {/* Cover Upload */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#333] rounded-2xl p-6 hover:border-[#555] transition-colors cursor-pointer relative group h-48">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && setCoverFile(e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {coverFile ? (
                            <img
                                src={URL.createObjectURL(coverFile)}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <Upload size={32} />
                                <span className="text-sm">Upload Cover</span>
                            </div>
                        )}
                    </div>

                    {/* Song Upload */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#333] rounded-2xl p-6 hover:border-[#555] transition-colors cursor-pointer relative group h-48">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => e.target.files?.[0] && setSongFile(e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {songFile ? (
                            <div className="flex flex-col items-center gap-2 text-green-400">
                                <Music size={40} />
                                <span className="text-sm text-center px-2 truncate w-full">{songFile.name}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <Music size={32} />
                                <span className="text-sm">Upload Audio File</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Song Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-[#1b1b1b] border border-[#333] rounded-xl p-3 focus:outline-none focus:border-blue-500"
                            placeholder="e.g. Bohemian Rhapsody"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Artist</label>
                        <input
                            type="text"
                            required
                            value={formData.artist}
                            onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                            className="w-full bg-[#1b1b1b] border border-[#333] rounded-xl p-3 focus:outline-none focus:border-blue-500"
                            placeholder="e.g. Queen"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Album (Optional)</label>
                        <select
                            value={formData.album_id}
                            onChange={(e) => setFormData({ ...formData, album_id: e.target.value })}
                            className="w-full bg-[#1b1b1b] border border-[#333] rounded-xl p-3 focus:outline-none focus:border-blue-500 text-white"
                        >
                            <option value="">Select an album...</option>
                            {albums.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                    <Save size={20} />
                    {loading ? "Uploading..." : "Add Song"}
                </button>
            </form>
        </div>
    );
}
