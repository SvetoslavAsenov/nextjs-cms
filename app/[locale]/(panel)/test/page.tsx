"use client";

import DataTable from "@/components/DataTable";
import type { Row, TableOptions } from "@/components/DataTable";

const userRows = [
  {
    data: { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    options: {
      selectable: true,
      selectedTableActions: ["kur"],
    },
  },
  { data: { id: 2, name: "Bob Smith", email: "bob@example.com" }, options: {} },
  {
    data: { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  },
  {
    data: { id: 4, name: "David White", email: "david@example.com" },
  },
  {
    data: { id: 5, name: "Emma Davis", email: "emma@example.com" },
  },
];

const userColumns = [
  {
    columnKey: "id",
    header: <span>ID</span>,
    cell: (row: Row) => <span>{row.data.id as number}</span>,
  },
  {
    columnKey: "name",
    header: <span>Name</span>,
    cell: (row: Row) => <span>{row.data.name as string}</span>,
  },
  {
    columnKey: "email",
    header: <span>Email</span>,
    cell: (row: Row) => <span>{row.data.email as string}</span>,
  },
];

const userTableOptions: TableOptions = {
  actions: {},
};

export default function Test() {
  return (
    <DataTable
      columns={userColumns}
      rows={userRows}
      options={userTableOptions}
    />
  );
}
