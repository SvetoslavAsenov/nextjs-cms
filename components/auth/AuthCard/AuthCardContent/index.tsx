"use client";

import { signIn } from "next-auth/react";
import { CardContent } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import TogglePasswordInput from "@/components/ui/TogglePasswordInput";
import { Button } from "@/components/shadcn/ui/button";
import StyledLink from "@/components/ui/StyledLink";

import type { AuthCardContentProps } from "../AuthCard.types";

const AuthCardContent = ({ translations, variant }: AuthCardContentProps) => {
  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        <Input placeholder={translations.email} />
        <TogglePasswordInput
          inputProps={{
            placeholder: translations.passwordInput,
          }}
        />
        {variant === "register" ? (
          <TogglePasswordInput
            inputProps={{ placeholder: translations.confirmPassword }}
          />
        ) : (
          <StyledLink href="/forgot-password" className="ml-2">
            {translations.forgotPassword}
          </StyledLink>
        )}
        <Button>{translations.buttonLabel}</Button>
        {variant === "register" && (
          <p className="text-center">
            {translations.underButtonLabel}
            <StyledLink href="/login" className="ml-2">
              {translations.underButtonLink}
            </StyledLink>
          </p>
        )}
      </div>
    </CardContent>
  );
};

export default AuthCardContent;
