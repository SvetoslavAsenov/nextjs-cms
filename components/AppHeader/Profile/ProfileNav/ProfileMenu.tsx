import React from "react";
import { Pencil, LogOut } from "lucide-react";
import Item from "./Item";
import { useTranslate } from "@/hooks/useTranslate";
import { useAuth } from "@/hooks/useAuth";

type ProfileMenuProps = {
  shown: boolean;
};

const ProfileMenu = ({ shown }: ProfileMenuProps) => {
  const { translate } = useTranslate();
  const { logout, user } = useAuth();

  return (
    <ul
      className={`absolute shadow top-full right-0 p-1 bg-background${
        !shown ? " hidden" : ""
      }`}
    >
      <Item
        label={translate("profile")}
        icon={Pencil}
        variant="link"
        href={`/users/${user?.id}/update`}
      />
      <Item
        label={translate("logout")}
        icon={LogOut}
        variant="button"
        handler={() => logout()}
      />
    </ul>
  );
};

export default ProfileMenu;
