"use client";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "@/utils/supabaseClient";
import { motion } from "framer-motion";
import SongCard from "@/components/Music/SongCard";
import ArtCard from "@/components/Art/ArtCard";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Play, Pause } from "lucide-react";

export default function SubmissionsPage() {
  const [tab, setTab] = useState<"music" | "arts">("music");
  const [music, setMusic] = useState<any[]>([]);
  const [arts, setArts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  // Music player state
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    console.log("Attempting to play song:", song);
    const url = song.audio_url || song.song_url;
    console.log("Audio URL:", url);

    if (!url) {
      alert("Error: No audio URL found for this song!");
      return;
    }

    if (currentSong?.id === song.id) {
      // Toggle play/pause for same song
      togglePlayPause();
    } else {
      // Play new song
      setCurrentSong(song);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 pb-32">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">My submissions</h2>

      {/* Tabs */}
      <div className="flex gap-10 items-center border-b border-gray-700 pb-1 mb-6">
        <button
          onClick={() => setTab("music")}
          className={`pb-2 flex items-center gap-1 ${tab === "music" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
            }`}
        >
          🎵 Music
        </button>

        <button
          onClick={() => setTab("arts")}
          className={`pb-2 flex items-center gap-1 ${tab === "arts" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
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
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-6">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
                  onEdit={() => console.log("Edit", item)}
                  onDownload={() => window.open(item.audio_url || item.song_url, "_blank")}
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

      {/* ⭐ MUSIC PLAYER - Fixed at bottom */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-t border-gray-800 p-4 shadow-2xl z-50">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            {/* Audio element with CONTROLS for debugging */}
            <audio
              ref={audioRef}
              controls
              className="hidden" // Keep hidden but available for logic
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" fill="white" />
              ) : (
                <Play size={20} className="text-white ml-1" fill="white" />
              )}
            </button>

            {/* Song Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-white">{currentSong.title}</h3>
              <p className="text-gray-400 text-sm">{currentSong.artist}</p>
              {/* Debug URL display */}
              <p className="text-[10px] text-gray-600 truncate max-w-md">
                {currentSong.audio_url || currentSong.song_url}
              </p>
            </div>

            {/* Now Playing Badge */}
            <div className="hidden md:block">
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">
                Now Playing
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
