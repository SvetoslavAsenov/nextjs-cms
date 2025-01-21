import AppHeader from "@/components/AppHeader";
import { SupportedLocale } from "@/types/locales";
import LocaleProvider from "@/components/providers/LocaleProvider";
import TranslateProvider from "@/components/providers/TranslateProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { auth } from "@/lib/auth";
import UserModel from "@/models/UserModel";

import type { AuthProviderUser } from "@/providers/authProvider";

type AppLayoutProps = {
  children: React.ReactNode;
  params: { locale: SupportedLocale };
};

export default async function AppLayout({ children, params }: AppLayoutProps) {
  let user;
  const { locale } = await params;
  const authResult = await auth();

  if (authResult?.user?.email) {
    user = {
      email: authResult?.user?.email,
      name: authResult?.user?.name,
      image: authResult?.user?.image,
    } as AuthProviderUser;

    const userModel = new UserModel();
    const loggedUser = await userModel.findUnique({
      where: {
        email: user.email,
      },
    });

    if (loggedUser?.roleId) {
      user.roleId = loggedUser.roleId;
    }
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
