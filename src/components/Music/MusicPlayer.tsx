
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "@/store/useMusic";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { url, title, isPlaying } = useMusic();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !url) return;

    audio.src = url;   // change song
    audio.play();
    setPlaying(true);
  }, [url]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  if (!url) return null; // hide player until a song is played

  return (
    <div className="fixed bottom-6 right-6 left-6 max-w-3xl mx-auto bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl p-4 shadow-xl text-white flex items-center gap-4">
      <audio ref={audioRef} />

      <button
        onClick={toggle}
        className="w-12 h-12 rounded-full bg-[#ef476f] flex items-center justify-center"
      >
        {playing ? "❚❚" : "▶"}
      </button>

      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">Now playing</p>
      </div>
    </div>
  );
}





