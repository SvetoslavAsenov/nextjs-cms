import React, { createContext, useEffect, useState } from "react";
import { getValue, setValue } from "@/utils/localstorage";
import { SIDEBAR_OPENED_KEY } from "@/constants/localStorage";

type OpenCloseToggle = () => void;

type SidebarContextProps = {
  isOpen: boolean;
  open: OpenCloseToggle;
  close: OpenCloseToggle;
  toggle: OpenCloseToggle;
};

type LocalStorageIsOpened = {
  value: boolean;
};

export type SidebarProviderProps = {
  children: React.ReactNode;
};

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const isSsr = typeof window === "undefined";

  useEffect(() => {
    if (!isSsr) {
      const openStorageResult = getValue(
        SIDEBAR_OPENED_KEY
      ) as LocalStorageIsOpened;
      setIsOpen(!!openStorageResult?.value);
    }
  }, [isSsr]);

  const setState = (value: boolean) => {
    setValue(SIDEBAR_OPENED_KEY, { value });
    setIsOpen(value);
  };

  const open = () => setState(true);
  const close = () => setState(false);
  const toggle = () => setState(!isOpen);

  return (
    <SidebarContext value={{ isOpen, open, close, toggle }}>
      {children}
    </SidebarContext>
  );
};
