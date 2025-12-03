"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Mail, Loader } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

export default function ContactPage() {
  const { theme } = useThemeStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!name || !email || !message) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    await supabase.from("contact_messages").insert([
      { name, email, message },
    ]);

    setLoading(false);
    alert("Your message has been sent!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div
      style={{ color: theme === "dark" ? "#fff" : "#1f2937" }}
      className="space-y-10"
    >

      {/* CONTACT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT SIDE TEXT */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Contact us</h2>
          <p
            style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
            className="w-3/4"
          >
            We are very happy to contact with you. You can contact us in the following ways:
          </p>

          <div>
            <p
              style={{ color: theme === "dark" ? "#d1d5db" : "#374151" }}
              className="font-semibold"
            >
              Address
            </p>
            <p style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet.
            </p>
          </div>

          <div>
            <p
              style={{ color: theme === "dark" ? "#d1d5db" : "#374151" }}
              className="font-semibold"
            >
              Phone Number
            </p>
            <p style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}>+98 7044123825</p>
          </div>

          <div>
            <p
              style={{ color: theme === "dark" ? "#d1d5db" : "#374151" }}
              className="font-semibold"
            >
              Email
            </p>
            <p style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}>user@gmail.com</p>
          </div>
        </div>

        {/* RIGHT SIDE MAP */}
        <iframe
          style={{ borderColor: theme === "dark" ? "#2a2a2a" : "#d1d5db" }}
          className="rounded-xl w-full h-72 border"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12090.78372996071!2d-73.985664!3d40.748817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xffd658ba25481e50!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1683501675349!5m2!1sen!2sus"
          loading="lazy"
        ></iframe>
      </div>

      {/* FORM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <input
          style={{
            backgroundColor: theme === "dark" ? "#1f1f1f" : "#f3f4f6",
            borderColor: theme === "dark" ? "#333" : "#d1d5db",
            color: theme === "dark" ? "#fff" : "#1f2937"
          }}
          className="w-full p-4 rounded-xl border outline-none"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={{
            backgroundColor: theme === "dark" ? "#1f1f1f" : "#f3f4f6",
            borderColor: theme === "dark" ? "#333" : "#d1d5db",
            color: theme === "dark" ? "#fff" : "#1f2937"
          }}
          className="w-full p-4 rounded-xl border outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          style={{
            backgroundColor: theme === "dark" ? "#1f1f1f" : "#f3f4f6",
            borderColor: theme === "dark" ? "#333" : "#d1d5db",
            color: theme === "dark" ? "#fff" : "#1f2937"
          }}
          className="w-full p-4 rounded-xl border outline-none lg:col-span-2"
          rows={5}
          placeholder="Message text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={sendMessage}
          className="px-10 py-3 bg-[#ff3b5c] hover:bg-[#ff1e43] text-white font-semibold rounded-xl shadow-lg flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Mail size={18} />}
          Submit
        </button>
      </div>
    </div>
  );
}
