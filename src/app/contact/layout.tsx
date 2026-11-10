import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Bidya Bhushan Nanda | Get in Touch",
  description:
    "Get in touch with Bidya Bhushan Nanda. Email, GitHub, LinkedIn, and direct collaboration channels.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Bidya Bhushan Nanda",
    description:
      "Direct communication channels for engineering opportunities, systems consulting, and collaboration.",
    url: "https://www.bidyabhushan.in/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Bidya Bhushan Nanda",
    description: "Get in touch for systems and full-stack engineering collaborations.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

