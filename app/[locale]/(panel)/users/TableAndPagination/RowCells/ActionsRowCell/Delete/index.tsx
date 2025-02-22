import { Trash2 } from "lucide-react";
import { deleteUsers } from "../../../actions/delete";
import { useTranslate } from "@/hooks/useTranslate";

type DeleteProps = {
  id: string;
};

const Delete = ({ id }: DeleteProps) => {
  const { translate } = useTranslate();

  return (
    <Trash2
      className="cursor-pointer hover:text-primary"
      onClick={async () => {
        await deleteUsers([id]);
      }}
    />
  );
};

export default Delete;
