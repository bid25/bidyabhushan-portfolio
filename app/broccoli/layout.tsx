import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Broccoli: grams, not guesses",
  description:
    "A nutrition tracker for Android that shows the margin of error on every calorie, learns what your body really burns, and works with no signal.",
  openGraph: {
    title: "Broccoli: grams, not guesses",
    description:
      "A nutrition tracker for Android that shows the margin of error on every calorie, learns what your body really burns, and works with no signal.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1F14",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function BroccoliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800&family=Figtree:wght@400;500&family=Martian+Mono:wght@500;700;800&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}

