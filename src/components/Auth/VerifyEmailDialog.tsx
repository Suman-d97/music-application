
"use client";

import React from "react";

interface Props {
  open: boolean;
  email: string;
  onClose: () => void;
  onResend?: () => void;
}

export default function VerifyEmailDialog({
  open,
  email,
  onClose,
  onResend,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1d1d1d] p-10 rounded-2xl border border-[#2f2f2f] w-full max-w-md shadow-2xl text-center">

        <h2 className="text-2xl font-bold mb-4">Verify email</h2>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          Your email has been verified.  
          Click below to enter the site.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-[#2a2a2a] hover:bg-[#333] text-white py-3 rounded-xl transition font-semibold"
        >
          Sign up
        </button>

        {onResend && (
          <button
            onClick={onResend}
            className="mt-4 text-gray-400 underline text-sm"
          >
            Resend verification email
          </button>
        )}
      </div>
    </div>
  );
}
