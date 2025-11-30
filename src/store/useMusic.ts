"use client";

import { create } from "zustand";

interface MusicState {
  url: string | null;
  title: string | null;
  isPlaying: boolean;
  play: (url: string, title: string) => void;
}

export const useMusic = create<MusicState>((set) => ({
  url: null,
  title: null,
  isPlaying: false,

  play: (url: string, title: string) =>
    set({
      url,
      title,
      isPlaying: true,
    }),
}));
