import { validLocale } from "@/utils/locale";

export default function register({ locale: localeParam }: { locale: string }) {
  const locale = validLocale(localeParam);

  return <p>{locale}</p>;
}
