import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: '/lens-portforio',
        destination: '/lens-portfolio',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/broccoli', destination: '/broccoli.html' },
      { source: '/broccoli/index.html', destination: '/broccoli.html' },
      { source: '/privacy', destination: '/privacy.html' },
      { source: '/terms', destination: '/terms.html' },
      { source: '/medical-disclaimer', destination: '/medical-disclaimer.html' },
      { source: '/delete-account', destination: '/delete-account.html' },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*.pdf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
