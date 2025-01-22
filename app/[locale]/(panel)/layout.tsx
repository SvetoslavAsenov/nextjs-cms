import AppHeader from "@/components/AppHeader";
import { SupportedLocale } from "@/types/locales";

type AppLayoutProps = {
  children: React.ReactNode;
  params: { locale: SupportedLocale };
};

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const { locale } = await params;

  return (
    <div className="app-wrapper">
      <AppHeader locale={locale} />
      <main>{children}</main>
    </div>
  );
}
