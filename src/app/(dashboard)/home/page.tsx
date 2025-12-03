

"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import {
  Music,
  Image as ImageIcon,
  Instagram,
  Music2,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";



// ✅ SUCCESS POPUP (UPLOAD/SUBMIT)
function SuccessAlert({ onClose, theme }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb"
        }}
        className="rounded-2xl p-6 w-[350px] border shadow-2xl"
      >
        <h2
          style={{ color: theme === "dark" ? "#4ade80" : "#16a34a" }}
          className="text-center text-xl font-semibold mb-2"
        >
          Upload
        </h2>
        <p
          style={{ color: theme === "dark" ? "#d1d5db" : "#374151" }}
          className="text-sm text-center"
        >
          File upload completed successfully!
          Go to Submissions to view uploaded content.
        </p>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#333] text-white text-sm"
          >
            Back to submit
          </button>

          <Link
            href="/submissions"
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm"
          >
            Submissions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { theme } = useThemeStore();
  const [musicCount, setMusicCount] = useState(0);
  const [artCount, setArtCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    const loadCounts = async () => {
      const { count: songCount } = await supabase
        .from("songs")
        .select("*", { count: "exact", head: true });

      const { count: artCount } = await supabase
        .from("artworks")
        .select("*", { count: "exact", head: true });

      setMusicCount(songCount || 0);
      setArtCount(artCount || 0);
    };

    loadUser();
    loadCounts();
  }, []);



  return (
    <div
      style={{ color: theme === "dark" ? "#fff" : "#1f2937" }}
      className="space-y-10"
    >

      {/* ⭐ TOP BANNER */}
      {/* <div className="bg-[#5a47ff] w-full rounded-3xl p-8 flex items-center justify-between shadow-xl">
        <div>
          <h1 className="text-4xl font-bold">
            Hello, {user?.email?.split("@")[0] || "Jack"}!
          </h1>
          <p className="opacity-90 mt-1">Welcome back to Myfile</p>
        </div> */}

      {/* Illustration */}
      {/* <Image
          src="/banner.png"
          width={250}
          height={180}
          alt="banner"
          className="rounded-xl"
        />
      </div> */}

      {/* ⭐ STATS SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Images */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
            borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb"
          }}
          className="p-6 rounded-2xl border"
        >
          <Instagram className="text-pink-400 mb-3" size={28} />
          <p
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            className="text-sm"
          >
            Total image
          </p>
          <h2 className="text-2xl font-bold mt-1">{artCount}</h2>
        </div>

        {/* Total Music */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
            borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb"
          }}
          className="p-6 rounded-2xl border"
        >
          <Music2 className="text-red-400 mb-3" size={28} />
          <p
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            className="text-sm"
          >
            Total music
          </p>
          <h2 className="text-2xl font-bold mt-1">{musicCount}</h2>
        </div>

        {/* Active Users (Dummy or real later) */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
            borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb"
          }}
          className="p-6 rounded-2xl border"
        >
          <Users className="text-green-400 mb-3" size={28} />
          <p
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            className="text-sm"
          >
            Active users
          </p>
          <h2 className="text-2xl font-bold mt-1">200</h2>
        </div>

        {/* Upload Count */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
            borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb"
          }}
          className="p-6 rounded-2xl border"
        >
          <ImageIcon className="text-yellow-400 mb-3" size={28} />
          <p
            style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            className="text-sm"
          >
            Your upload
          </p>
          <h2 className="text-2xl font-bold mt-1">
            {artCount + musicCount}
          </h2>
        </div>
      </div>

      {/* ⭐ ABOUT SECTION */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb"
        }}
        className="border p-8 rounded-2xl space-y-6"
      >
        <h2 className="text-xl font-semibold">About our website</h2>
        <p
          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
          className="leading-relaxed"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </p>

        {/* SOCIALS */}
        <div className="flex items-center gap-6 pt-2">
          <Instagram size={26} style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }} />
          <Music2 size={26} style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }} />
          <BarChart3 size={26} style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }} />
        </div>
      </div>

      {/* ⭐ TERMS */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb"
        }}
        className="border p-8 rounded-2xl space-y-4"
      >
        <h2 className="text-xl font-semibold">Terms and conditions</h2>
        <p
          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
          className="leading-relaxed"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe rem molestiae ipsa in magni facere, tempore doloremque adipisci earum soluta explicabo perspiciatis at iste! Incidunt modi perspiciatis rerum quod facere.
          Nam iste ea animi praesentium doloremque dignissimos ipsam molestiae dolorum veniam facilis, voluptates vel ut dicta eligendi ratione quaerat quo eum sint voluptatibus aliquam delectus ipsa odit similique corrupti! Alias.
          Obcaecati eligendi dolore aut fuga reiciendis repellendus perspiciatis tempore, maxime nisi perferendis nemo cumque quas magni harum dolor. Voluptatibus impedit fuga nostrum. Rerum minima consectetur nesciunt maxime aut nemo illo.
        </p>
        <Link
          href="#"
          className="text-blue-400 underline text-sm hover:text-blue-300"
        >
          Click to see the full terms and conditions
        </Link>
      </div>

      {/* ⭐ PRIVACY */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2a2a2a" : "#e5e7eb"
        }}
        className="border p-8 rounded-2xl space-y-4"
      >
        <h2 className="text-xl font-semibold">Privacy and policy of website</h2>
        <p
          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
          className="leading-relaxed"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, odio asperiores ipsam quas incidunt, necessitatibus unde nobis excepturi quae accusantium, molestiae error nesciunt dolores! Nostrum laboriosam aliquam blanditiis aliquid natus.
          Magni consequatur quis explicabo libero, qui error minima adipisci aut sit. Maiores molestias nobis, rem vero eum nulla, accusamus tempore iure at perferendis omnis fugiat voluptas nesciunt, cupiditate exercitationem culpa.
          Voluptas expedita, aperiam alias voluptatum iure quibusdam exercitationem mollitia repudiandae molestias consequatur, quis nostrum, quas culpa odit ipsa sed accusamus fugiat? Omnis reprehenderit illum commodi ea distinctio, iste adipisci quaerat?
        </p>
        <Link
          href="#"
          className="text-blue-400 underline text-sm hover:text-blue-300"
        >
          Click to see the full privacy and policy
        </Link>
      </div>



      {showSuccess && <SuccessAlert onClose={() => setShowSuccess(false)} theme={theme} />}
    </div>
  );
}
