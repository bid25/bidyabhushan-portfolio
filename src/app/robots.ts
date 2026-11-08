import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/confirm-email",
        "/reset-password",
        "/verify-email",
        "/style-guide",
        "/api/",
      ],
    },
    sitemap: "https://www.bidyabhushan.in/sitemap.xml",
  };
}

