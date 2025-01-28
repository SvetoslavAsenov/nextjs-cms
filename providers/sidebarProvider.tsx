import React, { createContext, useState } from "react";

type OpenCloseToggle = () => void;

type SidebarContextProps = {
  isOpen: boolean;
  open: OpenCloseToggle;
  close: OpenCloseToggle;
  toggle: OpenCloseToggle;
};

export type SidebarProviderProps = {
  children: React.ReactNode;
};

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext value={{ isOpen, open, close, toggle }}>
      {children}
    </SidebarContext>
  );
};
