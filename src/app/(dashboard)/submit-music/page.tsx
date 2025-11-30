// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import SubmissionList from "@/components/Music/SubmissionList";

// export default function SubmissionsPage() {
//   const [songs, setSongs] = useState<any[]>([]);

//   useEffect(() => {
//     const loadSongs = async () => {
//       const { data, error } = await supabase
//         .from("songs")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (!error && data) setSongs(data);
//     };

//     loadSongs();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-6">My Submissions</h1>

//       <SubmissionList
//         items={songs}
//         onPlay={(song) => console.log("Play", song)}
//       />
//     </div>
//   );
// }
















// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import UploadMusicForm from "@/components/Music/UploadMusicForm";
// import SubmissionList from "@/components/Music/SubmissionList";
// import SongWave from "@/components/Music/SongWave";

// export default function SubmitMusicPage() {
//   const [songs, setSongs] = useState<any[]>([]);
//   const [sort, setSort] = useState<"new" | "old" | "title">("new");
//   const [limit, setLimit] = useState(12);
//   const [playing, setPlaying] = useState<any | null>(null);

//   const load = async (lim = 12) => {
//     let query = supabase.from("songs").select("*");
//     if (sort === "new") query = query.order("created_at", { ascending: false });
//     if (sort === "old") query = query.order("created_at", { ascending: true });
//     if (sort === "title") query = query.order("title", { ascending: true });

//     const { data } = await query.limit(lim);
//     setSongs(data || []);
//   };

//   useEffect(() => {
//     load(limit);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [sort, limit]);

//   return (
//     <div className="space-y-8">
//       <UploadMusicForm onUploaded={() => load(limit)} />

//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold">My submissions</h2>

//         <div className="flex items-center gap-3">
//           <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="bg-[#111] p-2 rounded">
//             <option value="new">Newest</option>
//             <option value="old">Oldest</option>
//             <option value="title">Title (A→Z)</option>
//           </select>

//           <button onClick={() => setLimit((s) => s + 12)} className="bg-[#222] px-3 py-1 rounded">
//             Load more
//           </button>
//         </div>
//       </div>

//       <SubmissionList
//         items={songs}
//         onPlay={(song) => {
//           setPlaying(song);
//         }}
//       />

//       {playing?.audio_url && (
//         <div className="mt-6">
//           <h4 className="text-sm text-gray-300">Now previewing: {playing.title}</h4>
//           <SongWave url={playing.audio_url} height={80} />
//         </div>
//       )}
//     </div>
//   );
// }













"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { UploadCloud, Trash2, ChevronDown, Loader } from "lucide-react";

export default function SubmitMusicPage() {
  const [artistName, setArtistName] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [isrc, setIsrc] = useState("");
  const [stage, setStage] = useState("");
  const [creditLabel, setCreditLabel] = useState("");
  const [lyrics, setLyrics] = useState("");

  const [insta, setInsta] = useState("");
  const [soundCloud, setSoundCloud] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [spotify, setSpotify] = useState("");
  const [facebook, setFacebook] = useState("");

  const [agree, setAgree] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const [openStage, setOpenStage] = useState(false);
  const stages = ["Draft", "Demo", "Mixing", "Mastering", "Finished"];

  const uploadMusic = async () => {
    if (!file || !artistName || !songTitle || !agree)
      return alert("Please fill required fields!");

    setLoading(true);
    setUploadProgress(10);

    const ext = file.name.split(".").pop();
    const filePath = `music_${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("music-files")
      .upload(filePath, file, {
        upsert: false,
      });

    if (uploadErr) {
      setLoading(false);
      return alert("Upload failed!");
    }

    setUploadProgress(70);

    const { data: urlData } = supabase.storage
      .from("music-files")
      .getPublicUrl(filePath);

    const userRes = await supabase.auth.getUser();
    const userId = userRes?.data?.user?.id ?? null;

    await supabase.from("songs").insert({
      title: songTitle,
      artist: artistName,
      album: albumTitle || null,
      audio_url: urlData.publicUrl,
      cover_url: null,
      release_date: releaseDate || null,
      isrc: isrc || null,
      production_stage: stage || null,
      credit_label: creditLabel || null,
      lyrics: lyrics || null,
      instagram: insta || null,
      soundcloud: soundCloud || null,
      website: website || null,
      twitter: twitter || null,
      spotify: spotify || null,
      facebook: facebook || null,
      user_id: userId,
    });

    setUploadProgress(100);
    setLoading(false);

    alert("Music uploaded!");
  };

  return (
    <div className="w-full min-h-screen px-6 py-8 text-white">

      <div className="bg-[#1b1b1b] p-10 rounded-2xl border border-[#2d2d2d] max-w-5xl mx-auto">

        <h1 className="text-2xl font-semibold mb-2">Submit music</h1>
        <p className="text-gray-400 mb-8">To upload musics click on box or drop file here!</p>

        {/* Upload Box */}
        <div className="flex items-center gap-6 mb-8">
          <label className="
            w-40 h-40 border-2 border-dashed border-[#ff4b5c]
            rounded-xl flex flex-col items-center justify-center
            cursor-pointer hover:bg-[#262626] transition
          ">
            <UploadCloud size={35} className="text-[#ff4b5c]" />
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          {file && (
            <button
              onClick={() => setFile(null)}
              className="text-red-400 border border-red-400 px-6 py-2 rounded-xl flex items-center gap-2"
            >
              <Trash2 size={18} /> Delete
            </button>
          )}
        </div>

        {/* Progress bar */}
        {file && (
          <div className="mb-6">
            <div className="h-2 w-full bg-[#333] rounded-xl overflow-hidden">
              <div
                className="h-2 bg-[#ff4b5c] transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{uploadProgress}%</p>
          </div>
        )}

        {/* 2-column input grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <input className="input" placeholder="Artist Name" value={artistName} onChange={(e) => setArtistName(e.target.value)} />

          <input className="input" placeholder="Album title (optional)" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} />

          <input className="input" placeholder="Artist song title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} />

          <input className="input" placeholder="ISRC (optional)" value={isrc} onChange={(e) => setIsrc(e.target.value)} />

          <input className="input" placeholder="Release Date (YYYY-MM-DD)" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />

          {/* Stage dropdown */}
          <div className="relative">
            <div onClick={() => setOpenStage(!openStage)} className="input flex justify-between cursor-pointer">
              {stage || "Production stage"}
              <ChevronDown />
            </div>
            {openStage && (
              <div className="absolute mt-1 bg-[#222] border border-[#333] rounded-xl w-full z-10">
                {stages.map((s) => (
                  <p
                    key={s}
                    onClick={() => {
                      setStage(s);
                      setOpenStage(false);
                    }}
                    className="px-4 py-3 hover:bg-[#333] cursor-pointer"
                  >
                    {s}
                  </p>
                ))}
              </div>
            )}
          </div>

          <input className="input" placeholder="Record label (optional)" value={creditLabel} onChange={(e) => setCreditLabel(e.target.value)} />

          <input className="input" placeholder="Lyrics (Optional)" value={lyrics} onChange={(e) => setLyrics(e.target.value)} />

        </div>

        {/* SOCIAL GRID */}
        <p className="text-gray-400 mb-2">Artist social (optional)</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <input className="input" placeholder="Instagram" value={insta} onChange={(e) => setInsta(e.target.value)} />
          <input className="input" placeholder="Twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          <input className="input" placeholder="Soundcloud" value={soundCloud} onChange={(e) => setSoundCloud(e.target.value)} />
          <input className="input" placeholder="Spotify" value={spotify} onChange={(e) => setSpotify(e.target.value)} />
          <input className="input" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
          <input className="input" placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
        </div>

        {/* TERMS */}
        <label className="flex items-center gap-3 mb-8 cursor-pointer">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span className="text-gray-400 text-sm">
            I read and accepted the <span className="text-blue-400 underline">terms and conditions</span>
          </span>
        </label>

        {/* SUBMIT BUTTON */}
        <div className="w-full flex justify-end">
          <button
            onClick={uploadMusic}
            className="px-8 py-3 bg-[#ff4b5c] hover:bg-[#ff6b7c] rounded-xl shadow-lg flex items-center gap-2 font-semibold"
          >
            {loading ? <Loader className="animate-spin" size={18} /> : "Upload MP3"}
          </button>
        </div>

      </div>
    </div>
  );
}

/* Tailwind shortcut */
const input = `
  w-full p-4 bg-[#222] border border-[#333] rounded-xl outline-none
`;
