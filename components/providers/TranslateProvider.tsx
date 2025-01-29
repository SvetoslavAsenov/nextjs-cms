import React from "react";
import { TranslateProvider as Provider } from "@/providers/translateProvider";

type TranslateProviderProps = {
  children: React.ReactNode;
};

const TranslateProvider = ({ children }: TranslateProviderProps) => {
  return <Provider>{children}</Provider>;
};

export default TranslateProvider;
