import "@/styles/globals.css";
import Providers from "./providers";

export const metadata = {
  title: "MusicHub",
  description: "MusicHub — manage music & art submissions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0f1113] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
