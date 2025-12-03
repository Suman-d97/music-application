

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
  };
  onOpen?: (url?: string) => void;
  onEdit?: (item: any) => void;
  onDownload?: (item: any) => void;
  onDelete?: (item: any) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--border)] relative">
      <div
        className="h-40 w-full rounded-lg overflow-hidden cursor-pointer"
        onClick={() => onOpen?.(item.image_url)}
      >
        <img className="object-cover w-full h-full" src={item.image_url || "/placeholder.png"} alt={item.title} />
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <div className="text-[var(--text)] font-medium">{item.title || "Artwork"}</div>
          <div className="text-[var(--text-secondary)] text-sm">{item.artist || "Unknown"}</div>
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
                  onEdit?.(item);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[var(--hover)] text-[var(--text)]"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  onDownload?.(item);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[var(--hover)] text-[var(--text)]"
              >
                Download
              </button>

              <button
                onClick={() => {
                  onDelete?.(item);
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
