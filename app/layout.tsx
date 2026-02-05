import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ledger",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catalyst Patriot",
  description: "Budget explorer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
