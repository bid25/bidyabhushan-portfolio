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
  title: "Creative Portfolio & Lens | Bidya Bhushan Nanda",
  description:
    "Cinematography, visual direction, and photography showcase by Bidya Bhushan Nanda (unfocused.nerd). Night cinematography, concert films, wildlife, and visual storyboards.",
  keywords: [
    // Creator name permutations
    "Bidya Bhushan Nanda",
    "Bidya Bhushan",
    "Bidya",
    "Vidya Bhushan Nanda",
    "Vidya Bhushan",
    "Vidya Bushan",
    "Vidya",
    "Bidya Bhusan",
    "Bidyabhushan Nanda",
    "Bidyabhushan",
    "Vidyabhushan Nanda",
    "Vidyabhushan",
    "Bidya Nanda",
    "Vidya Nanda",

    // Handles
    "unfocused.nerd",
    "unfocused nerd",
    "unfocusednerd",
    "unfocused_nerd",
    "bid25",

    // Entity + Creative Queries
    "Bidya Bhushan Photography",
    "Vidya Bhushan Photography",
    "Bidya Bhusan Photography",
    "Vidya Bushan Photography",
    "Bidyabhushan Photography",
    "Vidyabhushan Photography",
    "Bidya Bhushan Cinematography",
    "Vidya Bhushan Cinematography",
    "Bidya Bhusan Cinematography",
    "Vidya Bushan Cinematography",
    "Bidyabhushan Cinematography",
    "Vidyabhushan Cinematography",
    "Bidya Bhushan Films",
    "Vidya Bhushan Films",
    "Bidya Bhushan Director",
    "Vidya Bhushan Director",
    "Bidya Bhushan Visuals",
    "Vidya Bhushan Visuals",
    "Bidya Bhushan Lens",
    "Vidya Bhushan Lens",
    "Bidya Nanda Photography",
    "Vidya Nanda Photography",
    "Bidya Nanda Films",
    "Vidya Nanda Films",
    "unfocused nerd photography",
    "unfocused nerd cinematography",
    "unfocused nerd films",

    // Creative craft & discipline
    "Cinematography",
    "Director of Photography",
    "Film Director Delhi",
    "Visual Storyboard",
    "Concert Photography",
    "Wildlife Photography",
    "Night Cinematography",
    "Street Photography Delhi",
    "Visual Portfolio",
    "Filmmaker Delhi",
  ],
  alternates: {
    canonical: "/lens-portfolio",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bidyabhushan.in/lens-portfolio",
    title: "Bidya Bhushan Nanda | Cinematography & Visual Portfolio",
    description:
      "Visual direction, cinematography, and photography showcase by Bidya Bhushan Nanda (unfocused.nerd).",
    images: [
      {
        url: "/images/lens/storyboard/hero.png",
        width: 1200,
        height: 630,
        alt: "Bidya Bhushan Nanda - Cinematography & Visual Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bidya Bhushan Nanda | Cinematography & Visual Portfolio",
    description:
      "Visual direction and photography showcase by Bidya Bhushan Nanda (unfocused.nerd).",
    images: ["/images/lens/storyboard/hero.png"],
  },
};

const lensStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Bidya Bhushan Nanda - Creative & Cinematography Showcase",
  url: "https://www.bidyabhushan.in/lens-portfolio",
  mainEntity: {
    "@type": "Person",
    name: "Bidya Bhushan Nanda",
    alternateName: [
      "Bidya",
      "Bidya Bhushan",
      "Vidya",
      "Vidya Bhushan",
      "Vidya Bushan",
      "Bidya Bhusan",
      "Bidyabhushan",
      "Bidyabhushan Nanda",
      "Vidyabhushan",
      "Vidyabhushan Nanda",
      "Bidyabhusan",
      "Vidyabhusan",
      "Bidya Nanda",
      "Vidya Nanda",
      "unfocused.nerd",
      "unfocused nerd",
      "bid25",
    ],
    jobTitle: ["Director & Cinematographer", "Photographer"],
    url: "https://www.bidyabhushan.in",
    sameAs: [
      "https://www.instagram.com/unfocused.nerd/",
      "https://github.com/bid25",
    ],
  },
};

export default function LensPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${archivoBlack.variable} ${ibmPlexMono.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lensStructuredData) }}
      />
      {children}
    </div>
  );
}

