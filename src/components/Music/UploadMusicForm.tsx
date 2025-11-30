// "use client";

// import React, { useState } from "react";
// import { supabase } from "@/utils/supabaseClient";

// export default function UploadMusicForm({ onSuccess }: { onSuccess: () => void }) {
//   const [title, setTitle] = useState("");
//   const [audio, setAudio] = useState<File | null>(null);
//   const [cover, setCover] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const upload = async () => {
//     try {
//       if (!audio || !title) return alert("Missing fields");

//       setLoading(true);

//       // upload audio
//       const { data: audioUpload } = await supabase.storage
//         .from("songs")
//         .upload(`audio/${Date.now()}-${audio.name}`, audio);

//       // upload cover (optional)
//       let coverPath = null;
//       if (cover) {
//         const { data: coverUpload } = await supabase.storage
//           .from("songs")
//           .upload(`covers/${Date.now()}-${cover.name}`, cover);
//         coverPath = coverUpload?.path || null;
//       }

//       // insert into table
//       await supabase.from("songs").insert({
//         title,
//         audio_path: audioUpload?.path,
//         cover_path: coverPath,
//       });

//       onSuccess();
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#1f1f1f] p-6 rounded-xl border border-[#2a2a2a] max-w-md mx-auto text-white space-y-4">
//       <h2 className="text-xl font-semibold">Upload Music</h2>

//       <input
//         type="text"
//         className="w-full bg-[#111] border border-[#2a2a2a] p-3 rounded-lg"
//         placeholder="Title"
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <input
//         type="file"
//         accept="audio/*"
//         onChange={(e) => setAudio(e.target.files?.[0] || null)}
//         className="w-full text-sm"
//       />

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setCover(e.target.files?.[0] || null)}
//         className="w-full text-sm"
//       />

//       <button
//         onClick={upload}
//         disabled={loading}
//         className="w-full bg-[#ef476f] rounded-lg py-3"
//       >
//         {loading ? "Uploading..." : "Upload"}
//       </button>
//     </div>
//   );
// }












// "use client";

// import React, { useState } from "react";
// import { supabase } from "@/utils/supabaseClient";

// export default function UploadMusicForm() {
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [cover, setCover] = useState<File | null>(null);
//   const [audio, setAudio] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function uploadFile(bucket: string, file: File) {
//     const filePath = `${Date.now()}-${file.name}`;

//     const { data, error } = await supabase.storage
//       .from(bucket)
//       .upload(filePath, file, { upsert: false });

//     if (error) throw error;

//     const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

//     return urlData.publicUrl;
//   }

//   const submit = async () => {
//     if (!title || !artist || !cover || !audio) {
//       alert("All fields required");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1️⃣ Upload cover image
//       const cover_url = await uploadFile("album-covers", cover);

//       // 2️⃣ Upload audio file
//       const audio_url = await uploadFile("music-files", audio);

//       // 3️⃣ Insert album
//       const { data: album, error: albumErr } = await supabase
//         .from("albums")
//         .insert({
//           title,
//           artist,
//           cover_url,
//         })
//         .select()
//         .single();

//       if (albumErr) throw albumErr;

//       // 4️⃣ Insert song inside songs table
//       await supabase.from("songs").insert({
//         album_id: album.id,
//         title,
//         artist,
//         url: audio_url,
//         cover_path: cover_url,
//       });

//       alert("Upload successful!");
//       setTitle("");
//       setArtist("");
//       setCover(null);
//       setAudio(null);
//     } catch (err: any) {
//       alert(err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="text-white space-y-4">
//       <h2 className="text-xl font-semibold">Upload Music</h2>

//       <input
//         placeholder="Song Title"
//         className="input-text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <input
//         placeholder="Artist Name"
//         className="input-text"
//         value={artist}
//         onChange={(e) => setArtist(e.target.value)}
//       />

//       <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] ?? null)} />

//       <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files?.[0] ?? null)} />

//       <button className="btn-primary" onClick={submit} disabled={loading}>
//         {loading ? "Uploading..." : "Upload"}
//       </button>
//     </div>
//   );
// }














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
