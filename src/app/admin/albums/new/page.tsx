"use client";

import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { Upload, Save, ArrowLeft } from "lucide-react";

export default function CreateAlbumPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        description: "",
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setCoverFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!coverFile) return alert("Please upload a cover image");

        setLoading(true);
        try {
            // 1. Upload Cover
            const fileExt = coverFile.name.split(".").pop();
            const fileName = `covers/${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from("covers") // Ensure this bucket exists
                .upload(fileName, coverFile);

            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage
                .from("covers")
                .getPublicUrl(fileName);

            // 2. Create Album Record
            const { error: dbError } = await supabase.from("albums").insert([
                {
                    title: formData.title,
                    artist: formData.artist,
                    description: formData.description,
                    cover_url: urlData.publicUrl,
                },
            ]);

            if (dbError) throw dbError;

            alert("Album created successfully!");
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

            <h1 className="text-3xl font-bold mb-8">Create New Album</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cover Upload */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#333] rounded-2xl p-8 hover:border-[#555] transition-colors cursor-pointer relative group">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {coverFile ? (
                        <img
                            src={URL.createObjectURL(coverFile)}
                            alt="Preview"
                            className="w-48 h-48 object-cover rounded-xl shadow-lg"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                            <Upload size={40} />
                            <span>Click to upload album cover</span>
                        </div>
                    )}
                </div>

                {/* Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Album Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-[#1b1b1b] border border-[#333] rounded-xl p-3 focus:outline-none focus:border-blue-500"
                            placeholder="e.g. Dark Side of the Moon"
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
                            placeholder="e.g. Pink Floyd"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-[#1b1b1b] border border-[#333] rounded-xl p-3 focus:outline-none focus:border-blue-500"
                            placeholder="Album description..."
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                    <Save size={20} />
                    {loading ? "Creating..." : "Create Album"}
                </button>
            </form>
        </div>
    );
}
