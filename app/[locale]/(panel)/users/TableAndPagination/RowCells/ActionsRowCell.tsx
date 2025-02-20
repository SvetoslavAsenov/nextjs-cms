"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";

import type { Row } from "@/components/DataTable";

type ActionsRowCellProps = {
  row: Row;
};

const ActionsRowCell: React.FC<ActionsRowCellProps> = ({ row }) => {
  return (
    <div className="flex gap-1 lg:justify-end">
      {row.options?.rowActions?.includes("update") && (
        <Pencil className="cursor-pointer hover:text-primary" />
      )}
      {row.options?.rowActions?.includes("delete") && (
        <Trash2 className="cursor-pointer hover:text-primary" />
      )}
    </div>
  );
};

export default ActionsRowCell;
