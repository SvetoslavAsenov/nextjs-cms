"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import type { TableOptionsActions, SelectedRows } from "../..";
type ActionsProps = {
  actions: TableOptionsActions;
  selectedRows?: SelectedRows;
};

const getSelectedItemsActions = (selectedRows: SelectedRows) => {
  let actionKeys: string[] = [];

  for (const row of selectedRows) {
    if (
      row?.options?.selectable &&
      row?.options?.selectedTableActions?.length
    ) {
      actionKeys = [
        ...new Set([...actionKeys, ...row.options.selectedTableActions]),
      ];
    }
  }

  return actionKeys;
};

const Actions = ({ actions, selectedRows }: ActionsProps) => {
  const [selectedRowsActions, setSelectedRowsActions] = useState<string[]>([]);

  useEffect(() => {
    if (selectedRows) {
      const actionsFromSelectedRows = getSelectedItemsActions(selectedRows);
      setSelectedRowsActions(actionsFromSelectedRows);
    }
  }, [selectedRows]);

  return typeof actions === "object" && actions !== null ? (
    <div className="flex gap-2">
      {Object.entries(actions || {}).map(([actionKey, data]) => {
        const attributes = {
          className:
            "text-background h-[1.5rem] w-[1.5rem] cursor-pointer hover:text-primary",
          title: data.title,
        };
        if (
          data.shown === "always" ||
          selectedRowsActions.includes(actionKey)
        ) {
          return data.type === "action" ? (
            <div
              key={actionKey}
              {...attributes}
              onClick={() => data.onAction(selectedRows)}
            >
              {data.icon}
            </div>
          ) : (
            <Link key={actionKey} {...attributes} href={data.href}>
              {data.icon}
            </Link>
          );
        }

        return null;
      })}
    </div>
  ) : null;
};

export default Actions;
