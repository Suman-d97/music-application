"use client";

import Lottie from "lottie-react";
import loaderAnimation from "../../../public/animation/loader.json";

interface LottieLoaderProps {
  size?: number;
  message?: string;
}

export default function LottieLoader({ size = 200, message }: LottieLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div style={{ width: size, height: size }}>
        <Lottie
          animationData={loaderAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
      {message && (
        <p className="text-white text-lg font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

// Full-screen overlay loader
export function LottieLoaderOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <LottieLoader size={250} message={message} />
    </div>
  );
}
