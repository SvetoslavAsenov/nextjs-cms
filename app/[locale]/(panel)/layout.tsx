import AppHeader from "@/components/AppHeader";
import { SupportedLocale } from "@/types/locales";
import LocaleProvider from "@/components/providers/LocaleProvider";
import TranslateProvider from "@/components/providers/TranslateProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { auth } from "@/lib/auth";
import type { User } from "@prisma/client";

type AppLayoutProps = {
  children: React.ReactNode;
  params: { locale: SupportedLocale };
};

export default async function AppLayout({ children, params }: AppLayoutProps) {
  let user;
  const { locale } = await params;
  const authResult = await auth();

  if (authResult?.user?.email) {
    const { id, email, name, image, roleId } = authResult?.user as User;
    user = { id, email, name, image, roleId };
  }

  return (
    <LocaleProvider locale={locale}>
      <TranslateProvider>
        <AuthProvider user={user}>
          <div className="app-wrapper">
            <AppHeader locale={locale} />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </TranslateProvider>
    </LocaleProvider>
  );
}
