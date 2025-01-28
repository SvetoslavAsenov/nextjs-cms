"use client";

import { useSidebar } from "@/hooks/useSidebar";
import Header from "./Header";

const Sidebar = () => {
  const { isOpen } = useSidebar();
  return (
    <aside
      className={`fixed 
        shadow
        top-[var(--header-height) 
        left-0 h-[calc(100vh-var(--header-height))] 
        bg-background 
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
    >
      <Header />
    </aside>
  );
};

export default Sidebar;
