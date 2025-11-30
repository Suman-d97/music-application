"use client";

import React from "react";
import SongCard from "./SongCard";

export default function SubmissionList({
  items,
  onPlay,
}: {
  items: any[];
  onPlay: (song: any) => void;
}) {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((song) => (
        <SongCard
          key={song.id}
          song={song}                     // changed: pass the full song object
          onPlay={() => onPlay(song)}
        />
      ))}
    </div>
  );
}
