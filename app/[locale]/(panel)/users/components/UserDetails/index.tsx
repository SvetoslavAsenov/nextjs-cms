"use client";

// Configs
import permissions from "@/config/authorization/permissions";

// Components
import InputGroup from "@/components/ui/InputGroup";
import ButtonsGroup, { ButtonItem } from "@/components/ButtonsGroup";
import Spinner from "@/components/Spinner";
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
import { useState, useRef } from "react";
import { useTranslate } from "@/hooks/useTranslate";
import { usePermissions } from "@/hooks/usePermissions";
import { useDeleteUsersAction } from "../../Hooks/useDeleteUsersAction";
import { useRouter } from "next/navigation";

// Utils
import { toast } from "sonner";
import { validateFormData } from "@/utils/users/crud";

// Actions
import createUpdateUserAction from "@/actions/users/createUpdateUsers";

// Consts
import { USERS_URL } from "@/constants/urls";
import { WITHOUT_ROLE_VALUE } from "@/constants/common";

// Types
import type { Role } from "@prisma/client";
import type {
  FormFieldsObjectType,
  FormFieldsObjectTypeErrorsItemType,
} from "@/utils/validation";
import type { TranslationKey } from "@/translations";
import type { SupportedLocale } from "@/types/locales";

type UserData = {
  email: string;
  roleId?: string;
  userId: string;
  hierarchy?: number;
};

type UserDetailsProps = {
  ownProfile?: boolean;
  roles: Role[];
  readOnly?: boolean;
  userData?: UserData;
  loggedUserHierarchy: number;
  locale: SupportedLocale;
};

const showToast = (
  msg: string,
  success: boolean,
  callback?: (...args: unknown[]) => unknown
) => {
  const toastDuration = 5000;
  const fn = success ? toast.success : toast.error;
  fn(msg, { duration: toastDuration });
  if (callback) {
    setTimeout(callback, toastDuration);
  }
};

const UserDetails = ({
  ownProfile,
  readOnly,
  userData,
  roles,
  loggedUserHierarchy,
  locale,
}: UserDetailsProps) => {
  const { translate } = useTranslate();
  const { canAccess } = usePermissions();
  const { deleteUsers } = useDeleteUsersAction();
  const [changePasswordChecked, setChangePasswordChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormFieldsObjectTypeErrorsItemType>({});
  const isRoot = loggedUserHierarchy === 0;
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const buttons: ButtonItem[] = [];

  const translateErrors = (fieldsObject: FormFieldsObjectType) => {
    const translatedErrors = Object.fromEntries(
      Object.entries(fieldsObject.errors).map(([field, messages]) => [
        field,
        messages && messages.length > 0
          ? [translate(messages[0] as TranslationKey)] // only first translated error
          : [],
      ])
    );

    return translatedErrors;
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const fieldsObject = validateFormData(formData);
      const validationSuccess = !Object.keys(fieldsObject.errors)?.length;
      setErrors(validationSuccess ? {} : translateErrors(fieldsObject));

      if (validationSuccess) {
        setLoading(true);
        const {
          message,
          success: submitSuccess,
          newUserId,
        } = await createUpdateUserAction(formData, locale);

        setLoading(!!(submitSuccess && newUserId));

        if (submitSuccess && !userData) {
          const PREVIEW_USER_URL = `${USERS_URL}/${newUserId}`;
          showToast(message, submitSuccess, () => {
            router.push(PREVIEW_USER_URL);
          });
        } else {
          showToast(message, submitSuccess);
        }

        if (submitSuccess && changePasswordChecked) {
          setChangePasswordChecked(false);
        }
      }
    }
  };

  const handleDeleteBtn = async () => {
    if (userData) {
      const userHierachy =
        userData.hierarchy || userData.hierarchy === 0
          ? userData.hierarchy
          : Infinity;
      await deleteUsers([{ [userData.userId]: userHierachy }]);
    }
  };

  if (!readOnly) {
    buttons.push({
      label: translate("save"),
      onClick: handleSubmit,
      disabled: loading,
    });
  }

  if (
    !readOnly &&
    !ownProfile &&
    userData &&
    canAccess([permissions.users.delete])
  ) {
    buttons.push({
      label: translate("delete"),
      variant: "destructive",
      onClick: handleDeleteBtn,
      disabled: loading,
    });
  }

  return (
    <>
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="hidden" name="userId" value={userData?.userId} />
        <InputGroup
          name="email"
          id="email"
          placeholder={translate("email")}
          label={translate("email")}
          defaultValue={userData?.email}
          disabled={loading || readOnly || (ownProfile && !isRoot)}
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
              defaultValue={userData?.roleId || WITHOUT_ROLE_VALUE}
              disabled={readOnly || ownProfile || loading}
              name="roleId"
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
                <SelectItem value={WITHOUT_ROLE_VALUE}>
                  {translate("without_role")}
                </SelectItem>
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
                  name="changePassword"
                  id="change-password"
                  className="shadow-none w-auto mb-1 cursor-pointer w-9"
                  onCheckedChange={(checked) => {
                    setChangePasswordChecked(checked);
                  }}
                  disabled={readOnly}
                  checked={changePasswordChecked}
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
                    disabled={readOnly || loading}
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
                  disabled={readOnly || loading}
                  errors={errors.newPassword}
                />
                <InputGroup
                  type="password"
                  label={translate("confirm_password")}
                  id="confirm-password"
                  name="confirmPassword"
                  required
                  disabled={readOnly || loading}
                  errors={errors.confirmPassword}
                />
              </>
            )}
          </>
        )}
        <ButtonsGroup buttons={buttons} />
      </form>
      {/* {loading && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Spinner withOverlay />
        </div>
      )} */}
    </>
  );
};

export default UserDetails;
