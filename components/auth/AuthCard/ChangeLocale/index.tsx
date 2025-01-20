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

  return (
    <div className="flex gap-2 justify-end">
      {supportedLocales.map((v) => {
        return locale !== v && currentUrl ? (
          <StyledLink
            href={setLocaleToRelativeUrl(currentUrl, v)}
            key={v}
            title={LOCALE_LABELS[v].full}
          >
            {LOCALE_LABELS[v].short}
          </StyledLink>
        ) : (
          <p key={v} className="text-muted-foreground">
            {LOCALE_LABELS[v].short}
          </p>
        );
      })}
    </div>
  );
};

export default ChangeLocale;
