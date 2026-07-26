import type { Metadata } from "next";
import { JetBrains_Mono, Instrument_Sans } from "next/font/google";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bidyabhushan Nanda — Full-Stack Engineer",
  description:
    "Portfolio of Bidyabhushan Nanda. Full-stack engineering across frontend, backend, and infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${instrumentSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
