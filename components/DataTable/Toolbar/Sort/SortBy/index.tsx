import type { TableOptionsSort } from "@/components/DataTable";
import type { UpdateSortBy } from "..";

const SortBy = ({
  sortedByKey,
  items,
  id,
  updateSortBy,
}: TableOptionsSort & {
  id: string;
  updateSortBy: UpdateSortBy;
}) => {
  return (
    <select
      name="sort"
      id={id}
      className="bg-background p-0.5"
      value={sortedByKey}
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
