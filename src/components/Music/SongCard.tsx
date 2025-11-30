// "use client";

// import React, { useState } from "react";

// interface SongCardProps {
//   title: string;
//   artist?: string;
//   cover?: string;
//   onPlay?: () => void;
// }

// export default function SongCard({ title, artist, cover, onPlay }: SongCardProps) {
//   const [menu, setMenu] = useState(false);

//   return (
//     <div className="bg-[#151515] p-3 rounded-lg border border-[#242424] relative group">
//       {/* Cover */}
//       <div
//         className="h-40 bg-[#111] rounded-lg mb-3 flex items-center justify-center cursor-pointer"
//         onClick={onPlay}
//       >
//         {cover ? (
//           <img className="w-full h-full object-cover rounded-lg" src={cover} />
//         ) : (
//           <svg className="w-14 h-14 text-gray-500" viewBox="0 0 24 24" fill="none">
//             <path d="M9 17V5l12-2v12" stroke="currentColor" strokeWidth="1.5" />
//           </svg>
//         )}
//       </div>

//       {/* Title */}
//       <div className="text-white font-medium">{title}</div>
//       <div className="text-gray-400 text-sm">{artist || "Unknown Artist"}</div>
//     </div>
//   );
// }












// "use client";

// import React, { useState } from "react";
// import { MoreVertical } from "lucide-react";
// import ImageLightbox from "../Common/ImageLightbox";

// interface SongCardProps {
//   title: string;
//   artist?: string;
//   cover?: string;
//   onPlay?: () => void;
// }

// export default function SongCard({ title, artist, cover, onPlay }: SongCardProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showLightbox, setShowLightbox] = useState(false);

//   return (
//     <div className="bg-[#151515] p-3 rounded-xl border border-[#242424] relative transition hover:border-[#3a3a3a] group">

//       {/* ▪▪▪ MENU BUTTON */}
//       <button
//         className="absolute top-3 right-3 text-gray-400 hover:text-white"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         <MoreVertical size={20} />
//       </button>

//       {/* DROPDOWN */}
//       {menuOpen && (
//         <div className="absolute top-10 right-3 bg-[#1e1e1e] border border-[#333] rounded-lg text-white text-sm shadow-lg z-20">
//           <button className="block w-full text-left px-4 py-2 hover:bg-[#333]">
//             Edit
//           </button>
//           <button className="block w-full text-left px-4 py-2 hover:bg-[#333]">
//             Download
//           </button>
//         </div>
//       )}

//       {/* COVER IMAGE */}
//       <div
//         className="h-40 bg-[#111] rounded-lg mb-3 overflow-hidden cursor-pointer flex items-center justify-center"
//         onClick={() => {
//           if (cover) setShowLightbox(true);
//           if (onPlay) onPlay();
//         }}
//       >
//         {cover ? (
//           <img
//             src={cover}
//             className="w-full h-full object-cover rounded-lg"
//           />
//         ) : (
//           <svg
//             className="w-14 h-14 text-gray-600"
//             viewBox="0 0 24 24"
//             fill="none"
//           >
//             <path
//               d="M9 17V5l12-2v12"
//               stroke="currentColor"
//               strokeWidth="1.5"
//             />
//           </svg>
//         )}
//       </div>

//       {/* TEXT FIELDS */}
//       <div className="text-white font-semibold truncate">{title}</div>
//       <div className="text-gray-400 text-sm truncate">{artist || "Unknown Artist"}</div>

//       {/* LIGHTBOX */}
//       <ImageLightbox
//         open={showLightbox}
//         src={cover}
//         onClose={() => setShowLightbox(false)}
//       />
//     </div>
//   );
// }












"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

interface SongCardProps {
  song: {
    id?: string;
    title?: string;
    artist?: string;
    cover_url?: string;
    audio_url?: string;
  };
  onPlay?: (song: any) => void;
  onDownload?: (song: any) => void;
  onEdit?: (song: any) => void;
}

export default function SongCard({ song, onPlay, onDownload, onEdit }: SongCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#151515] p-3 rounded-lg border border-[#242424] relative group">
      <div
        className="h-40 bg-[#111] rounded-lg mb-3 flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => onPlay?.(song)}
      >
        {song.cover_url ? (
          // use Next <Image> if you have next/image, otherwise img
          <img className="w-full h-full object-cover rounded-lg" src={song.cover_url} alt={song.title} />
        ) : (
          <svg className="w-14 h-14 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path d="M9 17V5l12-2v12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-white font-medium leading-tight">{song.title || "Untitled"}</div>
          <div className="text-gray-400 text-sm">{song.artist || "Unknown Artist"}</div>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="p-1 rounded hover:bg-[#222] transition"
            aria-label="menu"
          >
            <MoreVertical size={18} className="text-gray-300" />
          </button>

          {menuOpen && (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute right-0 mt-2 w-40 bg-[#111] border border-[#2a2a2a] rounded shadow-lg z-20"
            >
              <button
                onClick={() => {
                  onEdit?.(song);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#1b1b1b]"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  onDownload?.(song);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#1b1b1b]"
              >
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
