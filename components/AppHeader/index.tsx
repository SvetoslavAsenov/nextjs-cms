import Profile from "./Profile";
import LangSitePreview from "./LangSitePreview";
import SidebarToggle from "./SidebarToggle";

const AppHeader = () => {
  return (
    <header className="w-full h-[var(--header-height)] shadow px-4 flex items-center bg-background justify-between select-none fixed left-0 top-0 z-30">
      <SidebarToggle />
      <Profile />
      <LangSitePreview />
    </header>
  );
};

export default AppHeader;
