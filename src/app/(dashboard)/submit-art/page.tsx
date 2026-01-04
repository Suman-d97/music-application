

"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Loader, UploadCloud, ChevronDown, X, Image as ImageIcon } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SubmitArtPage() {
  const router = useRouter();
  const { theme } = useThemeStore();
  
  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email !== "www.playgame18@gmail.com") {
        alert("Access Denied: Only admin can submit art.");
        router.push("/home");
      }
    };
    checkAccess();
  }, []);

  const [artistName, setArtistName] = useState("");
  const [artType, setArtType] = useState("");
  const [creditUrl, setCreditUrl] = useState("");
  
  // Socials
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [website, setWebsite] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  // Dropdown states
  const [openDrop, setOpenDrop] = useState(false);

  const artTypes = ["Digital Art", "Sketch", "Illustration", "Photography", "Painting"];

  // Handle file selection with preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    // Create preview URL
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setFile(null);
    setImagePreview(null);
  };

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
      instagram: instagram || null,
      twitter: twitter || null,
      facebook: facebook || null,
      website: website || null,
    });

    setLoading(false);
    alert("Artwork submitted!");
    setArtistName("");
    setArtType("");
    setCreditUrl("");
    setInstagram("");
    setTwitter("");
    setFacebook("");
    setWebsite("");
    setFile(null);
    setImagePreview(null);
  };

  return (
    <div
      style={{ color: theme === "dark" ? "#fff" : "#1f2937" }}
      className="w-full min-h-screen px-6 py-10"
    >

      {/* === Submit Art Section === */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1b1b1b" : "#ffffff",
          borderColor: theme === "dark" ? "#2d2d2d" : "#e5e7eb"
        }}
        className="rounded-2xl border p-10 mx-auto max-w-4xl"
      >

        <h1 className="text-2xl font-semibold mb-2">Submit art</h1>
        <p
          style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
          className="mb-8"
        >
          To upload image click on box or drop file here!
        </p>

        {/* Upload box with preview */}
        <div className="mb-6">
          {!imagePreview ? (
            <label className="
              w-full h-64 border-2 border-dashed border-[#6445ff]
              rounded-xl flex flex-col items-center justify-center
              cursor-pointer hover:bg-[#262626] transition
            ">
              <UploadCloud className="text-[#6445ff] mb-2" size={48} />
              <span className="text-sm text-gray-400 text-center px-2 mb-1">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500 text-center px-2">
                JPG, PNG, GIF (recommended: 1920×1080px)
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-[#6445ff]">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain bg-[#0a0a0a]"
              />
              {/* Remove button */}
              <button
                onClick={removeImage}
                className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
              {/* File info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-2 text-sm text-white">
                  <ImageIcon size={16} />
                  <span className="truncate">{file?.name}</span>
                  <span className="text-gray-400 text-xs">
                    ({(file!.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Artist Name */}
        <input
          type="text"
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          required
          style={{
            backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
            borderColor: theme === "dark" ? "#333" : "#d1d5db",
            color: theme === "dark" ? "#fff" : "#1f2937"
          }}
          className="w-full mb-4 p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
        />

        {/* Art Type Dropdown */}
        <div className="relative mb-4">
          <div
            onClick={() => setOpenDrop(!openDrop)}
            style={{
              backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
              borderColor: theme === "dark" ? "#333" : "#d1d5db",
              color: theme === "dark" ? "#d1d5db" : "#374151"
            }}
            className="w-full p-4 border rounded-xl flex justify-between cursor-pointer"
          >
            <span>{artType || "Art Type"}</span>
            <ChevronDown />
          </div>

          {openDrop && (
            <div
              style={{
                backgroundColor: theme === "dark" ? "#222" : "#ffffff",
                borderColor: theme === "dark" ? "#333" : "#d1d5db"
              }}
              className="absolute top-full left-0 w-full border rounded-xl mt-2 z-50 shadow-xl"
            >
              {artTypes.map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setArtType(type);
                    setOpenDrop(false);
                  }}
                  className="px-4 py-3 hover:bg-opacity-20 hover:bg-gray-500 cursor-pointer"
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
          style={{
            backgroundColor: theme === "dark" ? "#222" : "#f3f4f6",
            borderColor: theme === "dark" ? "#333" : "#d1d5db",
            color: theme === "dark" ? "#fff" : "#1f2937"
          }}
          className="w-full mb-8 p-4 border rounded-xl outline-none focus:border-[#ff4b5c] transition-colors"
        />

        {/* Social inputs — Optional */}
        <p className="text-gray-400 mb-3">Artist social <span className="text-sm opacity-60">(optional)</span></p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <input 
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="p-4 bg-[#222] border border-[#333] rounded-xl outline-none focus:border-[#ff4b5c] transition-colors" 
            placeholder="Instagram" 
          />
          <input 
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className="p-4 bg-[#222] border border-[#333] rounded-xl outline-none focus:border-[#ff4b5c] transition-colors" 
            placeholder="Twitter" 
          />
          <input 
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="p-4 bg-[#222] border border-[#333] rounded-xl outline-none focus:border-[#ff4b5c] transition-colors" 
            placeholder="Facebook" 
          />
          <input 
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="p-4 bg-[#222] border border-[#333] rounded-xl outline-none focus:border-[#ff4b5c] transition-colors" 
            placeholder="Website" 
          />
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
            disabled={loading || !file}
            className={`px-8 py-3 rounded-xl shadow-lg flex items-center gap-2 font-semibold transition-colors ${loading || !file
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-[#ff475a] hover:bg-[#ff5f74]'
              }`}
          >
            {loading ? <Loader className="animate-spin" size={20} /> : "Upload art"}
          </button>
        </div>

      </div>
    </div>
  );
}

