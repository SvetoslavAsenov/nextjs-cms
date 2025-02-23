"use client";

import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { setLocaleToRelativeUrl } from "@/utils/url";

import type { BreadcrumbsItem } from "..";

const Item = ({ label, icon, href, first }: BreadcrumbsItem) => {
  const { locale } = useLocale();

  const labelClasses = `leading-[0] 
  h-[1.25rem]
  flex items-center 
  text-background
  text-[0.875rem]
  relative
  pr-1
  before:content-[''] 
  before:inline-block 
  before:border-transparent 
  before:border-l-background
  before:border-solid 
  before:border-t-[10px] 
  before:border-b-[10px] 
  before:border-l-[7px] 
  before:border-r-0
  before:mr-1
  after:content-[''] 
  after:inline-block 
  after:absolute
  after:z-10
  after:left-full
  after:border-transparent 
  after:border-solid 
  after:border-t-[10px] 
  after:border-b-[10px] 
  after:border-l-[7px] 
  after:border-r-0
  after:bg-transparent`;

  const firstClasses = ` before:border-none before:mr-[0.375rem]`;
  const linkClasses = `${labelClasses} bg-foreground hover:bg-primary after:border-l-foreground  hover:after:border-l-primary ${
    first ? firstClasses : ""
  }`;
  const spanClasses = `${labelClasses} bg-muted-foreground after:border-l-muted-foreground ${
    first ? firstClasses : ""
  }`;

  const content = icon ? <div className="scale-[70%]">{icon}</div> : label;

  return (
    <li title={label} className={`list-none flex`}>
      {href ? (
        <Link
          href={setLocaleToRelativeUrl(href, locale)}
          className={linkClasses}
        >
          {content}
        </Link>
      ) : (
        <span className={spanClasses}>{content}</span>
      )}
    </li>
  );
};

export default Item;
