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
        source: "/",
        destination: `/${defaultLocale}`,
      },
      {
        source: `/:path((?!${localePattern}).*)/:rest*`,
        destination: `/${defaultLocale}/:path/:rest*`,
      },
    ];
  },
};

export default nextConfig;
