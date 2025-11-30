"use client";

import React from "react";

interface AlbumCardProps {
  id: string;
  title: string;
  artist?: string;
  cover?: string;
  onOpen?: (id: string) => void;
}

export default function AlbumCard({ id, title, artist, cover, onOpen }: AlbumCardProps) {
  return (
    <div
      className="bg-[#1b1b1b] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-md cursor-pointer"
      onClick={() => onOpen && onOpen(id)}
    >
      <img
        src={cover || "/placeholder.png"}
        className="w-full h-40 object-cover opacity-80"
      />

      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{artist || "Unknown Artist"}</p>
      </div>
    </div>
  );
}
