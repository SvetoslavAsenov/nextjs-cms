import { defaultLocale, supportedLocales } from "../config/locales";
import type { SupportedLocale } from "../config/locales";
import { getSlugSegmentsFromUrl } from "./url";

const validateLocale = (locale: SupportedLocale): boolean => {
  return supportedLocales.includes(locale);
};

export const getLocaleFromUrl = (url: string): SupportedLocale => {
  const segments = getSlugSegmentsFromUrl(url);

  return validLocale(segments[1] as SupportedLocale);
};

export const validLocale = (locale: SupportedLocale): SupportedLocale => {
  return validateLocale(locale) ? locale : defaultLocale;
};

export const localePattern = supportedLocales
  .filter((locale) => locale !== defaultLocale)
  .join("|");
