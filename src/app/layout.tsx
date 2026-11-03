import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import "@/components/growth-services.css";
import "@/components/word-reveal.css";
import "./editorial-theme.css";
import "@/components/hero.css";
import "@/components/hero-showcase.css";
import "@/components/services-overview.css";
import { SiteShell } from "@/components/site-shell";
import { agency } from "@/lib/content";

const editorial = localFont({
  src: [
    { path: "../../public/fonts/cormorant-garamond-latin.woff2", weight: "400 500", style: "normal" },
    { path: "../../public/fonts/cormorant-garamond-latin-italic.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://concrete-agency.eliseengandu814.chatgpt.site"),
  title: { default: "Concrete Agency — Bold ideas. Solid impact.", template: "%s | Concrete Agency" },
  description: agency.description,
  openGraph: { title: "Concrete Agency — Bold ideas. Solid impact.", description: agency.description, type: "website", locale: "en_ZA", images: [{ url: "/social-card.svg", width: 1200, height: 630 }] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={editorial.variable}><body id="top"><SiteShell>{children}</SiteShell></body></html>;
}
