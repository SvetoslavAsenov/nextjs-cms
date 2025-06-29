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

const removeLocaleFromPath = (inputPath: string): string => {
  // Remove any potential locale from the url
  const regex = new RegExp(`(\/(${supportedLocales.join("|")}))`, "gi");
  const cleanedInputPath = inputPath.replaceAll(regex, "");
  return cleanedInputPath;
};

export const comparePaths = (
  inputPath: string,
  targetPath: string
): boolean => {
  const cleanedInputPath = removeLocaleFromPath(inputPath);
  return cleanedInputPath === targetPath;
};

export const isSameOrSubpath = (
  inputPath: string,
  targetPath: string
): boolean => {
  const cleanedInputPath = removeLocaleFromPath(inputPath);
  const inputBeginning = cleanedInputPath.slice(0, targetPath.length);
  return inputBeginning === targetPath;
};
