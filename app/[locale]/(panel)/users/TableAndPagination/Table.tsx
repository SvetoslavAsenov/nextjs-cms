"use client";

import { User } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useTranslate } from "@/hooks/useTranslate";
import { Pencil, Trash2, ListPlus } from "lucide-react";

import type { Row, TableOptions } from "@/components/DataTable";

type TableProps = {
  users: (Omit<User, "createdAt"> & { roleName: string; createdAt: string })[];
  defaultSortedBy: string;
  defaultSortedDirection: "asc" | "desc";
};

const Table = ({
  users,
  defaultSortedBy,
  defaultSortedDirection,
}: TableProps) => {
  const { translate } = useTranslate();
  const userColumns = [
    {
      columnKey: "email",
      header: { label: translate("email") },
      cell: (row: Row) => <span>{row.data.email as string}</span>,
    },
    {
      columnKey: "name",
      header: { label: translate("name") },
      cell: (row: Row) => <span>{row.data.name as string}</span>,
    },
    {
      columnKey: "role",
      header: { label: translate("role") },
      cell: (row: Row) => <span>{row.data.roleName as string}</span>,
    },
    {
      columnKey: "createdAt",
      header: {
        label: translate("createdAt"),
        element: <p className="text-center w-full">{translate("createdAt")}</p>,
      },
      cell: (row: Row) => (
        <p className="text-center w-full">{row.data.createdAt as string}</p>
      ),
    },
    {
      columnKey: "actions",
      header: {
        label: translate("actions"),
        element: <p className="text-right">{translate("actions")}</p>,
      },
      cell: () => {
        return (
          <div className="flex gap-1 lg:justify-end">
            <Pencil className="cursor-pointer hover:text-primary" />
            <Trash2 className="cursor-pointer hover:text-primary" />
          </div>
        );
      },
    },
  ];

  const userTableOptions: TableOptions = {
    selectableItems: true,
    gridColumns: "2.5rem repeat(2, minmax(6rem, 1fr)) 10rem 10rem 6.1rem",
    actions: {
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
      type: "query_param",
      defaultSortedBy,
      defaultSortedDirection,
      items: [
        { label: translate("name"), sortKey: "name" },
        { label: translate("email"), sortKey: "email" },
        { label: translate("role"), sortKey: "Role.name" },
        { label: translate("email"), sortKey: "email" },
        { label: translate("createdAt"), sortKey: "createdAt" },
      ],
    },
  };

  const rows = users.map((user) => {
    return {
      data: {
        ...user,
      },
      options: {
        selectable: true,
        selectedTableActions: ["delete"],
      },
    };
  });

  return (
    <DataTable columns={userColumns} options={userTableOptions} rows={rows} />
  );
};

export default Table;
