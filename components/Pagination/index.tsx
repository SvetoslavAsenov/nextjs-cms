"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Item from "./Item";
import { PAGE_QUERY_PARAM } from "@/constants/queryParams";

import type { ItemVariant } from "./Item";

type PaginationCommonParams = {
  totalPages: number;
};
export type PaginationWithQueryParam = {
  type: "query_param";
  action?: never;
  currentPage?: never;
};

export type PaginationAction = (page: number) => void;

export type PaginationWithAction = {
  type: "action";
  currentPage: number;
  action: PaginationAction;
};

type PaginationParams = PaginationCommonParams &
  (PaginationWithQueryParam | PaginationWithAction);

const Pagination = ({
  type,
  currentPage,
  totalPages,
  action,
}: PaginationParams) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  let current = currentPage || 1;

  // If type is query_param - get the current page from the search params
  if (type === "query_param") {
    const pageParam = searchParams.get(PAGE_QUERY_PARAM) || "1";
    const parsedParam = parseInt(pageParam);
    const valid =
      typeof parsedParam === "number" &&
      parsedParam > 0 &&
      parsedParam <= totalPages;
    current = valid ? parsedParam : 1;
  }

  const getHref = (page: number) => {
    params.set(PAGE_QUERY_PARAM, page.toString());
    const href = `?${params.toString()}`;
    return href;
  };

  const getItem = (page: number, variant?: ItemVariant) => {
    return (
      <Item
        {...(type === "action"
          ? { action, type: "action" }
          : { type: "query_param", href: getHref(page) })}
        page={page}
        variant={variant}
        key={page}
      />
    );
  };

  const onSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (!ev?.target?.value) {
      return;
    }
    const page = parseInt(ev?.target?.value);
    if (typeof page !== "number" || page < 1 || page > totalPages) {
      return;
    }

    if (type === "action") {
      action(page);
      return;
    }

    params.set(PAGE_QUERY_PARAM, page.toString());
    router.push(`?${params.toString()}`);
  };

  // Prepare items for 3 positions before
  // and 3 positions after the current page
  const items = [];

  for (let i = current - 3; i <= current + 3; i++) {
    if (i < 1 || i > totalPages) {
      continue;
    }

    let variant = "default";

    if (
      (i === current - 3 || i === current + 3) &&
      !(i < 3) &&
      !(i > totalPages - 2)
    ) {
      variant = "dots";
    } else if (i === current) {
      variant = "current";
    }

    items.push(getItem(i, variant as ItemVariant));
  }

  return (
    <div className="inline-flex justify-center gap-2 select-none">
      {/* Previous */}
      {current !== 1 && getItem(current - 1, "prev")}

      {/* Desktop only */}
      <div className="hidden lg:contents">
        {/* We want to always show an item for the first page */}
        {current > 4 && getItem(1)}

        {/* Get the items tree positions before and after current */}
        {items}

        {/* We want to always show an item for the last page */}
        {current < totalPages - 3 && getItem(totalPages)}
      </div>

      {/* Mobile only */}
      <div className="contents lg:hidden">
        <select
          value={current}
          className="bg-background"
          onChange={onSelectChange}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Next */}
      {current !== totalPages && getItem(current + 1, "next")}
    </div>
  );
};

export default Pagination;
