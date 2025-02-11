"use client";

import { useEffect, useState } from "react";

import type { Row, Column, SelectedRows, ToggleSelectRow } from "../..";
type RowsProps = {
  rows: Row[];
  columns: Column[];
  selectableItems: boolean;
  selectedRows?: SelectedRows;
  toggleSelectRow?: ToggleSelectRow;
  gridColumns?: string;
};

const Rows = ({
  rows,
  columns,
  selectableItems,
  selectedRows,
  toggleSelectRow,
  gridColumns,
}: RowsProps) => {
  const [selectedRowsIds, setSelectedRowsIds] = useState<string[]>();

  const gridTemplateColumns =
    gridColumns ||
    `${selectableItems ? "2.5rem " : ""}repeat(${
      columns.length
    }, minmax(6rem, 1fr))`;

  useEffect(() => {
    if (selectableItems && selectedRows) {
      const ids = selectedRows.map((r) => r.data.id as string);
      setSelectedRowsIds(ids);
    }
  }, [selectedRows, selectableItems]);

  return (selectableItems && selectedRowsIds) || !selectableItems ? (
    <>
      {rows.map((row, index) => {
        const selected = selectedRowsIds?.includes(row.data.id as string);
        return (
          <article
            key={index}
            className={`select-none 
              hover:shadow 
              flex 
              flex-col 
              shadow
              relative
              pt-[1.5rem]
              rounded-lg
              overflow-hidden
              ${
                !selected ? (index % 2 ? " bg-muted/50" : "") : " bg-primary/10"
              }
            lg:grid lg:border-0 lg:pt-0 lg:shadow-none lg:rounded-none`}
            style={{
              gridTemplateColumns,
            }}
          >
            {/* Add the checkbox column if selectableItems is true */}
            {selectableItems && (
              <div
                className={`flex 
                  justify-center 
                  items-center 
                  border-[0.03125rem] 
                  border-solid 
                  border-muted
                  absolute
                  top-0
                  left-0
                  h-[1.5rem]
                  w-full
                  bg-primary/20
                  lg:static
                  lg:h-auto
                  lg:bg-transparent`}
              >
                <input
                  className="cursor-pointer w-4 h-4"
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleSelectRow?.(row)}
                />
              </div>
            )}

            {columns.map((col, i) => (
              <div
                key={i}
                className={`overflow-hidden 
                  p-2 
                  border-[0.03125rem] 
                  border-solid 
                  border-muted 
                  before:content-[attr(data-label)]
                  before:block
                  before:font-bold
                  lg:before:hidden`}
                data-label={col.header.label}
              >
                {col.cell(row)}
              </div>
            ))}
          </article>
        );
      })}
    </>
  ) : null;
};

export default Rows;
