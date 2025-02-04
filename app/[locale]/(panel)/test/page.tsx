"use client";

import DataTable from "@/components/DataTable";
import type { Row, Column, TableOptions } from "@/components/DataTable";

type User = {
  id: number;
  name: string;
  email: string;
};

const userRows: Row<User>[] = [
  {
    data: { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    options: {},
  },
  { data: { id: 2, name: "Bob Smith", email: "bob@example.com" }, options: {} },
  {
    data: { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
    options: {},
  },
  {
    data: { id: 4, name: "David White", email: "david@example.com" },
    options: {},
  },
  {
    data: { id: 5, name: "Emma Davis", email: "emma@example.com" },
    options: {},
  },
];

const userColumns: Column<User>[] = [
  {
    columnKey: "id",
    header: <span>ID</span>,
    cell: (data) => <span>{data.id}</span>,
  },
  {
    columnKey: "name",
    header: <span>Name</span>,
    cell: (data) => <span>{data.name}</span>,
  },
  {
    columnKey: "email",
    header: <span>Email</span>,
    cell: (data) => <span>{data.email}</span>,
  },
];

const userTableOptions: TableOptions<User> = {
  selectable: true,
  orderable: true,
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
