import { useContext } from "react";
import { LocaleContext } from "@/providers/localeProvider";

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
