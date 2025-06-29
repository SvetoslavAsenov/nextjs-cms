import React from "react";
import { Pencil, LogOut } from "lucide-react";
import { Menu, Item } from "../../Menu/index";
import { useTranslate } from "@/hooks/useTranslate";
import { useAuth } from "@/hooks/useAuth";
import { USERS_UPDATE_URL } from "@/constants/urls";

type ProfileMenuProps = {
  shown: boolean;
};

const ProfileMenu = ({ shown }: ProfileMenuProps) => {
  const { translate } = useTranslate();
  const { logout, user } = useAuth();

  return (
    user && (
      <Menu shown={shown}>
        <Item
          label={translate("profile")}
          icon={Pencil}
          variant="link"
          href={USERS_UPDATE_URL.replace("{id}", user.id)}
        />
        <Item
          label={translate("logout")}
          icon={LogOut}
          variant="button"
          handler={() => logout()}
        />
      </Menu>
    )
  );
};

export default ProfileMenu;
