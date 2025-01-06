import { localePattern } from "../utils/locale";
import { defaultLocale } from "../constants/locales";

export const rewrites = async () => [
  {
    source: "/",
    destination: `/${defaultLocale}`,
  },
  {
    source: `/:path((?!${localePattern}|api).*)/:rest*`,
    destination: `/${defaultLocale}/:path/:rest*`,
  },
];
