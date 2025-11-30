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

  const inputClass = "w-full p-4 bg-[#222] border border-[#333] rounded-xl outline-none focus:border-[#ff4b5c] transition-colors";

  const uploadMusic = async () => {
    if (!file || !artistName || !songTitle || !agree)
      return alert("Please fill required fields!");

    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return alert("You must be logged in to upload music!");
    }

    setLoading(true);
    setUploadProgress(10);

    try {
      // 1. Upload File
      const ext = file.name.split(".").pop();
      const filePath = `music_${Date.now()}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("music-files")
        .upload(filePath, file, {
          upsert: false,
        });

      if (uploadErr) {
        console.error("Upload Error:", uploadErr);
        throw new Error(`Upload failed: ${uploadErr.message}`);
      }

      setUploadProgress(70);

      const { data: urlData } = supabase.storage
        .from("music-files")
        .getPublicUrl(filePath);

      // 2. Insert Database Record
      const { error: dbError } = await supabase.from("songs").insert({
        title: songTitle,
        artist: artistName,
        album: albumTitle || null,
        audio_url: urlData.publicUrl,
        song_url: urlData.publicUrl, // Added this to satisfy the constraint
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
        user_id: user.id,
      });

      if (dbError) {
        console.error("Database Error:", dbError);
        throw new Error(`Database save failed: ${dbError.message}`);
      }

      setUploadProgress(100);
      alert("Music uploaded successfully!");

      // Reset form
      setFile(null);
      setArtistName("");
      setSongTitle("");
      setAlbumTitle("");
      setAgree(false);

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
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

          {file ? (
            <div className="flex flex-col gap-2">
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <button
                onClick={() => setFile(null)}
                className="text-red-400 border border-red-400 px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm w-fit hover:bg-red-500/10"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No file selected</p>
          )}
        </div>

        {/* Progress bar */}
        {loading && (
          <div className="mb-6">
            <div className="h-2 w-full bg-[#333] rounded-xl overflow-hidden">
              <div
                className="h-2 bg-[#ff4b5c] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{uploadProgress}%</p>
          </div>
        )}

        {/* 2-column input grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <input className={inputClass} placeholder="Artist Name" value={artistName} onChange={(e) => setArtistName(e.target.value)} />

          <input className={inputClass} placeholder="Album title (optional)" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} />

          <input className={inputClass} placeholder="Artist song title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} />

          <input className={inputClass} placeholder="ISRC (optional)" value={isrc} onChange={(e) => setIsrc(e.target.value)} />

          <input className={inputClass} placeholder="Release Date (YYYY-MM-DD)" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />

          {/* Stage dropdown */}
          <div className="relative">
            <div onClick={() => setOpenStage(!openStage)} className={`${inputClass} flex justify-between cursor-pointer`}>
              {stage || "Production stage"}
              <ChevronDown />
            </div>
            {openStage && (
              <div className="absolute mt-1 bg-[#222] border border-[#333] rounded-xl w-full z-10 shadow-xl">
                {stages.map((s) => (
                  <p
                    key={s}
                    onClick={() => {
                      setStage(s);
                      setOpenStage(false);
                    }}
                    className="px-4 py-3 hover:bg-[#333] cursor-pointer first:rounded-t-xl last:rounded-b-xl"
                  >
                    {s}
                  </p>
                ))}
              </div>
            )}
          </div>

          <input className={inputClass} placeholder="Record label (optional)" value={creditLabel} onChange={(e) => setCreditLabel(e.target.value)} />

          <input className={inputClass} placeholder="Lyrics (Optional)" value={lyrics} onChange={(e) => setLyrics(e.target.value)} />

        </div>

        {/* SOCIAL GRID */}
        <p className="text-gray-400 mb-2">Artist social (optional)</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <input className={inputClass} placeholder="Instagram" value={insta} onChange={(e) => setInsta(e.target.value)} />
          <input className={inputClass} placeholder="Twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          <input className={inputClass} placeholder="Soundcloud" value={soundCloud} onChange={(e) => setSoundCloud(e.target.value)} />
          <input className={inputClass} placeholder="Spotify" value={spotify} onChange={(e) => setSpotify(e.target.value)} />
          <input className={inputClass} placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
          <input className={inputClass} placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
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
            disabled={loading}
            className={`px-8 py-3 rounded-xl shadow-lg flex items-center gap-2 font-semibold transition-colors ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-[#ff4b5c] hover:bg-[#ff6b7c]"
              }`}
          >
            {loading ? <Loader className="animate-spin" size={18} /> : "Upload MP3"}
          </button>
        </div>

      </div>
    </div>
  );
}
