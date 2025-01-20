"use client";

import { useActionState } from "react";
import { CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import StyledLink from "@/components/ui/StyledLink";
import InputGroup from "@/components/ui/InputGroup";
import { ProviderButtons } from "./ProviderButtons";
import CredentialsFormHandler from "@/actions/credentialsSignUpSignIn";

import type { AuthCardContentProps } from "../AuthCard.types";
import type {
  ResultObjectType,
  ResultObjectItemType,
} from "@/types/actions/CredentialsFormHandlerTypes";

const LOGIN_ROUTE = "/login";
const FORGOT_PASSWORD_ROUTE = "/forgot-password";

const AuthCardContent = ({
  translations,
  variant,
  token,
}: AuthCardContentProps) => {
  const [actionState, action, isPending] = useActionState<
    ResultObjectType,
    FormData
  >(CredentialsFormHandler, {});

  const getError = (
    fieldName: string,
    item: ResultObjectItemType
  ): string[] | undefined => {
    if (!item?.error || isPending) {
      return undefined;
    }

    switch (fieldName) {
      case "email":
        return item.error === "email_taken"
          ? [translations.emailTaken]
          : [translations.invalidEmail];

      case "password":
        return [
          translations.invalidPasswordFormat,
          translations.passwordRequirements,
        ];

      case "confirmPassword":
        return item.error === "passwords_does_not_match"
          ? [translations.passwordsDoesNotMatch]
          : undefined;

      default:
        break;
    }
  };

  return (
    <CardContent>
      <div className="">
        <form action={action} className="gap-4 flex flex-col">
          <input type="text" name="token" hidden={true} defaultValue={token} />
          <InputGroup
            name="email"
            id="email"
            placeholder={translations.email}
            className="h-12"
            disabled={isPending}
            defaultValue={actionState?.email?.value}
            errors={getError("email", actionState.email)}
          />

          <InputGroup
            placeholder={translations.passwordInput}
            className="h-12"
            name="password"
            disabled={isPending}
            defaultValue={actionState?.password?.value}
            type="password"
            errors={getError("password", actionState.password)}
          />

          {variant === "register" ? (
            <InputGroup
              placeholder={translations.confirmPassword}
              className="h-12"
              name="confirmPassword"
              disabled={isPending}
              defaultValue={actionState?.confirmPassword?.value}
              type="password"
              errors={getError("confirmPassword", actionState.confirmPassword)}
            />
          ) : (
            <StyledLink href={FORGOT_PASSWORD_ROUTE} className="ml-2">
              {translations.forgotPassword}
            </StyledLink>
          )}
          <Button type="submit" className="text-base h-12" disabled={isPending}>
            {translations.buttonLabel}
          </Button>
          {variant === "register" && (
            <p className="text-center">
              {translations.underButtonLabel}
              <StyledLink href={LOGIN_ROUTE} className="ml-2">
                {translations.underButtonLink}
              </StyledLink>
            </p>
          )}
        </form>
      </div>
      <ProviderButtons translations={translations} isPending={isPending} />
    </CardContent>
  );
};

export default AuthCardContent;
