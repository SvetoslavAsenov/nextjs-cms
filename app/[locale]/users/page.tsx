import { getTranslation } from "@/utils/translations";
import type { SupportedLocale } from "@/constants/locales";

export default async function Users({
  params,
}: {
  params: { locale: SupportedLocale };
}) {
  const { locale } = await params;
  return (
    <div>
      <h1>{getTranslation("greeting", locale)}</h1>
    </div>
  );
}
