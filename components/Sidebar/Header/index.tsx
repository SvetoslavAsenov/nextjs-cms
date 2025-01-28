import { useSidebar } from "@/hooks/useSidebar";
import { Menu, ChevronLeft } from "lucide-react";

const Header = () => {
  const { isOpen, toggle } = useSidebar();
  const iconClasses =
    "w-[calc(var(--sidebar-icons-width)-1.25rem)] h-auto cursor-pointer rounded-sm hover:text-primary";

  return (
    <header className="flex justify-end items-center p-[0.625rem]">
      {isOpen ? (
        <ChevronLeft onClick={toggle} className={iconClasses} />
      ) : (
        <Menu onClick={toggle} className={iconClasses} />
      )}
    </header>
  );
};

export default Header;
