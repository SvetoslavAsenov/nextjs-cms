"use client";

import Sort from "./Sort";

import type { TableOptionsActions, TableOptionsSort } from "..";

type ToolbarProps = {
  actions?: TableOptionsActions;
  sort?: TableOptionsSort;
};

const Toolbar = ({ actions, sort }: ToolbarProps) => {
  return (
    <div className="bg-foreground p-1 select-none">
      {sort && <Sort {...sort} />}
    </div>
  );
};

export default Toolbar;
