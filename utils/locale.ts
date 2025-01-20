import { defaultLocale, supportedLocales } from "../config/locales";
import type { SupportedLocale } from "@/types/locales";
import { getSlugSegmentsFromUrl } from "./url";

const validateLocale = (locale: SupportedLocale | string): boolean => {
  return supportedLocales.includes(locale as SupportedLocale);
};

export const getLocaleFromUrl = (url: string): SupportedLocale => {
  const segments = getSlugSegmentsFromUrl(url);

  return getValidLocale(segments[1] as SupportedLocale);
};

export const getValidLocale = (
  locale: SupportedLocale | string
): SupportedLocale => {
  return validateLocale(locale) ? (locale as SupportedLocale) : defaultLocale;
};

export const localePattern = supportedLocales
  .filter((locale) => locale !== defaultLocale)
  .join("|");
