

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
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import music from "@/../public/sidebar/music.png";

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
  const pathname = usePathname();

  return (
    <aside className="relative w-20 bg-[#141414] min-h-screen flex flex-col items-center py-6">
      
      {/* Small curved background panel */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-14 h-[95%] bg-[#1b1b1b] rounded-[40px]"></div>

      {/* Logo */}
      <div className="relative z-20 mb-8">
        <div className="w-12 h-12 bg-[#252525] rounded-2xl flex items-center justify-center text-white text-xs font-semibold shadow-sm">
          <img src={music.src} alt="logo" />
        </div>
      </div>

      {/* Menu */}
      <div className="relative z-20 flex flex-col gap-6 w-full items-center">
        {menu.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link href={item.href} key={item.href} className="w-full flex justify-center">
              <div className="relative w-full flex flex-col items-center">

                {/* Animated background bubble */}
                {active && (
                  <motion.div
                    layoutId="activeBubble"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute w-12 h-12 bg-[#ffffff] rounded-[18px] -top-2 shadow-md z-0"
                  />
                )}

                {/* Icon button */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className={`
                    relative z-10 w-10 h-10 rounded-xl flex items-center justify-center 
                    transition-colors
                    ${active ? "text-black" : "text-gray-400"}
                  `}
                >
                  <Icon size={18} />
                </motion.div>

                {/* Label */}
                <span
                  className={`text-[9px] mt-1 transition ${
                    active ? "text-white" : "text-gray-500"
                  }`}
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
