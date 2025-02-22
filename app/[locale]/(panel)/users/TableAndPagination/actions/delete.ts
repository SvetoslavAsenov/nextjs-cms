import deleteUsersAction from "@/actions/users/deleteUsers";

type DeleteUsersProps = {
  ids: string[];
  showDialog: () => void;
};

export const deleteUsers = async (ids: string[]) => {
  return await deleteUsersAction(null, ids);
};
