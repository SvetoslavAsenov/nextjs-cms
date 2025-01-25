import type { ButtonItemProps } from ".";

const ButtonItem = ({
  label,
  icon: Icon,
  handler,
  disabled,
}: ButtonItemProps) => {
  return (
    <button
      onClick={handler}
      className={`w-full flex justify-between items-center p-1 ${
        disabled ? "cursor-default opacity-50" : "hover:bg-secondary"
      }`}
      disabled={disabled}
    >
      <span className="mr-3 text-foreground">{label}</span>
      {Icon && <Icon className="w-4 h-4 text-foreground" />}
    </button>
  );
};

export default ButtonItem;
