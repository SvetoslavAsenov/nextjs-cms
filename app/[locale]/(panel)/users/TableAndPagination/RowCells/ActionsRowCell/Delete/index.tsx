import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useTranslate } from "@/hooks/useTranslate";
import { useCustomDialog } from "@/hooks/useCustomDialog";
import deleteUsersAction from "@/actions/users/deleteUsers";

type DeleteProps = {
  id: string;
};

const Delete = ({ id }: DeleteProps) => {
  const router = useRouter();
  const { show } = useCustomDialog();
  const { translate } = useTranslate();

  return (
    <Trash2
      className="cursor-pointer hover:text-primary"
      onClick={async () => {
        show({
          type: "confirm",
          title: translate("delete_user_dialog_title"),
          description: translate("delete_user_dialog_description"),
          onConfirm: async () => {
            await deleteUsersAction(null, [id]);
            router.refresh();
          },
        });
      }}
    />
  );
};

export default Delete;
