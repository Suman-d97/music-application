// "use client";

// import React from "react";

// interface Props {
//   open: boolean;
//   email: string;
//   onClose: () => void;
//   onResend: () => void;
// }

// export default function VerifyEmailDialog({
//   open,
//   email,
//   onClose,
//   onResend,
// }: Props) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-[#2b2b2b] p-8 rounded-lg border border-[#3a3a3a] w-full max-w-sm">
        
//         <h2 className="text-xl font-semibold mb-3 text-center">
//           Check your email
//         </h2>

//         <p className="text-gray-300 text-sm text-center mb-5">
//           We sent a verification link to:
//           <br />
//           <span className="font-medium">{email}</span>
//         </p>

//         <div className="flex flex-col gap-3">
//           <button
//             className="w-full bg-[#1f1f1f] border border-[#3a3a3a] py-2 rounded-md"
//             onClick={onClose}
//           >
//             OK
//           </button>

//           <button
//             className="w-full border border-[#3a3a3a] py-2 rounded-md text-sm"
//             onClick={onResend}
//           >
//             Resend verification email
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






// "use client";

// import React from "react";

// interface Props {
//   open: boolean;
//   email: string;
//   onClose: () => void;
//   onResend?: () => void; // <-- OPTIONAL ✔ FIXED
// }

// export default function VerifyEmailDialog({
//   open,
//   email,
//   onClose,
//   onResend,
// }: Props) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-[#2b2b2b] p-8 rounded-2xl border border-[#3a3a3a] w-full max-w-sm shadow-xl">

//         {/* TITLE */}
//         <h2 className="text-xl font-semibold text-center mb-3">
//           Check your email
//         </h2>

//         {/* MESSAGE */}
//         <p className="text-gray-300 text-sm text-center mb-5 leading-relaxed">
//           We sent a verification link to:
//           <br />
//           <span className="font-medium text-blue-400">{email}</span>
//         </p>

//         {/* BUTTONS */}
//         <div className="flex flex-col gap-3">

//           {/* CLOSE */}
//           <button
//             className="w-full bg-[#1f1f1f] border border-[#3a3a3a] text-white py-2.5 rounded-lg hover:bg-[#242424] transition"
//             onClick={onClose}
//           >
//             OK
//           </button>

//           {/* RESEND EMAIL — ONLY IF FUNCTION EXISTS */}
//           {onResend && (
//             <button
//               className="w-full border border-[#3a3a3a] text-gray-200 py-2.5 rounded-lg hover:bg-[#1f1f1f] transition"
//               onClick={onResend}
//             >
//               Resend verification email
//             </button>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }




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
