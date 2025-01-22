import { redirect } from "next/navigation";
import { getValidLocale } from "@/utils/locale";
import { setLocaleToRelativeUrl } from "@/utils/url";
import RegistrationInviteModel from "@/models/RegistrationInviteModel";
import AuthCard from "@/components/auth/AuthCard";
import { isLoggedIn } from "@/utils/auth.server";

const HOME_URL = "/";
const LOGIN_URL = "/login";

export default async function Register({
  params,
}: {
  params: { locale: string; token: string };
}) {
  const { locale, token } = await params;
  const validLocale = getValidLocale(locale);

  const loggedUser = await isLoggedIn();
  if (loggedUser) {
    redirect(setLocaleToRelativeUrl(HOME_URL, validLocale));
  }

  const registrationInviteModel = new RegistrationInviteModel();
  const valid = await registrationInviteModel.validateToken(token);
  if (!valid) {
    redirect(setLocaleToRelativeUrl(LOGIN_URL, validLocale));
  }

  return (
    <div className="relative flex justify-center items-center h-screen p-4">
      <AuthCard locale={validLocale} variant="register" token={token} />
    </div>
  );
}
