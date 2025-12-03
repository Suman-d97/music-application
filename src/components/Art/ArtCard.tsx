

"use client";

import React from "react";

export default function ArtCard({
  item,
  onOpen,
}: {
  item: {
    id?: string;
    title?: string;
    artist?: string;
    image_url?: string;
    credit_url?: string;
  };
  onOpen?: (url?: string) => void;
}) {
  return (
    <div className="bg-[var(--card)] p-3 rounded-xl border border-[var(--border)] overflow-hidden">
      <div
        className="h-40 w-full rounded-lg overflow-hidden cursor-pointer"
        onClick={() => onOpen?.(item.image_url)}
      >
        <img className="object-cover w-full h-full" src={item.image_url || "/placeholder.png"} alt={item.title} />
      </div>

      <div className="mt-3">
        <div className="text-[var(--text)] font-medium">{item.title || "Artwork"}</div>
        <div className="text-[var(--text-secondary)] text-sm">{item.artist || "Unknown"}</div>
      </div>
    </div>
  );
}
