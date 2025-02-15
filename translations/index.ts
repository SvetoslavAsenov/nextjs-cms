import bg from "./bg";
import en from "./en";
import type { SupportedLocale } from "@/types/locales";

type TranslationObject = Record<keyof typeof bg, string>;
type TranslationsObject = Record<SupportedLocale, TranslationObject>;

export const translations: TranslationsObject = {
  bg,
  en,
};
