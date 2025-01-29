import Link from "next/link";
import { useTranslate } from "@/hooks/useTranslate";

import type { ItemType } from "..";

type ItemProps = {
  data: ItemType;
  isActive: boolean;
};

const Item = ({ data, isActive }: ItemProps) => {
  const { label, path, icon: Icon } = data;
  const { translate } = useTranslate();
  const nonActiveClasses = " hover:bg-muted hover:text-primary";
  const activeClasses = " cursor-default bg-foreground text-background";

  return (
    <li key={label} className="flex w-full">
      <Link
        href={path}
        className={`flex w-full p-[0.625rem]${
          !isActive ? nonActiveClasses : activeClasses
        }`}
      >
        <Icon className="mr-[1rem] w-[1.75rem] h-auto shrink-0" />
        <span>{translate(label)}</span>
      </Link>
    </li>
  );
};

export default Item;
