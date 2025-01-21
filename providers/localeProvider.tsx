"use client";

import React, { createContext, useState } from "react";

import type { SupportedLocale } from "@/types/locales";

type LocaleProviderProps = {
  children: React.ReactNode;
  initialLocale: SupportedLocale;
};

type LocaleContextProps = {
  locale: SupportedLocale;
  updateLocale: (newLocale: SupportedLocale) => void;
};

export const LocaleContext = createContext<LocaleContextProps | undefined>(
  undefined
);

export const LocaleProvider = ({
  children,
  initialLocale,
}: LocaleProviderProps) => {
  const [locale, setLocale] = useState(initialLocale);

  const updateLocale = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
  };

  return (
    <LocaleContext value={{ locale, updateLocale }}>{children}</LocaleContext>
  );
};
