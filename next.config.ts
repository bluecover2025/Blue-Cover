import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createNextIntlPlugin from "next-intl/plugin";

// Polyfill __dirname for ESM (required by next-intl plugin on Vercel)
if (typeof globalThis.__dirname === "undefined") {
  try {
    globalThis.__dirname = dirname(fileURLToPath(import.meta.url));
  } catch {
    globalThis.__dirname = process.cwd();
  }
}

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
