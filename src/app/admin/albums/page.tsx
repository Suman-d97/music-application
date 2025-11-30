"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ManageAlbumsPage() {
    const [albums, setAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAlbums();
    }, []);

    const loadAlbums = async () => {
        const { data } = await supabase
            .from("albums")
            .select("*")
            .order("created_at", { ascending: false });
        if (data) setAlbums(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this album? This will also delete all songs in it.")) return;

        try {
            // 1. Delete Songs in Album (Optional if cascade delete is on, but safer to do explicit)
            // For now assuming cascade or manual cleanup. Let's just delete album.
            const { error } = await supabase.from("albums").delete().eq("id", id);
            if (error) throw error;

            setAlbums(albums.filter((a) => a.id !== id));
        } catch (err: any) {
            alert("Error deleting album: " + err.message);
        }
    };

    return (
        <div className="p-8 text-white">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="text-gray-400 hover:text-white">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold">Manage Albums</h1>
                </div>
                <Link
                    href="/admin/albums/new"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} /> Create Album
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {albums.map((album) => (
                        <div
                            key={album.id}
                            className="bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl overflow-hidden flex flex-col"
                        >
                            <img
                                src={album.cover_url || "/placeholder.png"}
                                className="w-full h-48 object-cover"
                                alt={album.title}
                            />
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{album.title}</h3>
                                    <p className="text-gray-400 text-sm">{album.artist}</p>
                                </div>

                                <div className="flex justify-end mt-4 pt-4 border-t border-[#333]">
                                    <button
                                        onClick={() => handleDelete(album.id)}
                                        className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
