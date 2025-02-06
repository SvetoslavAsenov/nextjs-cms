"use client";

import { useId } from "react";
import { useTranslate } from "@/hooks/useTranslate";
import { ChevronUp, ChevronDown } from "lucide-react";

import type { TableOptionsSort } from "../..";

type SortProps = {
  sort: TableOptionsSort;
};

const Sort = ({ sort }: SortProps) => {
  const { translate } = useTranslate();
  const id = useId();
  const chevronsClasses = "w-3 rounded-[0.125rem]";
  const activeChevronClasses = " bg-background";
  const inactiveChevronClasses = " text-background group-hover:bg-primary";

  return sort?.items?.length ? (
    <div className="flex inline-flex items-center pr-4">
      <label htmlFor={id} className="mr-2 leading-none text-background">
        {translate("sort")}:
      </label>
      <select
        name="sort"
        id={id}
        className="bg-background p-0.5"
        value={sort?.sortedByKey}
        onChange={(ev) => {
          sort.onSort(ev.target.value, sort.sortedDirection);
        }}
      >
        {sort.items.map((item, index) => (
          <option value={item.sortKey} key={index}>
            {translate(item.label)}
          </option>
        ))}
      </select>
      <div
        className="flex flex-col h-[1.5rem] cursor-pointer px-1 group"
        onClick={() =>
          sort.onSort(
            sort.sortedByKey,
            sort.sortedDirection === "asc" ? "desc" : "asc"
          )
        }
      >
        <ChevronUp
          className={
            chevronsClasses +
            (sort.sortedDirection === "asc"
              ? activeChevronClasses
              : inactiveChevronClasses)
          }
        />
        <ChevronDown
          className={
            chevronsClasses +
            (sort.sortedDirection === "desc"
              ? activeChevronClasses
              : inactiveChevronClasses)
          }
        />
      </div>
    </div>
  ) : null;
};

export default Sort;
