"use client";

// Configs
import permissions from "@/config/authorization/permissions";

// Components
import InputGroup from "@/components/ui/InputGroup";
import ButtonsGroup, { ButtonItem } from "@/components/ButtonsGroup";
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
import { useState, useActionState, useRef } from "react";
import { useTranslate } from "@/hooks/useTranslate";
import { usePermissions } from "@/hooks/usePermissions";

// Schemas
import { updateProfile, updateProfileWithPassword } from "@/schemas/auth";

// Utils
import {
  formDataToFieldsObject,
  addValidationErrorsToFieldsObject,
} from "@/utils/validation";

// Types
import type { Role } from "@prisma/client";
import type { SafeParseReturnType } from "zod";
import type { FormFieldsObjectTypeErrorsItemType } from "@/utils/validation";
import type { TranslationKey } from "@/translations";

type UserData = {
  email: string;
  roleId: string;
};

type UserDetailsProps = {
  ownProfile: boolean;
  roles: Role[];
  readOnly?: boolean;
  userData?: UserData;
  loggedUserHierarchy: number;
};

const UserDetails = ({
  ownProfile,
  readOnly,
  userData,
  roles,
  loggedUserHierarchy,
}: UserDetailsProps) => {
  const { translate } = useTranslate();
  const { canAccess } = usePermissions();
  const [changePasswordChecked, setChangePasswordChecked] = useState(false);
  const [errors, setErrors] = useState<FormFieldsObjectTypeErrorsItemType>({});
  const isRoot = loggedUserHierarchy === 0;
  const formRef = useRef<HTMLFormElement>(null);

  const buttons: ButtonItem[] = [];

  const handleSubmit = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const fieldsObject = formDataToFieldsObject(formData);

    const validationResult = (
      changePasswordChecked ? updateProfileWithPassword : updateProfile
    ).safeParse(fieldsObject.fields) as SafeParseReturnType<unknown, unknown>;

    if (validationResult.success) {
      setErrors({});
    } else {
      addValidationErrorsToFieldsObject(fieldsObject, validationResult);
      const translatedErrors = Object.fromEntries(
        Object.entries(fieldsObject.errors).map(([field, messages]) => [
          field,
          messages && messages.length > 0
            ? [translate(messages[0] as TranslationKey)] // only first translated error
            : [],
        ])
      );
      setErrors(translatedErrors);
    }
  };

  if (!readOnly) {
    buttons.push({
      label: translate("save"),
      onClick: handleSubmit,
    });
  }

  if (
    !readOnly &&
    !ownProfile &&
    userData &&
    canAccess([permissions.users.delete])
  ) {
    buttons.push({ label: translate("delete"), variant: "destructive" });
  }

  return (
    <form
      className="flex flex-col gap-4"
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputGroup
        name="email"
        id="email"
        placeholder={translate("email")}
        label={translate("email")}
        defaultValue={userData?.email}
        disabled={(readOnly || ownProfile) && !isRoot}
        errors={errors.email}
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
                return r.hierarchy > loggedUserHierarchy || ownProfile ? (
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
                  errors={errors.oldPassword}
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
                errors={errors.newPassword}
              />
              <InputGroup
                type="password"
                label={translate("confirm_password")}
                id="confirm-password"
                name="confirmPassword"
                required
                disabled={readOnly}
                errors={errors.confirmPassword}
              />
            </>
          )}
        </>
      )}
      <ButtonsGroup buttons={buttons} />
    </form>
  );
};

export default UserDetails;
