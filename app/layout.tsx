import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Instrument_Sans } from "next/font/google";
import { Nav } from "@/components/Nav";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LazyLiquidEther } from "@/components/LazyComponents";
import { PointerCursor } from "@/components/PointerCursor";
import { HeavyComponentWrapper } from "@/components/HeavyComponentWrapper";
import { AtmosphereFallback } from "@/components/AtmosphereFallback";
import { VercelIntegrations } from "@/components/VercelIntegrations";
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
  title: "Bidya Bhushan Nanda — Full-Stack & AI/ML Engineer",
  description:
    "Portfolio of Bidya Bhushan Nanda. Full-stack engineering across frontend, backend, and infrastructure.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// viewportFit: "cover" is what makes env(safe-area-inset-*) resolve to real
// pixel values on notched/Dynamic-Island phones instead of always being 0.
// Without this export Next only emits the bare default viewport meta tag.
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
      className={`${jetbrainsMono.variable} ${instrumentSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative bg-void overflow-x-clip">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <PointerCursor targetSelector="a, button, [role='button'], .cursor-target" />
        <div className="fixed inset-0 pointer-events-none -z-50 opacity-90 dark:opacity-50 saturate-[1.5] contrast-[1.2] dark:saturate-100 dark:contrast-100 mix-blend-multiply dark:mix-blend-screen">
          <HeavyComponentWrapper fallback={<AtmosphereFallback />}>
            <LazyLiquidEther 
              colors={['#00E5FF', '#FF0055', '#4A00E0']} 
              mouseForce={15} 
              cursorSize={80} 
            />
          </HeavyComponentWrapper>
        </div>
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
        <VercelIntegrations />
        </ThemeProvider>
      </body>
    </html>
  );
}
