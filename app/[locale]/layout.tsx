import "@/assets/styles/globals.css";

import LocaleProvider from "@/components/providers/LocaleProvider";
import TranslateProvider from "@/components/providers/TranslateProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import PermissionsProvider from "@/components/providers/PermissionsProvider";
import SiteProvider from "@/components/providers/SiteProvider";
import SidebarProvider from "@/components/providers/SidebarProvider";
import CustomDialogProvider from "@/components/providers/CustomDialogProvider";

import { getThemeClasses } from "@/utils/theme/theme.server";
import { getLoggedUser } from "@/utils/auth.server";
import { getCookieValueByKey } from "@/utils/cookies/cookies.server";
import { SITE_SUPPORTED_LOCALES, SITE_DEFAULT_LOCALE } from "@/config/site";
import { SITE_LOCALE_COOKIE } from "@/constants/cookies";
import RoleModel from "@/models/RoleModel";
import { ROOT_ROLE_NAME } from "@/config/authorization/permissions";
import RedirectHandler from "@/components/RedirectHandler";
import type { Metadata } from "next";
import type { SupportedLocale } from "@/types/locales";
import type { SiteSupportedLocale } from "@/types/site/locales";
import type { Permission } from "@/config/authorization/permissions";
import { Toaster } from "@/components/shadcn/ui/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: SupportedLocale };
}>) {
  // This is the admin panel locale
  const { locale } = await params;
  const themeClasses = await getThemeClasses();
  const user = await getLoggedUser();

  let permissions = [] as Permission[];
  if (user?.roleId) {
    const roleModel = new RoleModel();
    permissions = await roleModel.getRolePermissionsById(user?.roleId);
  }

  // This is the edited site language version
  let siteLocale = await getCookieValueByKey(SITE_LOCALE_COOKIE);
  if (
    !siteLocale ||
    !SITE_SUPPORTED_LOCALES.includes(siteLocale as SiteSupportedLocale)
  ) {
    siteLocale = SITE_DEFAULT_LOCALE;
  }

  return (
    <AuthProvider user={user}>
      <PermissionsProvider
        permissions={permissions}
        isRoleRoot={user?.roleName === ROOT_ROLE_NAME}
        hierarchy={user?.roleHierarchy ?? Infinity}
      >
        <LocaleProvider locale={locale}>
          <TranslateProvider>
            <SiteProvider initialSiteLocale={siteLocale as SiteSupportedLocale}>
              <SidebarProvider>
                <html lang={locale} className={themeClasses}>
                  <body className={"antialiased"}>
                    <Toaster position="top-right" richColors />
                    <CustomDialogProvider>
                      {!user && <RedirectHandler />}
                      {children}
                    </CustomDialogProvider>
                  </body>
                </html>
              </SidebarProvider>
            </SiteProvider>
          </TranslateProvider>
        </LocaleProvider>
      </PermissionsProvider>
    </AuthProvider>
  );
}
