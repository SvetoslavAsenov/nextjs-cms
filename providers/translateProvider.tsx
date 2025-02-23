"use client";

import React, { createContext } from "react";
import { useLocale } from "@/hooks/useLocale";
import { getTranslation } from "@/utils/translations";

import type { SupportedLocale } from "@/types/locales";
import type { TranslationKey } from "../translations/";

type TranslateType = (
  key: TranslationKey,
  locale?: SupportedLocale,
  data?: Record<string, string>
) => string;

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

  const translate: TranslateType = (key, locale?, data?) => {
    let translated = getTranslation(key, locale || currentLocale);

    if (data) {
      Object.entries(data).forEach(([dataKey, value]) => {
        translated = translated.replace(new RegExp(`{${dataKey}}`, "g"), value);
      });
    }

    return translated;
  };

  return <TranslateContext value={{ translate }}>{children}</TranslateContext>;
};
