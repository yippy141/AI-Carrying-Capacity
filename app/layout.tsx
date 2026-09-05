import type { Metadata } from "next";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const newsreader = localFont({
  src: [{path:'../node_modules/@fontsource/newsreader/files/newsreader-latin-500-normal.woff2',weight:'500'}, {path:'../node_modules/@fontsource/newsreader/files/newsreader-latin-600-normal.woff2',weight:'600'}],
  variable: '--font-newsreader', display: 'swap'
});
const inter = localFont({
  src: [{path:'../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',weight:'400'}, {path:'../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2',weight:'500'}, {path:'../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2',weight:'600'}],
  variable: '--font-inter', display: 'swap'
});
const ibmPlexMono = localFont({
  src: [{path:'../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',weight:'400'}, {path:'../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2',weight:'500'}],
  variable: '--font-ibm-plex-mono', display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: "Frontier Is Not Fate",
    template: "%s | Frontier Is Not Fate"
  },
  robots: { index: false, follow: false },
  description:
    "What does a better AI model change, through which workflow, and what else must happen before it becomes a useful outcome?"
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
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
