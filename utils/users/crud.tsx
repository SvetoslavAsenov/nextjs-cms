import { canAccess } from "../permissions/permissions.server";
import permissions from "@/config/authorization/permissions";

import {
  convertFormDataToFieldsObject,
  addValidationErrorsToFieldsObject,
} from "@/utils/validation";

// Schemas
import {
  updateProfile,
  updateProfileWithPassword,
  createNewUser,
} from "@/schemas/auth";

import type { UserRecordWithRole } from "@/models/UserModel";
import type { loggedInUserType } from "@/utils/auth.server";
import type { Permission } from "@/config/authorization/permissions";
import type { SafeParseReturnType } from "zod";

type actionType = "update" | "create" | "view";

type validateParamsAndPermissionsType = (
  action: actionType,
  loggedInUser: loggedInUserType,
  targetUser: UserRecordWithRole | null,
  ownProfile?: boolean
) => Promise<boolean>;

export const validateParamsAndPermissions: validateParamsAndPermissionsType =
  async (action, loggedInUser, targetUser, ownProfile) => {
    // The logged in user must have a hierarchy.
    if (!Number.isInteger(loggedInUser?.roleHierarchy)) {
      return false;
    }

    const permissionsToCheck: Permission[] = [permissions.users.read];
    if (action !== "view") {
      permissionsToCheck.push(permissions.users[action]);
    }

    const hasPermissions = await canAccess(permissionsToCheck);

    switch (action) {
      case "create":
        return hasPermissions;

      case "view":
      case "update":
        // We allow the action if the user accesses his own profile
        // OR:
        // The logged user must have a higher hierarchy than the target user
        return (
          (hasPermissions &&
            targetUser &&
            loggedInUser.roleHierarchy < targetUser?.Role?.hierarchy) ||
          !!ownProfile
        );

      default:
        return false;
    }
  };

export const validateFormData = (formData: FormData) => {
  const fieldsObject = convertFormDataToFieldsObject(formData);
  const isUpdate = !!fieldsObject.fields.userId;
  const isChangePassword = formData.get("changePassword");
  let validationResult;

  if (isUpdate) {
    validationResult = (
      isChangePassword ? updateProfileWithPassword : updateProfile
    ).safeParse(fieldsObject.fields) as SafeParseReturnType<unknown, unknown>;
  } else {
    validationResult = createNewUser.safeParse(
      fieldsObject.fields
    ) as SafeParseReturnType<unknown, unknown>;
  }

  addValidationErrorsToFieldsObject(fieldsObject, validationResult);

  return fieldsObject;
};
