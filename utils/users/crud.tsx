import { canAccess } from "../permissions/permissions.server";
import permissions from "@/config/authorization/permissions";

import type { UserRecordWithRole } from "@/models/UserModel";
import type { loggedInUserType } from "@/utils/auth.server";
import type { Permission } from "@/config/authorization/permissions";

type actionType = "update" | "create" | "view";

type validateParamsAndPermissionsType = (
  action: actionType,
  loggedInUser: loggedInUserType | null,
  targetUser?: UserRecordWithRole | null
) => Promise<boolean>;

export const validateParamsAndPermissions: validateParamsAndPermissionsType =
  async (action, loggedInUser, targetUser) => {
    if (!targetUser || !loggedInUser) {
      return false;
    }

    const permissionsToCheck: Permission[] = [permissions.users.read];
    if (action !== "view") {
      permissionsToCheck.push(permissions.users[action]);
    }

    const hasPermissions = await canAccess(permissionsToCheck);
    const ownProfile = loggedInUser.id === targetUser?.id;
    const higherHierarchy =
      loggedInUser.roleHierarchy < targetUser?.Role?.hierarchy;

    switch (action) {
      case "create":
        return hasPermissions;

      case "view":
      case "update":
        return (hasPermissions && higherHierarchy) || ownProfile;

      default:
        return false;
    }
  };
