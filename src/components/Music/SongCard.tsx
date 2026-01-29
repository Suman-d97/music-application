

"use client";

import React, { useState } from "react";
import { MoreVertical, Music, Play, Pause } from "lucide-react";
import Image from "next/image";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group flex items-center justify-between p-2 rounded-lg hover:bg-[var(--hover)] transition-colors border border-transparent hover:border-[var(--border)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left: Image & Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0" onClick={() => onPlay?.(song)}>
        {/* Image Container with Play Overlay */}
        <div className="relative w-12 h-12 shrink-0 cursor-pointer rounded overflow-hidden bg-[var(--bg-secondary)]">
          {song.cover_url ? (
            <Image
              src={song.cover_url}
              alt={song.title || "Song cover"}
              fill
              className={`object-cover transition-opacity duration-200 ${isHovered ? 'opacity-60' : 'opacity-100'}`}
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              <Music size={20} />
            </div>
          )}
          
          {/* Play Icon on Hover */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
             <Play size={20} className="text-[var(--purple-primary)] fill-[var(--purple-primary)]" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col truncate cursor-pointer">
          <span className="text-[var(--text)] font-medium text-sm truncate group-hover:text-[var(--purple-primary)] transition-colors">
            {song.title || "Untitled"}
          </span>
          <span className="text-[var(--text-secondary)] text-xs truncate">
            {song.artist || "Unknown Artist"}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Menu (edit/delete/download) - Visible on hover only or if menu open */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((s) => !s);
            }}
            className={`p-2 rounded-full hover:bg-[var(--hover)] text-[var(--text-secondary)] hover:text-[var(--text)] transition-opacity ${menuOpen || isHovered ? 'opacity-100' : 'opacity-0'}`}
            aria-label="menu"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute right-0 top-full mt-1 w-40 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-xl z-20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit(song);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--hover)] text-[var(--text)] transition-colors"
                >
                  Edit
                </button>
              )}

              {onDownload && (
                <button
                  onClick={() => {
                    onDownload(song);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--hover)] text-[var(--text)] transition-colors"
                >
                  Download
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => {
                    onDelete(song);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-500/10 text-red-500 hover:text-red-600 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
