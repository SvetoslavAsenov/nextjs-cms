"use client";

// Components
import InputGroup from "@/components/ui/InputGroup";
import { Label } from "@/components/shadcn/ui/label";
import { Switch } from "@/components/shadcn/ui/switch";

// Hooks
import { useState } from "react";
import { useTranslate } from "@/hooks/useTranslate";

// Types
type Role = {
  id: string;
  name: string;
};

type UserData = {
  email: string;
  roleId: string;
};

type UserDetailsProps = {
  pending: boolean;
  canEdit: boolean;
  userData: UserData;
  roles: Role[];
};

const UserDetails = ({ pending, canEdit, userData, roles }) => {
  const { translate } = useTranslate();
  const [changePasswordChecked, setChangePasswordChecked] = useState(false);

  return (
    <form className="flex flex-col gap-4">
      <InputGroup
        name="email"
        id="email"
        placeholder={translate("email")}
        label={translate("email")}
        disabled={pending}
      />
      <div className="flex flex-col items-start justify-start mr-1">
        <Label
          htmlFor="change-password"
          className="mb-1 ml-[1px] mr-2 text-lg font-semibold cursor-pointer"
        >
          {translate("change_password")}
        </Label>
        <Switch
          name="change-password"
          id="change-password"
          className="shadow-none w-auto mb-1 cursor-pointer w-9"
          onCheckedChange={(checked) => {
            setChangePasswordChecked(checked);
          }}
        />
      </div>
      {changePasswordChecked && (
        <>
          {/* <p className="">{translate("password_requirements")}</p> */}
          <InputGroup
            type="password"
            label={translate("new_password")}
            id="new-password"
            required
            disabled={pending}
          />
          <InputGroup
            type="password"
            label={translate("confirm_password")}
            id="confirm-password"
            required
            disabled={pending}
          />
        </>
      )}
    </form>
  );
};

export default UserDetails;
