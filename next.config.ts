import type { NextConfig } from "next";
import { supportedLocales, defaultLocale } from "./constants/locales";
import type { SupportedLocale } from "./constants/locales";

const locales: SupportedLocale[] = supportedLocales.filter(
  (locale) => locale !== defaultLocale
);

const localePattern = locales.join("|");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: `/:locale(${localePattern})`,
        destination: "/",
      },
      {
        source: `/:locale(${localePattern})/:path*`,
        destination: "/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: `/:locale(${localePattern})`,
        headers: [
          {
            key: "x-locale",
            value: ":locale",
          },
        ],
      },
      {
        source: `/:locale(${localePattern})/:path*`,
        headers: [
          {
            key: "x-locale",
            value: defaultLocale,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
