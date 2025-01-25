import React from "react";
import LinkItem from "./LinkItem";
import ButtonItem from "./ButtonItem";
import ParentItem from "./ParentItem";

export type ButtonItemProps = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  handler: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  href?: never;
  children?: never;
};

export type LinkItemProps = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href: string;
  handler?: never;
  children?: never;
  disabled?: never;
};

export type ParentItemProps = {
  label: string;
  icon?: never;
  children: React.ReactNode;
  handler?: never;
  href?: never;
  disabled?: never;
};

type ItemProps =
  | (LinkItemProps & { variant: "link" })
  | (ButtonItemProps & { variant: "button" })
  | (ParentItemProps & { variant: "parent" });

const Item = ({
  variant,
  label,
  icon: Icon,
  handler,
  disabled,
  href,
  children,
}: ItemProps) => {
  return (
    <li
      className={`flex w-full min-w-[8rem]${
        variant === "parent" ? " relative flex-col" : ""
      }`}
    >
      {variant === "button" && (
        <ButtonItem
          label={label}
          icon={Icon}
          handler={handler}
          disabled={disabled}
        />
      )}

      {variant === "link" && <LinkItem href={href} icon={Icon} label={label} />}

      {variant === "parent" && (
        <ParentItem label={label}>{children}</ParentItem>
      )}
    </li>
  );
};

export default Item;
