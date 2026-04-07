import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
  },
  webpack(config) {
    config.resolve.alias["next-intl/config"] = resolve(
      process.cwd(),
      "src/i18n/request.ts"
    );
    return config;
  },
};

export default nextConfig;
