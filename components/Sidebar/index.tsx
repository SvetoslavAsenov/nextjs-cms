"use client";

import { useSidebar } from "@/hooks/useSidebar";

const Sidebar = () => {
  const { isOpen, toggle } = useSidebar();
  return (
    <div
      onClick={toggle}
      className={`fixed 
        top-[var(--header-height) 
        left-0 h-[calc(100vh-var(--header-height))] 
        bg-red-500 
        transition-width ${
          isOpen
            ? " w-[var(--sidebar-width)]"
            : " w-[var(--sidebar-icons-width)]"
        }`}
      // According to Tailwind's documentation,
      // transition-duration should support CSS variables,
      // but in practice, it doesn't always apply them correctly.
      // Use inline styles as a workaround.
      style={{
        transitionDuration: "var(--sidebar-transition-duration)",
      }}
    ></div>
  );
};

export default Sidebar;
