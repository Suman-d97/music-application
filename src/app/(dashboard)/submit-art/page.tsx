// "use client";

// import { useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import { Loader, Image as ImageIcon } from "lucide-react";

// export default function SubmitArtPage() {
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const uploadArt = async () => {
//     if (!file || !title) return alert("All fields required!");

//     setLoading(true);

//     const fileExt = file.name.split(".").pop();
//     const filePath = `art_${Date.now()}.${fileExt}`;

//     // Upload to storage
//     const { error: uploadError } = await supabase.storage
//       .from("artworks")
//       .upload(filePath, file);

//     if (uploadError) {
//       setLoading(false);
//       return alert("Upload failed!");
//     }

//     const { data: urlData } = supabase.storage
//       .from("artworks")
//       .getPublicUrl(filePath);

//     // Insert DB record
//     await supabase.from("art").insert({
//       title,
//       artist,
//       image_url: urlData.publicUrl,
//     });

//     setLoading(false);
//     alert("Art submitted successfully!");
//     setTitle("");
//     setArtist("");
//     setFile(null);
//   };

//   return (
//     <div className="space-y-8">
      
//       {/* TOP BANNER */}
//       {/* <div className="w-full bg-[#5a47ff] rounded-2xl px-8 py-10 text-white flex items-center justify-between shadow-lg">
//         <div>
//           <h1 className="text-4xl font-bold">Submit Artwork</h1>
//           <p className="mt-2 opacity-90">Upload your illustration, design, or photo</p>
//         </div>

//         <ImageIcon size={80} className="opacity-70" />
//       </div> */}

//       {/* FORM CARD */}
//       <div className="bg-[#1b1b1b] p-8 rounded-2xl border border-[#2a2a2a] shadow-xl">
//         <h2 className="text-2xl font-semibold mb-6">Artwork Details</h2>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <input
//             type="text"
//             placeholder="Artwork title"
//             className="w-full p-4 rounded-xl bg-[#222] border border-[#333] outline-none text-white"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Artist name"
//             className="w-full p-4 rounded-xl bg-[#222] border border-[#333] outline-none text-white"
//             value={artist}
//             onChange={(e) => setArtist(e.target.value)}
//           />

//           {/* FILE UPLOAD */}
//           <label className="col-span-1 lg:col-span-2 cursor-pointer bg-[#222] border border-[#333] rounded-xl p-6 flex items-center gap-4 text-gray-300">
//             <ImageIcon />
//             <span>{file ? file.name : "Upload image file"}</span>
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => setFile(e.target.files?.[0] || null)}
//             />
//           </label>
//         </div>

//         {/* SUBMIT */}
//         <button
//           onClick={uploadArt}
//           className="mt-6 px-8 py-3 bg-[#ff4b5c] hover:bg-[#ff6b7c] transition rounded-xl shadow-lg text-white font-semibold flex items-center gap-2"
//         >
//           {loading ? <Loader className="animate-spin" size={20} /> : "Submit Artwork"}
//         </button>
//       </div>
//     </div>
//   );
// }
















// "use client";

// import { useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import { Loader, Image as ImageIcon } from "lucide-react";

// export default function SubmitArtPage() {
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const uploadArt = async () => {
//     if (!file || !artist) return alert("Artist and file required!");

//     setLoading(true);

//     const fileExt = file.name.split(".").pop();
//     const filePath = `art_${Date.now()}.${fileExt}`;

//     const { error: uploadError } = await supabase.storage.from("art-images").upload(filePath, file);

//     if (uploadError) {
//       setLoading(false);
//       return alert("Upload failed!");
//     }

//     const { data: urlData } = supabase.storage.from("art-images").getPublicUrl(filePath);

//     const userResult = await supabase.auth.getUser();
//     const userId = userResult?.data?.user?.id ?? null;

//     await supabase.from("art").insert({
//       title,
//       artist,
//       image_url: urlData.publicUrl,
//       user_id: userId,
//     });

//     setLoading(false);
//     alert("Art submitted successfully!");
//     setTitle("");
//     setArtist("");
//     setFile(null);
//   };

//   return (
//     <div className="space-y-8">
//       <div className="bg-[#1b1b1b] p-8 rounded-2xl border border-[#2a2a2a] shadow-xl">
//         <h2 className="text-2xl font-semibold mb-6">Artwork Details</h2>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <input
//             type="text"
//             placeholder="Artwork title (optional)"
//             className="w-full p-4 rounded-xl bg-[#222] border border-[#333] outline-none text-white"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Artist name"
//             className="w-full p-4 rounded-xl bg-[#222] border border-[#333] outline-none text-white"
//             value={artist}
//             onChange={(e) => setArtist(e.target.value)}
//           />

//           <label className="col-span-1 lg:col-span-2 cursor-pointer bg-[#222] border border-[#333] rounded-xl p-6 flex items-center gap-4 text-gray-300">
//             <ImageIcon />
//             <span>{file ? file.name : "Upload image file"}</span>
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => setFile(e.target.files?.[0] || null)}
//             />
//           </label>
//         </div>

//         <button
//           onClick={uploadArt}
//           className="mt-6 px-8 py-3 bg-[#ff4b5c] hover:bg-[#ff6b7c] transition rounded-xl shadow-lg text-white font-semibold flex items-center gap-2"
//         >
//           {loading ? <Loader className="animate-spin" size={20} /> : "Submit Artwork"}
//         </button>
//       </div>
//     </div>
//   );
// }










"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Loader, UploadCloud, ChevronDown } from "lucide-react";

export default function SubmitArtPage() {
  const [artistName, setArtistName] = useState("");
  const [artType, setArtType] = useState("");
  const [creditUrl, setCreditUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  // Dropdown states
  const [openDrop, setOpenDrop] = useState(false);

  const artTypes = ["Digital Art", "Sketch", "Illustration", "Photography", "Painting"];

  const uploadArt = async () => {
    if (!file || !artistName || !artType) {
      return alert("Please fill all required fields!");
    }
    if (!agree) return alert("You must accept terms & conditions!");

    setLoading(true);

    // Upload image file
    const fileExt = file.name.split(".").pop();
    const filePath = `art_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("art-images")
      .upload(filePath, file);

    if (uploadError) {
      setLoading(false);
      return alert("Upload failed!");
    }

    const { data: urlData } = supabase.storage
      .from("art-images")
      .getPublicUrl(filePath);

    // Get logged-in user
    const userRes = await supabase.auth.getUser();
    const userId = userRes?.data?.user?.id ?? null;

    // Insert DB Record
    await supabase.from("art").insert({
      artist_name: artistName,
      art_type: artType,
      credit_url: creditUrl || null,
      image_url: urlData.publicUrl,
      user_id: userId,
    });

    setLoading(false);
    alert("Artwork submitted!");
    setArtistName("");
    setArtType("");
    setCreditUrl("");
    setFile(null);
  };

  return (
    <div className="w-full min-h-screen px-6 py-10 text-white">

      {/* === Page Header (Hello, Jack!) Optional === */}

      {/* === Submit Art Section === */}
      <div className="bg-[#1b1b1b] rounded-2xl border border-[#2d2d2d] p-10 mx-auto max-w-4xl">

        <h1 className="text-2xl font-semibold mb-2">Submit art</h1>
        <p className="text-gray-400 mb-8">
          To upload image click on box or drop file here!
        </p>

        {/* Upload box */}
        <label className="
          w-40 h-40 border-2 border-dashed border-[#6445ff]
          rounded-xl flex flex-col items-center justify-center
          cursor-pointer hover:bg-[#262626] transition mb-6
        ">
          <UploadCloud className="text-[#6445ff] mb-2" size={35} />
          <span className="text-xs text-gray-400 text-center px-2">
            JPG should be 1920×1080px+
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {/* Artist Name */}
        <input
          type="text"
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="w-full mb-4 p-4 bg-[#222] border border-[#333] rounded-xl outline-none"
        />

        {/* Art Type Dropdown */}
        <div className="relative mb-4">
          <div
            onClick={() => setOpenDrop(!openDrop)}
            className="w-full p-4 bg-[#222] border border-[#333] rounded-xl flex justify-between cursor-pointer"
          >
            <span className="text-gray-300">{artType || "Art Type"}</span>
            <ChevronDown />
          </div>

          {openDrop && (
            <div className="absolute top-full left-0 w-full bg-[#222] border border-[#333] rounded-xl mt-2 z-10">
              {artTypes.map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setArtType(type);
                    setOpenDrop(false);
                  }}
                  className="px-4 py-3 hover:bg-[#333] cursor-pointer"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Credit URL */}
        <input
          type="text"
          placeholder="Credit URL (optional)"
          value={creditUrl}
          onChange={(e) => setCreditUrl(e.target.value)}
          className="w-full mb-8 p-4 bg-[#222] border border-[#333] rounded-xl outline-none"
        />

        {/* Social inputs — Optional */}
        <p className="text-gray-400 mb-3">Artist social <span className="text-sm opacity-60">(optional)</span></p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <input className="p-4 bg-[#222] border border-[#333] rounded-xl outline-none" placeholder="Instagram" />
          <input className="p-4 bg-[#222] border border-[#333] rounded-xl outline-none" placeholder="Twitter" />
          <input className="p-4 bg-[#222] border border-[#333] rounded-xl outline-none" placeholder="Facebook" />
          <input className="p-4 bg-[#222] border border-[#333] rounded-xl outline-none" placeholder="Website" />
        </div>

        {/* T&C */}
        <label className="flex items-center gap-3 text-sm mb-8 cursor-pointer">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <span className="text-gray-400">
            I read and accepted the <a className="text-blue-400 underline">terms and conditions</a>
          </span>
        </label>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <button
            onClick={uploadArt}
            className="px-8 py-3 bg-[#ff475a] hover:bg-[#ff5f74] rounded-xl shadow-lg flex items-center gap-2 font-semibold"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : "Upload art"}
          </button>
        </div>

      </div>
    </div>
  );
}
