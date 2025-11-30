"use client";

import React from "react";

export default function EmptyMusicList() {
  return (
    <div className="py-20 text-center text-white flex flex-col items-center gap-5">
      <div className="w-40 h-40 rounded-lg bg-[#151515] flex items-center justify-center">
        <svg className="w-20 h-20 text-gray-600" viewBox="0 0 24 24" fill="none">
          <path d="M9 17V5l12-2v12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold">You have not submitted music yet.</h3>
      <p className="text-gray-400">Click to submit</p>

      <a
        href="/(dashboard)/submit-music"
        className="bg-[#ef476f] px-6 py-3 rounded-lg text-white"
      >
        Submit music
      </a>
    </div>
  );
}
