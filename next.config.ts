import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  env: {
    package_version: version,
  },
};

export default nextConfig;
