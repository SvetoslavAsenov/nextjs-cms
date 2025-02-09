"use client";

import DataTable from "@/components/DataTable";
import { ListPlus, Trash2, Eye, EyeOff } from "lucide-react";

import type { Row, TableOptions } from "@/components/DataTable";

const userRows = [
  {
    data: { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    options: {
      selectable: true,
      selectedTableActions: ["delete"],
    },
  },
  {
    data: { id: 2, name: "Bob Smith", email: "bob@example.com" },
    options: { selectable: true, selectedTableActions: ["publish"] },
  },
  {
    data: { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
    options: { selectable: true, selectedTableActions: ["unpublish"] },
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
  actions: {
    unpublish: {
      title: "Unpublish",
      type: "action",
      icon: <EyeOff />,
      shown: "onselect",
      onAction: (items) => {
        console.log(items);
      },
    },
    publish: {
      title: "Publish",
      type: "action",
      icon: <Eye />,
      shown: "onselect",
      onAction: (items) => {
        console.log(items);
      },
    },
    delete: {
      title: "Delete",
      type: "action",
      icon: <Trash2 />,
      shown: "onselect",
      onAction: (items) => {
        console.log(items);
      },
    },
    add: {
      title: "Add",
      type: "link",
      icon: <ListPlus />,
      shown: "always",
      href: "/users",
    },
  },
  sort: {
    sortedByKey: "putkatati",
    sortedDirection: "asc",
    items: [
      { label: "kur", sortKey: "kurami" },
      { label: "putka", sortKey: "putkatati" },
    ],
    onSort: (sortKey, sortDirection) => {
      alert(sortKey + " " + sortDirection);
    },
  },
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
