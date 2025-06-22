import Breadcrumbs from "@/components/Breadcrumbs";
import { HOME_URL, LOGIN_URL, USERS_URL } from "@/constants/urls";
import { redirect } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { getLoggedUser } from "@/utils/auth.server";
import UserModel from "@/models/UserModel";
import RoleModel from "@/models/RoleModel";
import UserDetails from "../../components/UserDetails";
import { Pencil } from "lucide-react";
import { validateParamsAndPermissions } from "@/utils/users/crud";

import type { SupportedLocale } from "@/types/locales";

type UsersProps = {
  params: Promise<{ id: string; locale: SupportedLocale }>;
};

const UpdateUser = async ({ params }: UsersProps) => {
  const { id: targetUserId, locale } = await params;

  const userModel = new UserModel();
  const roleModel = new RoleModel();

  const [targetUserResult, rolesResult, loggedInUserResult] =
    await Promise.allSettled([
      userModel.getManyByIdWithRole([targetUserId]),
      roleModel.findMany({
        orderBy: { hierarchy: "asc" },
      }),
      getLoggedUser(),
    ]);

  const loggedInUser =
    loggedInUserResult.status === "fulfilled" ? loggedInUserResult.value : null;

  if (!loggedInUser) {
    redirect(LOGIN_URL);
  }

  const targetUser =
    targetUserResult.status === "fulfilled"
      ? targetUserResult.value?.[0]
      : null;

  const ownProfile = loggedInUser?.id === targetUser?.id;

  const validParamsAndHasPermissions = await validateParamsAndPermissions(
    "update",
    loggedInUser,
    targetUser,
    ownProfile
  );

  const PREVIEW_USER_URL = `${USERS_URL}/${targetUser?.id}`;

  if (!validParamsAndHasPermissions) {
    redirect(targetUser ? PREVIEW_USER_URL : HOME_URL);
  }

  const roles = rolesResult.status === "fulfilled" ? rolesResult.value : [];

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: getTranslation("users", locale), href: USERS_URL },
          {
            label: targetUser?.email as string,
            href: PREVIEW_USER_URL,
          },
          { label: getTranslation("edit", locale), icon: <Pencil /> },
        ]}
      />

      <UserDetails
        ownProfile={ownProfile}
        userData={{
          email: targetUser?.email as string,
          roleId: targetUser?.roleId as string,
          userId: targetUserId,
        }}
        loggedUserHierarchy={loggedInUser.roleHierarchy}
        roles={roles}
        locale={locale}
      />
    </>
  );
};

export default UpdateUser;
