"use client";

import { useId } from "react";
import { useTranslate } from "@/hooks/useTranslate";
import SortBy from "./SortBy";
import SortDirection from "./SortDirection";

import type { TableOptionsSort } from "../..";
export type UpdateSortBy = (value: string) => void;
export type ToggleSortDirection = () => void;

const Sort = (props: TableOptionsSort) => {
  const { translate } = useTranslate();
  const id = useId();

  const updateSortBy: UpdateSortBy = (value) => {
    props.onSort(value, props.sortedDirection);
  };

  const toggleSortDirection = () => {
    props.onSort(
      props.sortedByKey,
      props.sortedDirection === "asc" ? "desc" : "asc"
    );
  };

  return props?.items?.length ? (
    <div className="flex inline-flex items-center pr-4">
      <label htmlFor={id} className="mr-2 leading-none text-background">
        {translate("sort")}:
      </label>
      <SortBy {...props} id={id} updateSortBy={updateSortBy} />
      <SortDirection {...props} toggleSortDirection={toggleSortDirection} />
    </div>
  ) : null;
};

export default Sort;
