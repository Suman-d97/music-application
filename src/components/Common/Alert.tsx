

"use client";

import React from "react";
import { motion } from "framer-motion";

interface AlertProps {
  type: "success" | "error";
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-5 right-5 px-4 py-3 rounded-xl shadow-xl text-white z-50
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {message}
    </motion.div>
  );
};

export default Alert;
