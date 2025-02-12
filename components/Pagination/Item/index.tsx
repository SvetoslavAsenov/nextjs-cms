"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { PaginationWithQueryParam, PaginationWithAction } from "..";

export type ItemVariant = "default" | "current" | "prev" | "next" | "dots";

type ItemPropsCommon = {
  variant?: ItemVariant;
  page: number;
};

type ItemPropsAction = Omit<PaginationWithAction, "currentPage"> & {
  href?: never;
};

type ItemPropsQueryParam = Omit<PaginationWithQueryParam, "currentPage"> & {
  href: string;
};

type ItemProps = ItemPropsCommon & (ItemPropsQueryParam | ItemPropsAction);

const Item = ({ type, page, href, variant = "default", action }: ItemProps) => {
  let content: string | React.ReactElement = page.toString();
  const classes = `${
    variant === "current" ? "font-bold" : ""
  } w-6 h-6 flex justify-center${
    !["dots", "current"].includes(variant)
      ? " bg-muted/70 hover:bg-primary/70 hover:text-background"
      : ""
  }`;

  switch (variant) {
    case "dots":
      content = "...";
      break;

    case "prev":
      content = <ChevronLeft />;
      break;

    case "next":
      content = <ChevronRight />;
      break;

    default:
      break;
  }

  const getHref = () => {
    // const params = new URLSearchParams(searchParams.toString());
    // params.set(PAGE_QUERY_PARAM, page.toString());
    // const href = `?${params.toString()}`;
    // return href;

    return href as string;
  };

  return type === "query_param" && !["dots", "current"].includes(variant) ? (
    <Link href={getHref()} className={classes}>
      {content}
    </Link>
  ) : (
    <p
      className={classes}
      {...(variant !== "current" && type === "action"
        ? { onClick: () => action(page) }
        : {})}
    >
      {content}
    </p>
  );
};

export default Item;
