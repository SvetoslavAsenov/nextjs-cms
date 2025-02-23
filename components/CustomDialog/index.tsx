import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/shadcn/ui/alert-dialog";
import { useState } from "react";
import { useTranslate } from "@/hooks/useTranslate";

type BaseProps = {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  withOverlay?: boolean;
};

type AlertDialogProps = {
  type: "alert";
  onConfirm?: never;
  cancelText?: never;
  actionText?: never;
  inputPlaceholder?: never;
  onCancel?: never;
};

type ConfirmDialogProps = {
  type: "confirm";
  cancelText: string;
  actionText: string;
  onConfirm: () => void;
  onCancel?: () => void;
  inputPlaceholder?: never;
};

type PromptDialogProps = {
  type: "prompt";
  cancelText: string;
  actionText: string;
  inputPlaceholder: string;
  onConfirm: (value: string) => void;
  onCancel?: () => void;
};

export type CustomDialogProps = BaseProps &
  (AlertDialogProps | ConfirmDialogProps | PromptDialogProps);

export default function CustomDialog({
  open,
  type,
  title,
  description,
  cancelText,
  actionText,
  inputPlaceholder,
  onOpenChange,
  onConfirm,
  onCancel,
}: CustomDialogProps) {
  const { translate } = useTranslate();
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    onConfirm?.(inputValue);
    onOpenChange?.(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || ""}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {type === "prompt" && (
          <input
            type="text"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        )}

        {(type === "confirm" || type === "prompt") && (
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                onCancel?.();
                onOpenChange?.(false);
              }}
            >
              {cancelText || translate("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {actionText || translate("ok")}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
