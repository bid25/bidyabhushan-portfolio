import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Space_Mono, Caveat } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PointerCursor } from "@/components/PointerCursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL("https://bidyabhushan.in"),
  title: {
    default: "Bidya Bhushan Nanda | Full-Stack & BSP Engineer",
    template: "%s | Bidya Bhushan Nanda",
  },
  description:
    "Full-Stack & BSP Engineer with an electronics foundation (MAIT '29), Director & Cinematographer (unfocused.nerd), and Creator of Broccoli (calorie & body composition instrument on Google Play).",
  keywords: [
    // Primary Name and Phonetic / Transliteration Variants
    "Bidya Bhushan Nanda",
    "Bidya Bhushan",
    "Bidya",
    "Vidya Bhushan Nanda",
    "Vidya Bhushan",
    "Vidya Bushan",
    "Vidya",
    "Bidya Bhusan",
    "Bidya Bhusan Nanda",
    "Bidya Bushan",
    "Bidya Bushan Nanda",
    "Bidya Bhooshan",
    "Bidya Bhooshan Nanda",
    "Bidya Booshan",
    "Bidya Booshan Nanda",
    "Vidya Bhusan Nanda",
    "Vidya Bushan Nanda",
    "Vidya Bhooshan",
    "Vidya Bhooshan Nanda",
    "Vidya Booshan",
    "Vidya Booshan Nanda",
    "Bidhya Bhushan",
    "Bidhya Bhushan Nanda",
    "Vidhya Bhushan",
    "Vidhya Bhushan Nanda",
    "Bidhya Bhusan",
    "Bidhya Bhusan Nanda",
    "Vidhya Bhusan",
    "Vidhya Bhusan Nanda",
    "Bidyabhushan Nanda",
    "Bidyabhushan",
    "Bidyabhusan Nanda",
    "Bidyabhusan",
    "Bidyabushan Nanda",
    "Bidyabushan",
    "Bidyabhooshan Nanda",
    "Bidyabhooshan",
    "Vidyabhushan Nanda",
    "Vidyabhushan",
    "Vidyabhusan Nanda",
    "Vidyabhusan",
    "Vidyabushan Nanda",
    "Vidyabushan",
    "Vidyabhooshan Nanda",
    "Vidyabhooshan",
    "Bidhyabhushan Nanda",
    "Bidhyabhushan",
    "Vidhyabhushan Nanda",
    "Vidhyabhushan",
    "Bidyabhushannanda",
    "Vidyabhushannanda",
    "Bidyabhusannanda",
    "Vidyabhusannanda",
    "Bidyabushannanda",
    "Vidyabushannanda",
    "Bidya Nanda",
    "Vidya Nanda",
    "Bidhya Nanda",
    "Vidhya Nanda",
    "bid25",
    "bid 25",
    "bid_25",
    "bidyabhushan25",
    "unfocused.nerd",
    "unfocused nerd",
    "unfocusednerd",
    "unfocused_nerd",
    "bid_notfound",
    "bidnotfound",

    // High-Intent Search Query Combinations
    "Bidya Bhushan Portfolio",
    "Vidya Bhushan Portfolio",
    "Bidyabhushan Portfolio",
    "Vidyabhushan Portfolio",
    "Bidya Bhushan Engineer",
    "Vidya Bhushan Engineer",
    "Bidya Bhushan MAIT",
    "Vidya Bhushan MAIT",
    "Bidya Bhushan Delhi",
    "Vidya Bhushan Delhi",
    "Bidya Bhushan Broccoli",
    "Vidya Bhushan Broccoli",
    "Bidya Bhushan Zucchini Linux",
    "Vidya Bhushan Zucchini Linux",
    "Bidya Bhushan Cinematography",
    "Vidya Bhushan Cinematography",
    "Bidya Bhushan Filmmaker",
    "Vidya Bhushan Filmmaker",

    // Identity 1: Tech Portfolio (Full-Stack & BSP)
    "Full-Stack Engineer",
    "BSP Engineer",
    "Board Support Package",
    "Bare-Metal Bringup",
    "ARM64 Linux Kernel",
    "SM-T295 Linux Bringup",
    "Qualcomm EDL",
    "React Native",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "SQLite FTS5",
    "MAIT Delhi",

    // Identity 2: Creative Portfolio (Lens)
    "Cinematography",
    "Director of Photography",
    "Film Director Delhi",
    "Visual Storyboard",
    "Concert Photography",
    "Wildlife Photography",
    "Night Cinematography",
    "Visual Portfolio",

    // Identity 3: Broccoli (Product & Nutrition Instrument)
    "Broccoli",
    "Broccoli App",
    "Broccoli Calorie Tracker",
    "Broccoli Nutrition Tracker",
    "Broccoli Android",
    "Grams Not Guesses",
    "Margin of Error Nutrition",
    "Offline Calorie Tracker",
    "com.bidyabhushan.mobile",
  ],
  authors: [
    { name: "Bidya Bhushan Nanda", url: "https://bidyabhushan.in" },
    { name: "Vidya Bhushan Nanda", url: "https://bidyabhushan.in" },
    { name: "Bidya Bhusan Nanda", url: "https://bidyabhushan.in" },
    { name: "Vidya Bushan Nanda", url: "https://bidyabhushan.in" },
    { name: "Bidyabhushan Nanda", url: "https://bidyabhushan.in" },
    { name: "Vidyabhushan Nanda", url: "https://bidyabhushan.in" },
  ],
  creator: "Bidya Bhushan Nanda",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bidyabhushan.in",
    siteName: "Bidya Bhushan Nanda",
    title: "Bidya Bhushan Nanda | Full-Stack & BSP Engineer, Filmmaker, Creator of Broccoli",
    description:
      "Full-Stack & BSP Engineer with an electronics foundation. Bare-metal ARM64 bringup, Director & Cinematographer (unfocused.nerd), and Creator of Broccoli.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bidya Bhushan Nanda - Full-Stack & BSP Engineer, Cinematographer, Creator of Broccoli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bidya Bhushan Nanda | Full-Stack & BSP Engineer",
    description:
      "Full-Stack & BSP Engineer, Filmmaker, and Creator of Broccoli on Google Play.",
    images: ["/twitter-image.jpg"],
  },
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
