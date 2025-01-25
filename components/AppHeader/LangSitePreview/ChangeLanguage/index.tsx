"use client";

import { Menu, Item } from "../../Menu";
import { LOCALE_LABELS } from "@/constants/locale";
import { useLocale } from "@/hooks/useLocale";
import { useTranslate } from "@/hooks/useTranslate";
import { SupportedLocale } from "@/types/locales";

type ChangeLanguageProps = {
  shown: boolean;
  toggle: () => void;
};

const ChangeLanguage = ({ shown, toggle }: ChangeLanguageProps) => {
  const { translate } = useTranslate();
  const { locale, changeLocale } = useLocale();

  return (
    <div className="relative flex h-full items-center">
      <button
        className="block relative leading-none hover:text-primary"
        onClick={() => toggle()}
        title={translate("language")}
      >
        <span>{LOCALE_LABELS[locale].short}</span>
      </button>

      <Menu shown={shown}>
        {Object.entries(LOCALE_LABELS).map(([localeCode, data]) => {
          const Icon = () => (
            <img
              src={data.icon.src}
              alt={data.full}
              className="w-6 border-border border-solid border"
            />
          );

          return (
            <Item
              key={`locale-${data.full}`}
              variant="button"
              label={data.full}
              icon={Icon}
              handler={() => {
                changeLocale(localeCode as SupportedLocale);
              }}
              disabled={localeCode === locale}
            />
          );
        })}
      </Menu>
    </div>
  );
};

export default ChangeLanguage;
