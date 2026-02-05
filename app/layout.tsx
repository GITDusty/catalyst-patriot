import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Catalyst Patriot",
  description: "State budget transparency dashboards for Florida and Illinois",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="flex items-center justify-between border-b border-white/10 px-8 py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-lg font-bold text-cyan-400">
              Catalyst Patriot
            </Link>
            <span className="text-sm text-gray-500">Radical Sourcing</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/florida" className="text-gray-300 transition hover:text-white">
              Florida
            </Link>
            <Link href="/illinois" className="text-gray-300 transition hover:text-white">
              Illinois
            </Link>
            <Link href="/compare" className="text-gray-300 transition hover:text-white">
              Compare
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
