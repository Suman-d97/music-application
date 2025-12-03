

"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Loader } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

/* ---------------- INPUT COMPONENT ---------------- */
function InputBox({
  label,
  value,
  onChange,
  theme,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  theme: "light" | "dark";
}) {
  return (
    <div className="space-y-1">
      <label
        style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
        className="text-sm"
      >
        {label}
      </label>
      <input
        style={{
          backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
          borderColor: theme === "dark" ? "#333" : "#d1d5db",
          color: theme === "dark" ? "#fff" : "#1f2937"
        }}
        className="w-full p-3 border rounded-xl outline-none focus:border-gray-500 transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ---------------- TEXTAREA COMPONENT ---------------- */
function TextAreaBox({
  label,
  value,
  onChange,
  theme,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  theme: "light" | "dark";
}) {
  return (
    <div className="space-y-1">
      <label
        style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
        className="text-sm"
      >
        {label}
      </label>
      <textarea
        rows={3}
        style={{
          backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
          borderColor: theme === "dark" ? "#333" : "#d1d5db",
          color: theme === "dark" ? "#fff" : "#1f2937"
        }}
        className="w-full p-3 border rounded-xl outline-none focus:border-gray-500 transition resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */
export default function JoinUsPage() {
  const { theme } = useThemeStore();
  const [form, setForm] = useState({
    fullname: "",
    age: "",
    location: "",
    discord: "",
    instagram: "",
    twitter: "",
    soundcloud: "",
    spotify: "",
    website: "",
    facebook: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = async () => {
    setLoading(true);

    await supabase.from("team").insert([form]);

    setLoading(false);
    alert("Form submitted!");
  };

  return (
    <div
      style={{ color: theme === "dark" ? "#fff" : "#1f2937" }}
      className="px-6 py-10 flex justify-center"
    >
      {/* Center container like Figma */}
      <div className="max-w-4xl w-full space-y-10">

        <h1 className="text-3xl font-bold">Join Us</h1>

        {/* Card */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1B1B1B" : "#ffffff",
            borderColor: theme === "dark" ? "#2A2A2A" : "#e5e7eb"
          }}
          className="border rounded-2xl p-8 shadow-lg space-y-10"
        >

          {/* Top Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="Full Name" value={form.fullname} onChange={(v) => handleChange("fullname", v)} theme={theme} />
            <InputBox label="Age" value={form.age} onChange={(v) => handleChange("age", v)} theme={theme} />

            <InputBox label="Location (State / Region / Country)" value={form.location} onChange={(v) => handleChange("location", v)} theme={theme} />
            <InputBox label="Discord Account (username#0000)" value={form.discord} onChange={(v) => handleChange("discord", v)} theme={theme} />
          </div>

          {/* Social Media */}
          <h2 className="text-lg font-semibold">Social Media</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="Instagram" value={form.instagram} onChange={(v) => handleChange("instagram", v)} theme={theme} />
            <InputBox label="Twitter" value={form.twitter} onChange={(v) => handleChange("twitter", v)} theme={theme} />

            <InputBox label="Sound Cloud" value={form.soundcloud} onChange={(v) => handleChange("soundcloud", v)} theme={theme} />
            <InputBox label="Spotify" value={form.spotify} onChange={(v) => handleChange("spotify", v)} theme={theme} />

            <InputBox label="Website" value={form.website} onChange={(v) => handleChange("website", v)} theme={theme} />
            <InputBox label="Facebook" value={form.facebook} onChange={(v) => handleChange("facebook", v)} theme={theme} />
          </div>

          {/* Questions */}
          <h2 className="text-lg font-semibold">Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <TextAreaBox
              label="What makes you passionate about becoming an ambassador?"
              value={form.q1}
              onChange={(v) => handleChange("q1", v)}
              theme={theme}
            />

            <TextAreaBox
              label="Have you had any online promotion experience?"
              value={form.q2}
              onChange={(v) => handleChange("q2", v)}
              theme={theme}
            />

            <TextAreaBox
              label="Do you have skills that help the ambassador program?"
              value={form.q3}
              onChange={(v) => handleChange("q3", v)}
              theme={theme}
            />

            <TextAreaBox
              label="How would you help advertising in your community?"
              value={form.q4}
              onChange={(v) => handleChange("q4", v)}
              theme={theme}
            />

            <TextAreaBox
              label="Tell us a little about yourself."
              value={form.q5}
              onChange={(v) => handleChange("q5", v)}
              theme={theme}
            />

          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              onClick={submitForm}
              className="bg-[#FF4E5A] hover:bg-[#ff6b7c] transition px-8 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
            >
              {loading ? <Loader size={18} className="animate-spin" /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
