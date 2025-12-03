"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { motion } from "framer-motion";
import SongCard from "@/components/Music/SongCard";
import ArtCard from "@/components/Art/ArtCard";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useMusic } from "@/store/useMusic";

export default function SubmissionsPage() {
  const [tab, setTab] = useState<"music" | "arts">("music");
  const [music, setMusic] = useState<any[]>([]);
  const [arts, setArts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  // Global Music Player
  const { play } = useMusic();

  // Load data when page loads
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    // ⭐ Load music
    const { data: musicData } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });

    // ⭐ Load art
    const { data: artsData } = await supabase
      .from("art")
      .select("*")
      .order("created_at", { ascending: false });

    setMusic(musicData || []);
    setArts(artsData || []);

    setLoading(false);
  };

  const items = tab === "music" ? music : arts;

  // ⭐ Lightbox
  const openLightbox = (index: number) => {
    setLightboxImages(arts.map((a) => a.image_url));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // ⭐ Music Player Functions
  const handlePlaySong = (song: any) => {
    // Create playlist from current music list, filtering out invalid songs
    const validSongs = music.filter(s => s.audio_url || s.song_url);

    const playlist = validSongs.map(s => ({
      url: s.audio_url || s.song_url,
      title: s.title,
      artist: s.artist,
      cover_url: s.cover_url
    }));

    const index = validSongs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      play(playlist, index);
    } else {
      alert("This song has no valid audio URL.");
    }
  };

  const handleDeleteSong = async (song: any) => {
    if (!confirm("Are you sure you want to delete this song?")) return;

    const { error } = await supabase.from("songs").delete().eq("id", song.id);
    if (error) {
      alert("Error deleting song: " + error.message);
    } else {
      setMusic(music.filter((s) => s.id !== song.id));
      alert("Song deleted successfully!");
    }
  };

  const handleEditSong = (song: any) => {
    window.location.href = `/submit-music?id=${song.id}`;
  };

  const handleDownloadSong = async (song: any) => {
    const url = song.audio_url || song.song_url;
    if (!url) return alert("No audio URL found");

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${song.title || 'song'}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("Download failed", e);
      window.open(url, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-10 pb-32">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">My submissions</h2>

      {/* Tabs */}
      <div className="flex gap-10 items-center border-b border-[var(--border)] pb-1 mb-6">
        <button
          onClick={() => setTab("music")}
          className={`pb-2 flex items-center gap-1 ${tab === "music" ? "text-red-400 border-b-2 border-red-400" : "text-[var(--text-secondary)]"
            }`}
        >
          🎵 Music
        </button>

        <button
          onClick={() => setTab("arts")}
          className={`pb-2 flex items-center gap-1 ${tab === "arts" ? "text-red-400 border-b-2 border-red-400" : "text-[var(--text-secondary)]"
            }`}
        >
          🖼️ Arts
        </button>
      </div>

      {/* Empty */}
      {!loading && items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mt-20"
        >
          <div className="w-32 h-32 bg-[var(--card)] rounded-full flex items-center justify-center mb-6">
            <span className="text-6xl">{tab === "music" ? "🎵" : "🖼️"}</span>
          </div>

          <p className="mt-6 text-lg font-medium">
            You have not submitted {tab === "music" ? "music" : "art"} yet.
          </p>
          <p className="opacity-60 mb-4">Click to submit</p>

          <button
            onClick={() =>
              window.location.href = tab === "music" ? "/submit-music" : "/submit-art"
            }
            className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Submit {tab === "music" ? "music" : "art"}
          </button>
        </motion.div>
      )}

      {/* GRID */}
      {!loading && items.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              {tab === "music" ? (
                <SongCard
                  song={item}
                  onPlay={() => handlePlaySong(item)}
                  onEdit={() => handleEditSong(item)}
                  onDownload={() => handleDownloadSong(item)}
                  onDelete={() => handleDeleteSong(item)}
                />
              ) : (
                <ArtCard
                  item={item}
                  onOpen={() => openLightbox(i)}
                />
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox for ART */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages.map((src) => ({ src }))}
        index={lightboxIndex}
        plugins={[Zoom]}
      />
    </div>
  );
}
