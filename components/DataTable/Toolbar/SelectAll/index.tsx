import { ToggleSelectAll } from "../..";

type SelectAllProps = {
  toggleSelectAll?: ToggleSelectAll;
  checked?: boolean;
};

const SelectAll = ({ toggleSelectAll, checked }: SelectAllProps) => {
  return (
    <div className="flex justify-center items-center bg-muted">
      <input
        className="cursor-pointer w-4 h-4"
        type="checkbox"
        checked={checked}
        onChange={toggleSelectAll}
      />
    </div>
  );
};

export default SelectAll;
