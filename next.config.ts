import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return[{
      source:'/api/:path*',
      destination:'https://"fakestoreapi.com/:path*"',
    }]
  },
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
};


export default nextConfig;
