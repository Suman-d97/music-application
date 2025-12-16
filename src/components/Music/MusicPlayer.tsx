
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "@/store/useMusic";
import { useUser } from "@supabase/auth-helpers-react";
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

  const user = useUser();

  useEffect(() => {
    console.log("MusicPlayer Render Check:", { 
      hasUser: !!user, 
      hasSong: !!currentSong, 
      isPlaying,
      user
    });
  }, [user, currentSong, isPlaying]);

  if (!user || !currentSong) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--card)] border border-[var(--border)] px-5 py-3 z-[100] flex items-center justify-center gap-4 rounded-2xl shadow-2xl backdrop-blur-md w-auto max-w-[95vw]">
      {error && (
        <div className="absolute bottom-full left-0 right-0 bg-red-500/90 text-white text-xs py-1 px-4 text-center flex items-center justify-center gap-2 backdrop-blur-sm rounded-t-xl mb-1">
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
      <div className="flex items-center gap-3 w-auto min-w-[140px] justify-end">
        <div className="text-right hidden sm:block">
          <h3 className="font-semibold text-[var(--text)] text-xs truncate max-w-[120px]">{currentSong.title}</h3>
          <p className="text-[var(--text-secondary)] text-[10px] truncate max-w-[120px]">{currentSong.artist || "Unknown Artist"}</p>
        </div>
        {currentSong.cover_url && (
          <img
            src={currentSong.cover_url}
            alt={currentSong.title}
            className="w-10 h-10 rounded-lg object-cover shadow-md"
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1 w-full max-w-md">
        <div className="flex items-center gap-4">
          <button onClick={prev} className="text-[var(--text-secondary)] hover:text-[var(--text)] transition">
            <SkipBack size={20} />
          </button>

          <button
            onClick={toggle}
            className="text-[var(--text)] hover:scale-105 transition bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full shadow-lg"
          >
            {isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} fill="white" className="text-white" />
            )}
          </button>

          <button onClick={next} className="text-[var(--text-secondary)] hover:text-[var(--text)] transition">
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-[10px] text-[var(--text-secondary)] w-8 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
          />
          <span className="text-[10px] text-[var(--text-secondary)] w-8">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Controls - Right Side */}
      <div className="hidden lg:flex items-center gap-2 w-auto min-w-[140px]">
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
          className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
        />
      </div>
    </div>
  );
}








