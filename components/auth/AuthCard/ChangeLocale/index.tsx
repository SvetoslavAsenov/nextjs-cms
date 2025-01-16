"use client";

import { useEffect, useState } from "react";
import StyledLink from "@/components/ui/StyledLink";
import { supportedLocales } from "@/config/locales";
import { setLocaleToRelativeUrl } from "@/utils/url";
import { LOCALE_LABELS } from "@/constants/locale";

import type { SupportedLocale } from "@/types/locales";

const ChangeLocale = ({ locale }: { locale: SupportedLocale }) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (isClient) {
      const url = window.location.pathname;
      setCurrentUrl(url);
    }
  }, [isClient]);

  return currentUrl ? (
    <div className="flex flex-row-reverse gap-2">
      {supportedLocales.map((v) => {
        return locale !== v ? (
          <StyledLink href={setLocaleToRelativeUrl(currentUrl, v)} key={v}>
            {LOCALE_LABELS[v]}
          </StyledLink>
        ) : (
          <p key={v}>{LOCALE_LABELS[v]}</p>
        );
      })}
    </div>
  ) : null;
};

export default ChangeLocale;
