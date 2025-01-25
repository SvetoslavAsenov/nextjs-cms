import AppHeader from "@/components/AppHeader";
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
      <main>{children}</main>
    </div>
  );
}
