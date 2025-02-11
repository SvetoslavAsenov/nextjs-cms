"use client";

import Sort from "./Sort";
import Actions from "./Actions";
import SelectAll from "./SelectAll";

import type { TableOptions, SelectedRows, ToggleSelectAll } from "..";

type ToolbarProps = {
  options: TableOptions;
  selectedRows?: SelectedRows;
  toggleSelectAll?: ToggleSelectAll;
};

const Toolbar = ({ options, selectedRows, toggleSelectAll }: ToolbarProps) => {
  return options?.actions || options?.sort?.items?.length ? (
    <header className="bg-foreground p-[0.375rem] select-none flex justify-between items-center gap-2 flex-wrap">
      {options?.sort?.items?.length && <Sort {...options.sort} />}
      {options?.selectableItems && (
        <div className="lg:hidden">
          <SelectAll
            toggleSelectAll={toggleSelectAll}
            checked={!!selectedRows?.length}
          />
        </div>
      )}
      {options?.actions && (
        <div className="w-full flex justify-center lg:w-auto">
          <Actions actions={options.actions} selectedRows={selectedRows} />
        </div>
      )}
    </header>
  ) : null;
};

export default Toolbar;
