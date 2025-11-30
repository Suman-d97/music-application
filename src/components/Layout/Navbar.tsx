
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Sun, User } from "lucide-react";
import Image from "next/image";

export default function HeaderBanner() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <div className="w-full">
      {/* OUTER WRAPPER FOR SPACING */}
      <div className="mt-8 mx-6 flex items-center justify-between">

        {/* LEFT PURPLE BANNER */}
        <div
          className="
            relative 
            w-[80%] 
            h-[140px]
            bg-gradient-to-r from-[#8268FF] to-[#9D7FFF]
            rounded-[32px] 
            flex items-center pl-12
            overflow-hidden
            shadow-xl
          "
        >
          {/* LEFT TEXT */}
          <div className="z-10">
            <h1 className="text-[42px] font-extrabold text-white leading-tight">
              Hello, {userName}!
            </h1>
            <p className="text-white/90 text-[18px] mt-1">
              Welcome back to Myfile
            </p>
          </div>

          {/* RIGHT ILLUSTRATION - Decorative Elements */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <div className="relative w-64 h-32">
              {/* Decorative dots */}
              <div className="absolute top-4 left-8 w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-8 left-4 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full"></div>

              {/* Illustration placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/banner/banner.png"
                  width={300}
                  height={200}
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PROFILE SECTION (ICON + AVATAR + NAME) */}
        <div className="flex items-center gap-4">
          {/* SETTINGS/THEME ICON */}
          <div className="w-[48px] h-[48px] rounded-lg bg-[#1F1F1F] border border-[#333] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors cursor-pointer">
            <Sun size={22} className="text-gray-300" />
          </div>

          {/* AVATAR + NAME */}
          <div className="flex items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>

            <span className="text-white text-[16px] font-medium">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
