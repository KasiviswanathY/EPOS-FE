// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Set the basePath - only use if deploying to a subdirectory */
  basePath: process.env.BASEPATH || "", // Default to empty for local dev

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
