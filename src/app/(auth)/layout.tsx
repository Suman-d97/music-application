"use client";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1113]">
      {children}
    </div>
  );
}





// "use client";

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f6fa] text-black">
//       {/* Blur Background Wrapper */}
//       <div className="w-full max-w-md px-6">{children}</div>
//     </div>
//   );
// }
