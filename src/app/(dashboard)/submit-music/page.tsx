"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { UploadCloud, Trash2, ChevronDown, Loader } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

export default function SubmitMusicPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmitMusicContent />
    </Suspense>
  );
}

function SubmitMusicContent() {
  const { theme } = useThemeStore();
  const searchParams = useSearchParams();
  const songId = searchParams.get("id");

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
  const [existingAudioUrl, setExistingAudioUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const [openStage, setOpenStage] = useState(false);
  const stages = ["Draft", "Demo", "Mixing", "Mastering", "Finished"];

  useEffect(() => {
    if (songId) {
      fetchSongDetails();
    }
  }, [songId]);

  const fetchSongDetails = async () => {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("id", songId)
      .single();

    if (error) {
      console.error("Error fetching song:", error);
      alert("Error fetching song details");
    } else if (data) {
      setArtistName(data.artist || "");
      setSongTitle(data.title || "");
      setAlbumTitle(data.album || "");
      setReleaseDate(data.release_date || "");
      setIsrc(data.isrc || "");
      setStage(data.production_stage || "");
      setCreditLabel(data.credit_label || "");
      setLyrics(data.lyrics || "");
      setInsta(data.instagram || "");
      setSoundCloud(data.soundcloud || "");
      setWebsite(data.website || "");
      setTwitter(data.twitter || "");
      setSpotify(data.spotify || "");
      setFacebook(data.facebook || "");
      setExistingAudioUrl(data.audio_url || data.song_url);
      setAgree(true); // Auto-agree for editing? Or force re-agree? Let's auto-agree or leave it. Maybe leave it false to force re-check. Actually, for UX, if editing, maybe just set true.
    }
  };

  const uploadMusic = async () => {
    if ((!file && !existingAudioUrl) || !artistName || !songTitle || !agree)
      return alert("Please fill required fields!");

    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return alert("You must be logged in to upload music!");
    }

    setLoading(true);
    setUploadProgress(10);

    try {
      let publicUrl = existingAudioUrl;

      // 1. Upload File if new file selected
      if (file) {
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

        publicUrl = urlData.publicUrl;
      }

      // 2. Insert or Update Database Record
      const songData = {
        title: songTitle,
        artist: artistName,
        album: albumTitle || null,
        audio_url: publicUrl,
        song_url: publicUrl,
        // cover_url: null, // Don't overwrite cover_url if we are not editing it here (we don't have cover upload here yet)
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
      };

      let error;
      if (songId) {
        const { error: updateError } = await supabase
          .from("songs")
          .update(songData)
          .eq("id", songId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("songs")
          .insert({ ...songData, cover_url: null }); // Only set cover_url null on insert
        error = insertError;
      }

      if (error) {
        console.error("Database Error:", error);
        throw new Error(`Database save failed: ${error.message}`);
      }

      setUploadProgress(100);
      alert(songId ? "Music updated successfully!" : "Music uploaded successfully!");

      if (!songId) {
        // Reset form only if creating new
        setFile(null);
        setArtistName("");
        setSongTitle("");
        setAlbumTitle("");
        setAgree(false);
      } else {
        // Maybe redirect back to submissions?
        window.location.href = "/submissions";
      }

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ color: theme === "dark" ? "#fff" : "#1f2937" }}
      className="w-full min-h-screen px-6 py-8"
    >

      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2d2d2d" : "#e5e7eb"
        }}
        className="p-10 rounded-2xl border max-w-5xl mx-auto"
      >

        <h1 className="text-2xl font-semibold mb-2">{songId ? "Edit Music" : "Submit music"}</h1>
        <p
          style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
          className="mb-8"
        >
          {songId ? "Update your music details below." : "To upload musics click on box or drop file here!"}
        </p>

        {/* Upload Box */}
        <div className="flex items-center gap-6 mb-8">
          <label className="
            w-40 h-40 border-2 border-dashed border-[#ff4b5c]
            rounded-xl flex flex-col items-center justify-center
            cursor-pointer hover:bg-opacity-10 hover:bg-gray-500 transition
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
              <p
                style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
                className="text-sm"
              >
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                onClick={() => setFile(null)}
                className="text-red-400 border border-red-400 px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm w-fit hover:bg-red-500/10"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ) : existingAudioUrl ? (
            <div className="flex flex-col gap-2">
              <p className="font-medium text-green-500">Existing Audio File Loaded</p>
              <p className="text-sm opacity-60">Upload new file to replace</p>
            </div>
          ) : (
            <p
              style={{ color: theme === "dark" ? "#6b7280" : "#9ca3af" }}
              className="text-sm"
            >
              No file selected
            </p>
          )}
        </div>

        {/* Progress bar */}
        {loading && (
          <div className="mb-6">
            <div
              style={{ backgroundColor: theme === "dark" ? "#333" : "#e5e7eb" }}
              className="h-2 w-full rounded-xl overflow-hidden"
            >
              <div
                className="h-2 bg-[#ff4b5c] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p
              style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
              className="text-xs mt-1"
            >
              {uploadProgress}%
            </p>
          </div>
        )}

        {/* 2-column input grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <input
            style={{
              backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
              borderColor: theme === "dark" ? "#333" : "#d1d5db",
              color: theme === "dark" ? "#fff" : "#1f2937"
            }}
            className="w-full p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
            placeholder="Artist Name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />

          <input
            style={{
              backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
              borderColor: theme === "dark" ? "#333" : "#d1d5db",
              color: theme === "dark" ? "#fff" : "#1f2937"
            }}
            className="w-full p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
            placeholder="Album title (optional)"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
          />

          <input
            style={{
              backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
              borderColor: theme === "dark" ? "#333" : "#d1d5db",
              color: theme === "dark" ? "#fff" : "#1f2937"
            }}
            className="w-full p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
            placeholder="Artist song title"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />

          <input
            style={{
              backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
              borderColor: theme === "dark" ? "#333" : "#d1d5db",
              color: theme === "dark" ? "#fff" : "#1f2937"
            }}
            className="w-full p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
            placeholder="ISRC (optional)"
            value={isrc}
            onChange={(e) => setIsrc(e.target.value)}
          />

          <input
            style={{
              backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
              borderColor: theme === "dark" ? "#333" : "#d1d5db",
              color: theme === "dark" ? "#fff" : "#1f2937"
            }}
            className="w-full p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
            placeholder="Release Date (YYYY-MM-DD)"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />

          {/* Stage dropdown */}
          <div className="relative">
            <div
              onClick={() => setOpenStage(!openStage)}
              style={{
                backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
                borderColor: theme === "dark" ? "#333" : "#d1d5db",
                color: theme === "dark" ? "#fff" : "#1f2937"
              }}
              className="w-full p-4 border rounded-xl flex justify-between cursor-pointer"
            >
              {stage || "Production stage"}
              <ChevronDown />
            </div>
            {openStage && (
              <div
                style={{
                  backgroundColor: theme === "dark" ? "#222" : "#ffffff",
                  borderColor: theme === "dark" ? "#333" : "#d1d5db"
                }}
                className="absolute mt-1 border rounded-xl w-full z-10 shadow-xl"
              >
                {stages.map((s) => (
                  <p
                    key={s}
                    onClick={() => {
                      setStage(s);
                      setOpenStage(false);
                    }}
                    style={{
                      color: theme === "dark" ? "#fff" : "#1f2937"
                    }}
                    className="px-4 py-3 hover:bg-opacity-20 hover:bg-gray-500 cursor-pointer first:rounded-t-xl last:rounded-b-xl"
                  >
                    {s}
                  </p>
                ))}
              </div>
            )}
          </div>

          <input
            style={{
              backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
              borderColor: theme === "dark" ? "#333" : "#d1d5db",
              color: theme === "dark" ? "#fff" : "#1f2937"
            }}
            className="w-full p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
            placeholder="Record label (optional)"
            value={creditLabel}
            onChange={(e) => setCreditLabel(e.target.value)}
          />

          <input
            style={{
              backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
              borderColor: theme === "dark" ? "#333" : "#d1d5db",
              color: theme === "dark" ? "#fff" : "#1f2937"
            }}
            className="w-full p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
            placeholder="Lyrics (Optional)"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
          />

        </div>

        {/* SOCIAL GRID */}
        <p
          style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
          className="mb-2"
        >
          Artist social (optional)
        </p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {[
            { placeholder: "Instagram", value: insta, onChange: setInsta },
            { placeholder: "Twitter", value: twitter, onChange: setTwitter },
            { placeholder: "Soundcloud", value: soundCloud, onChange: setSoundCloud },
            { placeholder: "Spotify", value: spotify, onChange: setSpotify },
            { placeholder: "Website", value: website, onChange: setWebsite },
            { placeholder: "Facebook", value: facebook, onChange: setFacebook }
          ].map((field, idx) => (
            <input
              key={idx}
              style={{
                backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
                borderColor: theme === "dark" ? "#333" : "#d1d5db",
                color: theme === "dark" ? "#fff" : "#1f2937"
              }}
              className="w-full p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          ))}
        </div>

        {/* TERMS */}
        <label className="flex items-center gap-3 mb-8 cursor-pointer">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span
            style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
            className="text-sm"
          >
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
            {loading ? <Loader className="animate-spin" size={18} /> : (songId ? "Update Song" : "Upload MP3")}
          </button>
        </div>

      </div>
    </div>
  );
}
