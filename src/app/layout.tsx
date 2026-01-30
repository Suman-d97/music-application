import "@/styles/globals.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Providers from "./providers";
import MusicPlayer from "@/components/Music/MusicPlayer";
import AnimatedBackground from "@/components/Common/AnimatedBackground";

export const metadata = {
  title: "MusicHub",
  description: "MusicHub — manage music & art submissions",
   icons: {
    icon: "/sidebar/music.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <AnimatedBackground />
          {children}
          <MusicPlayer />
        </Providers>
      </body>
    </html>
  );
}
