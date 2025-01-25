import bg from "@/assets/icons/bg.svg";
import us from "@/assets/icons/us.svg";
import de from "@/assets/icons/de.svg";

import type { SiteSupportedLocale } from "@/types/site/locales";
import type { ImportedImage } from "@/types/importedIcon";

export const SITE_LOCALES: {
  [key in SiteSupportedLocale]: {
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
  de: {
    short: "de",
    full: "Deutsch",
    icon: de,
  },
};
