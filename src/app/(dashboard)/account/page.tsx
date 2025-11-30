// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/utils/supabaseClient";

// export default function AccountPage() {
//   const router = useRouter();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       if (!data.session) {
//         router.push("/signin");
//       }
//     });
//   }, []);

//   return <div>Account page content...</div>;
// }







// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";

// export default function AccountPage() {
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       setProfile(data);
//       setUsername(data?.username || "");
//       setLoading(false);
//     };

//     load();
//   }, []);

//   const updateProfile = async () => {
//     if (!profile) return;

//     await supabase
//       .from("profiles")
//       .update({ username })
//       .eq("id", profile.id);

//     alert("Profile Updated!");
//   };

//   if (loading) return <p className="text-white">Loading...</p>;

//   return (
//     <div className="text-white space-y-8">
//       <h1 className="text-3xl font-bold">Account Settings</h1>

//       <div className="space-y-4 bg-[#1b1b1b] p-6 rounded-xl border border-[#2a2a2a]">
//         <label className="block text-gray-300 text-sm">Username</label>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-3 rounded bg-[#222] border border-[#333] outline-none"
//         />

//         <button
//           onClick={updateProfile}
//           className="mt-3 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }











"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Camera, User, Save } from "lucide-react";

export default function AccountPage() {
  const [profile, setProfile] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setUsername(data?.username || "");
      setPreview(data?.avatar_url || null);
      setLoading(false);
    };

    loadData();
  }, []);

  const uploadAvatar = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const filePath = `avatars/${profile.id}-${Date.now()}`;
    const { error } = await supabase.storage
      .from("profiles")
      .upload(filePath, file, { upsert: true });

    if (error) {
      alert("Error uploading avatar.");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("profiles")
      .getPublicUrl(filePath);

    await supabase
      .from("profiles")
      .update({ avatar_url: urlData.publicUrl })
      .eq("id", profile.id);

    setPreview(urlData.publicUrl);
    setUploading(false);
  };

  const updateProfile = async () => {
    await supabase
      .from("profiles")
      .update({ username })
      .eq("id", profile.id);

    alert("Profile updated!");
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white space-y-10 pb-20">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-gray-400 mt-1">Manage your profile information</p>
      </div>

      {/* Avatar + Info Box */}
      <div className="bg-[#1b1b1b]/70 rounded-2xl border border-[#2a2a2a] backdrop-blur-lg p-8 shadow-xl space-y-6">

        {/* Avatar Section */}
        <div className="flex items-center gap-8">
          <div className="relative group">
            <img
              src={preview || "/profile.png"}
              className="w-32 h-32 rounded-full object-cover border border-[#333] shadow-xl"
            />

            {/* Upload button */}
            <label className="absolute bottom-0 right-0 p-3 bg-[#222] rounded-full border border-[#444] cursor-pointer hover:bg-[#333] transition flex items-center justify-center shadow-lg">
              <Camera size={18} />
              <input type="file" accept="image/*" onChange={uploadAvatar} className="hidden" />
            </label>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Profile Picture</h2>
            <p className="text-gray-400 text-sm mt-1">
              This will be visible across your dashboard.
            </p>

            {uploading && (
              <p className="text-blue-400 text-sm mt-2">Uploading...</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#2a2a2a]"></div>

        {/* Profile Info Form */}
        <div className="space-y-4">

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <User size={18} /> Username
          </label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition"
          />

          <button
            onClick={updateProfile}
            className="mt-4 flex items-center gap-2 px-5 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
