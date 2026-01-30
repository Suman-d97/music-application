import "@/styles/globals.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Providers from "./providers";
import MusicPlayer from "@/components/Music/MusicPlayer";
import { AuroraBackground } from "@/components/Common/AuroraBackground";

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
          <div className="fixed inset-0 -z-50 pointer-events-none">
             <AuroraBackground className="h-full w-full" />
          </div>
          {children}
          <MusicPlayer />
        </Providers>
      </body>
    </html>
  );
}
