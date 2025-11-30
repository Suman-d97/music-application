// "use client";

// import React from "react";
// import { MoreVertical } from "lucide-react";

// interface ArtCardProps {
//   title: string;          // artist_name
//   type: string;           // art_type
//   image: string;          // image_url
//   credit?: string;        // credit_url (optional)
// }

// export default function ArtCard({ title, type, image, credit }: ArtCardProps) {
//   return (
//     <div className="relative group bg-[#1E1E1E] rounded-xl p-3 hover:shadow-lg transition overflow-hidden">

//       {/* IMAGE */}
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-40 object-cover rounded-lg"
//       />

//       {/* Details */}
//       <div className="mt-3">
//         <p className="text-white font-medium truncate">{title}</p>
//         <p className="text-gray-400 text-sm">{type}</p>

//         {credit && (
//           <a
//             href={credit}
//             target="_blank"
//             className="text-red-400 text-xs underline mt-1 inline-block"
//           >
//             Credit link
//           </a>
//         )}
//       </div>

//       {/* Menu - Right side (3 dots) */}
//       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
//         <MoreVertical className="cursor-pointer text-white" />
//       </div>
//     </div>
//   );
// }














"use client";

import React from "react";

export default function ArtCard({
  item,
  onOpen,
}: {
  item: {
    id?: string;
    title?: string;
    artist?: string;
    image_url?: string;
    credit_url?: string;
  };
  onOpen?: (url?: string) => void;
}) {
  return (
    <div className="bg-[#1e1e1e] p-3 rounded-xl border border-[#2a2a2a] overflow-hidden">
      <div
        className="h-40 w-full rounded-lg overflow-hidden cursor-pointer"
        onClick={() => onOpen?.(item.image_url)}
      >
        <img className="object-cover w-full h-full" src={item.image_url || "/placeholder.png"} alt={item.title} />
      </div>

      <div className="mt-3">
        <div className="text-white font-medium">{item.title || "Artwork"}</div>
        <div className="text-gray-400 text-sm">{item.artist || "Unknown"}</div>
      </div>
    </div>
  );
}
