"use client";

import React, { useState } from "react";
import Toolbar from "./Toolbar";

type RowOptions = {
  selectable?: boolean;
  selectedTableActions?: string[];
};

export type Row = {
  data: Record<string, unknown>;
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
};

export type Column = {
  columnKey: string;
  header: React.ReactElement;
  cell: (row: Row) => React.ReactElement;
};

type DataTableProps = {
  options?: TableOptions;
  columns: Column[];
  rows: Row[];
};

export type ToggleSelectAll = () => void;

const DataTable = ({ columns, rows, options }: DataTableProps) => {
  const [selectedRows, setSelectedRows] = useState<Row[]>([]);

  const toggleSelectAll: ToggleSelectAll = () => {
    setSelectedRows(selectedRows.length ? [] : rows);
  };

  return (
    <div className="w-full">
      {options && (
        <Toolbar
          options={options}
          selectedRows={selectedRows}
          toggleSelectAll={toggleSelectAll}
          selected={!!selectedRows.length}
        />
      )}
      {/* <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.columnKey}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.columnKey}>{col.cell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default DataTable;
