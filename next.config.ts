import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/methodology",
      destination: "/methods",
      permanent: true
    }
  ]
};

export default nextConfig;
