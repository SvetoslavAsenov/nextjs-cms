import Breadcrumbs from "@/components/Breadcrumbs";
import { canAccess } from "@/utils/permissions/permissions.server";
import permissions from "@/config/authorization/permissions";
import { HOME_URL } from "@/constants/urls";
import { redirect } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { getLoggedUser } from "@/utils/auth.server";
import UserModel from "@/models/UserModel";

import type { SupportedLocale } from "@/types/locales";
type UsersProps = {
  locale: SupportedLocale;
  params: Promise<{ id: string }>;
};

const validateParamsAndPermissions = async (targetUserId: string) => {
  const canReadUsers = await canAccess(permissions.users.read);
  const loggedInUser = await getLoggedUser();
  if (!canReadUsers || !loggedInUser) {
    return false;
  }

  const userModel = new UserModel();
  const [targetUser] = await userModel.getManyByIdWithRole([targetUserId]);

  return !!(
    targetUser &&
    targetUser.Role &&
    (loggedInUser?.roleHierarchy > targetUser.Role.hierarchy ||
      loggedInUser.id === targetUserId)
  );
};

export default async function Users({ locale, params }: UsersProps) {
  const { id: targetUserId } = await params;
  const validParamsAndHasPermissions = await validateParamsAndPermissions(
    targetUserId
  );

  if (!validParamsAndHasPermissions) {
    redirect(HOME_URL);
  }

  return (
    <Breadcrumbs
      locale={locale}
      items={[{ label: getTranslation("users", locale) }]}
    />
  );
}
