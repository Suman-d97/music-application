"use client";

import Lottie from "lottie-react";
import loaderAnimation from "../../../public/animation/loader.json";

export default function AuthLoader() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Lottie Animation */}
        <div className="w-64 h-64">
          <Lottie
            animationData={loaderAnimation}
            loop={true}
            autoplay={true}
          />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-white text-xl font-semibold">Music Hub</h3>
          <p className="text-gray-400 text-sm mt-1">Please wait...</p>
        </div>
      </div>
    </div>
  );
}
