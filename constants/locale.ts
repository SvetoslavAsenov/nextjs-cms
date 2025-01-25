import type { SupportedLocale } from "@/types/locales";
import type { ImportedImage } from "@/types/importedIcon";
import bg from "@/assets/icons/bg.svg";
import us from "@/assets/icons/us.svg";

export const LOCALE_LABELS: {
  [key in SupportedLocale]: {
    short: string;
    full: string;
    icon: ImportedImage;
  };
} = {
  bg: {
    short: "бг",
    full: "Български",
    icon: bg,
  },
  en: {
    short: "en",
    full: "English",
    icon: us,
  },
};
