import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-wrapper">
      <AppHeader />
      <Sidebar />
      <Main>
        <div className="flex flex-col gap-2">{children}</div>
      </Main>
    </div>
  );
}
