import type { TableOptionsSortItem } from "@/components/DataTable";
import type { UpdateSortBy } from "..";

const SortBy = ({
  sortBy,
  items,
  id,
  updateSortBy,
}: {
  id: string;
  updateSortBy: UpdateSortBy;
  items: TableOptionsSortItem[];
  sortBy: string;
}) => {
  return (
    <select
      name="sort"
      id={id}
      className="bg-background p-0.5"
      value={sortBy}
      onChange={(ev) => {
        updateSortBy(ev.target.value);
      }}
    >
      {items.map((item, index) => (
        <option value={item.sortKey} key={index}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default SortBy;
