import Breadcrumbs from "@/components/Breadcrumbs";
import { canAccess } from "@/utils/permissions/permissions.server";
import permissions from "@/config/authorization/permissions";
import { HOME_URL } from "@/constants/urls";
import { redirect } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import TableAndPagination from "./TableAndPagination";

import type { SupportedLocale } from "@/types/locales";
type UsersProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: { locale: SupportedLocale };
};

export default async function Users({ searchParams, params }: UsersProps) {
  const { locale } = await params;
  const canReadUsers = await canAccess([permissions.users.read]);
  if (!canReadUsers) {
    redirect(HOME_URL);
  }

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumbs
        locale={locale}
        items={[{ label: getTranslation("users", locale) }]}
      />

      <TableAndPagination searchParams={searchParams} />
    </div>
  );
}
