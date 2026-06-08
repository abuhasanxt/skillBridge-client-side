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
    const backend = process.env.BACKEND_URL ?? "http://localhost:5000";
    return[
      {
        source:"/api/:path*",
        destination:`${backend}/api/:path*`
      }
    ]
  }
};

export default nextConfig;
