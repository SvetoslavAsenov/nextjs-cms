import Header from "./Header";
import Rows from "./Rows";

import type {
  DataTableProps,
  SelectedRows,
  ToggleSelectAll,
  ToggleSelectRow,
} from "..";

type TableProps = Omit<DataTableProps, "options"> & {
  selectableItems: boolean;
  selectedRows?: SelectedRows;
  toggleSelectAll?: ToggleSelectAll;
  toggleSelectRow?: ToggleSelectRow;
  gridColumns?: string;
};

const Table = ({
  columns,
  rows,
  selectableItems,
  selectedRows,
  toggleSelectAll,
  toggleSelectRow,
  gridColumns,
}: TableProps) => {
  return (
    <section className="flex flex-col gap-6 lg:gap-0">
      <Header
        columns={columns}
        selectableItems={selectableItems}
        checked={!!selectedRows?.length}
        toggleSelectAll={toggleSelectAll}
        gridColumns={gridColumns}
      />

      {rows && (
        <Rows
          rows={rows}
          columns={columns}
          selectableItems={selectableItems}
          selectedRows={selectedRows}
          toggleSelectRow={toggleSelectRow}
          gridColumns={gridColumns}
        />
      )}
    </section>
  );
};

export default Table;
