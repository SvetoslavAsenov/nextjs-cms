import { defaultLocale } from "../constants/locales";
import { validLocale } from "./locale";
import { translations } from "../translations/";
import type { SupportedLocale } from "../constants/locales";

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
