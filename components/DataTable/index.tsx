"use client";

import React from "react";
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
  action: never;
};

type ActionCtaHandlerParams = { items: Row[] };

type ActionCtaHandler = (params?: ActionCtaHandlerParams) => void;

type TableActionCta = {
  type: "action";
  onAction: ActionCtaHandler;
  href: never;
};

type TableAction = (TableActionLink | TableActionCta) & {
  icon: React.ReactElement;
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

const DataTable = ({ columns, rows }: DataTableProps) => {
  return (
    <div className="w-full">
      <Toolbar
        sort={{
          sortedByKey: "putkatati",
          sortedDirection: "asc",
          items: [
            { label: "kur", sortKey: "kurami" },
            { label: "putka", sortKey: "putkatati" },
          ],
          onSort: (sortKey, sortDirection) => {
            alert(sortKey + " " + sortDirection);
          },
        }}
      />
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
