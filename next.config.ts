import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rsvxklvgntsgmoumonff.supabase.co",
      },
    ],
  },
};

export default nextConfig;
