import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono } from "next/font/google";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "Bidya Bhushan Nanda - Photography & Film Showcase",
  description: "Visual portfolio, photography and cinematography by Bidya Bhushan Nanda.",
};

export default function LensPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${archivoBlack.variable} ${ibmPlexMono.variable}`}>
      {children}
    </div>
  );
}

