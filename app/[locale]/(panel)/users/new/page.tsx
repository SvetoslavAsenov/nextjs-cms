// Components
import Breadcrumbs from "@/components/Breadcrumbs";
import UserDetails from "../components/UserDetails";

// Utils
import { getTranslation } from "@/utils/translations";
import { getLoggedUser } from "@/utils/auth.server";
import { validateParamsAndPermissions } from "@/utils/users/crud";
import { redirect } from "next/navigation";

// Consts
import { LOGIN_URL, USERS_URL } from "@/constants/urls";

// Models
import RoleModel from "@/models/RoleModel";

// Types
import type { SupportedLocale } from "@/types/locales";

type UsersNewProps = {
  params: Promise<{ locale: SupportedLocale }>;
};

const UsersNew = async ({ params }: UsersNewProps) => {
  const { locale } = await params;

  const roleModel = new RoleModel();
  const [rolesResult, loggedInUserResult] = await Promise.allSettled([
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

  const validParamsAndHasPermissions = await validateParamsAndPermissions(
    "create",
    loggedInUser,
    null,
    false
  );

  if (!validParamsAndHasPermissions) {
    redirect(USERS_URL);
  }

  const roles = rolesResult.status === "fulfilled" ? rolesResult.value : [];

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: getTranslation("users", locale), href: USERS_URL },
          { label: getTranslation("add_new_user", locale) },
        ]}
      />

      <UserDetails
        locale={locale}
        roles={roles}
        loggedUserHierarchy={loggedInUser.roleHierarchy}
      />
    </>
  );
};

export default UsersNew;
