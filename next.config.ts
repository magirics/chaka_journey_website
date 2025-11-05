import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', // codespace
        '*.lhr.life',
      ],
    },
  },
  env: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    DATABASE_URI: process.env.DATABASE_URI,
  },
  allowedDevOrigins: [
    'localhost:3000', // codespace
    '*.lhr.life',
  ],

 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.app.github.dev', // 🔥 Permite cualquier subdominio de Codespaces
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withPayload(nextConfig));
