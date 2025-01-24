import React from "react";
import { Pencil, LogOut } from "lucide-react";
import { Menu, Item } from "../../Menu/index";
import { useTranslate } from "@/hooks/useTranslate";
import { useAuth } from "@/hooks/useAuth";

type ProfileMenuProps = {
  shown: boolean;
};

const ProfileMenu = ({ shown }: ProfileMenuProps) => {
  const { translate } = useTranslate();
  const { logout, user } = useAuth();

  return (
    <Menu shown={shown}>
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
      <Item label="tesst" variant="parent">
        <Menu isChild={true}>
          <Item label="kur" variant="link" href="/users"></Item>
        </Menu>
      </Item>
    </Menu>
  );
};

export default ProfileMenu;
