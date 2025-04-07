import type { SupportedLocale } from "@/types/locales";
type UsersNewProps = {
  locale: SupportedLocale;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function UsersNew({
  locale,
  searchParams,
}: UsersNewProps) {
  return "Create new user";
}
