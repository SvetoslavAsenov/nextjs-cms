import { Button } from "../shadcn/ui/button";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonType = "button" | "submit" | "reset";

export type ButtonItem = {
  label: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: ButtonType;
};

type ButtonsGroupProps = {
  buttons: ButtonItem[];
};

const ButtonsGroup = ({ buttons }: ButtonsGroupProps) => {
  return (
    <div className="inline-flex gap-2">
      {buttons.map((b, i) => {
        return (
          <Button
            variant={b.variant || "default"}
            key={i}
            disabled={b.disabled}
            type={b.type || "button"}
            {...(!b.type || b.type === "button" ? { onClick: b.onClick } : {})}
          >
            {b.icon}
            {b.label}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonsGroup;
