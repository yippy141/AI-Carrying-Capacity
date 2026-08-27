import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["500", "600"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"]
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: {
    default: "Frontier Is Not Fate",
    template: "%s | Frontier Is Not Fate"
  },
  description:
    "An interactive study of when advanced AI becomes national power — and when infrastructure, institutions, and organization flatten the return. Built on the AI Conversion Atlas evidence system."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${newsreader.variable} ${inter.variable} ${ibmPlexMono.variable}`}
      lang="en"
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
