

"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

export default function ArtCard({
  item,
  onOpen,
  onEdit,
  onDownload,
  onDelete,
}: {
  item: {
    id?: string;
    title?: string;
    artist?: string;
    image_url?: string;
    credit_url?: string;
    // Database fields
    artist_name?: string;
    art_type?: string;
  };
  onOpen?: (url?: string) => void;
  onEdit?: (item: any) => void;
  onDownload?: (item: any) => void;
  onDelete?: (item: any) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-[var(--card)] shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Image Container */}
      <div
        className="aspect-square w-full overflow-hidden cursor-pointer relative"
        onClick={() => onOpen?.(item.image_url)}
      >
        <img
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
          src={item.image_url || "/placeholder.png"}
          alt={item.title || item.art_type}
        />
        
        {/* Overlay Gradient (Better visibility for text) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Play/View Icon (Optional, appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {/* You could add a zoom/eye icon here if desired */}
        </div>
      </div>

      {/* Info Overlay (Positioned at bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-lg leading-tight truncate drop-shadow-md">
          {item.title || item.art_type || "Artwork"}
        </h3>
        <p className="text-gray-300 text-sm mt-1 truncate drop-shadow-sm">
          {item.artist || item.artist_name || "Unknown"}
        </p>
      </div>

      {/* Menu Button (Top Right) */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((s) => !s);
            }}
            className={`p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition ${menuOpen ? 'opacity-100' : ''}`}
            aria-label="menu"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute right-0 top-full mt-2 w-40 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-30 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit?.(item);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[var(--hover)] text-[var(--text)] transition-colors"
                >
                  Edit
                </button>
              )}

              {onDownload && (
                <button
                  onClick={() => {
                    onDownload?.(item);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[var(--hover)] text-[var(--text)] transition-colors"
                >
                  Download
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => {
                    onDelete?.(item);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-red-500/10 text-red-500 hover:text-red-600 transition-colors"
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
