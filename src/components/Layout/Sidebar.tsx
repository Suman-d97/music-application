

"use client";

import {
  Home,
  Folder,
  Music,
  Image as ImageIcon,
  Users,
  Phone,
  Shield,
  User,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
import music from "@/../public/sidebar/music.png";
import { useThemeStore } from "@/store/themeStore";

const menu = [
  { label: "Home", icon: Home, href: "/home" },
  { label: "Submissions", icon: Folder, href: "/submissions" },
  { label: "Submit Music", icon: Music, href: "/submit-music" },
  { label: "Submit Art", icon: ImageIcon, href: "/submit-art" },
  { label: "Join Us", icon: Users, href: "/join" },
  { label: "Contact Us", icon: Phone, href: "/contact" },
  { label: "Team", icon: Shield, href: "/team" },
  { label: "Account", icon: User, href: "/account" },
];

export default function Sidebar() {
  const { theme } = useThemeStore();
  const pathname = usePathname();
  const router = useRouter();
  const user = useUser();

  return (
    <aside
      style={{ backgroundColor: theme === "dark" ? "#141414" : "#f3f4f6" }}
      className="relative w-20 min-h-screen flex flex-col items-center py-6"
    >

      {/* Small curved background panel */}
      <div
        style={{ backgroundColor: theme === "dark" ? "#1b1b1b" : "#e5e7eb" }}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-14 h-[95%] rounded-[40px]"
      ></div>

      {/* Logo */}
      <div className="relative z-20 mb-8">
        <div
          style={{ backgroundColor: theme === "dark" ? "#252525" : "#d1d5db" }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xs font-semibold shadow-sm"
        >
          <img src={music.src} alt="logo" />
        </div>
      </div>

      {/* Menu */}
      <div className="relative z-20 flex flex-col gap-6 w-full items-center">
        {menu.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          const isRestricted = ["/submit-music", "/submit-art", "/join"].includes(item.href);

          const handleClick = (e: React.MouseEvent) => {
            if (isRestricted && !user) {
              e.preventDefault();
              router.push("/signup");
            }
          };

          return (
            <Link
              href={item.href}
              key={item.href}
              className="w-full flex justify-center"
              onClick={handleClick}
            >
              <div className="relative w-full flex flex-col items-center">

                {/* Animated background bubble */}
                {active && (
                  <motion.div
                    layoutId="activeBubble"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#1f2937" }}
                    className="absolute w-12 h-12 rounded-[18px] -top-2 shadow-md z-0"
                  />
                )}

                {/* Icon button */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  style={{
                    color: active
                      ? (theme === "dark" ? "#000" : "#fff")
                      : (theme === "dark" ? "#9ca3af" : "#6b7280")
                  }}
                  className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Icon size={18} />
                </motion.div>

                {/* Label */}
                <span
                  style={{
                    color: active
                      ? (theme === "dark" ? "#fff" : "#1f2937")
                      : (theme === "dark" ? "#6b7280" : "#9ca3af")
                  }}
                  className="text-[9px] mt-1 transition"
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
