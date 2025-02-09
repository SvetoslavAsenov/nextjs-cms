"use client";

import Sort from "./Sort";
import Actions from "./Actions";

import type { TableOptions, SelectedRows, ToggleSelectAll } from "..";

type ToolbarProps = {
  options: TableOptions;
  selectedRows?: SelectedRows;
  toggleSelectAll: ToggleSelectAll;
  selected: boolean;
};

const Toolbar = ({
  options,
  selectedRows,
  toggleSelectAll,
  selected,
}: ToolbarProps) => {
  return options?.actions || options?.sort?.items?.length ? (
    <div className="bg-foreground p-[0.375rem] select-none grid gap-y-[0.375rem] grid-rows-2 grid-cols-2 md:grid-rows-1 md:grid-cols-3">
      <div className="h-[1.5rem] w-[1.5rem] col-start-1 col-span-1 flex items-center justify-center">
        <input
          type="checkbox"
          checked={selected}
          className="w-4 h-4 cursor-pointer"
          onChange={toggleSelectAll}
        />
      </div>
      {options?.sort?.items?.length && (
        <div className="flex justify-end md:justify-center col-start-2 col-span-1">
          <Sort {...options.sort} />
        </div>
      )}
      {options?.actions && (
        <div className="flex justify-center md:justify-end col-start-1 col-span-3 md:col-start-3 md:col-span-1">
          <Actions actions={options.actions} selectedRows={selectedRows} />
        </div>
      )}
    </div>
  ) : null;
};

export default Toolbar;
