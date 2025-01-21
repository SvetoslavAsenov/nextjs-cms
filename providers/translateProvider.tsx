import React, { createContext } from "react";
import { useLocale } from "@/hooks/useLocale";
import { getTranslation } from "@/utils/translations";

import type { SupportedLocale } from "@/types/locales";

type TranslateType = (key: string, locale?: SupportedLocale) => string;

type TranslateContextProps = {
  translate: TranslateType;
};

type TranslateProviderProps = {
  children: React.ReactNode;
};

export const TranslateContext = createContext<
  TranslateContextProps | undefined
>(undefined);

export const TranslateProvider = ({ children }: TranslateProviderProps) => {
  const { locale: currentLocale } = useLocale();

  const translate: TranslateType = (key, locale?) => {
    return getTranslation(key, locale || currentLocale);
  };

  return <TranslateContext value={{ translate }}>{children}</TranslateContext>;
};
