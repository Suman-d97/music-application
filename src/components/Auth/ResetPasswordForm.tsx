// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { supabase } from "@/utils/supabaseClient";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// const ResetSchema = z
//   .object({
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirm: z.string().min(6),
//   })
//   .refine((d) => d.password === d.confirm, {
//     path: ["confirm"],
//     message: "Passwords do not match",
//   });

// type ResetValues = z.infer<typeof ResetSchema>;

// export const ResetPasswordForm: React.FC = () => {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<ResetValues>({ resolver: zodResolver(ResetSchema) });

//   const onSubmit = async (values: ResetValues) => {
//     try {
//       const url = new URL(window.location.href);
//       const accessToken = url.searchParams.get("access_token") ?? undefined;

//       // Supabase v2: update user by passing the access token as a param (client uses session in browser).
//       // The recommended flow is to open reset link (supabase hosted) which sets session then you call updateUser.
//       // Here we'll attempt to update if session exists:
//       const { error } = await supabase.auth.updateUser({ password: values.password });
//       if (error) throw error;

//       alert("Password updated. Please sign in with your new password.");
//       router.push("/signin");
//     } catch (err: any) {
//       alert(err.message || "Failed to reset password");
//     }
//   };

//   return (
//     <motion.form
//       onSubmit={handleSubmit(onSubmit)}
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.35 }}
//       className="w-full max-w-md bg-dark-card/80 backdrop-blur-md border border-neon-purple/20 rounded-2xl p-8 shadow-neon-purple"
//     >
//       <h2 className="text-2xl font-semibold mb-4 text-white">Set a new password</h2>

//       <label className="block mb-3">
//         <span className="text-sm text-gray-300">New password</span>
//         <input
//           {...register("password")}
//           type="password"
//           placeholder="••••••••"
//           className="mt-2 w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 outline-none focus:ring-2 focus:ring-neon-pink"
//         />
//         {errors.password && (
//           <p className="text-sm text-rose-400 mt-1">{errors.password.message}</p>
//         )}
//       </label>

//       <label className="block mb-4">
//         <span className="text-sm text-gray-300">Confirm password</span>
//         <input
//           {...register("confirm")}
//           type="password"
//           placeholder="••••••••"
//           className="mt-2 w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 outline-none focus:ring-2 focus:ring-neon-purple"
//         />
//         {errors.confirm && (
//           <p className="text-sm text-rose-400 mt-1">{errors.confirm.message}</p>
//         )}
//       </label>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="px-6 py-3 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple text-black font-medium shadow-neon-pink"
//       >
//         {isSubmitting ? "Updating..." : "Update password"}
//       </button>
//     </motion.form>
//   );
// };

// export default ResetPasswordForm;











"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

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
        <div className="mb-4">
          <input
            {...register("password")}
            type="password"
            placeholder="New password"
            className="w-full px-4 py-3 rounded-xl bg-[#262626] border border-[#3a3a3a] text-white outline-none focus:border-[#4f4f4f]"
          />
          {errors.password && (
            <p className="text-sm text-red-400 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6">
          <input
            {...register("confirm")}
            type="password"
            placeholder="Repeat the password"
            className="w-full px-4 py-3 rounded-xl bg-[#262626] border border-[#3a3a3a] text-white outline-none focus:border-[#4f4f4f]"
          />
          {errors.confirm && (
            <p className="text-sm text-red-400 mt-1">
              {errors.confirm.message}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mb-5">
          {/* GOOGLE UI BUTTON */}
          <button
            type="button"
            className="w-20 h-12 border border-[#555] rounded-xl flex items-center justify-center text-xl text-white"
          >
            G
          </button>

          {/* UPDATE BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-12 bg-[#2a2a2a] hover:bg-[#333] text-white rounded-xl transition font-semibold"
          >
            {isSubmitting ? "Updating..." : "Sign up"}
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
