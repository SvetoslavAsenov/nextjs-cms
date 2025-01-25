"use client";

import ChangeSiteIcon from "./ChangeSiteIcon";
import { Menu, Item } from "../../Menu";
import { SITE_LOCALES } from "@/constants/site/locale";
import { useSite } from "@/hooks/useSite";

import type { SiteSupportedLocale } from "@/types/site/locales";

type ChangeSiteProps = {
  shown: boolean;
  toggle: () => void;
};

// This component manages a cookie that tracks which site's data
//  is currently being viewed or edited in the control panel.
const ChangeSite = ({ shown, toggle }: ChangeSiteProps) => {
  const { siteLocale, changeSite } = useSite();

  return (
    <div className="relative flex h-full items-center">
      <button onClick={() => toggle()}>
        <ChangeSiteIcon />
      </button>
      <Menu shown={shown}>
        {Object.entries(SITE_LOCALES).map(([localeCode, data]) => {
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
                changeSite(localeCode as SiteSupportedLocale);
              }}
              disabled={localeCode === siteLocale}
            />
          );
        })}
      </Menu>
    </div>
  );
};

export default ChangeSite;
