"use server";

import { canAccess } from "@/utils/permissions/permissions.server";
import { getLoggedUser } from "@/utils/auth.server";
import permissions from "@/config/authorization/permissions";
import UserModel from "@/models/UserModel";

import type { DeleteUsers } from "@/types/actions/UserActionsTypes";

const deleteUsersAction: DeleteUsers = async (previousState, ids) => {
  const hasPermissionToDelete = canAccess(permissions.users.delete);
  const loggedUser = await getLoggedUser();
  if (
    !hasPermissionToDelete ||
    !loggedUser ||
    !Array.isArray(ids) ||
    !ids.length
  )
    throw new Error("Invalid input");

  const userModel = new UserModel();

  const fetchedUsers = await userModel.getManyByIdWithRole(ids);
  const filteredItemsIds = fetchedUsers
    .filter((userRecord) => {
      return (
        typeof userRecord?.Role?.hierarchy !== "number" ||
        loggedUser?.roleHierarchy < userRecord?.Role?.hierarchy
      );
    })
    ?.map((record) => record.id);

  const deletionResult = await userModel.deleteMany({
    where: {
      id: {
        in: filteredItemsIds,
      },
    },
  });

  return deletionResult.count;
};

export default deleteUsersAction;
