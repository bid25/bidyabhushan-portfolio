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
  title: "Lens | Cinematography & Visual Arts",
  description:
    "Cinematography, visual direction, and photography showcase by Bidya Bhushan Nanda (unfocused.nerd). Night cinematography, concert films, and visual storyboards.",
  keywords: [
    "Bidya Bhushan Nanda",
    "Bidya Bhushan",
    "Bidya",
    "Vidya Bhushan Nanda",
    "Vidya Bhushan",
    "Vidya Bushan",
    "Vidya",
    "Bidya Bhusan",
    "Bidyabhushan",
    "Vidyabhushan",
    "Bidya Nanda",
    "Vidya Nanda",
    "Bidya Bhushan Photography",
    "Vidya Bhushan Photography",
    "Bidya Bhushan Cinematography",
    "Vidya Bhushan Cinematography",
    "Bidya Bhushan Films",
    "Vidya Bhushan Films",
    "unfocused.nerd",
    "unfocused nerd",
    "Cinematography",
    "Director of Photography",
    "Visual Storyboard",
    "Film Reel",
  ],
  alternates: {
    canonical: "/lens-portfolio",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bidyabhushan.in/lens",
    title: "Bidya Bhushan Nanda | Cinematography & Visual Showcase",
    description:
      "Visual direction and photography showcase by Bidya Bhushan Nanda (unfocused.nerd).",
    images: [
      {
        url: "/images/lens/storyboard/hero.png",
        width: 1200,
        height: 630,
        alt: "Bidya Bhushan Nanda - Cinematography Showcase",
      },
    ],
  },
};

export default function LensLayout({
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

