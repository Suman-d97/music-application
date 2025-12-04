"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Upload } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { motion } from "framer-motion";
import VerifyEmailDialog from "./VerifyEmailDialog";
import AuthLoader from "./AuthLoader";

const SignUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string().min(6, "Confirm Password must be at least 6 characters"),
    accept: z.boolean().refine((v) => v === true, {
      message: "You must accept terms",
    }),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export default function SignUpForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [openVerify, setOpenVerify] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { accept: false },
  });
  const onSubmit = async (v: any) => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      let avatarUrl = "";

      // Upload Avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatarFile);

        if (uploadError) {
          console.error("Avatar upload error:", uploadError);
          throw new Error("Error uploading avatar: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

        avatarUrl = publicUrlData.publicUrl;
      }

      // Create user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: v.email,
        password: v.password,
        options: {
          emailRedirectTo: `${window.location.origin}/v1/callback`,
          data: {
            full_name: v.name,
            avatar_url: avatarUrl,
          },
        },
      });

      if (error) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setErrorMsg(error.message);
        return;
      }
      if (data.user) {
        // Success! User created in Auth
        dispatch(setUser(data.user));
        setUserEmail(v.email);
        setSuccessMsg("Account created successfully! Please check your email to verify.");
        setOpenVerify(true);
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {isSubmitting && <AuthLoader />}
      
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="bg-[#1b1b1b] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl"
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl text-white font-semibold text-center mb-3">
            Sign up
          </h2>

          <p className="text-sm text-gray-400 text-center mb-8 leading-relaxed">
            Create your account to access the music library
          </p>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
              <p className="text-green-400 text-sm text-center">{successMsg}</p>
            </div>
          )}

          {/* INPUTS */}
          <div className="space-y-4 mb-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center mb-4">
              <label className="cursor-pointer group relative">
                <div className="w-24 h-24 rounded-full bg-[#2a2a2a] border-2 border-[#3a3a3a] flex items-center justify-center overflow-hidden group-hover:border-blue-500 transition-colors">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="text-gray-400 group-hover:text-blue-500 transition-colors" size={32} />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 border-2 border-[#1b1b1b]">
                  <Upload size={12} className="text-white" />
                </div>
              </label>
              <p className="text-xs text-gray-500 mt-2">Upload Profile Picture</p>
            </div>

            {/* Name */}
            <div>
              <input
                {...register("name")}
                placeholder="Full Name"
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-xl border border-[#3a3a3a] outline-none focus:border-blue-500 transition-colors"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message as string}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-xl border border-[#3a3a3a] outline-none focus:border-blue-500 transition-colors"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message as string}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                {...register("password")}
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-xl border border-[#3a3a3a] outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message as string}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                {...register("confirm")}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-xl border border-[#3a3a3a] outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.confirm && (
                <p className="text-red-400 text-sm mt-1">{errors.confirm.message as string}</p>
              )}
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <input
              type="checkbox"
              {...register("accept")}
              className="w-4 h-4 rounded border-gray-600 bg-[#2a2a2a]"
            />
            I read and accepted the terms & conditions
          </label>
          {errors.accept && (
            <p className="text-red-400 text-sm mb-4">
              {errors.accept.message as string}
            </p>
          )}

          {/* Signup Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.95 }}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Sign up"}
          </motion.button>

          {/* Login Link */}
          <p className="text-sm text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <a href="/signin" className="underline text-blue-400 hover:text-blue-300">
              Sign in
            </a>
          </p>
        </motion.div>
      </motion.form>

      {/* Email Verify Popup */}
      <VerifyEmailDialog
        open={openVerify}
        email={userEmail}
        onClose={() => setOpenVerify(false)}
      />
    </>
  );
}
