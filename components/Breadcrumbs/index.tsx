import Item from "./Item";
import { getTranslation } from "@/utils/translations";
import { House } from "lucide-react";

import type { SupportedLocale } from "@/types/locales";
import type { BreadcrumbsItem } from "@/types/components/breadcrumbs";

type BreadcrumbsProps = {
  items?: BreadcrumbsItem[];
  hideHome?: boolean;
  locale: SupportedLocale;
};

const Breadcrumbs = ({ items, locale, hideHome }: BreadcrumbsProps) => {
  return (
    <nav className="bg-background flex gap-[0.25rem] flex-wrap select-none">
      {!hideHome && (
        <Item
          first
          label={getTranslation("home", locale)}
          icon={<House />}
          href="/"
        />
      )}
      {items?.map((item, index) => (
        <Item key={index} {...item} first={hideHome && index === 0} />
      ))}
    </nav>
  );
};

export default Breadcrumbs;
