"use client";

import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import Table from "./Table";
import Spinner from "../Spinner";

type RowOptions = {
  selectable?: boolean;
  rowActions?: string[];
  selectedTableActions?: string[];
};
export type Row = {
  data: Record<string, unknown> & { id: string | number };
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
export type TableOptionsSortItem = {
  sortKey: string;
  label: string;
};
export type TableOptionsSortCommon = {
  items: TableOptionsSortItem[];
};
export type SortDirectionOptions = "asc" | "desc";
type TableOptionsSortQueryParam = {
  type: "query_param";
  defaultSortedBy: string;
  defaultSortedDirection: SortDirectionOptions;
  onSort?: never;
  sortedByKey?: never;
  sortedDirection?: never;
};
type TableOptionsSortAction = {
  type: "action";
  sortedByKey: string;
  sortedDirection: SortDirectionOptions;
  onSort: (sortKey: string, direction: SortDirectionOptions) => void;
  defaultSortedBy?: never;
  defaultSortedDirection?: never;
};
export type TableOptionsSort = TableOptionsSortCommon &
  (TableOptionsSortAction | TableOptionsSortQueryParam);
export type TableOptions = {
  actions?: TableOptionsActions;
  sort?: TableOptionsSort;
  selectableItems?: boolean;
  gridColumns?: string;
  loading?: boolean;
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
  rows?: Row[];
};
export type ToggleSelectAll = () => void;
export type ToggleSelectRow = (targetRow: Row) => void;

const DataTable = ({ columns, rows, options }: DataTableProps) => {
  const [selectedRows, setSelectedRows] = useState<SelectedRows>([]);

  useEffect(() => {
    if (rows) {
      const rowIds = new Set(rows.map((r) => r.data.id));
      const resultArr = selectedRows.filter((sR) => rowIds.has(sR.data.id));
      setSelectedRows(resultArr);
    }
  }, [rows]);

  const toggleSelectAll: ToggleSelectAll = () => {
    const selected = selectedRows.length ? [] : rows || [];
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
    <section className={`w-full flex flex-col gap-1 relative`}>
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
      {options?.loading && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Spinner withOverlay />
        </div>
      )}
    </section>
  );
};

export default DataTable;
