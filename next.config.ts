import "./src/env";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites(){
    return[
      {
        source:"/api/auth/:path*",
        destination:`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/:path`
      }
    ]
  }
};

export default nextConfig;
