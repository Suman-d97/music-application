"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import AuthLoader from "./AuthLoader";
import SocialLogin from "./SocialLogin";

const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (v: any) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: v.email,
        password: v.password,
      });

      if (error) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        alert(error.message);
        return;
      }

      dispatch(setUser(data.user));
      router.push("/home");
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    }
  };

  return (
    <>
      {isSubmitting && <AuthLoader />}
      
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-[#1b1b1b] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl"
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl text-white text-center font-semibold mb-3">
            Sign in
          </h2>

          <p className="text-sm text-gray-400 text-center mb-8 leading-relaxed">
            Welcome back! Sign in to access your music library.
          </p>

          {/* Email */}
          <div className="mb-4">
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full bg-[#2a2a2a] text-white p-3 rounded-xl border border-[#3a3a3a] outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-[#2a2a2a] text-white p-3 rounded-xl border border-[#3a3a3a] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
            <div className="flex justify-end mt-2">
              <a href="/forgot-password" className="text-sm text-gray-400 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <div className="mb-6">
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="submit"
              className="w-full h-12 bg-white/10 rounded-xl text-white font-semibold border border-[#2a2a2a]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </motion.button>
          </div>

          {/* Social Login */}
          <SocialLogin />
          
          <div className="h-4"></div>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-400 underline">
              Sign up
            </a>
          </p>
        </motion.div>
      </motion.form>
    </>
  );
}
