import { notFound } from "next/navigation";
import RegistrationInviteModel from "@/models/RegistrationInviteModel";
import { getTranslation } from "@/utils/translations";
import Test from "./test";
import { redirect } from "next/navigation";
import { setLocaleToRelativeUrl } from "@/utils/url";
import { getValidLocale } from "@/utils/locale";

export default async function Register({
  params,
}: {
  params: { locale: string; token: string };
}) {
  const { locale, token } = await params;
  const validLocale = getValidLocale(locale);
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
    <div>
      <Test token={token} />
      <h1>{getTranslation("register", validLocale)}</h1>
    </div>
  );
}
