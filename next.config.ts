import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "resume-builder-sandy-phi.vercel.app",
          },
        ],
        destination: "https://createfreeresume.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
