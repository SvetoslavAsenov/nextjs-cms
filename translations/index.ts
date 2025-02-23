import bg from "./bg";
import en from "./en";
import type { SupportedLocale } from "@/types/locales";

export type TranslationKey = keyof typeof bg;
type TranslationObject = Record<TranslationKey, string>;
type TranslationsObject = Record<SupportedLocale, TranslationObject>;

export const translations: TranslationsObject = {
  bg,
  en,
};
