// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { supabase } from "@/utils/supabaseClient";
// import { useRouter } from "next/navigation";

// const Schema = z.object({
//   password: z.string().min(6),
//   confirm: z.string().min(6),
// }).refine(d => d.password === d.confirm, { path: ["confirm"], message: "Passwords do not match" });

// type T = z.infer<typeof Schema>;

// export default function ResetPasswordForm() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<T>({ resolver: zodResolver(Schema) });

//   const onSubmit = async (v: T) => {
//     try {
//       const { error } = await supabase.auth.updateUser({ password: v.password });
//       if (error) throw error;
//       alert("Password updated. Please sign in.");
//       router.push("/signin");
//     } catch (err: any) {
//       alert(err.message || "Failed to reset password");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
//       <div className="card p-8">
//         <h2 className="text-xl font-semibold text-center mb-2">Reset your password</h2>
//         <p className="text-sm text-gray-400 text-center mb-6">Enter a new password (min 6 characters).</p>

//         <div className="mb-3">
//           <input {...register("password")} type="password" placeholder="New password" className="input w-full" />
//           {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
//         </div>

//         <div className="mb-3">
//           <input {...register("confirm")} type="password" placeholder="Repeat the password" className="input w-full" />
//           {errors.confirm && <p className="text-sm text-red-400 mt-1">{errors.confirm.message}</p>}
//         </div>

//         <div className="flex gap-3">
//           <button type="button" className="btn-ghost w-16 flex items-center justify-center">
//             <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.65 4.66-6.08 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 7.08 29.28 5 24 5 12.95 5 4 13.95 4 25s8.95 20 20 20c11.05 0 20-8.95 20-20 0-1.34-.14-2.65-.4-3.9z"/>
//               <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.79 2.24-2.23 4.16-4.09 5.52 0 0 6.12 5.29 6.12 5.29C40.12 33.9 42 29.68 42 25c0-1.34-.14-2.65-.4-3.9z"/>
//             </svg>
//           </button>

//           <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
//             {isSubmitting ? "Updating..." : "Update password"}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }







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
