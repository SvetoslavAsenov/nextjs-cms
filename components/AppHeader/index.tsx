import { SupportedLocale } from "@/types/locales";

type AppHeaderProps = {
  locale: SupportedLocale;
};

const AppHeader = ({ locale }: AppHeaderProps) => {
  return (
    <header className="w-screen h-12 shadow">
      <div></div>
      <div></div>
    </header>
  );
};

export default AppHeader;
