import { getTranslation } from "@/utils/translations";
import type { SupportedLocale } from "@/types/locales";
import { auth } from "@/lib/auth";
import { randomBytes } from "crypto";

export default async function Users({
  params,
}: {
  params: { locale: SupportedLocale };
}) {
  const { locale } = await params;
  const t = await auth();
  return (
    <div>
      <h1>{getTranslation("greeting", locale)}</h1>
      <p>{t?.user?.email}</p>
      <p>{randomBytes(32).toString("hex")}</p>
    </div>
  );
}
