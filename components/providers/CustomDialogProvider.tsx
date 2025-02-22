"use client";

import React from "react";
import { CustomDialogProvider as Provider } from "@/providers/customDialogProvider";

type CustomDialogProviderProps = {
  children: React.ReactNode;
};

const CustomDialogProvider = ({ children }: CustomDialogProviderProps) => {
  return <Provider>{children}</Provider>;
};

export default CustomDialogProvider;
