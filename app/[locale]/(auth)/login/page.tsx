import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getValidLocale } from "@/utils/locale";
import { setLocaleToRelativeUrl } from "@/utils/url";

import AuthCard from "@/components/auth/AuthCard";

const REDIRECT_URL = "/";

export default async function register({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  const authResult = await auth();
  if (authResult?.user) {
    redirect(setLocaleToRelativeUrl(REDIRECT_URL, validLocale));
  }

  return (
    <div className="relative flex justify-center items-center h-screen p-4">
      <AuthCard locale={validLocale} variant="login" />
    </div>
  );
}
