"use client";

import DataTable from "@/components/DataTable";
import { ListPlus, Trash2, Eye, EyeOff } from "lucide-react";

import type { Row, TableOptions } from "@/components/DataTable";

const userRows = [
  {
    data: {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      published: false,
    },
    options: {
      selectable: true,
      selectedTableActions: ["delete", "publish"],
    },
  },
  {
    data: {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      published: true,
    },
    options: {
      selectable: true,
      selectedTableActions: ["delete", "unpublish"],
    },
  },
  {
    data: {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      published: true,
    },
    options: {
      selectable: true,
      selectedTableActions: ["delete", "unpublish"],
    },
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
    header: {
      label: "ID",
      element: <p className="text-center">ID</p>,
    },
    cell: (row: Row) => (
      <div className="w-full lg:text-center">{row.data.id as number}</div>
    ),
  },
  {
    columnKey: "name",
    header: { label: "Name" },
    cell: (row: Row) => <span>{row.data.name as string}</span>,
  },
  {
    columnKey: "email",
    header: { label: "Email" },
    cell: (row: Row) => <span>{row.data.email as string}</span>,
  },
  {
    columnKey: "actions",
    header: {
      label: "Actions",
      element: <p className="text-right">Actions</p>,
    },
    cell: (row: Row) => {
      return (
        <div className="flex gap-1 lg:justify-end">
          {row.data.published ? (
            <EyeOff className="cursor-pointer hover:text-primary" />
          ) : (
            <Eye className="cursor-pointer hover:text-primary" />
          )}
          <Trash2 className="cursor-pointer hover:text-primary" />
        </div>
      );
    },
  },
];

const userTableOptions: TableOptions = {
  selectableItems: true,
  gridColumns: "2.5rem 4rem repeat(2, minmax(6rem, 1fr)) 6.1rem",
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
