import { getLoggedUser } from "../auth.server";
import RoleModel from "@/models/RoleModel";

import type { Permission } from "@/config/authorization/permissions";

export const canAccess = async (permission: Permission) => {
  const user = await getLoggedUser();
  if (!user?.roleId) {
    return false;
  }
  const roleModel = new RoleModel();
  return await roleModel.hasPermission(user.roleId, permission);
};
