
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const Schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string().min(6),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof Schema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = async (v: FormValues) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: v.password,
      });

      if (error) throw error;

      alert("Password updated successfully. Please sign in.");
      router.push("/signin");
    } catch (err: any) {
      alert(err.message || "Failed to update password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto"
    >
      {/* CARD */}
      <div className="bg-[#1d1d1d] p-10 rounded-2xl border border-[#2f2f2f] shadow-xl">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-white mb-3">
          Reset your password
        </h2>

        {/* SUBTEXT */}
        <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed">
          Enter your new password carefully.  
          The password must be at least 8 characters long.
        </p>

        {/* NEW PASSWORD */}
        <div className="mb-4 relative">
          <input
            {...register("password")}
            type={showPass ? "text" : "password"}
            placeholder="New password"
            className="w-full px-4 py-3 rounded-xl bg-[#262626] border border-[#3a3a3a] text-white outline-none focus:border-[#4f4f4f]"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-sm text-red-400 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6 relative">
          <input
            {...register("confirm")}
            type={showConfirmPass ? "text" : "password"}
            placeholder="Repeat the password"
            className="w-full px-4 py-3 rounded-xl bg-[#262626] border border-[#3a3a3a] text-white outline-none focus:border-[#4f4f4f]"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPass(!showConfirmPass)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
          >
            {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confirm && (
            <p className="text-sm text-red-400 mt-1">
              {errors.confirm.message}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mb-5">
          {/* UPDATE BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-12 bg-[#2a2a2a] hover:bg-[#333] text-white rounded-xl transition font-semibold"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-sm text-gray-400 text-center">
          Not a member?{" "}
          <a href="/signup" className="underline text-blue-400">
            Sign up now
          </a>
        </p>
      </div>
    </form>
  );
}
