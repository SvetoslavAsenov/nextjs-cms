import Profile from "./Profile";
import LangSitePreview from "./LangSitePreview";

const AppHeader = () => {
  return (
    <header className="w-screen h-12 shadow px-4 flex items-center bg-background justify-between select-none">
      <Profile />
      <LangSitePreview />
    </header>
  );
};

export default AppHeader;
