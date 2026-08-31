import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://murec.com"),
  title: "MUREC — Madhusudan Urban Real Estate Collection",
  description:
    "For over seven decades, MUREC has stood for perseverance, integrity, and nation-building through enterprise. Quality before profit, trust before everything.",
  openGraph: {
    title: "MUREC — Madhusudan Urban Real Estate Collection",
    description:
      "A portfolio shaped by legacy and guided by vision. Premium real estate with IGBC-certified design philosophy.",
    images: ["/images/murec.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-charcoal text-cream selection:bg-accent/30 selection:text-cream">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
