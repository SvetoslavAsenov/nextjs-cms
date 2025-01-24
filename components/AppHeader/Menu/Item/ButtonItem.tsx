import type { ButtonItemProps } from ".";

const ButtonItem = ({ label, icon: Icon, handler }: ButtonItemProps) => {
  return (
    <button
      onClick={handler}
      className="w-full flex justify-between items-center hover:bg-secondary p-1"
    >
      <span className="mr-3 text-foreground">{label}</span>
      {Icon && <Icon className="w-4 h-4 text-foreground" />}
    </button>
  );
};

export default ButtonItem;
