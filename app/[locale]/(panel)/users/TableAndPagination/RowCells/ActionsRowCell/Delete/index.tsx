import { Trash2 } from "lucide-react";
import { useDeleteUsersAction } from "../../../../Hooks/useDeleteUsersAction";

type DeleteProps = {
  user: Record<string, number>;
};

const Delete = ({ user }: DeleteProps) => {
  const { deleteUsers } = useDeleteUsersAction();

  return (
    <Trash2
      className="cursor-pointer hover:text-primary"
      onClick={async () => await deleteUsers([user])}
    />
  );
};

export default Delete;
