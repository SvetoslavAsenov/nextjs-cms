"use client";
// This provider manages a context that determines which site's data
// is being accessed or modified within the control panel.

import React, { createContext, useState } from "react";
import { setCookie } from "@/utils/cookies/cookies.client";
import { SITE_LOCALE_COOKIE } from "@/constants/cookies";

import type { SiteSupportedLocale } from "@/types/site/locales";

type SiteContextProps = {
  siteLocale: SiteSupportedLocale;
  changeSite: ChangeSite;
};

type ChangeSite = (siteLocale: SiteSupportedLocale) => void;

type SiteProviderProps = {
  initialSiteLocale: SiteSupportedLocale;
  children: React.ReactNode;
};

export const SiteContext = createContext<SiteContextProps | undefined>(
  undefined
);

export const SiteProvider = ({
  initialSiteLocale,
  children,
}: SiteProviderProps) => {
  const [siteLocale, setSiteLocale] =
    useState<SiteSupportedLocale>(initialSiteLocale);

  const changeSite: ChangeSite = (siteLocale) => {
    setCookie(SITE_LOCALE_COOKIE, siteLocale);
    setSiteLocale(siteLocale);
  };

  return (
    <SiteContext value={{ siteLocale, changeSite }}>{children}</SiteContext>
  );
};
