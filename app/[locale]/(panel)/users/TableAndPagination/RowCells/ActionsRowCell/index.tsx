"use client";

import React from "react";
import Delete from "./Delete";
import Update from "./Update";

import type { Row } from "@/components/DataTable";
import type { UserRecordWithRole } from "@/models/UserModel";

type ActionsRowCellProps = {
  row: Row & {
    data: UserRecordWithRole;
  };
};

const ActionsRowCell: React.FC<ActionsRowCellProps> = ({ row }) => {
  return (
    <div className="flex gap-1 lg:justify-end">
      {row.options?.rowActions?.includes("update") && (
        <Update id={row.data.id.toString()} />
      )}
      {row.options?.rowActions?.includes("delete") && (
        <Delete
          user={{
            [row.data.id]:
              typeof row?.data?.Role?.hierarchy === "number"
                ? row.data.Role.hierarchy
                : Infinity,
          }}
        />
      )}
    </div>
  );
};

export default ActionsRowCell;
