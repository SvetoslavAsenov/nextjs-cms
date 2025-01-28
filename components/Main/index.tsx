"use client";

import React from "react";
import { useSidebar } from "@/hooks/useSidebar";

type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  const { isOpen } = useSidebar();

  return (
    <main
      className={`bg-muted 
        min-h-[calc(100vh-var(--header-height))] 
        mt-[var(--header-height)] 
        transition-margin ${
          isOpen
            ? " ml-[var(--sidebar-width)]"
            : " ml-[var(--sidebar-icons-width)]"
        }`}
      // According to Tailwind's documentation,
      // transition-duration should support CSS variables,
      // but in practice, it doesn't always apply them correctly.
      // Use inline styles as a workaround.
      style={{
        transitionDuration: "var(--sidebar-transition-duration)",
      }}
    >
      {children}
    </main>
  );
};

export default Main;
