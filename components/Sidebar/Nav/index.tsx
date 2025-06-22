"use client";

import {
  PanelTop,
  TableOfContents,
  Users,
  UserCog,
  Settings,
} from "lucide-react";
import Item from "./Item";
import { usePathname } from "next/navigation";
import { isSameOrSubpath } from "@/utils/url";
import { useTranslate } from "@/hooks/useTranslate";

import type { TranslationKey } from "@/translations";

export type ItemType = {
  label: string;
  path: string;
  icon: React.ElementType;
};
type Items = ItemType[];

const items: Items = [
  {
    label: "pages",
    path: "/pages",
    icon: PanelTop,
  },
  {
    label: "navigations",
    path: "/navigations",
    icon: TableOfContents,
  },
  {
    label: "users",
    path: "/users",
    icon: Users,
  },
  {
    label: "roles",
    path: "/roles",
    icon: UserCog,
  },
  {
    label: "settings",
    path: "/settings",
    icon: Settings,
  },
];

const Nav = () => {
  const { translate } = useTranslate();
  const currentPath = usePathname();

  return (
    <nav className="flex flex-col justify-center basis-full">
      <ul>
        {items.map((item, index) => {
          return (
            <Item
              key={index}
              data={{ ...item, label: translate(item.label as TranslationKey) }}
              isActive={isSameOrSubpath(currentPath, item.path)}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
