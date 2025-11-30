

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/utils/supabaseClient";

const Schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormValues = z.infer<typeof Schema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;

      alert("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      {/* CARD */}
      <div className="bg-[#1d1d1d] p-10 rounded-2xl border border-[#2f2f2f] shadow-xl">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-white mb-3">
          Forgot Password
        </h2>

        {/* SUBTEXT */}
        <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed">
          Enter your email address below and we'll email you a link  
          to reset your password.
        </p>

        {/* EMAIL INPUT */}
        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-[#262626] border border-[#3a3a3a] text-white outline-none focus:border-[#4f4f4f]"
          />
          {errors.email && (
            <p className="text-sm text-red-400 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-4">

          {/* GOOGLE BUTTON (UI ONLY) */}
          <button
            type="button"
            className="w-20 h-12 border border-[#555] rounded-xl flex items-center justify-center text-xl text-white"
          >
            G
          </button>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-12 bg-[#2a2a2a] hover:bg-[#333] text-white rounded-xl transition font-semibold"
          >
            {isSubmitting ? "Sending..." : "Send email"}
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Not a member?{" "}
          <a href="/signup" className="underline text-blue-400">
            Sign up now
          </a>
        </p>
      </div>
    </form>
  );
}
