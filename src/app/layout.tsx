import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { agency } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://concrete-agency.eliseengandu814.chatgpt.site"),
  title: { default: "Concrete Agency — Bold ideas. Solid impact.", template: "%s | Concrete Agency" },
  description: agency.description,
  openGraph: { title: "Concrete Agency — Bold ideas. Solid impact.", description: agency.description, type: "website", locale: "en_ZA", images: [{ url: "/social-card.svg", width: 1200, height: 630 }] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body id="top"><SiteShell>{children}</SiteShell></body></html>;
}
