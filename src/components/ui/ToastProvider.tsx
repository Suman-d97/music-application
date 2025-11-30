"use client";

import { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";

const ToastContext = createContext<any>(null);

export function ToastProvider({ children }: any) {
  const [toast, setToast] = useState<any>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider
      value={{
        success: (msg: string) => showToast("success", msg),
        error: (msg: string) => showToast("error", msg),
      }}
    >
      {children}

      {toast && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed top-5 right-5 px-4 py-3 rounded-xl shadow-xl text-white 
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </motion.div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
