import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
// import { SupportedLocale } from "@/types/locales";

type AppLayoutProps = {
  children: React.ReactNode;
  // params: { locale: SupportedLocale };
};

export default async function AppLayout({ children }: AppLayoutProps) {
  // const { locale } = await params;

  return (
    <div className="app-wrapper">
      <AppHeader />
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
}
