"use client";


import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
// import MusicPlayer from "@/components/Music/MusicPlayer";
import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-8 pb-28">{children}</main>
        <Footer />
      </div>

      {/* Music Player - Fixed at bottom */}
      {/* Music Player - Fixed at bottom 
          Removed: Handled globally in RootLayout
      */}
    </div>
  );
}
