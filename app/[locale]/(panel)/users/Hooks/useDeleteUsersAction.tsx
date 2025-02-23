import { useRouter } from "next/navigation";
import { useTranslate } from "@/hooks/useTranslate";
import { useCustomDialog } from "@/hooks/useCustomDialog";
import { useAuth } from "@/hooks/useAuth";
import deleteUsersAction from "@/actions/users/deleteUsers";
import { toast } from "sonner";

type Users = Record<string, number>[];

export const useDeleteUsersAction = () => {
  const router = useRouter();
  const { show } = useCustomDialog();
  const { translate } = useTranslate();
  const { user: loggedUser } = useAuth();

  const handleConfirm = async (filteredUsers: Users, idsArr: string[]) => {
    if (!idsArr?.length) {
      return;
    }
    const deletedCount = await deleteUsersAction(null, idsArr);

    if (deletedCount > 0) {
      let successMsg = translate("delete_successfull");
      if (filteredUsers.length > 1) {
        successMsg = translate("delete_successfull_many", undefined, {
          count: deletedCount.toString(),
          total: filteredUsers.length.toString(),
        });
      }
      toast.success(successMsg);
    }

    if (!deletedCount) {
      toast.error(translate("delete_unsuccessfull"));
    } else if (deletedCount !== filteredUsers.length) {
      const errorsCount = filteredUsers.length - deletedCount;
      toast.error(
        translate("delete_unsuccessfull_many", undefined, {
          count: errorsCount.toString(),
          total: filteredUsers.length.toString(),
        })
      );
    }

    router.refresh();
  };

  const deleteUsers = async (users: Users) => {
    // We want to keep only the users,
    // that the current logged user has right to delete.
    // These are users with lower or no hierarchy.
    const filteredUsers = users.filter((user) => {
      const [[_, hierarchy]] = Object.entries(user);
      return (
        typeof hierarchy !== "number" ||
        (loggedUser?.roleHierarchy !== undefined &&
          loggedUser?.roleHierarchy < hierarchy)
      );
    });

    const idsArr = [...new Set(filteredUsers.flatMap(Object.keys))];

    show({
      type: "confirm",
      title:
        idsArr?.length > 1
          ? translate("delete_users_dialog_title", undefined, {
              count: idsArr.length.toString(),
            })
          : translate("delete_user_dialog_title"),
      description:
        idsArr?.length > 1
          ? translate("delete_users_dialog_description", undefined, {
              count: idsArr.length.toString(),
            })
          : translate("delete_user_dialog_description"),

      onConfirm: () => handleConfirm(filteredUsers, idsArr),
    });
  };

  return { deleteUsers };
};
