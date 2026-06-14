import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["papaparse"],
  devIndicators: false,
};

export default nextConfig;
