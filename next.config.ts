import type { NextConfig } from "next";
import {PHASE_PRODUCTION_BUILD} from 'next/constants';
import {productionEnvironment} from './lib/buildPolicy';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  headers: async () => [{source: "/:path*", headers: [
    {key: "X-Content-Type-Options", value: "nosniff"},
    {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
    {key: "X-Frame-Options", value: "DENY"},
    {key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()"},
    {key: "X-Robots-Tag", value: "noindex, nofollow"},
    {key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; connect-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'"}
  ]}],
  redirects: async () => [
    {
      source: "/methodology",
      destination: "/methods",
      permanent: true
    }
  ]
};

export default function configuration(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD && (productionEnvironment(process.env) || process.env.READER_EDITION_MODE === 'publication')) {
    if (process.env.READER_BUILD_PIPELINE !== 'publication' || process.env.READER_EDITION_MODE !== 'publication') {
      throw new Error('Production must use npm run build (or npm run build -- --production), including preflight and rendered checks');
    }
  }
  return nextConfig;
}
