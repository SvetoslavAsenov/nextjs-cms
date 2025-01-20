import { localePattern } from "../utils/locale";
import { defaultLocale } from "./locales";

export const rewrites = async () => [
  {
    source: "/",
    destination: `/${defaultLocale}`,
  },
  {
    source: `/:locale(${localePattern})/:path*`,
    destination: `/:locale/:path*`,
  },
  {
    source: `/:path((?!api).*)`,
    destination: `/${defaultLocale}/:path*`,
  },
];
