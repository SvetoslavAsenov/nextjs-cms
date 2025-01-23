import Profile from "./Profile";

import { SupportedLocale } from "@/types/locales";

type AppHeaderProps = {
  locale: SupportedLocale;
};

const AppHeader = ({ locale }: AppHeaderProps) => {
  return (
    <header className="w-screen h-12 shadow px-4 flex items-center bg-background">
      <Profile />
    </header>
  );
};

export default AppHeader;
