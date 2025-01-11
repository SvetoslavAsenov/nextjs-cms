export type SupportedLocale = (typeof supportedLocales)[number];

export const supportedLocales = ["bg", "en"] as const;
export const defaultLocale: SupportedLocale = "bg";
