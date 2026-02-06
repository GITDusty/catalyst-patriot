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
  metadataBase: new URL("https://catalystpatriot.com"),
  title: {
    default: "Catalyst Patriot",
    template: "%s | Catalyst Patriot",
  },
  description:
    "Source-verified civic intelligence — state budgets, national issues, and data-driven action. Built for citizens who want answers.",
  openGraph: {
    type: "website",
    url: "https://catalystpatriot.com",
    siteName: "Catalyst Patriot",
    title: "Catalyst Patriot",
    description:
      "Source-verified civic intelligence — state budgets, national issues, and data-driven action. Built for citizens who want answers.",
    images: [
      {
        url: "/brand/og-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Catalyst Patriot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalyst Patriot",
    description:
      "Source-verified civic intelligence — state budgets, national issues, and data-driven action. Built for citizens who want answers.",
    images: ["/brand/og-1200x630.png"],
  },
  icons: {
    icon: [
      { url: "/brand/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/icons/icon-64.png", sizes: "64x64", type: "image/png" },
      {
        url: "/brand/icons/icon-128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/brand/icons/icon-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/brand/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/brand/icons/icon-32.png",
    apple: [
      {
        url: "/brand/icons/apple-touch-icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
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
