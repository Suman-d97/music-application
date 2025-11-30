/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#1f1f1f",
          card: "#2b2b2b",
          input: "#3a3a3a",
          border: "#393939",
          muted: "#9ca3af",
          text: "#e6e6e6",
        },
        primary: {
          DEFAULT: "#2b6cb0",
          hover: "#215a9a",
        },
      },
      boxShadow: {
        card: "0 6px 18px rgba(0,0,0,0.45)",
      },
    },
  },
};
