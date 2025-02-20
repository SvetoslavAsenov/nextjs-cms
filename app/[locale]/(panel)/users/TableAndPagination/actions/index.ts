import deleteUsersAction from "@/actions/users/deleteUsers";

export const deleteUsers = async (ids: string[]) => {
  return await deleteUsersAction(null, ids);
};
