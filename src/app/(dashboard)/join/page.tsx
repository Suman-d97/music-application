

"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Loader } from "lucide-react";

/* ---------------- INPUT COMPONENT ---------------- */
function InputBox({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-gray-400 text-sm">{label}</label>
      <input
        className="w-full p-3 bg-[#222] border border-[#333] rounded-xl
                   outline-none text-white focus:border-gray-500 transition"
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-gray-400 text-sm">{label}</label>
      <textarea
        rows={3}
        className="w-full p-3 bg-[#222] border border-[#333] rounded-xl
                   outline-none text-white focus:border-gray-500 transition resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */
export default function JoinUsPage() {
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
    <div className="text-white px-6 py-10 flex justify-center">
      {/* Center container like Figma */}
      <div className="max-w-4xl w-full space-y-10">

        <h1 className="text-3xl font-bold">Join Us</h1>

        {/* Card */}
        <div className="bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 shadow-lg space-y-10">

          {/* Top Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="Full Name" value={form.fullname} onChange={(v) => handleChange("fullname", v)} />
            <InputBox label="Age" value={form.age} onChange={(v) => handleChange("age", v)} />

            <InputBox label="Location (State / Region / Country)" value={form.location} onChange={(v) => handleChange("location", v)} />
            <InputBox label="Discord Account (username#0000)" value={form.discord} onChange={(v) => handleChange("discord", v)} />
          </div>

          {/* Social Media */}
          <h2 className="text-lg font-semibold">Social Media</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="Instagram" value={form.instagram} onChange={(v) => handleChange("instagram", v)} />
            <InputBox label="Twitter" value={form.twitter} onChange={(v) => handleChange("twitter", v)} />

            <InputBox label="Sound Cloud" value={form.soundcloud} onChange={(v) => handleChange("soundcloud", v)} />
            <InputBox label="Spotify" value={form.spotify} onChange={(v) => handleChange("spotify", v)} />

            <InputBox label="Website" value={form.website} onChange={(v) => handleChange("website", v)} />
            <InputBox label="Facebook" value={form.facebook} onChange={(v) => handleChange("facebook", v)} />
          </div>

          {/* Questions */}
          <h2 className="text-lg font-semibold">Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <TextAreaBox
              label="What makes you passionate about becoming an ambassador?"
              value={form.q1}
              onChange={(v) => handleChange("q1", v)}
            />

            <TextAreaBox
              label="Have you had any online promotion experience?"
              value={form.q2}
              onChange={(v) => handleChange("q2", v)}
            />

            <TextAreaBox
              label="Do you have skills that help the ambassador program?"
              value={form.q3}
              onChange={(v) => handleChange("q3", v)}
            />

            <TextAreaBox
              label="How would you help advertising in your community?"
              value={form.q4}
              onChange={(v) => handleChange("q4", v)}
            />

            <TextAreaBox
              label="Tell us a little about yourself."
              value={form.q5}
              onChange={(v) => handleChange("q5", v)}
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
