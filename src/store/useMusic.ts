"use client";

import { create } from "zustand";

interface Song {
  url: string;
  title: string;
  artist?: string;
  cover_url?: string;
}

interface MusicState {
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;

  // Actions
  play: (playlist: Song[], index?: number) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setPlaying: (playing: boolean) => void;
  reset: () => void;
}

export const useMusic = create<MusicState>((set, get) => ({
  playlist: [],
  currentIndex: 0,
  isPlaying: false,

  play: (playlist: Song[], index = 0) =>
    set({
      playlist,
      currentIndex: index,
      isPlaying: true,
    }),

  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setPlaying: (playing: boolean) => set({ isPlaying: playing }),

  next: () =>
    set((state) => {
      if (state.currentIndex < state.playlist.length - 1) {
        return { currentIndex: state.currentIndex + 1, isPlaying: true };
      }
      return {};
    }),

  prev: () =>
    set((state) => {
      if (state.currentIndex > 0) {
        return { currentIndex: state.currentIndex - 1, isPlaying: true };
      }
      return {};
    }),

  reset: () =>
    set({
      playlist: [],
      currentIndex: 0,
      isPlaying: false,
    }),
}));
