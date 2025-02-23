import { ChevronUp, ChevronDown } from "lucide-react";

import type { SortDirectionOptions } from "@/components/DataTable";
import type { ToggleSortDirection } from "..";

const SortDirection = ({
  sortedDirection,
  toggleSortDirection,
}: {
  sortedDirection: SortDirectionOptions;
  toggleSortDirection: ToggleSortDirection;
}) => {
  const chevronsClasses = "w-3 rounded-[0.125rem]";
  const activeChevronClasses = " bg-background";
  const inactiveChevronClasses = " text-background group-hover:bg-primary";

  return (
    <div
      className="flex flex-col h-[1.5rem] cursor-pointer px-1 group"
      onClick={toggleSortDirection}
    >
      <ChevronUp
        className={
          chevronsClasses +
          (sortedDirection === "asc"
            ? activeChevronClasses
            : inactiveChevronClasses)
        }
      />
      <ChevronDown
        className={
          chevronsClasses +
          (sortedDirection === "desc"
            ? activeChevronClasses
            : inactiveChevronClasses)
        }
      />
    </div>
  );
};

export default SortDirection;
