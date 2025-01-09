import { defaultLocale } from "../config/locales";
import { getValidLocale } from "./locale";
import { translations } from "../translations/";
import type { SupportedLocale } from "../config/locales";

export const getTranslation = (
  key: string,
  locale: SupportedLocale | string
): string => {
  return (
    translations[getValidLocale(locale)]?.[key] ||
    translations[defaultLocale]?.[key] ||
    key
  );
};
