import React from "react";
import Item from "./Item";

type CommonMenuProps = {
  children: React.ReactElement<typeof Item> | React.ReactElement<typeof Item>[];
};

type ChildMenuProps = CommonMenuProps & {
  isChild: boolean;
  shown?: never;
};

type NotAChildMenuProps = CommonMenuProps & {
  shown: boolean;
  isChild?: never;
};

type MenuProps = NotAChildMenuProps | ChildMenuProps;

const Menu = ({ shown, isChild, children }: MenuProps) => {
  const isChildClasses = "border-l border-l-foreground-mutted w-max";
  const isNotAChildClasses = `absolute shadow top-full right-0 p-1 bg-background w-max${
    !shown ? " hidden" : ""
  }`;

  return (
    <ul className={isChild ? isChildClasses : isNotAChildClasses}>
      {children}
    </ul>
  );
};

export { Menu, Item };
