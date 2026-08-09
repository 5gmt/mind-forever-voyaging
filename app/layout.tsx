import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  let metadataBase: URL;
  try {
    metadataBase = new URL(`${protocol}://${host}`);
  } catch {
    metadataBase = new URL("http://localhost:3000");
  }

  return {
  metadataBase,
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
    images: [{ url: new URL("/og.png", metadataBase).toString(), width: 1664, height: 936, alt: "A Mind Forever Voyaging over four visions of Rockvil’s future" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [new URL("/og.png", metadataBase).toString()],
  },
};
}

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
