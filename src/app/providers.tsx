"use client";

import { Provider } from "react-redux";
import { store } from "@/store";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create Supabase client once
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </Provider>
    </SessionContextProvider>
  );
}
