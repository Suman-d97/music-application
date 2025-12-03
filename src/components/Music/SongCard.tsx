

"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

interface SongCardProps {
  song: {
    id?: string;
    title?: string;
    artist?: string;
    cover_url?: string;
    audio_url?: string;
  };
  onPlay?: (song: any) => void;
  onDownload?: (song: any) => void;
  onEdit?: (song: any) => void;
  onDelete?: (song: any) => void;
}

export default function SongCard({ song, onPlay, onDownload, onEdit, onDelete }: SongCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[var(--card)] p-3 rounded-lg border border-[var(--border)] relative group">
      <div
        className="h-40 bg-[var(--bg-secondary)] rounded-lg mb-3 flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => onPlay?.(song)}
      >
        {song.cover_url ? (
          // use Next <Image> if you have next/image, otherwise img
          <img className="w-full h-full object-cover rounded-lg" src={song.cover_url} alt={song.title} />
        ) : (
          <svg className="w-14 h-14 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path d="M9 17V5l12-2v12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[var(--text)] font-medium leading-tight">{song.title || "Untitled"}</div>
          <div className="text-[var(--text-secondary)] text-sm">{song.artist || "Unknown Artist"}</div>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="p-1 rounded hover:bg-[var(--hover)] transition"
            aria-label="menu"
          >
            <MoreVertical size={18} className="text-[var(--text-secondary)]" />
          </button>

          {menuOpen && (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute right-0 mt-2 w-40 bg-[var(--dropdown-bg)] border border-[var(--border)] rounded shadow-lg z-20"
            >
              <button
                onClick={() => {
                  onEdit?.(song);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[var(--hover)]"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  onDownload?.(song);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[var(--hover)]"
              >
                Download
              </button>

              <button
                onClick={() => {
                  onDelete?.(song);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[var(--hover)] text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
