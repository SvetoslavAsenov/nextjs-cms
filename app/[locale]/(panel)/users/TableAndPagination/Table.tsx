"use client";

import DataTable from "@/components/DataTable";
import { useTranslate } from "@/hooks/useTranslate";
import { Trash2, ListPlus } from "lucide-react";
import CommonRowCell from "./RowCells/CommonRowCell";
import ActionsRowCell from "./RowCells/ActionsRowCell";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { useDeleteUsersAction } from "../Hooks/useDeleteUsersAction";
import permissions from "@/config/authorization/permissions";

import type { TableOptions } from "@/components/DataTable";
import type {
  UserRecordWithRole,
  PaginatedRecordsReturn,
} from "@/models/UserModel";
import type { Row } from "@/components/DataTable";

type TableProps = {
  users: PaginatedRecordsReturn;
  defaultSortedBy: string;
  defaultSortedDirection: "asc" | "desc";
};

const Table = ({
  users,
  defaultSortedBy,
  defaultSortedDirection,
}: TableProps) => {
  const { translate } = useTranslate();
  const { canAccess, hierarchy: loggedUserHierarchy } = usePermissions();
  const { user: loggedUser } = useAuth();
  const { deleteUsers } = useDeleteUsersAction();

  const getActions = (user: UserRecordWithRole) => {
    const rowActions = [];
    const selectedTableActions = [];

    // Is the hierarchy of the logged in user higher than the current row user
    const loggedHasHigherHierarchyRole =
      (!user?.Role?.hierarchy && user?.Role?.hierarchy !== 0) ||
      loggedUserHierarchy < user?.Role?.hierarchy;

    // Does the current row represent the logged in user
    const isRowOfTheLoggedUser = loggedUser && loggedUser.id === user.id;

    // To update users, needs access to users.update.
    // Can edit its own profile and profiles of other users with a lower hierarchy role.
    if (
      isRowOfTheLoggedUser ||
      (canAccess(permissions.users.update) && loggedHasHigherHierarchyRole)
    ) {
      rowActions.push("update");
    }

    // To delete users, needs access to users.delete.
    // Can delete users with a lower hierarchy role.
    // Can't delete its own user.
    if (
      !isRowOfTheLoggedUser &&
      loggedHasHigherHierarchyRole &&
      canAccess(permissions.users.delete)
    ) {
      rowActions.push("delete");
      selectedTableActions.push("delete");
    }

    return {
      rowActions,
      selectedTableActions,
    };
  };

  const userColumns = [
    {
      columnKey: "email",
      header: { label: translate("email") },
      cell: (row: Row) => {
        const user = row.data as UserRecordWithRole;
        return <CommonRowCell>{user.email}</CommonRowCell>;
      },
    },
    {
      columnKey: "role",
      header: { label: translate("role") },
      cell: (row: Row) => {
        const user = row.data as UserRecordWithRole;
        return <CommonRowCell>{user?.Role?.name}</CommonRowCell>;
      },
    },
    {
      columnKey: "createdAt",
      header: {
        label: translate("createdAt"),
        element: <p className="text-center w-full">{translate("createdAt")}</p>,
      },
      cell: (row: Row) => {
        const user = row.data as UserRecordWithRole;
        return (
          <CommonRowCell className="text-center w-full">
            {`${user.createdAt.getDate()}.${
              user.createdAt.getMonth() + 1
            }.${user.createdAt.getFullYear()}`}
          </CommonRowCell>
        );
      },
    },
    {
      columnKey: "actions",
      header: {
        label: translate("actions"),
        element: <p className="text-right">{translate("actions")}</p>,
      },
      cell: (row: Row) => {
        return (
          <ActionsRowCell row={row as Row & { data: UserRecordWithRole }} />
        );
      },
    },
  ];

  const userTableOptions: TableOptions = {
    selectableItems: true,
    gridColumns: "2.5rem minmax(6rem, 1fr) 10rem 10rem 6.125rem",
    actions: {
      delete: {
        title: "Delete",
        type: "action",
        icon: <Trash2 />,
        shown: "onselect",
        onAction: async (items) => {
          if (items?.length) {
            const usersArr = items?.map((item) => {
              const user = item.data as UserRecordWithRole;
              return {
                [user.id]:
                  typeof user?.Role?.hierarchy === "number"
                    ? user.Role.hierarchy
                    : Infinity,
              };
            });
            await deleteUsers(usersArr);
          }
        },
      },
      ...(canAccess(permissions.users.create)
        ? {
            add: {
              title: "Add",
              type: "link",
              icon: <ListPlus />,
              shown: "always",
              href: "/users/create",
            },
          }
        : {}),
    },
    sort: {
      type: "query_param",
      defaultSortedBy,
      defaultSortedDirection,
      items: [
        { label: translate("email"), sortKey: "email" },
        { label: translate("role"), sortKey: "Role.name" },
        { label: translate("createdAt"), sortKey: "createdAt" },
      ],
    },
  };

  const rows: Row[] = users.data.map((user) => ({
    data: user,
    options: {
      selectable: true,
      ...getActions(user),
    },
  }));

  return (
    <DataTable columns={userColumns} options={userTableOptions} rows={rows} />
  );
};

export default Table;
