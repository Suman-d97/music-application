// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import SongCard from "@/components/Music/SongCard";

// export default function AlbumDetailPage({ params }: { params: { id: string } }) {
//   const albumId = params.id;

//   const [album, setAlbum] = useState<any>(null);
//   const [songs, setSongs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       const { data: aData } = await supabase
//         .from("albums")
//         .select("*")
//         .eq("id", albumId)
//         .single();
//       setAlbum(aData);

//       const { data: sData } = await supabase
//         .from("songs")
//         .select("*")
//         .eq("album_id", albumId)
//         .order("created_at", { ascending: false });

//       setSongs(sData ?? []);
//       setLoading(false);
//     };

//     load();
//   }, [albumId]);

//   const playSong = (song: any) => {
//     // @ts-ignore
//     window.__musicPlayerPlay({
//       id: song.id,
//       title: song.title,
//       artist: song.artist,
//       url: song.url,
//       cover_url: song.cover_url,
//     });
//   };

//   return (
//     <div className="space-y-8">
//       {loading ? (
//         <p className="text-gray-400">Loading...</p>
//       ) : !album ? (
//         <p className="text-gray-400">Album not found.</p>
//       ) : (
//         <>
//           <div className="flex items-start gap-6">
//             <div className="w-40 h-40 rounded-lg bg-[#222] overflow-hidden">
//               {album.cover_url ? (
//                 <img
//                   src={album.cover_url}
//                   alt={album.title}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center text-4xl text-gray-400 h-full">
//                   ♪
//                 </div>
//               )}
//             </div>

//             <div>
//               <h1 className="text-3xl font-semibold">{album.title}</h1>
//               <p className="text-gray-400 mt-2">
//                 {album.artist || "Unknown artist"}
//               </p>
//             </div>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-4">Songs</h2>

//             {songs.length === 0 ? (
//               <p className="text-gray-500">No songs in this album.</p>
//             ) : (
//               <div className="space-y-3">
//                 {songs.map((song) => (
//                   <SongCard
//                     key={song.id}
//                     song={song}
//                     onPlay={playSong}
//                     onDownload={() => {
//                       const a = document.createElement("a");
//                       a.href = song.url;
//                       a.download = `${song.title}.mp3`;
//                       a.click();
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }





// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import { useParams } from "next/navigation";
// import SongCard from "@/components/Music/SongCard";
// import { useDispatch } from "react-redux";
// import { playSong } from "@/store/musicSlice";

// export default function AlbumDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const [album, setAlbum] = useState<any>(null);
//   const [songs, setSongs] = useState<any[]>([]);

//   useEffect(() => {
//     loadAlbum();
//     loadSongs();
//   }, []);

//   const loadAlbum = async () => {
//     const { data } = await supabase
//       .from("albums")
//       .select("id, title, artist, cover_url")
//       .eq("id", id)
//       .single();

//     setAlbum(data);
//   };

//   const loadSongs = async () => {
//     const { data } = await supabase
//       .from("songs")
//       .select("id, title, artist, url, cover_url")
//       .eq("album_id", id);

//     setSongs(data || []);
//   };

//   const play = (song: any) => dispatch(playSong(song));

//   return (
//     <div className="p-6 text-white">
//       {album && (
//         <div className="mb-6 flex gap-4 items-center">
//           <img
//             src={album.cover_url}
//             className="w-32 h-32 rounded-lg object-cover"
//           />
//           <div>
//             <h1 className="text-3xl font-bold">{album.title}</h1>
//             <p className="text-gray-400">{album.artist}</p>
//           </div>
//         </div>
//       )}

//       <h2 className="text-xl font-semibold mb-4">Songs</h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {songs.map((song) => (
//           <SongCard key={song.id} song={song} onPlay={() => play(song)} />
//         ))}
//       </div>
//     </div>
//   );
// }












// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import SongCard from "@/components/Music/SongCard";
// import { useMusic } from "@/store/useMusic";

// export default function AlbumDetailsPage({ params }: { params: { id: string } }) {
//   const albumId = params.id;
//   const [album, setAlbum] = useState<any | null>(null);
//   const [songs, setSongs] = useState<any[]>([]);
//   const { play } = useMusic();

//   useEffect(() => {
//     const loadAlbum = async () => {
//       const { data: albumData } = await supabase
//         .from("albums")
//         .select("*")
//         .eq("id", albumId)
//         .single();

//       setAlbum(albumData);

//       const { data: songData } = await supabase
//         .from("songs")
//         .select("*")
//         .eq("album_id", albumId);

//       setSongs(songData || []);
//     };

//     loadAlbum();
//   }, [albumId]);

//   if (!album) return <p className="text-gray-400">Loading album...</p>;

//   return (
//     <div className="text-white">
//       <h1 className="text-2xl font-semibold mb-4">{album.title}</h1>
//       <p className="text-gray-400 mb-6">{album.artist}</p>

//       {songs.length === 0 ? (
//         <p className="text-gray-400">No songs in this album.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {songs.map((song) => (
//             <SongCard
//               key={song.id}
//               title={song.title}
//               artist={song.artist}
//               cover={song.cover_path}
//               onPlay={() => play(song.url, song.title)}   // ← play real songs
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }









// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import SongCard from "@/components/Music/SongCard";
// import { useMusic } from "@/store/useMusic";

// export default function AlbumDetailsPage({ params }: { params: { id: string } }) {
//   const albumId = params.id;
//   const [album, setAlbum] = useState<any | null>(null);
//   const [songs, setSongs] = useState<any[]>([]);
//   const { play } = useMusic();

//   useEffect(() => {
//     const loadAlbum = async () => {
//       const { data: albumData } = await supabase
//         .from("albums")
//         .select("*")
//         .eq("id", albumId)
//         .single();

//       setAlbum(albumData);

//       const { data: songData } = await supabase
//         .from("songs")
//         .select("*")
//         .eq("album_id", albumId);

//       setSongs(songData || []);
//     };

//     loadAlbum();
//   }, [albumId]);

//   if (!album) return <p className="text-gray-400">Loading album...</p>;

//   return (
//     <div className="text-white">
//       <h1 className="text-2xl font-semibold mb-4">{album.title}</h1>
//       <p className="text-gray-400 mb-6">{album.artist}</p>

//       {songs.length === 0 ? (
//         <p className="text-gray-400">No songs in this album.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {songs.map((song) => (
//             <SongCard
//               key={song.id}
//               title={song.title}
//               artist={album.artist}
//               cover={album.cover_path}
//               onPlay={() => play(song.audio_path, song.title)}  // ✔ FINAL FIX
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


















"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import SongCard from "@/components/Music/SongCard";
import { useMusic } from "@/store/useMusic";
import { useParams } from "next/navigation";

export default function AlbumDetailsPage() {
  const params = useParams();
  const albumId = params.id as string; // ← FIX: correct ID extraction

  const [album, setAlbum] = useState<any | null>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const { play } = useMusic();

  useEffect(() => {
    if (!albumId) return;

    const loadAlbum = async () => {
      const { data: albumData } = await supabase
        .from("albums")
        .select("*")
        .eq("id", albumId)
        .single();

      setAlbum(albumData);

      const { data: songData } = await supabase
        .from("songs")
        .select("*")
        .eq("album_id", albumId);

      setSongs(songData || []);
    };

    loadAlbum();
  }, [albumId]);

  if (!album) return <p className="text-gray-400">Loading album...</p>;

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">{album.title}</h1>
      <p className="text-gray-400 mb-6">{album.artist}</p>

      {songs.length === 0 ? (
        <p className="text-gray-400">No songs in this album.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              title={song.title}
              artist={album.artist}
              cover={album.cover_path}
              onPlay={() => play(song.audio_path, song.title)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
