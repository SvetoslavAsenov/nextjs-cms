import Breadcrumbs from "@/components/Breadcrumbs";
import { canAccess } from "@/utils/permissions/permissions.server";
import permissions from "@/config/authorization/permissions";
import { HOME_URL } from "@/constants/urls";
import { redirect } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { House } from "lucide-react";
import TableAndPagination from "./TableAndPagination";

import type { SupportedLocale } from "@/types/locales";
type UsersProps = {
  locale: SupportedLocale;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Users({ locale, searchParams }: UsersProps) {
  const canReadUsers = await canAccess(permissions.users.read);

  if (!canReadUsers) {
    redirect(HOME_URL);
  }

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumbs
        items={[
          { label: getTranslation("home", locale), icon: <House />, href: "/" },
          { label: getTranslation("users", locale) },
        ]}
      />

      <TableAndPagination searchParams={searchParams} />
    </div>
  );
}
