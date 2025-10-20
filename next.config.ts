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
         // Localhost dev
        "localhost:3000",

        // Codespaces / GitHub Dev (usa regex-like host wildcard)
        "ominous-potato-p57p564r9q4299qv-3000.app.github.dev",

        // Producción
        "https://miapp.com",
      ],
    },
  },
  env: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    DATABASE_URI: process.env.DATABASE_URI,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withPayload(nextConfig));
