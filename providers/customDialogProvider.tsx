"use client";

import React, { useState, createContext } from "react";
import CustomDialog from "@/components/CustomDialog";

import type { CustomDialogProps } from "@/components/CustomDialog";

type ShowProps = Omit<CustomDialogProps, "shown">;

type CustomDialogContextProps = {
  show: (props: ShowProps) => void;
  close: () => void;
  shown: boolean;
};

type CustomDialogProviderProps = {
  children: React.ReactNode;
};

export const CustomDialogContext = createContext<
  CustomDialogContextProps | undefined
>(undefined);

export const CustomDialogProvider = ({
  children,
}: CustomDialogProviderProps) => {
  const [dialogProps, setDialogProps] = useState<
    CustomDialogProps | undefined
  >();

  const show = (props: ShowProps) => {
    setDialogProps({ ...props, open: true } as CustomDialogProps);
  };

  const close = () => {};

  return (
    <CustomDialogContext value={{ shown: !!dialogProps?.open, show, close }}>
      {dialogProps && <CustomDialog {...dialogProps} />}
      {children}
    </CustomDialogContext>
  );
};
