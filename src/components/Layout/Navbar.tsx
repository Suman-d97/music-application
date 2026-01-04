
"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Sun, Moon, User, LogOut, Settings, RefreshCw } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMusic } from "@/store/useMusic";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderBanner() {
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useThemeStore();
  const { reset } = useMusic();

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    loadUser();

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    reset(); // Reset music player state
    await supabase.auth.signOut();
    router.push("/");
  };

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="w-full">
      {/* OUTER WRAPPER FOR SPACING */}
      <div className="mt-4 md:mt-8 mx-3 md:mx-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-0">

        {/* LEFT PURPLE BANNER */}
        <div
          style={{
            background: `linear-gradient(to right, var(--banner-gradient-from), var(--banner-gradient-to))`
          }}
          className="
            relative 
            w-full md:w-[80%] 
            min-h-[100px] h-auto
            rounded-2xl md:rounded-[32px] 
            flex items-center px-4 py-4 sm:px-6 md:pl-12
            overflow-hidden
            shadow-xl
            transition-all duration-300
          "
        >
          {/* LEFT TEXT */}
          <div className="z-10">
            <h1 className="text-xl sm:text-3xl md:text-[42px] font-extrabold text-white leading-tight">
              Hello, <span className="whitespace-nowrap">{userName}!</span>
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-[18px] mt-0.5 md:mt-1">
              Welcome back to Music Hub 🎶
            </p>
          </div>

          {/* RIGHT ILLUSTRATION - Decorative Elements */}
          <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2">
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
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PROFILE SECTION (ICON + AVATAR + NAME) */}
        <div className="flex items-center gap-2 md:gap-4 justify-end md:justify-start">
          {/* SETTINGS/THEME ICON */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              backgroundColor: theme === "dark" ? "#1F1F1F" : "#e8e8ed",
              borderColor: theme === "dark" ? "#333" : "#d2d2d7"
            }}
            className="w-10 h-10 md:w-[48px] md:h-[48px] rounded-lg border flex items-center justify-center hover:opacity-80 transition-all duration-300 cursor-pointer group"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={18} className="md:w-[22px] md:h-[22px] text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon size={18} className="md:w-[22px] md:h-[22px] text-blue-500 group-hover:rotate-180 transition-transform duration-500" />
            )}
          </button>

          {/* USER DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                backgroundColor: theme === "dark" ? "transparent" : "transparent"
              }}
              className="flex items-center gap-2 md:gap-3 hover:opacity-80 p-1 md:p-2 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <div
                style={{
                  borderColor: theme === "dark" ? "#333" : "#d2d2d7"
                }}
                className="w-10 h-10 md:w-[48px] md:h-[48px] rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} className="md:w-6 md:h-6 text-white" />
                )}
              </div>

              <span
                style={{ color: theme === "dark" ? "#ffffff" : "#1d1d1f" }}
                className="text-sm md:text-[16px] font-medium hidden sm:block"
              >
                {userName}
              </span>
            </button>

            {/* DROPDOWN MENU */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
                    borderColor: theme === "dark" ? "#333" : "#d2d2d7"
                  }}
                  className="absolute right-0 top-full mt-2 w-56 border rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-2 space-y-1">
                    <Link
                      href="/profile"
                      style={{
                        color: theme === "dark" ? "#d1d1d1" : "#3a3a3c"
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:opacity-70 rounded-lg transition-all duration-200"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User size={18} />
                      My Profile
                    </Link>
                    <Link
                      href="/signin"
                      style={{
                        color: theme === "dark" ? "#d1d1d1" : "#3a3a3c"
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:opacity-70 rounded-lg transition-all duration-200"
                      onClick={() => setShowDropdown(false)}
                    >
                      <RefreshCw size={18} />
                      Switch Account
                    </Link>
                    <div
                      style={{
                        backgroundColor: theme === "dark" ? "#333" : "#d2d2d7"
                      }}
                      className="h-px my-1"
                    />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
