"use client";

import React, { createContext, useState, useEffect } from "react";
import { getLocaleFromUrl } from "@/utils/locale";
import { setLocaleToRelativeUrl } from "@/utils/url";
import { useRouter } from "next/navigation";

import type { SupportedLocale } from "@/types/locales";

type LocaleProviderProps = {
  children: React.ReactNode;
  initialLocale: SupportedLocale;
};

type LocaleContextProps = {
  locale: SupportedLocale;
  changeLocale: (newLocale: SupportedLocale) => void;
};

export const LocaleContext = createContext<LocaleContextProps | undefined>(
  undefined
);

export const LocaleProvider = ({
  children,
  initialLocale,
}: LocaleProviderProps) => {
  const [currentLocale, setCurrentLocale] = useState(initialLocale);
  const [eventAttached, setEventAttached] = useState(false);
  const router = useRouter();
  // Altought the component is "use client",
  // Next renders it initially on the server.
  const isSsr = typeof window === "undefined";

  // Handle browser back and forward buttons navigation.
  useEffect(() => {
    const popStateHandler = () => {
      const localeFromUrl = getLocaleFromUrl(window.location.href);
      if (localeFromUrl !== currentLocale) {
        setCurrentLocale(localeFromUrl);
      }
    };

    if (!isSsr && !eventAttached) {
      window.addEventListener("popstate", popStateHandler);
      setEventAttached(true);
    }
  }, [isSsr, eventAttached, currentLocale]);

  const changeLocale = (locale: SupportedLocale) => {
    if (isSsr) {
      throw new Error("changeLocale can be used only on client side");
    }

    const currentRelativeUrl =
      window.location.pathname + window.location.search + window.location.hash;
    const newRelativeUrl = setLocaleToRelativeUrl(currentRelativeUrl, locale);

    setCurrentLocale(locale);
    router.push(newRelativeUrl);
  };

  return (
    <LocaleContext value={{ locale: currentLocale, changeLocale }}>
      {children}
    </LocaleContext>
  );
};
