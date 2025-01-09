import { notFound } from "next/navigation";
import RegistrationInviteModel from "@/models/RegistrationInviteModel";
import { getTranslation } from "@/utils/translations";

export default async function Register({
  params,
}: {
  params: { locale: string; token: string };
}) {
  const { locale, token } = await params;
  const registrationInviteModel = new RegistrationInviteModel();
  const invited = await registrationInviteModel.findUnique({
    where: {
      token: token,
    },
  });

  if (!invited) {
    notFound();
  }

  return (
    <div>
      <h1>{getTranslation("register", locale)}</h1>
    </div>
  );
}
