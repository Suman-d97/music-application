// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import { Music, Image as ImageIcon } from "lucide-react";

// export default function HomePage() {
//   const [musicCount, setMusicCount] = useState(0);
//   const [artCount, setArtCount] = useState(0);

//   useEffect(() => {
//     const loadCounts = async () => {
//       const { count: songCount } = await supabase
//         .from("songs")
//         .select("*", { count: "exact", head: true });

//       const { count: artCount } = await supabase
//         .from("art")
//         .select("*", { count: "exact", head: true });

//       setMusicCount(songCount || 0);
//       setArtCount(artCount || 0);
//     };

//     loadCounts();
//   }, []);

//   return (
//     <div className="text-white space-y-8">
//       <div className="bg-[#1b1b1b] rounded-2xl p-8 border border-[#2a2a2a]">
//         <h1 className="text-3xl font-semibold">Hello Jack,</h1>
//         <p className="text-gray-400 mt-1">
//           Manage your music & artwork submissions here
//         </p>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-xl text-center">
//           <h3 className="text-2xl font-bold">{musicCount}</h3>
//           <p className="text-gray-400 text-sm">Music Submissions</p>
//         </div>

//         <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-xl text-center">
//           <h3 className="text-2xl font-bold">{artCount}</h3>
//           <p className="text-gray-400 text-sm">Art Submissions</p>
//         </div>

//         <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-xl text-center">
//           <h3 className="text-2xl font-bold">0</h3>
//           <p className="text-gray-400 text-sm">New Messages</p>
//         </div>

//         <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-xl text-center">
//           <h3 className="text-2xl font-bold">0</h3>
//           <p className="text-gray-400 text-sm">Team Members</p>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-[#1b1b1b] rounded-xl border border-[#2a2a2a] p-4 flex flex-col items-center gap-3">
//             <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#222]">
//               <Music className="text-gray-300" size={24} />
//             </div>
//             <p className="font-medium">Music</p>
//             <p className="text-gray-400 text-sm">{musicCount} submissions</p>
//           </div>

//           <div className="bg-[#1b1b1b] rounded-xl border border-[#2a2a2a] p-4 flex flex-col items-center gap-3">
//             <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#222]">
//               <ImageIcon className="text-gray-300" size={24} />
//             </div>
//             <p className="font-medium">Art</p>
//             <p className="text-gray-400 text-sm">{artCount} submissions</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import Link from "next/link";
// import { Music, Image as ImageIcon } from "lucide-react";

// export default function HomePage() {
//   const [musicCount, setMusicCount] = useState(0);
//   const [artCount, setArtCount] = useState(0);

//   useEffect(() => {
//     const loadCounts = async () => {
//       const { count: songCount } = await supabase
//         .from("songs")
//         .select("*", { count: "exact", head: true });

//       const { count: artCount } = await supabase
//         .from("art")
//         .select("*", { count: "exact", head: true });

//       setMusicCount(songCount || 0);
//       setArtCount(artCount || 0);
//     };

//     loadCounts();
//   }, []);

//   return (
//     <div className="text-white space-y-8">
//       <div className="bg-[#1b1b1b] rounded-2xl p-8 border border-[#2a2a2a]">
//         <h1 className="text-3xl font-semibold">Hello Jack,</h1>
//         <p className="text-gray-400 mt-1">
//           Manage your music & artwork submissions here
//         </p>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-xl text-center">
//           <h3 className="text-2xl font-bold">{musicCount}</h3>
//           <p className="text-gray-400 text-sm">Music Submissions</p>

//           {/* ⭐ View Albums Button */}
//           <Link
//             href="/albums"
//             className="mt-3 inline-block text-blue-400 hover:text-blue-300 text-sm font-medium"
//           >
//             View Albums →
//           </Link>
//         </div>

//         <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-xl text-center">
//           <h3 className="text-2xl font-bold">{artCount}</h3>
//           <p className="text-gray-400 text-sm">Art Submissions</p>
//         </div>

//         <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-xl text-center">
//           <h3 className="text-2xl font-bold">0</h3>
//           <p className="text-gray-400 text-sm">New Messages</p>
//         </div>

//         <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-xl text-center">
//           <h3 className="text-2xl font-bold">0</h3>
//           <p className="text-gray-400 text-sm">Team Members</p>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-[#1b1b1b] rounded-xl border border-[#2a2a2a] p-4 flex flex-col items-center gap-3">
//             <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#222]">
//               <Music className="text-gray-300" size={24} />
//             </div>
//             <p className="font-medium">Music</p>
//             <p className="text-gray-400 text-sm">{musicCount} submissions</p>

//             {/* ⭐ Second View Button (optional) */}
//             <Link
//               href="/albums"
//               className="text-blue-400 hover:text-blue-300 text-sm font-medium"
//             >
//               View Albums →
//             </Link>
//           </div>

//           <div className="bg-[#1b1b1b] rounded-xl border border-[#2a2a2a] p-4 flex flex-col items-center gap-3">
//             <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#222]">
//               <ImageIcon className="text-gray-300" size={24} />
//             </div>
//             <p className="font-medium">Art</p>
//             <p className="text-gray-400 text-sm">{artCount} submissions</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










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

// ⛔ ALERT POPUP COMPONENT (LOGOUT)
function LogoutAlert({ onClose, onConfirm }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-[#1b1b1b] rounded-2xl p-6 w-[350px] border border-[#2a2a2a] shadow-2xl">
        <h2 className="text-center text-xl font-semibold mb-2 text-white">
          Sign out
        </h2>
        <p className="text-gray-300 text-sm text-center">
          Logging out will not delete your songs or photos.  
          Are you sure you want to log out?
        </p>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#333] text-white text-sm"
          >
            No, I give up!
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm"
          >
            Yes delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ SUCCESS POPUP (UPLOAD/SUBMIT)
function SuccessAlert({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-[#1b1b1b] rounded-2xl p-6 w-[350px] border border-[#2a2a2a] shadow-2xl">
        <h2 className="text-center text-xl font-semibold mb-2 text-green-400">
          Upload
        </h2>
        <p className="text-gray-300 text-sm text-center">
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
  const [musicCount, setMusicCount] = useState(0);
  const [artCount, setArtCount] = useState(0);
  const [showLogout, setShowLogout] = useState(false);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/signin";
  };

  return (
    <div className="text-white space-y-10">

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
        <div className="bg-[#1b1b1b] p-6 rounded-2xl border border-[#2a2a2a]">
          <Instagram className="text-pink-400 mb-3" size={28} />
          <p className="text-gray-300 text-sm">Total image</p>
          <h2 className="text-2xl font-bold mt-1">{artCount}</h2>
        </div>

        {/* Total Music */}
        <div className="bg-[#1b1b1b] p-6 rounded-2xl border border-[#2a2a2a]">
          <Music2 className="text-red-400 mb-3" size={28} />
          <p className="text-gray-300 text-sm">Total music</p>
          <h2 className="text-2xl font-bold mt-1">{musicCount}</h2>
        </div>

        {/* Active Users (Dummy or real later) */}
        <div className="bg-[#1b1b1b] p-6 rounded-2xl border border-[#2a2a2a]">
          <Users className="text-green-400 mb-3" size={28} />
          <p className="text-gray-300 text-sm">Active users</p>
          <h2 className="text-2xl font-bold mt-1">200</h2>
        </div>

        {/* Upload Count */}
        <div className="bg-[#1b1b1b] p-6 rounded-2xl border border-[#2a2a2a]">
          <ImageIcon className="text-yellow-400 mb-3" size={28} />
          <p className="text-gray-300 text-sm">Your upload</p>
          <h2 className="text-2xl font-bold mt-1">
            {artCount + musicCount}
          </h2>
        </div>
      </div>

      {/* ⭐ ABOUT SECTION */}
      <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-8 rounded-2xl space-y-6">
        <h2 className="text-xl font-semibold">About our website</h2>
        <p className="text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipiscing
        </p>

        {/* SOCIALS */}
        <div className="flex items-center gap-6 pt-2">
          <Instagram size={26} className="text-gray-300" />
          <Music2 size={26} className="text-gray-300" />
          <BarChart3 size={26} className="text-gray-300" />
        </div>
      </div>

      {/* ⭐ TERMS */}
      <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-8 rounded-2xl space-y-4">
        <h2 className="text-xl font-semibold">Terms and conditions</h2>
        <p className="text-gray-300 leading-relaxed">
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
      <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-8 rounded-2xl space-y-4">
        <h2 className="text-xl font-semibold">Privacy and policy of website</h2>
        <p className="text-gray-300 leading-relaxed">
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

      {/* ⭐ LOGOUT BUTTON DEMO */}
      <button
        onClick={() => setShowLogout(true)}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg"
      >
        <LogOut size={18} /> Logout
      </button>

      {showLogout && (
        <LogoutAlert
          onClose={() => setShowLogout(false)}
          onConfirm={handleLogout}
        />
      )}

      {showSuccess && <SuccessAlert onClose={() => setShowSuccess(false)} />}
    </div>
  );
}
