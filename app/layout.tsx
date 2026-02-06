import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catalyst Patriot - Civic Intelligence | A Catalyst USA Project",
  description: "Source-verified civic intelligence — state budgets, national issues, and data-driven action. Built for citizens who want answers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold text-lg">Catalyst Patriot</span>
            <span className="text-gray-600 text-xs">by Catalyst USA</span>
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/florida" className="text-gray-400 hover:text-white transition">Florida</Link>
            <Link href="/illinois" className="text-gray-400 hover:text-white transition">Illinois</Link>
            <Link href="/compare" className="text-gray-400 hover:text-white transition">Compare</Link>
            <Link href="/social-security" className="text-amber-400 hover:text-amber-300 transition">Social Security</Link>
            <Link href="/act" className="text-emerald-400 hover:text-emerald-300 transition">Act Now</Link>
          </div>
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
