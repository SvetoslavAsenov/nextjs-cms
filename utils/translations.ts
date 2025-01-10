import { defaultLocale } from "../config/locales";
import { validLocale } from "./locale";
import { translations } from "../translations/";
import type { SupportedLocale } from "../config/locales";

export const getTranslation = (
  key: string,
  locale: SupportedLocale
): string => {
  return (
    translations[validLocale(locale)]?.[key] ||
    translations[defaultLocale]?.[key] ||
    key
  );
};
