"use client";

import React from "react";
import { LocaleProvider as Provider } from "@/providers/localeProvider";

import type { SupportedLocale } from "@/types/locales";

type LocaleProviderProps = {
  locale: SupportedLocale;
  children: React.ReactNode;
};

const LocaleProvider = ({ locale, children }: LocaleProviderProps) => {
  return <Provider initialLocale={locale}>{children}</Provider>;
};

export default LocaleProvider;
