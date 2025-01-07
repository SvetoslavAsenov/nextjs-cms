import { defaultLocale, supportedLocales } from "../constants/locales";
import type { SupportedLocale } from "../constants/locales";
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

export const getLocale = () => {
  if (typeof window === "undefined") {
    throw new Error("getLocale can only be used in client components");
  }
  return getLocaleFromUrl(window.location.href);
};

export const localePattern = supportedLocales
  .filter((locale) => locale !== defaultLocale)
  .join("|");
