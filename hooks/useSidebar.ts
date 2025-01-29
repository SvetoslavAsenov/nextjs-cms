import { useContext } from "react";
import { SidebarContext } from "@/providers/sidebarProvider";

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};
