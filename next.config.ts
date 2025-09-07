import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

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
        "https://reimagined-carnival-jprqpgv5qr6cqv5q-3000.app.github.dev",
        "http://localhost:3000"
      ],
    },
  },
  env: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    DATABASE_URI: process.env.DATABASE_URI,
  },
};

export default withPayload(nextConfig);
