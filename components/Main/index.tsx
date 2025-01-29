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
        transition-margin overflow-auto${
          isOpen
            ? " lg:ml-[var(--sidebar-width)] lg:after:hidden after:content-[' '] after:w-screen after:h-screen after:fixed after:top-0 after:left-0 after:block after:bg-foreground/85"
            : " lg:ml-[var(--sidebar-icons-width)]"
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
