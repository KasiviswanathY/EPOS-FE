import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Set the basePath to /nextjs */
  basePath: process.env.BASEPATH,

  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/signin", // Include the basePath in the destination
        permanent: true,
        locale: false,
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
