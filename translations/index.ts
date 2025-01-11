import bg from "./bg.json";
import en from "./en.json";
import type { SupportedLocale } from "@/config/locales";

type TranslationObject = Record<string, string>;
type TranslationsObject = Record<SupportedLocale, TranslationObject>;

export const translations: TranslationsObject = {
  bg: bg as TranslationObject,
  en: en as TranslationObject,
};
