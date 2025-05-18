"use client";

// Components
import InputGroup from "@/components/ui/InputGroup";
import { Label } from "@/components/shadcn/ui/label";
import { Switch } from "@/components/shadcn/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/ui/select";

// Hooks
import { useState } from "react";
import { useTranslate } from "@/hooks/useTranslate";

// Types
import type { Role } from "@prisma/client";

type UserData = {
  email: string;
  roleId: string;
};

type UserDetailsProps = {
  ownProfile: boolean;
  roles: Role[];
  readOnly?: boolean;
  userData?: UserData;
  loggedUserHierarchy?: number;
};

const UserDetails = ({
  ownProfile,
  readOnly,
  userData,
  roles,
  loggedUserHierarchy,
}: UserDetailsProps) => {
  const { translate } = useTranslate();
  const [changePasswordChecked, setChangePasswordChecked] = useState(false);

  return (
    <form className="flex flex-col gap-4">
      <InputGroup
        name="email"
        id="email"
        placeholder={translate("email")}
        label={translate("email")}
        defaultValue={userData?.email}
        disabled={readOnly}
      />

      {!!roles?.length && (
        <div className="flex flex-col items-start justify-start mr-1">
          <Label
            htmlFor="select-role"
            className="mb-1 ml-[1px] mr-2 text-lg font-semibold cursor-pointer"
          >
            {translate("role")}
          </Label>
          <Select
            defaultValue={userData?.roleId}
            disabled={readOnly || ownProfile}
          >
            <SelectTrigger className="w-fit min-w-[10rem]" id="select-role">
              <SelectValue placeholder={translate("role")} />
            </SelectTrigger>
            <SelectContent>
              {roles.map((r) => {
                return (loggedUserHierarchy &&
                  r.hierarchy > loggedUserHierarchy) ||
                  ownProfile ? (
                  <SelectItem value={r.id} key={r.id}>
                    {r.name}
                  </SelectItem>
                ) : null;
              })}
            </SelectContent>
          </Select>
        </div>
      )}

      {(ownProfile || !userData) && !readOnly && (
        <>
          {userData && (
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
                disabled={readOnly}
              />
            </div>
          )}

          {(changePasswordChecked || !userData) && (
            <>
              {userData && (
                <InputGroup
                  type="password"
                  label={translate("password")}
                  id="old-password"
                  name="oldPassword"
                  required
                  disabled={readOnly}
                />
              )}
              <InputGroup
                type="password"
                description={translate("password_requirements")}
                label={translate("new_password")}
                id="new-password"
                name="newPassword"
                required
                disabled={readOnly}
              />
              <InputGroup
                type="password"
                label={translate("confirm_password")}
                id="confirm-password"
                name="confirmPassword"
                required
                disabled={readOnly}
              />
            </>
          )}
        </>
      )}
    </form>
  );
};

export default UserDetails;
