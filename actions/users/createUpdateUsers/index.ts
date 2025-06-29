"use server";

// Utils
import { validateFormData } from "@/utils/users/crud";
import { getTranslation } from "@/utils/translations";
import { getLoggedUser } from "@/utils/auth.server";
import { canAccess } from "@/utils/permissions/permissions.server";
import { applyPepper, hashAString } from "@/utils/auth.server";

// Models
import { prisma } from "@/lib/prisma";
import UserModel from "@/models/UserModel";
import RoleModel from "@/models/RoleModel";

// Consts
import { WITHOUT_ROLE_VALUE } from "@/constants/common";

// Types
import type { createUpdateUserAction } from "@/types/actions/CreateUpdateUserActionTypes";
import type { Permission } from "@/config/authorization/permissions";

const hashPassword = async (rawPassword: string) => {
  const withPepper = await applyPepper(rawPassword);
  const hashedPass = await hashAString(withPepper);
  return hashedPass;
};

const createUpdateUserAction: createUpdateUserAction = async (
  formData,
  locale = "en"
) => {
  const returnObj = {
    success: false,
    message: getTranslation("something_went_wrong", locale),
    newUserId: "",
  };

  try {
    // Get the logged in user.
    const loggedUser = await getLoggedUser();
    if (!loggedUser) {
      return returnObj;
    }

    const fieldsObject = validateFormData(formData);

    if (Object.keys(fieldsObject.errors)?.length) {
      return returnObj;
    }

    const targetUserId = fieldsObject.fields.userId;
    let userModel;
    let targetUser;

    if (targetUserId) {
      userModel = new UserModel();
      const targetUserArr = await userModel.getManyByIdWithRole([targetUserId]);
      targetUser = targetUserArr?.[0];

      if (!targetUser) {
        return returnObj;
      }
    }

    const isUpdate = !!targetUser;

    // Check if the logged in user has rights to perfom the action
    const permissionsToValidate: Permission[] = ["users_read"];
    permissionsToValidate.push(isUpdate ? "users_update" : "users_create");
    const hasPermission = await canAccess(permissionsToValidate);

    if (!hasPermission) {
      return returnObj;
    }

    const roleModel = new RoleModel();
    const desiredRole = fieldsObject.fields.roleId
      ? await roleModel.findFirst({
          where: {
            id: fieldsObject.fields.roleId,
          },
        })
      : null;

    // Can't set higher or same role hierarchy as his own.
    // Does not matter if on update or on create
    if (desiredRole && desiredRole.hierarchy <= loggedUser.roleHierarchy) {
      return returnObj;
    }

    // A role with such id must exist
    if (
      fieldsObject.fields.roleId &&
      fieldsObject.fields.roleId !== WITHOUT_ROLE_VALUE &&
      !desiredRole
    ) {
      return returnObj;
    }

    // Update
    if (isUpdate) {
      const updatesSelf = targetUserId === loggedUser.id;

      // Can't update his own role
      if (updatesSelf && desiredRole) {
        return returnObj;
      }

      // Can't update other peoples profiles with higher or same role hierarchy as his own.
      // This includes his own - can't change his own role.
      if (
        targetUser?.Role?.hierarchy &&
        loggedUser.roleHierarchy >= targetUser?.Role.hierarchy
      ) {
        return returnObj;
      }

      // In case of password update
      if (fieldsObject.fields.changePassword) {
        // Can't change other peoples passwords
        if (!updatesSelf) {
          return returnObj;
        }

        // Validate old password
        const credentialsValid = await userModel?.validateCredentials(
          (fieldsObject.fields.email as string).toLowerCase(),
          fieldsObject.fields.oldPassword as string
        );
        if (!credentialsValid) {
          return {
            ...returnObj,
            message: getTranslation("wrong_password", locale),
          };
        }
      }

      const data: Record<string, string | null> = {
        email: fieldsObject.fields.email as string,
      };

      if (fieldsObject.fields.changePassword) {
        const hashedPassword = await hashPassword(
          fieldsObject.fields.newPassword as string
        );

        data.password = hashedPassword;
      }

      if (fieldsObject.fields.roleId) {
        data.roleId =
          fieldsObject.fields.roleId !== WITHOUT_ROLE_VALUE
            ? (fieldsObject.fields.roleId as string)
            : null;
      }

      const updatedUser = userModel?.update({
        where: { id: targetUserId },
        data,
      });

      if (updatedUser) {
        returnObj.success = true;
        returnObj.message = getTranslation(
          "successfully_updated_new_user",
          locale
        );

        return returnObj;
      }
    }

    // Create
    else {
      const hashedPassword = await hashPassword(
        fieldsObject.fields.newPassword as string
      );

      const data = {
        email: fieldsObject.fields.email as string,
        password: hashedPassword,
      };

      const createdUser = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data,
        });

        await tx.account.create({
          data: {
            userId: newUser.id,
            providerAccountId: newUser.id,
            provider: "credentials",
            type: "credentials",
          },
        });

        return newUser;
      });

      if (createdUser) {
        returnObj.success = true;
        returnObj.message = getTranslation(
          "successfully_created_new_user",
          locale
        );
        returnObj.newUserId = createdUser.id;

        return returnObj;
      }
    }
  } catch (error) {
    console.log(error);
    return returnObj;
  }

  return returnObj;
};

export default createUpdateUserAction;
