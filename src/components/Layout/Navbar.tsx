"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="w-full">
      {/* Purple Banner with Greeting */}
      <div className="relative w-full h-40 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 rounded-3xl mx-6 mt-6 flex items-center justify-between px-12 overflow-hidden">
        {/* Left: Greeting Text */}
        <div className="z-10">
          <h1 className="text-5xl font-bold text-white mb-2">
            Hello, {userName}!
          </h1>
          <p className="text-white/90 text-lg">Welcome back to Myfile</p>
        </div>

        {/* Center: Illustration */}
        <div className="absolute right-32 top-1/2 -translate-y-1/2">
          <div className="relative w-64 h-32">
            {/* Decorative elements */}
            <div className="absolute top-4 left-8 w-3 h-3 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-8 left-4 w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full"></div>

            {/* Illustration placeholder - you can replace with actual image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-28 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-white/60 text-sm">Dashboard Illustration</span>
              </div>
            </div>

            {/* Plant decorations */}
            <div className="absolute bottom-0 left-0 w-8 h-12 bg-white/20 rounded-t-full"></div>
            <div className="absolute bottom-0 right-0 w-8 h-12 bg-white/20 rounded-t-full"></div>
          </div>
        </div>

        {/* Right: User Profile */}
        <div className="z-10 flex items-center gap-4">
          {/* Profile Icon */}
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* User Avatar & Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <span className="text-white font-medium">{userName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
