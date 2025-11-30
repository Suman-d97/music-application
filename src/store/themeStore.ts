// // "use client";

// // import { create } from "zustand";

// // export const useThemeStore = create((set) => ({
// //   theme: "dark",

// //   setTheme: (theme: string) => {
// //     // Update store
// //     set({ theme });

// //     // Update HTML class
// //     if (typeof window !== "undefined") {
// //       document.documentElement.className = theme;

// //       // Save
// //       localStorage.setItem("theme", theme);
// //     }
// //   },

// //   loadTheme: () => {
// //     if (typeof window !== "undefined") {
// //       const saved = localStorage.getItem("theme") || "dark";
// //       document.documentElement.className = saved;
// //       set({ theme: saved });
// //     }
// //   },
// // }));






// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useThemeStore = create(
//   persist(
//     (set) => ({
//       theme: "dark",
//       setTheme: (theme) => {
//         set({ theme });

//         if (typeof window !== "undefined") {
//           document.documentElement.classList.remove("light", "dark");
//           document.documentElement.classList.add(theme);
//         }
//       },
//     }),
//     { name: "theme-storage" }
//   )
// );

// // On first load restore theme
// if (typeof window !== "undefined") {
//   const saved = localStorage.getItem("theme-storage");
//   if (saved) {
//     const parsed = JSON.parse(saved);
//     const theme = parsed?.state?.theme || "dark";
//     document.documentElement.classList.add(theme);
//   }
// }












"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",

      setTheme: (theme) => {
        set({ theme });

        if (typeof window !== "undefined") {
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(theme);
        }
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        // Apply theme to DOM after rehydration
        if (state && typeof window !== "undefined") {
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(state.theme);
        }
      },
    }
  )
);
