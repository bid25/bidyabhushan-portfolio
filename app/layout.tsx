import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Space_Mono, Caveat } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PointerCursor } from "@/components/PointerCursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  weight: "700",
  variable: "--font-hand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bidya Bhushan Nanda - Portfolio",
  description:
    "Full-Stack & AI/ML Engineer. React Native, Node, and the infrastructure behind them. B.Tech Electronics, MAIT, class of 2029.",
  other: {
    google: "notranslate",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${spaceMono.variable} ${caveat.variable} min-h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col relative bg-[#FFD93B] text-[#0B3D2E] dg overflow-x-clip selection:bg-[#FF5C8A] selection:text-[#0B3D2E]">
        <SmoothScroll>
          <PointerCursor targetSelector="a, button, .btn, .card, input, select, textarea, .cursor-target" />
          <Nav />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
