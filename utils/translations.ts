import { defaultLocale } from "../config/locales";
import { getValidLocale } from "./locale";
import { translations } from "../translations/";

import type { SupportedLocale } from "@/types/locales";
import type { TranslationKey } from "../translations/";

export const getTranslation = (
  key: TranslationKey,
  locale: SupportedLocale | string
): string => {
  return (
    translations[getValidLocale(locale)]?.[key] ||
    translations[defaultLocale]?.[key] ||
    key
  );
};
