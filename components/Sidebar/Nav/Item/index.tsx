import Link from "next/link";

import type { ItemType } from "..";

type ItemProps = {
  data: ItemType;
  isActive: boolean;
};

const Item = ({ data, isActive }: ItemProps) => {
  const { label, path, icon: Icon } = data;
  const nonActiveClasses = " hover:bg-muted hover:text-primary";
  const activeClasses = " cursor-default bg-foreground text-background";

  return (
    <li key={label} title={data.label} className="flex w-full">
      <Link
        href={path}
        className={`flex w-full p-[0.625rem]${
          !isActive ? nonActiveClasses : activeClasses
        }`}
      >
        <Icon className="mr-[1rem] w-[1.75rem] h-auto shrink-0" />
        <span>{data.label}</span>
      </Link>
    </li>
  );
};

export default Item;
