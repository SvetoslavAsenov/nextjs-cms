import { defaultLocale } from "@/config/locales";
import type { SupportedLocale } from "@/types/locales";

export const getSlugSegmentsFromUrl = (url: string): string[] => {
  const urlWithoutProtocol = url.replace(/^[a-z]+:\/\//g, "");
  return urlWithoutProtocol.split("/");
};

export const setLocaleToRelativeUrl = (
  url: string,
  locale: SupportedLocale
): string => {
  return locale !== defaultLocale
    ? `/${locale}/${url.replace(/^\/+/g, "")}`
    : url;
};
