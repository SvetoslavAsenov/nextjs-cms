"use client";

import { SidebarProvider as Provider } from "@/providers/sidebarProvider";

import type { SidebarProviderProps } from "@/providers/sidebarProvider";

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  return <Provider>{children}</Provider>;
};

export default SidebarProvider;
