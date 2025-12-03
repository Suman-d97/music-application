
"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Sun, Moon, User, LogOut, Settings, RefreshCw } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderBanner() {
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useThemeStore();

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
      <div className="mt-8 mx-6 flex items-center justify-between">

        {/* LEFT PURPLE BANNER */}
        <div
          style={{
            background: `linear-gradient(to right, var(--banner-gradient-from), var(--banner-gradient-to))`
          }}
          className="
            relative 
            w-[80%] 
            h-[140px]
            rounded-[32px] 
            flex items-center pl-12
            overflow-hidden
            shadow-xl
            transition-all duration-300
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
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              backgroundColor: theme === "dark" ? "#1F1F1F" : "#e8e8ed",
              borderColor: theme === "dark" ? "#333" : "#d2d2d7"
            }}
            className="w-[48px] h-[48px] rounded-lg border flex items-center justify-center hover:opacity-80 transition-all duration-300 cursor-pointer group "
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={22} className="text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon size={22} className="text-blue-500 group-hover:rotate-180 transition-transform duration-500" />
            )}
          </button>

          {/* USER DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                backgroundColor: theme === "dark" ? "transparent" : "transparent"
              }}
              className="flex items-center gap-3 hover:opacity-80 p-2 rounded-xl transition-all duration-300"
            >
              <div
                style={{
                  borderColor: theme === "dark" ? "#333" : "#d2d2d7"
                }}
                className="w-[48px] h-[48px] rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={24} className="text-white" />
                )}
              </div>

              <span
                style={{ color: theme === "dark" ? "#ffffff" : "#1d1d1f" }}
                className="text-[16px] font-medium hidden md:block"
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
