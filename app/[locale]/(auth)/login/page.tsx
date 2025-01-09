import { getTranslation } from "@/utils/translations";

export default async function register({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  return <p>{getTranslation("login", locale)}</p>;
}
