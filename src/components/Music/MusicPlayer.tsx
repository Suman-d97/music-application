
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "@/store/useMusic";
import { useUser } from "@supabase/auth-helpers-react";
import { 
  AlertCircle, Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Loader2, Music4 
} from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { playlist, currentIndex, isPlaying, toggle, next, prev, setPlaying } = useMusic();
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    setError(null);
    setIsLoading(true); // Start loading when song changes
    console.log("MusicPlayer: Loading song", currentSong.title);

    if (!currentSong.url) {
      console.error("MusicPlayer: No URL for song", currentSong);
      setIsLoading(false);
      return;
    }

    const playAudio = async () => {
      try {
        audio.src = currentSong.url;
        audio.load();
        // We wait for 'canplay' event to clear laoding state naturally, 
        // but if we are already playing, we try to play immediately.
        if (isPlaying) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
             playPromise
               .catch(error => {
                 if (error.name !== 'AbortError') {
                    console.error("MusicPlayer: Playback auto-start failed", error);
                 }
               });
          }
        }
      } catch (error) {
        console.error("MusicPlayer: Setup failed", error);
        setIsLoading(false);
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
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
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

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handleAudioError = (e: any) => {
    setIsLoading(false);
    const audio = e.target as HTMLAudioElement;
    console.error("MusicPlayer: Audio error", audio.error);

    let errorMessage = "Playback error";
    if (audio.error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
      errorMessage = "Invalid Source";
    } else if (audio.error?.code === MediaError.MEDIA_ERR_NETWORK) {
      errorMessage = "Network Error";
    } else if (audio.error?.code === MediaError.MEDIA_ERR_DECODE) {
      errorMessage = "Corrupted File";
    }

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

  if (!user || !currentSong) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 px-4 z-[100] flex justify-center pointer-events-none">
      <div 
        className="
          pointer-events-auto
          w-full max-w-4xl 
          bg-black/60 backdrop-blur-xl border border-white/10 
          rounded-2xl shadow-2xl shadow-black/50
          p-4 flex flex-col sm:flex-row items-center gap-4
          transition-all duration-300 ease-in-out
          hover:bg-black/70
        "
      >
        {/* Error Alert */}
        {error && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs py-1.5 px-4 rounded-full flex items-center gap-2 backdrop-blur-sm shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <audio
          ref={audioRef}
          onEnded={next}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={() => setIsLoading(false)}
          onError={handleAudioError}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        {/* Song Info - Visible on Mobile now */}
        <div className="flex items-center gap-3 w-full sm:w-1/4 min-w-[120px]">
          <div className="relative group shrink-0">
            {currentSong.cover_url ? (
              <img
                src={currentSong.cover_url}
                alt={currentSong.title}
                className={`w-12 h-12 rounded-lg object-cover shadow-lg ring-1 ring-white/10 ${isPlaying ? 'animate-pulse-slow' : ''}`}
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Music4 className="text-white/60" size={20} />
              </div>
            )}
            {/* Playing Indicator Overlay */}
            {isPlaying && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                <div className="flex gap-0.5 items-end h-3">
                  <span className="w-1 bg-white/80 rounded-full animate-music-bar-1 h-3"></span>
                  <span className="w-1 bg-white/80 rounded-full animate-music-bar-2 h-2"></span>
                  <span className="w-1 bg-white/80 rounded-full animate-music-bar-3 h-3"></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="overflow-hidden">
            <h3 className="font-semibold text-white/95 text-sm truncate leading-tight">
              {currentSong.title}
            </h3>
            <p className="text-white/60 text-xs truncate">
              {currentSong.artist || "Unknown Artist"}
            </p>
          </div>
        </div>

        {/* Controls - Center */}
        <div className="flex flex-col items-center w-full gap-2">
          {/* Buttons */}
          <div className="flex items-center gap-6">
            <button 
              onClick={prev} 
              className="text-white/60 hover:text-white transition-colors hover:scale-110 active:scale-95"
              disabled={isLoading}
            >
              <SkipBack size={22} />
            </button>

            <button
              onClick={toggle}
              disabled={isLoading}
              className={`
                relative
                flex items-center justify-center
                w-10 h-10 rounded-full 
                bg-white text-black 
                hover:scale-105 active:scale-95 
                transition-all shadow-lg shadow-white/10
                disabled:opacity-80 disabled:hover:scale-100
              `}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" className="ml-0.5" />
              )}
            </button>

            <button 
              onClick={next} 
              className="text-white/60 hover:text-white transition-colors hover:scale-110 active:scale-95"
              disabled={isLoading}
            >
              <SkipForward size={22} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full max-w-md group/progress">
            <span className="text-[10px] text-white/40 tabular-nums w-8 text-right font-medium">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 h-3 flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="
                  absolute z-20 w-full h-3 opacity-0 cursor-pointer
                "
              />
              <div className="absolute left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white/90 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>
              {/* Thumb Indicator - only shows on hover group */}
              <div 
                className="
                  absolute h-2.5 w-2.5 bg-white rounded-full 
                  shadow-[0_0_10px_rgba(255,255,255,0.5)]
                  opacity-0 group-hover/progress:opacity-100 
                  transition-opacity duration-200 pointer-events-none
                "
                style={{ 
                  left: `${(currentTime / (duration || 1)) * 100}%`,
                  transform: 'translateX(-50%)' 
                }}
              />
            </div>
            <span className="text-[10px] text-white/40 tabular-nums w-8 font-medium">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume - Desktop Only */}
        <div className="hidden sm:flex items-center gap-3 w-1/4 justify-end min-w-[120px]">
          <button 
            onClick={toggleMute} 
            className="text-white/60 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="relative w-20 h-3 flex items-center group/volume">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="absolute z-20 w-full h-3 opacity-0 cursor-pointer"
            />
            <div className="absolute left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden">
               <div 
                  className="h-full bg-white/70 rounded-full transition-all duration-150"
                  style={{ width: `${volume * 100}%` }}
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}








