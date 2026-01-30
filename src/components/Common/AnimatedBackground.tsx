"use client";

import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-white dark:bg-[#0f1113] transition-colors duration-500 ease-in-out" />
      
      {/* Blob 1 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
      
      {/* Blob 2 */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Blob 3 */}
      <div 
        className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob"
        style={{ animationDelay: '4s' }}
      />
      
      {/* Overlay to smooth things out */}
      <div className="absolute inset-0 backdrop-blur-[100px]" />
    </div>
  );
};

export default AnimatedBackground;
