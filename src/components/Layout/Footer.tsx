import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-6 flex items-center justify-center border-t border-[#2a2a2a] bg-[#1a1a1a]">
      <div className="flex items-center gap-6 text-gray-400">
        <Facebook size={18} />
        <Instagram size={18} />
        <Linkedin size={18} />
        <Twitter size={18} />
      </div>
    </footer>
  );
}
