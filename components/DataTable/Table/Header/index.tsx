"use client";

import type { Column, ToggleSelectAll } from "../..";
type HeaderProps = {
  columns: Column[];
  selectableItems: boolean;
  checked?: boolean;
  toggleSelectAll?: ToggleSelectAll;
  gridColumns?: string;
};

const Header = ({
  columns,
  selectableItems,
  checked,
  toggleSelectAll,
  gridColumns,
}: HeaderProps) => {
  const gridTemplateColumns =
    gridColumns ||
    `${selectableItems ? "2.5rem " : ""}repeat(${
      columns.length
    }, minmax(6rem, 1fr))`;

  return (
    <header
      className="hidden lg:grid select-none"
      style={{
        gridTemplateColumns,
      }}
    >
      {/* Add the checkbox column if selectableItems is true */}
      {selectableItems ? (
        <div className="flex justify-center items-center bg-muted">
          <input
            className="cursor-pointer w-4 h-4"
            type="checkbox"
            checked={checked}
            onChange={toggleSelectAll}
          />
        </div>
      ) : null}

      {/* Render the columns */}
      {columns.map((col) => (
        <div key={col.columnKey} className="bg-muted px-2 font-semibold">
          {!col.header.element ? (
            <span>{col.header.label}</span>
          ) : (
            col.header.element
          )}
        </div>
      ))}
    </header>
  );
};

export default Header;
