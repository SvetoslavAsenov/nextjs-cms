"use client";

import { useState } from "react";
import PreviewSiteIcon from "./PreviewSiteIcon";
import ChangeLanguage from "./ChangeLanguage";
import ChangeSite from "./ChangeSite";

type Menus = "language" | "site";
export type ToggleShown = (menu: Menus) => void;

const LangSitePreview = () => {
  const [shownMenu, setShownMenu] = useState<Menus | null>();
  const liClasses = "h-full flex items-center";

  const toggleShown: ToggleShown = (menu) => {
    setShownMenu(shownMenu !== menu ? menu : null);
  };

  return (
    <ul className="flex h-full gap-2">
      <li className={liClasses}>
        <ChangeLanguage
          shown={shownMenu === "language"}
          toggle={() => toggleShown("language")}
        />
      </li>
      <li className={liClasses}>
        <ChangeSite
          shown={shownMenu === "site"}
          toggle={() => toggleShown("site")}
        />
      </li>
      <li className={liClasses}>
        <PreviewSiteIcon />
      </li>
    </ul>
  );
};

export default LangSitePreview;
