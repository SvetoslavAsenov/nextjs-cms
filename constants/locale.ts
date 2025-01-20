import type { SupportedLocale } from "@/types/locales";

export const LOCALE_LABELS: {
  [key in SupportedLocale]: { short: string; full: string };
} = {
  bg: {
    short: "бг",
    full: "Български",
  },
  en: {
    short: "en",
    full: "English",
  },
};
