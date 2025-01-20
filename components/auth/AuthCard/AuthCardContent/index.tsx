"use client";

import { useActionState, useEffect } from "react";
import { CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import StyledLink from "@/components/ui/StyledLink";
import InputGroup from "@/components/ui/InputGroup";
import { ProviderButtons } from "./ProviderButtons";
import CredentialsFormHandler from "@/actions/credentialsSignUpSignIn";

import type { AuthCardContentProps } from "../AuthCard.types";
import type { ResultObjectType } from "@/types/actions/CredentialsFormHandlerTypes";

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
  >(CredentialsFormHandler, { fields: {}, errors: {} });

  useEffect(() => {
    if (actionState?.redirectUrl && typeof window !== "undefined") {
      window.location.href = actionState?.redirectUrl;
    }
  }, [actionState?.redirectUrl]);

  const getError = (fieldName: string): string[] | undefined => {
    const error = actionState?.errors?.[fieldName];
    if (!error || isPending) {
      return undefined;
    }

    switch (fieldName) {
      case "email":
        return error === "email_taken"
          ? [translations.emailTaken]
          : [translations.invalidEmail];

      case "password":
        return [
          translations.invalidPasswordFormat,
          translations.passwordRequirements,
        ];

      case "confirmPassword":
        return error === "passwords_does_not_match"
          ? [translations.passwordsDoesNotMatch]
          : undefined;

      default:
        break;
    }
  };

  const getFieldValue = (fieldName: string): string | undefined => {
    return actionState?.fields?.[fieldName];
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
            defaultValue={getFieldValue("email")}
            errors={getError("email")}
          />

          <InputGroup
            placeholder={translations.passwordInput}
            className="h-12"
            name="password"
            disabled={isPending}
            defaultValue={getFieldValue("password")}
            type="password"
            errors={getError("password")}
          />

          {variant === "register" ? (
            <InputGroup
              placeholder={translations.confirmPassword}
              className="h-12"
              name="confirmPassword"
              disabled={isPending}
              defaultValue={getFieldValue("confirmPassword")}
              type="password"
              errors={getError("confirmPassword")}
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
