import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { getValidLocale } from "@/utils/locale";
import { setLocaleToRelativeUrl } from "@/utils/url";
import RegistrationInviteModel from "@/models/RegistrationInviteModel";
import AuthCard from "@/components/auth/AuthCard";

const REDIRECT_URL = "/";

export default async function Register({
  params,
}: {
  params: { locale: string; token: string };
}) {
  const { locale, token } = await params;
  const validLocale = getValidLocale(locale);
  const authResult = await auth();
  if (authResult?.user) {
    redirect(setLocaleToRelativeUrl(REDIRECT_URL, validLocale));
  }
  const registrationInviteModel = new RegistrationInviteModel();
  const invite = await registrationInviteModel.findUnique({
    where: {
      token,
    },
  });

  if (!invite) {
    notFound();
  }

  const valid = await registrationInviteModel.validateToken(token);
  if (!valid) {
    redirect(setLocaleToRelativeUrl("/login", validLocale));
  }

  return (
    <div className="relative flex justify-center items-center h-screen p-4">
      <AuthCard locale={validLocale} variant="register" token={token} />
    </div>
  );
}
