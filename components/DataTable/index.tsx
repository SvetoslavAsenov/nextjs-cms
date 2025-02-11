"use client";

import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Table from "./Table";

type RowOptions = {
  selectable?: boolean;
  selectedTableActions?: string[];
};

export type Row = {
  data: Record<string, unknown> & { id: string };
  options?: RowOptions;
};

type TableActionLink = {
  type: "link";
  href: string;
  onAction?: never;
};

export type SelectedRows = Row[];

type ActionCtaHandler = (items?: SelectedRows) => void;

type TableActionCta = {
  type: "action";
  onAction: ActionCtaHandler;
  href?: never;
};

type TableAction = (TableActionLink | TableActionCta) & {
  title: string;
  shown: "always" | "onselect";
  icon: React.ReactNode;
};

export type TableOptionsActions = Record<string, TableAction>;

type TableOptionsSortItem = {
  sortKey: string;
  label: string;
};

export type TableOptionsSort = {
  sortedByKey: string;
  sortedDirection: "asc" | "desc";
  items: TableOptionsSortItem[];
  onSort: (sortKey: string, direction: "asc" | "desc") => void;
};

export type TableOptions = {
  actions?: TableOptionsActions;
  sort?: TableOptionsSort;
  selectableItems?: boolean;
  gridColumns?: string;
};

export type Column = {
  columnKey: string;
  header: {
    label: string;
    element?: React.ReactElement;
  };
  cell: (row: Row) => React.ReactElement;
};

export type DataTableProps = {
  options?: TableOptions;
  columns: Column[];
  rows: Row[];
};

export type ToggleSelectAll = () => void;
export type ToggleSelectRow = (targetRow: Row) => void;

const DataTable = ({ columns, rows, options }: DataTableProps) => {
  const [selectedRows, setSelectedRows] = useState<SelectedRows>([]);

  const toggleSelectAll: ToggleSelectAll = () => {
    const selected = selectedRows.length ? [] : rows;
    setSelectedRows(selected);
  };

  const toggleSelectRow: ToggleSelectRow = (targetRow) => {
    const newArr = selectedRows.filter((r) => r.data.id !== targetRow.data.id);
    if (newArr.length === selectedRows.length) {
      newArr.push(targetRow);
    }
    setSelectedRows(newArr);
  };

  return (
    <section className="w-full flex flex-col gap-1">
      {options && (
        <Toolbar
          options={options}
          selectedRows={selectedRows}
          toggleSelectAll={toggleSelectAll}
        />
      )}
      <Table
        columns={columns}
        rows={rows}
        selectableItems={!!options?.selectableItems}
        selectedRows={selectedRows}
        toggleSelectAll={toggleSelectAll}
        toggleSelectRow={toggleSelectRow}
        gridColumns={options?.gridColumns}
      />
    </section>
  );
};

export default DataTable;
