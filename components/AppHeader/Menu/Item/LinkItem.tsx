import Link from "next/link";

import type { LinkItemProps } from ".";

const LinkItem = ({ label, icon: Icon, href }: LinkItemProps) => {
  return (
    <Link
      className="w-full flex justify-between items-center hover:bg-secondary p-1"
      href={href}
    >
      <span className="mr-3 text-foreground">{label}</span>
      {Icon && <Icon className="w-4 h-4 text-foreground" />}
    </Link>
  );
};

export default LinkItem;
