"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Mail, Loader } from "lucide-react";

export default function ContactPage() {
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
    <div className="text-white space-y-10">
      {/* TOP HERO BANNER */}
      {/* <div className="w-full bg-gradient-to-r from-[#7c4dff] to-[#6a63ff] p-8 rounded-2xl flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Hello, Jack!</h1>
          <p className="text-gray-200 text-lg mt-2">Welcome back to Myfile</p>
        </div>

        <img
          src="/banner.png"
          alt="banner"
          className="w-64 h-auto object-contain"
        />
      </div> */}

      {/* CONTACT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT SIDE TEXT */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Contact us</h2>
          <p className="text-gray-400 w-3/4">
            We are very happy to contact with you. You can contact us in the following ways:
          </p>

          <div>
            <p className="text-gray-300 font-semibold">Address</p>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet.
            </p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold">Phone Number</p>
            <p className="text-gray-400">+98 903 028 6976</p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold">Email</p>
            <p className="text-gray-400">Fatemeh96Aryan768@gmail.com</p>
          </div>
        </div>

        {/* RIGHT SIDE MAP */}
        <iframe
          className="rounded-xl w-full h-72 border border-[#2a2a2a]"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12090.78372996071!2d-73.985664!3d40.748817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xffd658ba25481e50!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1683501675349!5m2!1sen!2sus"
          loading="lazy"
        ></iframe>
      </div>

      {/* FORM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <input
          className="w-full p-4 rounded-xl bg-[#1f1f1f] border border-[#333] outline-none text-white"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-4 rounded-xl bg-[#1f1f1f] border border-[#333] outline-none text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          className="w-full p-4 rounded-xl bg-[#1f1f1f] border border-[#333] outline-none text-white lg:col-span-2"
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
