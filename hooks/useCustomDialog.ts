import { useContext } from "react";
import { CustomDialogContext } from "@/providers/customDialogProvider";

export const useCustomDialog = () => {
  const context = useContext(CustomDialogContext);
  if (!context) {
    throw new Error(
      "useCustomDialog must be used within a CustomDialogProvider"
    );
  }
  return context;
};
