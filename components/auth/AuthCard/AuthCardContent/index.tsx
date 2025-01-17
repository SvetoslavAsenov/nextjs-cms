"use client";

import { useActionState } from "react";
import { CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import StyledLink from "@/components/ui/StyledLink";
import InputGroup from "@/components/ui/InputGroup";
import { ProviderButtons } from "./ProviderButtons";
import CredentialsFormHandler from "@/actions/CredentialsFormHandler";

import type { AuthCardContentProps } from "../AuthCard.types";

const LOGIN_ROUTE = "/login";
const FORGOT_PASSWORD_ROUTE = "/forgot-passwprd";

const AuthCardContent = ({ translations, variant }: AuthCardContentProps) => {
  const [actionState, action, isPending] = useActionState(
    CredentialsFormHandler,
    null
  );

  return (
    <CardContent>
      <div className="">
        <form action={action} className="gap-4 flex flex-col">
          <InputGroup
            name="email"
            id="email"
            placeholder={translations.email}
            className="h-12"
            disabled={isPending}
            defaultValue={actionState?.email}
          />

          <InputGroup
            placeholder={translations.passwordInput}
            className="h-12"
            name="password"
            disabled={isPending}
            defaultValue={actionState?.password}
            type="password"
          />

          {variant === "register" ? (
            <InputGroup
              placeholder={translations.confirmPassword}
              className="h-12"
              name="confirmPassword"
              disabled={isPending}
              defaultValue={actionState?.confirmPassword}
              type="password"
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
