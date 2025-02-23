import { getLoggedUser } from "../auth.server";
import RoleModel from "@/models/RoleModel";
import { ROOT_ROLE_NAME } from "@/config/authorization/permissions";

import type { Permission } from "@/config/authorization/permissions";

export const canAccess = async (permission: Permission) => {
  const user = await getLoggedUser();
  if (!user?.roleId) {
    return false;
  }
  const roleModel = new RoleModel();
  return (
    user.roleName === ROOT_ROLE_NAME ||
    (await roleModel.hasPermission(user.roleId, permission))
  );
};
