import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heading = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: { default: "StudioSpace | Book creative studios by the hour", template: "%s | StudioSpace" },
  description: "Find, book and host photo studios, sound stages, podcast rooms, music suites and art workshops.",
};

// Runs before paint so the saved theme is applied with no flash
const themeScript = `try{var t=localStorage.getItem('studiospace-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'studiodark':'studiolight'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','studiolight')}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="studiolight" suppressHydrationWarning className={`${heading.variable} ${body.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
