import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1aeya7jd2fyco.cloudfront.net",
        port: "",
        pathname: "/logo/**", // Allows images under /logo/
      },
      {
        protocol: "https",
        hostname: "d1aeya7jd2fyco.cloudfront.net",
        port: "",
        pathname: "/banners/**", // Allows images under /banners/
      },
    ],
  },
};

export default nextConfig;
