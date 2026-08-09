import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "A Mind Forever Voyaging | Unabridged Modern Edition";
const description = "Play Steve Meretzky’s complete 1985 interactive novel in a modern, accessible browser edition. Original text and story flow preserved.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mind-forever-voyaging.netlify.app"),
  title,
  description,
  applicationName: "A Mind Forever Voyaging",
  authors: [{ name: "Steve Meretzky" }],
  keywords: ["interactive fiction", "A Mind Forever Voyaging", "Infocom", "PRISM", "text adventure"],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "A Mind Forever Voyaging",
    images: [{ url: "/og-v2.png", width: 1664, height: 936, alt: "A Mind Forever Voyaging — the complete interactive novel" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-v2.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#071312",
  colorScheme: "dark",
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
        {children}
      </body>
    </html>
  );
}
