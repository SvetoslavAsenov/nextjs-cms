import { Pencil } from "lucide-react";
import Link from "next/link";
import { USERS_UPDATE } from "@/constants/urls";
import { useTranslate } from "@/hooks/useTranslate";

type UpdateProps = {
  id: string;
};

const Update = ({ id }: UpdateProps) => {
  const { translate } = useTranslate();
  const href = USERS_UPDATE.replace("{id}", id);

  return (
    <Link href={href} title={translate("edit")}>
      <Pencil className="cursor-pointer hover:text-primary" />
    </Link>
  );
};

export default Update;
