import { useSidebar } from "@/hooks/useSidebar";
import { useTranslate } from "@/hooks/useTranslate";
import { Menu, PanelLeftClose } from "lucide-react";

const Header = () => {
  const { isOpen, toggle } = useSidebar();
  const { translate } = useTranslate();

  const iconClasses =
    "w-[calc(var(--sidebar-icons-width)-1.25rem)] h-auto cursor-pointer rounded-sm hover:text-primary shrink-0";

  return (
    <header className="flex justify-end items-center p-[0.625rem]">
      <div title={translate(isOpen ? "hide_menu" : "show_menu")}>
        {isOpen ? (
          <PanelLeftClose onClick={toggle} className={iconClasses} />
        ) : (
          <Menu onClick={toggle} className={iconClasses} />
        )}
      </div>
    </header>
  );
};

export default Header;
