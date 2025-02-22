import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useTranslate } from "@/hooks/useTranslate";
import { useCustomDialog } from "@/hooks/useCustomDialog";
import deleteUsersAction from "@/actions/users/deleteUsers";
import { toast } from "sonner";

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
            const deletedCount = await deleteUsersAction(null, [id]);
            if (deletedCount) {
              toast.success(translate("delete_successfull"));
            } else {
              toast.error(translate("delete_unsuccessfull"));
            }
            router.refresh();
          },
        });
      }}
    />
  );
};

export default Delete;
