
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "@/store/useMusic";
import { AlertCircle, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { playlist, currentIndex, isPlaying, toggle, next, prev, setPlaying } = useMusic();
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const currentSong = playlist[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    setError(null); // Reset error on song change
    console.log("MusicPlayer: Loading song", currentSong.title, "URL:", currentSong.url);

    if (!currentSong.url) {
      console.error("MusicPlayer: No URL for song", currentSong);
      return;
    }

    const playAudio = async () => {
      try {
        audio.src = currentSong.url;
        audio.load();
        if (isPlaying) {
          await audio.play();
        }
      } catch (error) {
        if ((error as any).name !== 'AbortError') {
          console.error("MusicPlayer: Playback failed", error);
        }
      }
    };

    playAudio();
  }, [currentSong, currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const toggleAudio = async () => {
      try {
        if (isPlaying) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        if ((error as any).name !== 'AbortError') {
          console.error("MusicPlayer: Toggle failed", error);
        }
      }
    };

    toggleAudio();
  }, [isPlaying]);

  const handleAudioError = (e: any) => {
    const audio = e.target as HTMLAudioElement;
    console.error("MusicPlayer: Audio error", audio.error);

    let errorMessage = "Playback error";
    if (audio.error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
      errorMessage = "Source not supported or invalid URL";
      console.error("MusicPlayer: Source not supported or invalid URL:", audio.src);
    } else if (audio.error?.code === MediaError.MEDIA_ERR_NETWORK) {
      errorMessage = "Network error - check your connection";
    } else if (audio.error?.code === MediaError.MEDIA_ERR_DECODE) {
      errorMessage = "Decoding error - file may be corrupted";
    }

    setError(errorMessage);
    setPlaying(false);
    setError(errorMessage);
    setPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.muted = newMutedState;
      // Optional: Reset volume slider if unmuted, or set to 0 if muted
      if (newMutedState) {
        setVolume(0);
        audioRef.current.volume = 0;
      } else {
        setVolume(1);
        audioRef.current.volume = 1;
      }
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--card)] border-t border-[var(--border)] px-4 py-3 z-50 flex items-center justify-between">
      {error && (
        <div className="absolute bottom-full left-0 right-0 bg-red-500/90 text-white text-xs py-1 px-4 text-center flex items-center justify-center gap-2 backdrop-blur-sm">
          <AlertCircle size={12} />
          {error}
        </div>
      )}
      <audio
        ref={audioRef}
        onEnded={next}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onError={handleAudioError}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Song Info */}
      <div className="flex items-center gap-4 w-[30%]">
        {currentSong.cover_url && (
          <img
            src={currentSong.cover_url}
            alt={currentSong.title}
            className="w-14 h-14 rounded object-cover"
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 w-[40%]">
        <div className="flex items-center gap-6">
          <button onClick={prev} className="text-[var(--text-secondary)] hover:text-[var(--text)] transition">
            <SkipBack size={24} />
          </button>

          <button
            onClick={toggle}
            className="text-[var(--text)] hover:scale-105 transition"
          >
            {isPlaying ? (
              <Pause size={32} />
            ) : (
              <Play size={32} fill="currentColor" />
            )}
          </button>

          <button onClick={next} className="text-[var(--text-secondary)] hover:text-[var(--text)] transition">
            <SkipForward size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-xs text-[var(--text-secondary)] w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
          />
          <span className="text-xs text-[var(--text-secondary)] w-10">{formatTime(duration)}</span>
        </div>

        {/* Song Details (Centered at bottom) */}
        <div className="text-center mt-1">
          <h3 className="font-semibold text-[var(--text)] text-sm">{currentSong.title}</h3>
          <p className="text-[var(--text-secondary)] text-xs">{currentSong.artist || "Unknown Artist"}</p>
        </div>

        {/* Volume Controls (Centered) */}
        <div className="flex justify-center items-center gap-2 mt-2">
          <button onClick={toggleMute} className="text-[var(--text-secondary)] hover:text-[var(--text)] transition">
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
          />
        </div>
      </div>

      {/* Right Side - Empty for now */}
      <div className="w-[30%] flex justify-end items-center gap-2">
      </div>
    </div>
  );
}








