"use client";

import React from "react";

type RowOptions = {
  disableSelection?: boolean;
};

export type Row<TData = Record<string, unknown>> = {
  data: TData;
  options: RowOptions;
};

type TableActionLink = {
  type: "link";
  icon: React.ReactElement;
  href: string;
  action: never;
};

type ActionCta<TData = Record<string, unknown>> = (params: {
  items: Row<TData>[];
}) => void;

type TableActionCta<TData = Record<string, unknown>> = {
  type: "action";
  icon: React.ReactElement;
  action: ActionCta<TData>;
  href: never;
};

type TableAction<TData = Record<string, unknown>> =
  | TableActionLink
  | TableActionCta<TData>;

export type TableOptions<TData = Record<string, unknown>> = {
  selectable?: boolean;
  orderable?: boolean;
  actions?: TableAction<TData>[];
};

export type Column<TData = Record<string, unknown>> = {
  columnKey: string;
  header: React.ReactElement;
  cell: (row: TData) => React.ReactElement;
};

type DataTableProps<TData = Record<string, unknown>> = {
  options?: TableOptions<TData>;
  columns: Column<TData>[];
  rows: Row<TData>[];
};

const DataTable = <TData,>({
  columns,
  rows,
  options,
}: DataTableProps<TData>) => {
  return (
    <table>
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
              <td key={col.columnKey}>{col.cell(row.data)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
