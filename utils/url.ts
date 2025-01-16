import { defaultLocale, supportedLocales } from "../config/locales";

import type { SupportedLocale } from "@/types/locales";

export const getSlugSegmentsFromUrl = (url: string): string[] => {
  const urlWithoutProtocol = url.replace(/^[a-z]+:\/\//g, "");
  return urlWithoutProtocol.split("/");
};

export const setLocaleToRelativeUrl = (
  url: string,
  locale: SupportedLocale
): string => {
  const segments = getSlugSegmentsFromUrl(url);
  const filteredSegments = segments.filter((s) => {
    return !supportedLocales.includes(s as SupportedLocale) && s !== "";
  });

  const newPath = filteredSegments.join("/");
  return locale !== defaultLocale ? `/${locale}/${newPath}` : `/${newPath}`;
};
