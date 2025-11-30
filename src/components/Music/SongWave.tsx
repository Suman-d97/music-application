"use client";

import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function SongWave({
  url,
  height = 48,
  onReady,
}: {
  url: string | null;
  height?: number;
  onReady?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!url) {
      // destroy if exists
      waveRef.current?.destroy?.();
      waveRef.current = null;
      return;
    }

    // destroy previous
    waveRef.current?.destroy?.();

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#6b7280",
      progressColor: "#ef4444",
      cursorColor: "#ef4444",
      height,
      normalize: true,
    });

    wavesurfer.load(url);

    wavesurfer.on("ready", () => {
      onReady?.();
    });

    waveRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
      waveRef.current = null;
    };
  }, [url, height, onReady]);

  return <div ref={containerRef} />;
}
