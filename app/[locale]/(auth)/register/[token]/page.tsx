import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Register({
  params,
}: {
  params: { locale: string; token: string };
}) {
  const { locale, token } = await params;
  const invited = await prisma.registrationInvite.findUnique({
    where: {
      token: token,
    },
  });

  if (!invited) {
    notFound();
  }

  return (
    <div>
      <h1>{locale}</h1>
    </div>
  );
}
