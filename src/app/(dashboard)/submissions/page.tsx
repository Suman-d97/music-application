"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { motion } from "framer-motion";
import SongCard from "@/components/Music/SongCard";
import ArtCard from "@/components/Art/ArtCard";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { useMusic } from "@/store/useMusic";

export default function SubmissionsPage() {
  const [tab, setTab] = useState<"music" | "arts">("music");
  const [music, setMusic] = useState<any[]>([]);
  const [arts, setArts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Store full slide objects instead of just strings
  const [slides, setSlides] = useState<any[]>([]);

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

    // Prepare slides for lightbox
    if (artsData) {
      const formattedSlides = artsData.map((art) => ({
        src: art.image_url,
        title: art.title || "Untitled Artwork",
        description: art.artist ? `by ${art.artist}` : undefined,
        downloadUrl: art.image_url, // For download plugin
      }));
      setSlides(formattedSlides);
    }

    setLoading(false);
  };

  const items = tab === "music" ? music : arts;

  // ⭐ Lightbox
  const openLightbox = (index: number) => {
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

  // ⭐ Art Handler Functions
  const handleDeleteArt = async (art: any) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;

    const { error } = await supabase.from("art").delete().eq("id", art.id);
    if (error) {
      alert("Error deleting artwork: " + error.message);
    } else {
      setArts(arts.filter((a) => a.id !== art.id));
      alert("Artwork deleted successfully!");
    }
  };

  const handleEditArt = (art: any) => {
    window.location.href = `/submit-art?id=${art.id}`;
  };

  const handleDownloadArt = async (art: any) => {
    const url = art.image_url;
    if (!url) return alert("No image URL found");

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${art.title || 'artwork'}.jpg`;
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-3 sm:px-4 md:px-6 py-6 md:py-10 pb-24 md:pb-32">

      {/* Title */}
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">My submissions</h2>

      {/* Tabs */}
      <div className="flex gap-6 md:gap-10 items-center border-b border-[var(--border)] pb-1 mb-4 md:mb-6">
        <button
          onClick={() => setTab("music")}
          className={`pb-2 flex items-center gap-1 text-sm md:text-base ${tab === "music" ? "text-red-400 border-b-2 border-red-400" : "text-[var(--text-secondary)]"
            }`}
        >
          🎵 Music
        </button>

        <button
          onClick={() => setTab("arts")}
          className={`pb-2 flex items-center gap-1 text-sm md:text-base ${tab === "arts" ? "text-red-400 border-b-2 border-red-400" : "text-[var(--text-secondary)]"
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
          className="flex flex-col items-center mt-12 md:mt-20"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-[var(--card)] rounded-full flex items-center justify-center mb-4 md:mb-6">
            <span className="text-5xl md:text-6xl">{tab === "music" ? "🎵" : "🖼️"}</span>
          </div>

          <p className="mt-4 md:mt-6 text-base md:text-lg font-medium">
            You have not submitted {tab === "music" ? "music" : "art"} yet.
          </p>
          <p className="opacity-60 mb-3 md:mb-4 text-sm md:text-base">Click to submit</p>

          <button
            onClick={() =>
              window.location.href = tab === "music" ? "/submit-music" : "/submit-art"
            }
            className="bg-red-500 px-4 md:px-5 py-2 rounded-xl hover:bg-red-600 transition text-sm md:text-base"
          >
            Submit {tab === "music" ? "music" : "art"}
          </button>
        </motion.div>
      )}

      {/* GRID */}
      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
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
                  onEdit={() => handleEditArt(item)}
                  onDownload={() => handleDownloadArt(item)}
                  onDelete={() => handleDeleteArt(item)}
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
        slides={slides}
        index={lightboxIndex}
        plugins={[Zoom, Captions, Thumbnails, Download, Fullscreen]}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          captionsTitle: { fontSize: "20px", fontWeight: "bold" },
          captionsDescription: { fontSize: "16px", color: "#ccc" },
        }}
      />
    </div>
  );
}
