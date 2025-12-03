
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
      // Use avatar from profiles table, or fall back to user metadata
      setAvatarUrl(data.avatar_url || user.user_metadata?.avatar_url || "");
      setFullName(data.full_name || "");
      setEmail(data.email || user.email || "");
      setCity(data.city || "");
      setStateProv(data.state || "");
      setCountry(data.country || "");
      setCompany(data.company || "");
      setJobTitle(data.job_title || "");
      setWebsite(data.website || "");
    } else {
      // No profile record yet, use user metadata
      setAvatarUrl(user.user_metadata?.avatar_url || "");
      setFullName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
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
