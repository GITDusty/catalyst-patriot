import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import NavLinks from "./components/NavLinks";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://catalystpatriot.com"),
  manifest: "/manifest.webmanifest",
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
    shortcut: "/favicon.ico",
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
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
    apple: [
      {
        url: "/apple-icon.png",
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
      <body className="antialiased">
        <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <Link href="/" className="flex items-center py-1" aria-label="Catalyst Patriot">
            <Image
              src="/brand/logo-horizontal-mono-light.png"
              alt="Catalyst Patriot"
              width={320}
              height={56}
              priority
              className="h-6 md:h-8 w-auto"
            />
          </Link>
          <NavLinks />
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
