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
    <div className="flex flex-col space-y-2">
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
