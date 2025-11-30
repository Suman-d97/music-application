// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { supabase } from "@/utils/supabaseClient";
// // // import { Camera, Save, Globe, Instagram, Twitter } from "lucide-react";

// // // export default function ProfilePage() {
// // //   const [profile, setProfile] = useState<any>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   const [username, setUsername] = useState("");
// // //   const [bio, setBio] = useState("");
// // //   const [website, setWebsite] = useState("");
// // //   const [instagram, setInstagram] = useState("");
// // //   const [twitter, setTwitter] = useState("");

// // //   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
// // //   const [coverPreview, setCoverPreview] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     loadProfile();
// // //   }, []);

// // //   const loadProfile = async () => {
// // //     const { data: { user } } = await supabase.auth.getUser();
// // //     if (!user) return;

// // //     const { data } = await supabase
// // //       .from("profiles")
// // //       .select("*")
// // //       .eq("id", user.id)
// // //       .single();

// // //     setProfile(data);
// // //     setUsername(data?.username || "");
// // //     setBio(data?.bio || "");
// // //     setWebsite(data?.website || "");
// // //     setInstagram(data?.instagram || "");
// // //     setTwitter(data?.twitter || "");

// // //     setAvatarPreview(data?.avatar_url || null);
// // //     setCoverPreview(data?.cover_url || null);

// // //     setLoading(false);
// // //   };

// // //   const uploadImage = async (e: any, type: "avatar" | "cover") => {
// // //     const file = e.target.files?.[0];
// // //     if (!file || !profile) return;

// // //     const filePath = `${type}/${profile.id}-${Date.now()}`;
// // //     const { error } = await supabase.storage
// // //       .from("profiles")
// // //       .upload(filePath, file, { upsert: true });

// // //     if (error) return alert("Upload failed");

// // //     const { data: urlData } = supabase.storage
// // //       .from("profiles")
// // //       .getPublicUrl(filePath);

// // //     const publicUrl = urlData.publicUrl;

// // //     await supabase
// // //       .from("profiles")
// // //       .update({ [`${type}_url`]: publicUrl })
// // //       .eq("id", profile.id);

// // //     if (type === "avatar") setAvatarPreview(publicUrl);
// // //     if (type === "cover") setCoverPreview(publicUrl);
// // //   };

// // //   const saveProfile = async () => {
// // //     await supabase
// // //       .from("profiles")
// // //       .update({
// // //         username,
// // //         bio,
// // //         website,
// // //         instagram,
// // //         twitter,
// // //       })
// // //       .eq("id", profile.id);

// // //     alert("Profile updated!");
// // //   };

// // //   if (loading) return <p className="text-white p-6">Loading...</p>;

// // //   return (
// // //     <div className="text-white space-y-10 pb-20">

// // //       {/* Cover Photo */}
// // //       <div className="relative w-full h-56 bg-[#111] rounded-xl overflow-hidden border border-[#222] shadow-lg">
// // //         {coverPreview ? (
// // //           <img
// // //             src={coverPreview}
// // //             className="w-full h-full object-cover opacity-80"
// // //           />
// // //         ) : (
// // //           <div className="w-full h-full flex items-center justify-center text-gray-500">
// // //             No Cover Photo
// // //           </div>
// // //         )}

// // //         {/* Upload Cover */}
// // //         <label className="absolute bottom-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-full border border-[#333] cursor-pointer hover:bg-black/60 transition">
// // //           <Camera size={18} />
// // //           <input type="file" hidden onChange={(e) => uploadImage(e, "cover")} />
// // //         </label>
// // //       </div>

// // //       {/* Avatar + Info */}
// // //       <div className="relative flex gap-6 items-start -mt-16 px-4">
// // //         {/* Avatar */}
// // //         <div className="relative group">
// // //           <img
// // //             src={avatarPreview || "/profile.png"}
// // //             className="w-32 h-32 rounded-full border-4 border-[#1b1b1b] object-cover shadow-xl"
// // //           />

// // //           {/* Upload Avatar */}
// // //           <label className="absolute bottom-1 right-1 p-2 bg-black/40 rounded-full border border-[#333] cursor-pointer hover:bg-black/70 transition">
// // //             <Camera size={16} />
// // //             <input type="file" hidden onChange={(e) => uploadImage(e, "avatar")} />
// // //           </label>
// // //         </div>

// // //         {/* Username + Bio */}
// // //         <div className="space-y-2 mt-6">
// // //           <h1 className="text-3xl font-bold">{username}</h1>
// // //           <p className="text-gray-400 max-w-xl">{bio || "No bio added yet."}</p>
// // //         </div>
// // //       </div>

// // //       {/* PROFILE EDIT FORM */}
// // //       <div className="bg-[#1b1b1b] p-8 rounded-xl border border-[#2a2a2a] space-y-6 shadow-xl">

// // //         <h2 className="text-2xl font-bold">Edit Profile</h2>

// // //         {/* USERNAME */}
// // //         <div>
// // //           <label className="text-sm text-gray-300">Username</label>
// // //           <input
// // //             value={username}
// // //             onChange={(e) => setUsername(e.target.value)}
// // //             className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-3 mt-1 outline-none focus:border-blue-500 transition"
// // //           />
// // //         </div>

// // //         {/* BIO */}
// // //         <div>
// // //           <label className="text-sm text-gray-300">Bio</label>
// // //           <textarea
// // //             value={bio}
// // //             onChange={(e) => setBio(e.target.value)}
// // //             className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-3 mt-1 outline-none h-24 resize-none focus:border-blue-500 transition"
// // //           />
// // //         </div>

// // //         {/* WEBSITE */}
// // //         <div>
// // //           <label className="text-sm text-gray-300 flex items-center gap-2"><Globe size={16} /> Website</label>
// // //           <input
// // //             value={website}
// // //             onChange={(e) => setWebsite(e.target.value)}
// // //             className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-3 mt-1 outline-none focus:border-blue-500 transition"
// // //           />
// // //         </div>

// // //         {/* INSTAGRAM */}
// // //         <div>
// // //           <label className="text-sm text-gray-300 flex items-center gap-2"><Instagram size={16} /> Instagram</label>
// // //           <input
// // //             value={instagram}
// // //             onChange={(e) => setInstagram(e.target.value)}
// // //             className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-3 mt-1 outline-none focus:border-blue-500 transition"
// // //           />
// // //         </div>

// // //         {/* TWITTER */}
// // //         <div>
// // //           <label className="text-sm text-gray-300 flex items-center gap-2"><Twitter size={16} /> Twitter</label>
// // //           <input
// // //             value={twitter}
// // //             onChange={(e) => setTwitter(e.target.value)}
// // //             className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-3 mt-1 outline-none focus:border-blue-500 transition"
// // //           />
// // //         </div>

// // //         {/* Save Button */}
// // //         <button
// // //           onClick={saveProfile}
// // //           className="flex items-center gap-2 px-5 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg"
// // //         >
// // //           <Save size={18} />
// // //           Save Profile
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useEffect, useState } from "react";
// // import Image from "next/image";
// // import { Camera, Trash2, Save, LogOut, Eye, CheckCircle } from "lucide-react";
// // import { supabase } from "@/utils/supabaseClient";

// // export default function ProfilePage() {
// //   const [loading, setLoading] = useState(true);
// //   const [user, setUser] = useState<any>(null);
// //   const [profile, setProfile] = useState<any>(null);

// //   // Fields (Figma)
// //   const [fullName, setFullName] = useState("");
// //   const [email, setEmail] = useState("");
// //   // password recovery
// //   const [oldPassword, setOldPassword] = useState("");
// //   const [newPassword, setNewPassword] = useState("");
// //   const [repeatPassword, setRepeatPassword] = useState("");

// //   // about you fields
// //   const [city, setCity] = useState("");
// //   const [stateProv, setStateProv] = useState("");
// //   const [country, setCountry] = useState("");
// //   const [company, setCompany] = useState("");
// //   const [jobTitle, setJobTitle] = useState("");
// //   const [website, setWebsite] = useState("");

// //   // avatar preview
// //   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
// //   const [uploading, setUploading] = useState(false);

// //   useEffect(() => {
// //     load();
// //   }, []);

// //   async function load() {
// //     setLoading(true);
// //     try {
// //       const { data: authData } = await supabase.auth.getUser();
// //       const currentUser = authData?.user;
// //       setUser(currentUser);
// //       if (!currentUser) {
// //         setLoading(false);
// //         return;
// //       }

// //       // Fetch profile row from 'profiles' table; fields: avatar_url, full_name, email, city, state, country, company, job_title, website
// //       const { data, error } = await supabase
// //         .from("profiles")
// //         .select("*")
// //         .eq("id", currentUser.id)
// //         .single();

// //       if (error && error.code !== "PGRST116") {
// //         // PGRST116 sometimes when no row exists; ignore that
// //         console.error("profiles fetch error", error);
// //       }

// //       const p = data || null;
// //       setProfile(p);

// //       // set UI state
// //       setFullName(p?.full_name || "");
// //       setEmail(p?.email || currentUser.email || "");
// //       setAvatarUrl(p?.avatar_url || null);

// //       setCity(p?.city || "");
// //       setStateProv(p?.state || "");
// //       setCountry(p?.country || "");
// //       setCompany(p?.company || "");
// //       setJobTitle(p?.job_title || "");
// //       setWebsite(p?.website || "");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   // Avatar upload to storage bucket 'avatars'
// //   async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
// //     const file = e.target.files?.[0];
// //     if (!file || !user) return;
// //     setUploading(true);

// //     try {
// //       // path: avatars/{userid}-{timestamp}-{filename}
// //       const filePath = `avatars/${user.id}-${Date.now()}-${file.name}`;

// //       const { error: uploadError } = await supabase.storage
// //         .from("avatars")
// //         .upload(filePath, file, { upsert: true });

// //       if (uploadError) throw uploadError;

// //       const { data: urlData } = supabase.storage
// //         .from("avatars")
// //         .getPublicUrl(filePath);

// //       const publicUrl = urlData.publicUrl;

// //       // update profiles row; if doesn't exist, insert
// //       // const row = {
// //       //   id: user.id,
// //       //   avatar_url: publicUrl,
// //       //   full_name: fullName,
// //       //   email,
// //       //   city,
// //       //   state: stateProv,
// //       //   country,
// //       //   company,
// //       //   job_title,
// //       //   website,
// //       // };

// //       const row = {
// //         id: user.id,
// //         avatar_url: publicUrl,
// //         full_name: fullName || "",
// //         email: email || "",
// //         city: city || "",
// //         state: stateProv || "",
// //         country: country || "",
// //         company: company || "",
// //         job_title: jobTitle || "",
// //         website: website || "",
// //       };

// //       // upsert
// //       const { error: upsertError } = await supabase
// //         .from("profiles")
// //         .upsert(row, { returning: "representation" });

// //       if (upsertError) throw upsertError;

// //       setAvatarUrl(publicUrl);
// //       alert("Avatar uploaded");
// //     } catch (err: any) {
// //       console.error(err);
// //       alert("Upload failed: " + (err.message || String(err)));
// //     } finally {
// //       setUploading(false);
// //     }
// //   }

// //   async function handleDeleteAvatar() {
// //     if (!profile?.avatar_url) {
// //       // nothing to delete
// //       setAvatarUrl(null);
// //       return;
// //     }

// //     // The storage object path is not retrievable from the public url directly reliably.
// //     // If you want to delete from storage, store the storage path in the profile table (e.g. avatar_path).
// //     // For now we will only remove DB reference (unlink) and set UI to default.
// //     try {
// //       await supabase
// //         .from("profiles")
// //         .update({ avatar_url: null })
// //         .eq("id", user.id);

// //       setAvatarUrl(null);
// //       alert("Avatar removed.");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to remove avatar");
// //     }
// //   }

// //   async function handleUpdateInfo() {
// //     if (!user) return;
// //     try {
// //       const row = {
// //         id: user.id,
// //         full_name: fullName,
// //         email,
// //         city,
// //         state: stateProv,
// //         country,
// //         company,
// //         job_title: jobTitle,
// //         website,
// //       };

// //       // upsert profile
// //       const { error } = await supabase.from("profiles").upsert(row);
// //       if (error) throw error;

// //       // also update auth email if it differs
// //       if (user.email !== email) {
// //         await supabase.auth.updateUser({ email });
// //       }

// //       alert("Profile updated");
// //       load();
// //     } catch (err: any) {
// //       console.error(err);
// //       alert("Update failed: " + (err.message || String(err)));
// //     }
// //   }

// //   async function handleChangePassword() {
// //     if (!user) return;
// //     if (newPassword.trim().length < 6) {
// //       alert("New password must be at least 6 characters");
// //       return;
// //     }
// //     if (newPassword !== repeatPassword) {
// //       alert("Passwords do not match");
// //       return;
// //     }

// //     try {
// //       // Note: Supabase updateUser will set password for current user/session
// //       const { error } = await supabase.auth.updateUser({
// //         password: newPassword,
// //       });
// //       if (error) throw error;

// //       setOldPassword("");
// //       setNewPassword("");
// //       setRepeatPassword("");

// //       alert("Password updated");
// //     } catch (err: any) {
// //       console.error(err);
// //       alert("Password update failed: " + (err.message || String(err)));
// //     }
// //   }

// //   async function handleSignOut() {
// //     await supabase.auth.signOut();
// //     window.location.href = "/signin";
// //   }

// //   // quick loading render
// //   if (loading) {
// //     return (
// //       <div className="p-8 text-gray-300 bg-[var(--bg,#0f1113)] min-h-screen">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#151515] text-white px-8 pb-20">
// //       {/* Top area: sidebar left exists outside of this page in your layout */}
// //       {/* Purple banner */}
// //       {/* <div className="w-full bg-[#6b55ff] rounded-3xl p-8 flex items-center justify-between gap-6 shadow-lg">
// //         <div>
// //           <h1 className="text-4xl font-extrabold leading-tight">Hello, {fullName || (user?.email?.split("@")[0] ?? "jack")}!</h1>
// //           <p className="text-white/85 mt-1">Welcome back to Myfile</p>
// //         </div>

// //         <div className="flex items-center gap-4">
// //           <img src="/banner.png" alt="banner" className="h-28 object-cover rounded-lg" />
// //         </div>
// //       </div> */}

// //       <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
// //         {/* Left column: avatar + upload */}
// //         <div className="col-span-1">
// //           <h2 className="text-lg font-semibold mb-4">Your information</h2>

// //          <div className="flex items-center gap-6">
// //   <div className="relative">

// //     {/* Avatar Circle */}
// //     <div className="w-32 h-32 rounded-full overflow-hidden bg-[#222] border border-[#333] shadow-lg">
// //       <img
// //         src={avatarUrl || "/profile.png"}
// //         alt={`${username}'s avatar`}
// //         className="w-full h-full object-cover"
// //       />
// //     </div>

// //     {/* Buttons */}
// //     <div className="flex gap-3 mt-4">

// //       {/* Upload button */}
// //       <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6b55ff] text-white cursor-pointer hover:brightness-110 transition shadow-md">
// //         <Camera size={16} />
// //         Upload picture
// //         <input hidden type="file" onChange={handleAvatarUpload} />
// //       </label>

// //       {/* Delete button */}
// //       <button
// //         onClick={handleDeleteAvatar}
// //         className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500 text-red-400 hover:bg-red-600/10 transition shadow-md"
// //       >
// //         <Trash2 size={16} />
// //         Delete picture
// //       </button>

// //     </div>
// //   </div>
// // </div>


// //           {/* Info form */}
// //           <div className="mt-8 space-y-4">
// //             <div>
// //               <label className="text-sm text-white/80">Full Name</label>
// //               <input
// //                 value={fullName}
// //                 onChange={(e) => setFullName(e.target.value)}
// //                 className="w-full mt-2 bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //                 placeholder="Full name"
// //               />
// //             </div>

// //             <div>
// //               <label className="text-sm text-white/80">Email</label>
// //               <input
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className="w-full mt-2 bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //                 placeholder="Email"
// //               />
// //             </div>

// //             <div className="flex justify-end">
// //               <button
// //                 onClick={handleUpdateInfo}
// //                 className="px-5 py-3 rounded-xl bg-[#6b6b6b] hover:bg-[#787878] transition"
// //               >
// //                 Update
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Middle column: password recovery + about */}
// //         <div className="col-span-1 lg:col-span-2 space-y-8">
// //           {/* Password recovery */}
// //           <div className="bg-[#1b1b1b] rounded-2xl p-6 border border-[#2a2a2a]">
// //             <h3 className="text-lg font-semibold mb-4">Password recovery</h3>

// //             <div className="space-y-3">
// //               <input
// //                 type="password"
// //                 value={oldPassword}
// //                 onChange={(e) => setOldPassword(e.target.value)}
// //                 placeholder="Old password"
// //                 className="w-full bg-[#222] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //               />
// //               <input
// //                 type="password"
// //                 value={newPassword}
// //                 onChange={(e) => setNewPassword(e.target.value)}
// //                 placeholder="New password"
// //                 className="w-full bg-[#222] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //               />
// //               <input
// //                 type="password"
// //                 value={repeatPassword}
// //                 onChange={(e) => setRepeatPassword(e.target.value)}
// //                 placeholder="Repeat the password"
// //                 className="w-full bg-[#222] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //               />

// //               <div className="flex justify-end">
// //                 <button
// //                   onClick={handleChangePassword}
// //                   className="px-5 py-3 rounded-xl bg-[#6b6b6b] hover:bg-[#787878] transition"
// //                 >
// //                   Update
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* About you */}
// //           <div className="bg-[#1b1b1b] rounded-2xl p-6 border border-[#2a2a2a] space-y-4">
// //             <h3 className="text-lg font-semibold">About you</h3>

// //             <div className="grid grid-cols-2 gap-4">
// //               <input
// //                 value={city}
// //                 onChange={(e) => setCity(e.target.value)}
// //                 placeholder="City"
// //                 className="w-full bg-[#222] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //               />
// //               <input
// //                 value={stateProv}
// //                 onChange={(e) => setStateProv(e.target.value)}
// //                 placeholder="State / Province"
// //                 className="w-full bg-[#222] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //               />
// //               <input
// //                 value={country}
// //                 onChange={(e) => setCountry(e.target.value)}
// //                 placeholder="Country"
// //                 className="w-full bg-[#222] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //               />
// //               <input
// //                 value={company}
// //                 onChange={(e) => setCompany(e.target.value)}
// //                 placeholder="Company"
// //                 className="w-full bg-[#222] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //               />
// //               <input
// //                 value={jobTitle}
// //                 onChange={(e) => setJobTitle(e.target.value)}
// //                 placeholder="Job Title"
// //                 className="w-full bg-[#222] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //               />
// //               <input
// //                 value={website}
// //                 onChange={(e) => setWebsite(e.target.value)}
// //                 placeholder="Website"
// //                 className="w-full bg-[#222] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
// //               />
// //             </div>

// //             <div className="flex justify-between items-center mt-4">
// //               <button
// //                 onClick={() => {
// //                   // sign out button style on left
// //                   handleSignOut();
// //                 }}
// //                 className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
// //               >
// //                 Sign out
// //               </button>

// //               <button
// //                 onClick={handleUpdateInfo}
// //                 className="px-6 py-3 rounded-xl bg-[#6b6b6b] hover:bg-[#787878] transition"
// //               >
// //                 Update
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }























// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";
// import { Camera, Trash2 } from "lucide-react";

// export default function ProfilePage() {
//   const [loading, setLoading] = useState(true);

//   // profile fields
//   const [userId, setUserId] = useState<string>("");
//   const [avatarUrl, setAvatarUrl] = useState<string>("");
//   const [fullName, setFullName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");

//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [repeatPassword, setRepeatPassword] = useState("");

//   const [city, setCity] = useState("");
//   const [stateProv, setStateProv] = useState("");
//   const [country, setCountry] = useState("");
//   const [company, setCompany] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [website, setWebsite] = useState("");

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   async function loadProfile() {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) {
//       setLoading(false);
//       return;
//     }
//     setUserId(user.id);

//     const { data } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("id", user.id)
//       .single();

//     if (data) {
//       setFullName(data.full_name || "");
//       setEmail(data.email || "");
//       setCity(data.city || "");
//       setStateProv(data.state || "");
//       setCountry(data.country || "");
//       setCompany(data.company || "");
//       setJobTitle(data.job_title || "");
//       setWebsite(data.website || "");
//       setAvatarUrl(data.avatar_url || "");
//     }

//     setLoading(false);
//   }

//   // upload to storage bucket 'avatars' (you already created)
//   async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
//     try {
//       const file = e.target.files?.[0];
//       if (!file || !userId) return;
//       const filePath = `${userId}-${Date.now()}`;
//       const { error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(filePath, file, { upsert: true });

//       if (uploadError) throw uploadError;

//       const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
//       const publicUrl = urlData.publicUrl;

//       // upsert full profile (keeps all fields consistent)
//       const row = {
//         id: userId,
//         avatar_url: publicUrl,
//         full_name: fullName,
//         email,
//         city,
//         state: stateProv,
//         country,
//         company,
//         job_title: jobTitle,
//         website,
//       };

//       const { error } = await supabase.from("profiles").upsert(row);
//       if (error) throw error;

//       setAvatarUrl(publicUrl);
//       alert("Avatar uploaded");
//     } catch (err: any) {
//       console.error(err);
//       alert("Upload failed: " + (err.message || String(err)));
//     }
//   }

//   async function handleDeleteAvatar() {
//     if (!userId) return;
//     try {
//       const row = {
//         id: userId,
//         avatar_url: "",
//         full_name: fullName,
//         email,
//         city,
//         state: stateProv,
//         country,
//         company,
//         job_title: jobTitle,
//         website,
//       };
//       const { error } = await supabase.from("profiles").upsert(row);
//       if (error) throw error;
//       setAvatarUrl("");
//       alert("Avatar removed");
//     } catch (err: any) {
//       console.error(err);
//       alert("Delete failed: " + (err.message || String(err)));
//     }
//   }

//   async function handleSaveProfile() {
//     try {
//       const row = {
//         id: userId,
//         avatar_url: avatarUrl,
//         full_name: fullName,
//         email,
//         city,
//         state: stateProv,
//         country,
//         company,
//         job_title: jobTitle,
//         website,
//       };
//       const { error } = await supabase.from("profiles").upsert(row);
//       if (error) throw error;
//       alert("Profile updated");
//     } catch (err: any) {
//       console.error(err);
//       alert("Save failed: " + (err.message || String(err)));
//     }
//   }

//   if (loading) return <div className="p-6 text-white">Loading...</div>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto text-white">
//       {/* Your information header */}
//       <h3 className="text-lg font-semibold mb-4">Your information</h3>

//       <div className="flex items-start gap-6">
//         {/* Avatar square (rounded corners like screenshot) */}
//         <div>
//           <div className="w-20 h-20 rounded-[12px] overflow-hidden bg-[#2b2b2b] border border-[#3a3a3a]">
//             <img
//               src={avatarUrl || "/profile.png"}
//               alt={fullName ? `${fullName} avatar` : "avatar"}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Buttons beside avatar */}
//         <div className="flex items-center gap-3 mt-1">
//           <label className="inline-flex items-center gap-2 px-5 py-3 rounded-[12px] bg-[#6b55ff] text-white cursor-pointer shadow-sm">
//             <Camera size={16} />
//             <span className="text-sm">Upload picture</span>
//             <input type="file" className="hidden" onChange={handleAvatarUpload} />
//           </label>

//           <button
//             onClick={handleDeleteAvatar}
//             className="inline-flex items-center gap-2 px-5 py-3 rounded-[12px] border border-red-500 text-red-400 bg-transparent hover:bg-[#2a0b0b]/10"
//           >
//             <Trash2 size={16} />
//             <span className="text-sm">Delete picture</span>
//           </button>
//         </div>
//       </div>

//       {/* Form fields */}
//       <div className="mt-6 space-y-4">
//         {/* Full name */}
//         <input
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           placeholder="Full Name"
//           className="w-full bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//         />

//         {/* Email and update button aligned right */}
//         <div className="flex gap-4">
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="flex-1 bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//           />
//           <button
//             onClick={handleSaveProfile}
//             className="ml-auto px-6 py-3 rounded-[10px] bg-gray-500 text-white"
//           >
//             Update
//           </button>
//         </div>
//       </div>

//       {/* Password recovery section */}
//       <div className="mt-10">
//         <h4 className="text-lg font-semibold mb-3">Password recovery</h4>
//         <div className="space-y-3">
//           <div className="relative">
//             <input
//               type="password"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               placeholder="Old password"
//               className="w-full bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//             />
//             {/* small icon placeholder on right */}
//             <span className="absolute right-3 top-3 text-gray-400">•••</span>
//           </div>

//           <div className="relative">
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="New password"
//               className="w-full bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//             />
//             <span className="absolute right-3 top-3 text-gray-400">•••</span>
//           </div>

//           <div className="relative">
//             <input
//               type="password"
//               value={repeatPassword}
//               onChange={(e) => setRepeatPassword(e.target.value)}
//               placeholder="Repeat the password"
//               className="w-full bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//             />
//             <span className="absolute right-3 top-3 text-gray-400">•••</span>
//           </div>

//           <div className="mt-3">
//             <button className="px-6 py-3 rounded-[10px] bg-gray-500">Update</button>
//           </div>
//         </div>
//       </div>

//       {/* About you grid */}
//       <div className="mt-10">
//         <h4 className="text-lg font-semibold mb-3">About you</h4>

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             placeholder="City"
//             className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//           />
//           <input
//             value={stateProv}
//             onChange={(e) => setStateProv(e.target.value)}
//             placeholder="State / Province"
//             className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//           />
//           <input
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             placeholder="Country"
//             className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//           />
//           <input
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             placeholder="Company"
//             className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//           />
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Job Title"
//             className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//           />
//           <input
//             value={website}
//             onChange={(e) => setWebsite(e.target.value)}
//             placeholder="Website"
//             className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a] placeholder:text-gray-400"
//           />
//         </div>

//         <div className="flex items-center justify-between mt-6">
//           <button
//             onClick={async () => {
//               await supabase.auth.signOut();
//               window.location.reload();
//             }}
//             className="px-6 py-3 rounded-[10px] bg-red-600 text-white"
//           >
//             Sign out
//           </button>

//           <button
//             onClick={handleSaveProfile}
//             className="px-6 py-3 rounded-[10px] bg-gray-500"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



















"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Camera, Eye, EyeOff, Trash2 } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [showOld, setShowOld] = useState(false);
const [showNew, setShowNew] = useState(false);
const [showRepeat, setShowRepeat] = useState(false);

  // user + profile fields
  const [userId, setUserId] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [city, setCity] = useState("");
  const [stateProv, setStateProv] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");

  // --------------------------------------------------
  // Load profile
  // --------------------------------------------------
  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setAvatarUrl(data.avatar_url || "");
      setFullName(data.full_name || "");
      setEmail(data.email || user.email || "");
      setCity(data.city || "");
      setStateProv(data.state || "");
      setCountry(data.country || "");
      setCompany(data.company || "");
      setJobTitle(data.job_title || "");
      setWebsite(data.website || "");
    }

    setLoading(false);
  }

  // --------------------------------------------------
  // Upload avatar (UPDATE ONLY avatar_url)
  // --------------------------------------------------
  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    try {
      const filePath = `${userId}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // ⭐ IMPORTANT: UPDATE ONLY avatar_url
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      alert("Avatar updated!");
    } catch (err: any) {
      console.error(err);
      alert("Upload failed: " + err.message);
    }
  }

  // --------------------------------------------------
  // Delete avatar
  // --------------------------------------------------
  async function handleDeleteAvatar() {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: "" })
        .eq("id", userId);

      if (error) throw error;

      setAvatarUrl("");
      alert("Avatar deleted!");
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  }

  // --------------------------------------------------
  // Save profile
  // --------------------------------------------------
  async function handleSaveProfile() {
    try {
      const row = {
        id: userId,
        full_name: fullName,
        email,
        city,
        state: stateProv,
        country,
        company,
        job_title: jobTitle,
        website,
      };

      const { error } = await supabase.from("profiles").upsert(row);
      if (error) throw error;

      alert("Profile updated!");
    } catch (err: any) {
      alert("Save failed: " + err.message);
    }
  }

  // --------------------------------------------------
  // Change password
  // --------------------------------------------------
  async function handleChangePassword() {
    if (newPassword.length < 6) {
      return alert("Password must be at least 6 characters");
    }
    if (newPassword !== repeatPassword) {
      return alert("Passwords do not match");
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) return alert(error.message);

    setOldPassword("");
    setNewPassword("");
    setRepeatPassword("");
    alert("Password updated!");
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">

      {/* -------------------- YOUR INFORMATION -------------------- */}
      <h3 className="text-lg font-semibold mb-4">Your information</h3>

      <div className="flex items-start gap-6">
        <div>
          <div className="w-20 h-20 rounded-[12px] overflow-hidden bg-[#2b2b2b] border border-[#3a3a3a]">
            <img
              src={avatarUrl || "/profile.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Upload + Delete */}
        <div className="flex items-center gap-3 mt-1">
          <label className="inline-flex items-center gap-2 px-5 py-3 rounded-[12px] bg-[#6b55ff] text-white cursor-pointer">
            <Camera size={16} />
            Upload picture
            <input hidden type="file" onChange={handleAvatarUpload} />
          </label>

          <button
            onClick={handleDeleteAvatar}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[12px] border border-red-500 text-red-400 cursor-pointer"
          >
            <Trash2 size={16} />
            Delete picture
          </button>
        </div>
      </div>

      {/* -------------------- BASIC INFO -------------------- */}
      <div className="mt-6 space-y-4">
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]"
        />

        <div className="flex gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="flex-1 bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]"
          />

          <button
            onClick={handleSaveProfile}
            className="px-6 py-3 rounded-[10px] bg-gray-600 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>

  
      {/* -------------------- PASSWORD RECOVERY -------------------- */}
<div className="mt-10">
  <h4 className="text-lg font-semibold mb-3">Password recovery</h4>

  <div className="space-y-3">

    {/* Old password */}
    <div className="relative">
      <input
        type={showOld ? "text" : "password"}
        placeholder="Old password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="w-full bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]"
      />
      <button
        type="button"
        onClick={() => setShowOld(!showOld)}
        className="absolute right-3 top-3 text-gray-300 cursor-pointer"
      >
        {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>

    {/* New password */}
    <div className="relative">
      <input
        type={showNew ? "text" : "password"}
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]"
      />
      <button
        type="button"
        onClick={() => setShowNew(!showNew)}
        className="absolute right-3 top-3 text-gray-300 cursor-pointer"
      >
        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>

    {/* Repeat password */}
    <div className="relative">
      <input
        type={showRepeat ? "text" : "password"}
        placeholder="Repeat the password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className="w-full bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]"
      />
      <button
        type="button"
        onClick={() => setShowRepeat(!showRepeat)}
        className="absolute right-3 top-3 text-gray-300 cursor-pointer"
      >
        {showRepeat ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>

    <button
      onClick={handleChangePassword}
      className="px-6 py-3 mt-2 rounded-[10px] bg-gray-600 cursor-pointer"
    >
      Update
    </button>
  </div>
</div>






      {/* -------------------- ABOUT YOU -------------------- */}
      <div className="mt-10">
        <h4 className="text-lg font-semibold mb-3">About you</h4>

        <div className="grid grid-cols-2 gap-4">
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]" />
          <input value={stateProv} onChange={(e) => setStateProv(e.target.value)} placeholder="State / Province" className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]" />
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]" />
          <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]" />
          <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" className="bg-[#2b2b2b] rounded-[10px] px-4 py-3 border border-[#3a3a3a]" />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/signin";
            }}
            className="px-6 py-3 rounded-[10px] bg-red-600 cursor-pointer"
          >
            Sign out
          </button>

          <button
            onClick={handleSaveProfile}
            className="px-6 py-3 rounded-[10px] bg-gray-600 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
