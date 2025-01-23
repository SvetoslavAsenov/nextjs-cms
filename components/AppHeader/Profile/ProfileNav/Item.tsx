import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type ButtonItemProps = {
  variant: "button";
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  handler: React.MouseEventHandler<HTMLButtonElement>;
  href?: never;
  children?: never;
};

type LinkItemProps = {
  variant: "link";
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href: string;
  handler?: never;
  children?: never;
};

type ParentItemProps = {
  variant: "parent";
  label: string;
  icon?: never;
  children: React.ReactNode;
  handler?: never;
  href?: never;
};

type ItemProps = LinkItemProps | ButtonItemProps | ParentItemProps;

const activeElementClasses =
  "w-full flex justify-between items-center hover:bg-secondary p-1";

const Item = ({
  variant,
  label,
  icon: Icon,
  handler,
  href,
  children,
}: ItemProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [childMaxHeight, setChildMaxHeight] = useState(300);
  const labelSpan = <span className="mr-3 text-foreground">{label}</span>;
  const icon = Icon && <Icon className="w-4 h-4 text-foreground" />;
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childRef?.current) {
      setChildMaxHeight(childRef.current.getBoundingClientRect().height);
    }
  }, [children]);

  return (
    <li
      className={`flex w-full min-w-[8rem]${
        variant === "parent" ? " relative flex-col" : ""
      }`}
    >
      {variant === "button" && (
        <button onClick={handler} className={activeElementClasses}>
          {labelSpan}
          {icon}
        </button>
      )}
      {variant === "link" && (
        <Link className={activeElementClasses} href={href}>
          {labelSpan}
          {icon}
        </Link>
      )}
      {variant === "parent" && (
        <>
          <button
            onClick={() => setIsOpened((prev) => !prev)}
            className={activeElementClasses}
          >
            {labelSpan}
            <ChevronDown
              className={`w-4 h-4 transition duration-300 text-foreground${
                isOpened ? " rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300`}
            style={{ maxHeight: isOpened ? `${childMaxHeight}px` : "0" }}
          >
            <div ref={childRef}>{children}</div>
          </div>
        </>
      )}
    </li>
  );
};

export default Item;
