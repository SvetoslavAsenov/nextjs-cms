"use client";

import { useId } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslate } from "@/hooks/useTranslate";
import SortBy from "./SortBy";
import SortDirection from "./SortDirection";
import {
  SORT_BY_QUERY_PARAM,
  SORT_DIRECTION_QUERY_PARAM,
} from "@/constants/queryParams";

import type { TableOptionsSort, SortDirectionOptions } from "../..";
import type { ReadonlyURLSearchParams } from "next/navigation";
export type UpdateSortBy = (value: string) => void;
export type ToggleSortDirection = () => void;

const getCurrentSortKeyAndDirection = ({
  searchParams,
  ...props
}: TableOptionsSort & { searchParams: ReadonlyURLSearchParams }) => {
  const {
    sortedByKey,
    sortedDirection,
    items,
    type,
    defaultSortedBy,
    defaultSortedDirection,
  } = props;

  let sortBy = type === "action" ? sortedByKey : defaultSortedBy;
  let sortDirection =
    type === "action" ? sortedDirection : defaultSortedDirection;

  if (type === "query_param") {
    const sortByParam = searchParams.get(SORT_BY_QUERY_PARAM);
    const sortDirectionParam = searchParams.get(SORT_DIRECTION_QUERY_PARAM);

    sortBy =
      sortByParam &&
      items.find((i) => {
        return i.sortKey === sortByParam;
      })
        ? sortByParam
        : defaultSortedBy;

    sortDirection = (
      sortDirectionParam && ["asc", "desc"].includes(sortDirectionParam)
        ? sortDirectionParam
        : defaultSortedDirection
    ) as SortDirectionOptions;
  }

  return { sortBy, sortDirection };
};

const Sort = (props: TableOptionsSort) => {
  const { onSort, items, type } = props;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const { translate } = useTranslate();
  const id = useId();
  const { sortBy, sortDirection } = getCurrentSortKeyAndDirection({
    ...props,
    searchParams,
  });

  const handleSortChange = (
    value: string,
    sortedDirection: SortDirectionOptions
  ) => {
    if (type === "action") {
      onSort(value, sortedDirection);
    } else {
      params.set(SORT_BY_QUERY_PARAM, value);
      params.set(SORT_DIRECTION_QUERY_PARAM, sortedDirection);
      router.push(`?${params.toString()}`);
    }
  };

  const updateSortBy: UpdateSortBy = (value) => {
    handleSortChange(value, sortDirection);
  };

  const toggleSortDirection = () => {
    handleSortChange(sortBy, sortDirection === "asc" ? "desc" : "asc");
  };

  return items?.length ? (
    <div className="flex inline-flex items-center">
      <label htmlFor={id} className="mr-2 leading-none text-background">
        {translate("sort")}:
      </label>
      <SortBy
        sortBy={sortBy}
        items={items}
        id={id}
        updateSortBy={updateSortBy}
      />
      <SortDirection
        sortedDirection={sortDirection}
        toggleSortDirection={toggleSortDirection}
      />
    </div>
  ) : null;
};

export default Sort;
