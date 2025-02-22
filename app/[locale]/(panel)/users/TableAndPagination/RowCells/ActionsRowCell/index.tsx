"use client";

import React from "react";
import Delete from "./Delete";
import Update from "./Update";

import type { Row } from "@/components/DataTable";

type ActionsRowCellProps = {
  row: Row;
};

const ActionsRowCell: React.FC<ActionsRowCellProps> = ({ row }) => {
  return (
    <div className="flex gap-1 lg:justify-end">
      {row.options?.rowActions?.includes("update") && (
        <Update id={row.data.id.toString()} />
      )}
      {row.options?.rowActions?.includes("delete") && (
        <Delete id={row.data.id.toString()} />
      )}
    </div>
  );
};

export default ActionsRowCell;
