"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Safely access localStorage only in browser environment
        try {
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                // Get theme from localStorage or use system preference
                const savedTheme = localStorage.getItem("theme") as Theme | null;

                if (savedTheme) {
                    setTheme(savedTheme);
                    document.documentElement.classList.remove("dark", "light");
                    document.documentElement.classList.add(savedTheme);
                } else {
                    // Check system preference
                    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    const systemTheme = prefersDark ? "dark" : "light";
                    setTheme(systemTheme);
                    document.documentElement.classList.add(systemTheme);
                }
            }
        } catch (error) {
            // If localStorage is not available, just use default theme
            console.warn("localStorage not available, using default theme");
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);

        // Safely update localStorage
        try {
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                localStorage.setItem("theme", newTheme);
            }
        } catch (error) {
            console.warn("Could not save theme to localStorage");
        }

        // Update HTML class
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(newTheme);
    };

    // Prevent flash of unstyled content
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
