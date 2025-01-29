"use client";

import { useSidebar } from "@/hooks/useSidebar";
import { Menu } from "lucide-react";

const SidebarToggle = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <Menu
      className={`w-[1.5rem] h-[1.5rem] shrink-0 cursor-pointer mr-[0.75rem] lg:hidden${
        isOpen ? " bg-muted" : ""
      }`}
      onClick={toggle}
    />
  );
};

export default SidebarToggle;
