"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { Music, Palette, Users, TrendingUp, ArrowRight, Play, Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      // 1. Check if this is a password recovery flow
      // Supabase appends #access_token=...&type=recovery if redirecting to root
      if (typeof window !== "undefined" && window.location.hash.includes("type=recovery")) {
        router.push("/reset-password");
        return;
      }

      // 2. Check if user is already logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push("/home");
      } else {
        setLoading(false);
      }
    };
    
    handleAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="text-purple-500" size={32} />
            <span className="text-2xl font-bold">MusicHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--card)] flex items-center justify-center hover:opacity-80 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon size={20} className="text-blue-500 group-hover:rotate-180 transition-transform duration-500" />
              )}
            </button>
            <Link
              href="/signin"
              className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--card)] flex items-center justify-center hover:opacity-80 transition-all duration-300 group"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-blue-500" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[var(--text)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[var(--card)] border-t border-[var(--border)] overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <Link
                  href="/signin"
                  className="w-full py-3 text-center border border-[var(--border)] rounded-xl hover:bg-[var(--hover)] transition font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="w-full py-3 text-center bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            Share Your Music & Art
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto px-4">
            The ultimate platform for artists and musicians to showcase their work,
            connect with fans, and grow their creative community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition flex items-center justify-center gap-2 text-lg font-semibold"
            >
              Start Creating <ArrowRight size={20} />
            </Link>
            <Link
              href="/signin"
              className="w-full sm:w-auto px-8 py-4 border border-[var(--border)] rounded-xl hover:bg-[var(--hover)] transition text-lg font-semibold text-center"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose MusicHub?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl"
          >
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
              <Music className="text-purple-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Upload Music</h3>
            <p className="text-[var(--text-secondary)]">
              Share your original tracks with the world. High-quality audio streaming
              and unlimited uploads for all creators.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl"
          >
            <div className="w-14 h-14 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4">
              <Palette className="text-pink-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Showcase Art</h3>
            <p className="text-[var(--text-secondary)]">
              Display your visual artwork in stunning galleries. Perfect for album
              covers, digital art, and creative designs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl"
          >
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <Users className="text-blue-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Build Community</h3>
            <p className="text-[var(--text-secondary)]">
              Connect with other artists, collaborate on projects, and grow your
              audience organically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of artists already sharing their creativity on MusicHub
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition text-lg font-semibold"
          >
            Create Free Account <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--card)] mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-[var(--text-secondary)]">
          <p>&copy; 2026 MusicHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}