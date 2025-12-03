import "@/styles/globals.css";
import Providers from "./providers";
import MusicPlayer from "@/components/Music/MusicPlayer";

export const metadata = {
  title: "MusicHub",
  description: "MusicHub — manage music & art submissions",
   icons: {
    icon: "https://i.postimg.cc/9Q6XZ6XZ/music.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0f1113] text-white antialiased">
        <Providers>
          {children}
          <MusicPlayer />
        </Providers>
      </body>
    </html>
  );
}
