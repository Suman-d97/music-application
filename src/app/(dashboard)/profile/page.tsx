
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Camera, Eye, EyeOff, Trash2 } from "lucide-react";
import LottieLoader from "@/components/Common/LottieLoader";

import { useMusic } from "@/store/useMusic";

export default function ProfilePage() {
  const { reset } = useMusic();
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
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LottieLoader size={300} message="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto text-[var(--text)]">

      {/* -------------------- YOUR INFORMATION -------------------- */}
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Your information</h3>

      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div>
          <div className="w-20 h-20 rounded-[12px] overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)]">
            <img
              src={avatarUrl || "/profile.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Upload + Delete */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-1 w-full sm:w-auto">
          <label className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-[12px] bg-[var(--primary)] text-white cursor-pointer text-sm hover:opacity-90 transition-opacity">
            <Camera size={16} />
            Upload picture
            <input hidden type="file" onChange={handleAvatarUpload} />
          </label>

          <button
            onClick={handleDeleteAvatar}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-[12px] border border-red-500 text-red-400 cursor-pointer text-sm"
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
          className="w-full bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
        />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="flex-1 bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm md:text-base"
          />

          <button
            onClick={handleSaveProfile}
            className="px-6 py-3 rounded-[10px] bg-[var(--bg-secondary)] border border-[var(--border)] hover:bg-[var(--hover)] text-[var(--text)] cursor-pointer text-sm md:text-base whitespace-nowrap transition-colors"
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
              className="w-full bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-3 text-[var(--text-secondary)] hover:text-[var(--text)] cursor-pointer transition-colors"
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
              className="w-full bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-3 text-[var(--text-secondary)] hover:text-[var(--text)] cursor-pointer transition-colors"
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
              className="w-full bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowRepeat(!showRepeat)}
              className="absolute right-3 top-3 text-[var(--text-secondary)] hover:text-[var(--text)] cursor-pointer transition-colors"
            >
              {showRepeat ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={handleChangePassword}
            className="px-6 py-3 mt-2 rounded-[10px] bg-[var(--bg-secondary)] border border-[var(--border)] hover:bg-[var(--hover)] text-[var(--text)] cursor-pointer transition-colors"
          >
            Update
          </button>
        </div>
      </div>






      {/* -------------------- ABOUT YOU -------------------- */}
      <div className="mt-10">
        <h4 className="text-lg font-semibold mb-3">About you</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm md:text-base" />
          <input value={stateProv} onChange={(e) => setStateProv(e.target.value)} placeholder="State / Province" className="bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm md:text-base" />
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm md:text-base" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm md:text-base" />
          <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" className="bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm md:text-base" />
          <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" className="bg-[var(--bg-secondary)] rounded-[10px] px-4 py-3 border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm md:text-base" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6">
          <button
            onClick={async () => {
              reset(); // Reset music player state
              await supabase.auth.signOut();
              window.location.href = "/signin";
            }}
            className="px-6 py-3 rounded-[10px] bg-red-600 cursor-pointer text-sm md:text-base"
          >
            Sign out
          </button>

          <button
            onClick={handleSaveProfile}
            className="px-6 py-3 rounded-[10px] bg-[var(--bg-secondary)] border border-[var(--border)] hover:bg-[var(--hover)] text-[var(--text)] cursor-pointer text-sm md:text-base transition-colors"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
