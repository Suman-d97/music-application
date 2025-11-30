// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import SubmissionList from "@/components/Music/SubmissionList";

// export default function SubmissionsPage() {
//   const [songs, setSongs] = useState<any[]>([]);

//   useEffect(() => {
//     const loadSongs = async () => {
//       const { data, error } = await supabase
//         .from("songs")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (!error && data) setSongs(data);
//     };

//     loadSongs();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-6">My Submissions</h1>

//       <SubmissionList
//         items={songs}
//         onPlay={(song) => console.log("Play", song)}
//       />
//     </div>
//   );
// }































// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import { MoreVertical, Edit, FileText, Download } from "lucide-react";

// export default function SubmitMusicPage() {
//   const [songs, setSongs] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState<"music" | "art">("music");
//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   // Fetch songs uploaded by this user
//   useEffect(() => {
//     loadSongs();
//   }, []);

//   const loadSongs = async () => {
//     const { data: userData } = await supabase.auth.getUser();
//     const user = userData?.user;
//     if (!user) return;

//     const { data } = await supabase
//       .from("songs")
//       .select("*")
//       .eq("user_id", user.id);

//     setSongs(data || []);
//   };

//   return (
//     <div className="text-white space-y-10">

//       {/* TOP BANNER */}
//       {/* <div className="w-full bg-gradient-to-r from-[#7c4dff] to-[#6a63ff] p-8 rounded-2xl flex items-center justify-between">
//         <div>
//           <h1 className="text-4xl font-bold">Hello, Jack!</h1>
//           <p className="text-gray-200 text-lg mt-2">Welcome back to Myfile</p>
//         </div>
//         <img
//           src="/banner.png"
//           className="w-64 h-auto object-contain"
//           alt="banner"
//         />
//       </div> */}

//       {/* TITLE */}
//       <h2 className="text-2xl font-bold">My submissions</h2>

//       {/* TABS */}
//       <div className="flex items-center gap-10 border-b border-[#333] pb-3">
//         <button
//           onClick={() => setActiveTab("music")}
//           className={`text-lg flex items-center gap-2 ${
//             activeTab === "music" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
//           }`}
//         >
//           🎵 Music
//         </button>

//         <button
//           onClick={() => setActiveTab("art")}
//           className={`text-lg flex items-center gap-2 ${
//             activeTab === "art" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
//           }`}
//         >
//           🖼️ Arts
//         </button>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
//         {songs.length === 0 ? (
//           <p className="text-gray-400">You have not uploaded any music yet.</p>
//         ) : (
//           songs.map((song) => (
//             <div
//               key={song.id}
//               className="bg-[#1f1f1f] border border-[#2a2a2a] p-4 rounded-xl relative group"
//             >
//               {/* Ellipsis Menu */}
//               <div
//                 className="absolute top-3 right-3 cursor-pointer"
//                 onClick={() =>
//                   setOpenMenu(openMenu === song.id ? null : song.id)
//                 }
//               >
//                 <MoreVertical className="text-gray-300" size={18} />
//               </div>

//               {/* Dropdown */}
//               {openMenu === song.id && (
//                 <div className="absolute right-3 top-10 bg-[#282828] border border-[#333] rounded-xl shadow-xl w-32 z-20">
//                   <button className="flex items-center gap-2 px-3 py-2 hover:bg-[#333] w-full text-sm">
//                     <Edit size={14} /> Edit
//                   </button>

//                   <button className="flex items-center gap-2 px-3 py-2 hover:bg-[#333] w-full text-sm">
//                     <FileText size={14} /> Agreement
//                   </button>

//                   <a
//                     href={song.audio_url}
//                     download
//                     className="flex items-center gap-2 px-3 py-2 hover:bg-[#333] w-full text-sm text-red-400"
//                   >
//                     <Download size={14} /> Download
//                   </a>
//                 </div>
//               )}

//               {/* Music Icon */}
//               <div className="w-full h-32 bg-[#303030] rounded-lg flex items-center justify-center text-gray-500">
//                 🎵
//               </div>

//               {/* Title */}
//               <h3 className="mt-3 text-sm font-semibold">{song.title}</h3>
//               <p className="text-xs text-gray-400">{song.artist}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }













// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import { motion } from "framer-motion";
// import { MoreVertical } from "lucide-react";

// export default function SubmissionsPage() {
//   const [tab, setTab] = useState<"music" | "arts">("music");
//   const [music, setMusic] = useState<any[]>([]);
//   const [arts, setArts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     setLoading(true);

//     const { data: musicData } = await supabase
//       .from("music_submissions")
//       .select("*")
//       .order("created_at", { ascending: false });

//     const { data: artsData } = await supabase
//       .from("arts_submissions")
//       .select("*")
//       .order("created_at", { ascending: false });

//     setMusic(musicData || []);
//     setArts(artsData || []);
//     setLoading(false);
//   };

//   const items = tab === "music" ? music : arts;

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-10">

//       {/* Title */}
//       <h2 className="text-xl font-semibold mb-4">My submissions</h2>

//       {/* Tabs */}
//       <div className="flex gap-10 items-center border-b border-gray-700 pb-1 mb-6">
//         <button
//           onClick={() => setTab("music")}
//           className={`pb-2 flex items-center gap-1 ${
//             tab === "music" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
//           }`}
//         >
//           🎵 Music
//         </button>

//         <button
//           onClick={() => setTab("arts")}
//           className={`pb-2 flex items-center gap-1 ${
//             tab === "arts" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
//           }`}
//         >
//           🖼️ Arts
//         </button>
//       </div>

//       {/* Empty State */}
//       {!loading && items.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col items-center mt-20"
//         >
//           <img src="/empty-icon.png" className="h-32 opacity-70" />
//           <p className="mt-6 text-lg font-medium">
//             You have not submitted {tab === "music" ? "music" : "art"} yet.
//           </p>
//           <p className="opacity-60 mb-4">Click to submit</p>
//           <button className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition">
//             Submit {tab === "music" ? "music" : "art"}
//           </button>
//         </motion.div>
//       )}

//       {/* Grid */}
//       {!loading && items.length > 0 && (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {items.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: i * 0.05 }}
//               className="relative group bg-[#1E1E1E] rounded-xl p-3 overflow-hidden hover:shadow-lg"
//             >
//               {/* Preview */}
//               <img
//                 src={item.thumbnail || "/placeholder.png"}
//                 className="w-full h-36 rounded-lg object-cover"
//               />

//               {/* Name */}
//               <div className="mt-2">
//                 <p className="font-medium">{item.title}</p>
//                 <p className="text-gray-400 text-sm">{item.artist || item.user_name}</p>
//               </div>

//               {/* Ellipsis menu */}
//               <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
//                 <MoreVertical className="cursor-pointer" />
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }











// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import { motion } from "framer-motion";
// import { MoreVertical } from "lucide-react";
// import SongCard from "@/components/Music/SongCard";
// import ArtCard from "@/components/Art/ArtCard";

// export default function SubmissionsPage() {
//   const [tab, setTab] = useState<"music" | "arts">("music");
//   const [music, setMusic] = useState<any[]>([]);
//   const [arts, setArts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Load data on mount
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     setLoading(true);

//     // ⭐ Load music from songs table
//     const { data: musicData } = await supabase
//       .from("songs")
//       .select("*")
//       .order("created_at", { ascending: false });

//     // ⭐ Load arts from art table
//     const { data: artsData } = await supabase
//       .from("art")
//       .select("*")
//       .order("created_at", { ascending: false });

//     setMusic(musicData || []);
//     setArts(artsData || []);

//     setLoading(false);
//   };

//   const items = tab === "music" ? music : arts;

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-10">

//       {/* Title */}
//       <h2 className="text-xl font-semibold mb-4">My submissions</h2>

//       {/* Tabs */}
//       <div className="flex gap-10 items-center border-b border-gray-700 pb-1 mb-6">
//         <button
//           onClick={() => setTab("music")}
//           className={`pb-2 flex items-center gap-1 ${
//             tab === "music" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
//           }`}
//         >
//           🎵 Music
//         </button>

//         <button
//           onClick={() => setTab("arts")}
//           className={`pb-2 flex items-center gap-1 ${
//             tab === "arts" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
//           }`}
//         >
//           🖼️ Arts
//         </button>
//       </div>

//       {/* Empty State */}
//       {!loading && items.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col items-center mt-20"
//         >
//           <img src="/empty-icon.png" className="h-32 opacity-70" />
//           <p className="mt-6 text-lg font-medium">
//             You have not submitted {tab === "music" ? "music" : "art"} yet.
//           </p>
//           <p className="opacity-60 mb-4">Click to submit</p>

//           <button
//             onClick={() =>
//               window.location.href = tab === "music" ? "/submit-music" : "/submit-art"
//             }
//             className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition"
//           >
//             Submit {tab === "music" ? "music" : "art"}
//           </button>
//         </motion.div>
//       )}

//       {/* Grid Display */}
//       {!loading && items.length > 0 && (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {items.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: i * 0.05 }}
//             >
//               {tab === "music" ? (
//                 <SongCard
//                   title={item.title}
//                   artist={item.artist}
//                   cover={item.cover_path}
//                   onPlay={() => console.log("Play", item)}
//                 />
//               ) : (
//                 <ArtCard
//                   title={item.artist_name}
//                   type={item.art_type}
//                   image={item.image_url}
//                   credit={item.credit_url}
//                 />
//               )}
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }















"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { motion } from "framer-motion";
import SongCard from "@/components/Music/SongCard";
import ArtCard from "@/components/Art/ArtCard";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function SubmissionsPage() {
  const [tab, setTab] = useState<"music" | "arts">("music");
  const [music, setMusic] = useState<any[]>([]);
  const [arts, setArts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  // Load data when page loads
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    // ⭐ Load music
    const { data: musicData } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });

    // ⭐ Load art
    const { data: artsData } = await supabase
      .from("art")
      .select("*")
      .order("created_at", { ascending: false });

    setMusic(musicData || []);
    setArts(artsData || []);

    setLoading(false);
  };

  const items = tab === "music" ? music : arts;

  // ⭐ Lightbox
  const openLightbox = (index: number) => {
    setLightboxImages(arts.map((a) => a.image_url));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">My submissions</h2>

      {/* Tabs */}
      <div className="flex gap-10 items-center border-b border-gray-700 pb-1 mb-6">
        <button
          onClick={() => setTab("music")}
          className={`pb-2 flex items-center gap-1 ${
            tab === "music" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
          }`}
        >
          🎵 Music
        </button>

        <button
          onClick={() => setTab("arts")}
          className={`pb-2 flex items-center gap-1 ${
            tab === "arts" ? "text-red-400 border-b-2 border-red-400" : "text-gray-400"
          }`}
        >
          🖼️ Arts
        </button>
      </div>

      {/* Empty */}
      {!loading && items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mt-20"
        >
          <img src="/empty-icon.png" className="h-32 opacity-70" />

          <p className="mt-6 text-lg font-medium">
            You have not submitted {tab === "music" ? "music" : "art"} yet.
          </p>
          <p className="opacity-60 mb-4">Click to submit</p>

          <button
            onClick={() =>
              window.location.href = tab === "music" ? "/submit-music" : "/submit-art"
            }
            className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Submit {tab === "music" ? "music" : "art"}
          </button>
        </motion.div>
      )}

      {/* GRID */}
      {!loading && items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              {tab === "music" ? (
                <SongCard
                  song={item}
                  onPlay={() => console.log("Play", item)}
                  onEdit={() => console.log("Edit", item)}
                  onDownload={() => window.open(item.audio_url, "_blank")}
                />
              ) : (
                <ArtCard
                  item={item}
                  onOpen={() => openLightbox(i)}
                />
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox for ART */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages.map((src) => ({ src }))}
        index={lightboxIndex}
        plugins={[Zoom]}
      />
    </div>
  );
}
