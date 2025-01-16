"use client";

// import { signIn } from "next-auth/react";
import { CardContent } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import TogglePasswordInput from "@/components/ui/TogglePasswordInput";
import { Button } from "@/components/shadcn/ui/button";
import StyledLink from "@/components/ui/StyledLink";

import type { AuthCardContentProps } from "../AuthCard.types";

const AuthCardContent = ({ translations, variant }: AuthCardContentProps) => {
  const handleFormSubmit = (formData: FormData) => {
    console.log(formData);
    // TODO: Implement
  };

  return (
    <CardContent>
      <div className="">
        <form action={handleFormSubmit} className="gap-4 flex flex-col">
          <Input placeholder={translations.email} className="h-12" />
          <TogglePasswordInput
            inputProps={{
              placeholder: translations.passwordInput,
              className: "h-12",
            }}
          />
          {variant === "register" ? (
            <TogglePasswordInput
              inputProps={{
                placeholder: translations.confirmPassword,
                className: "h-12",
              }}
            />
          ) : (
            <StyledLink href="/forgot-password" className="ml-2">
              {translations.forgotPassword}
            </StyledLink>
          )}
          <Button type="submit" className="text-base h-12">
            {translations.buttonLabel}
          </Button>
          {variant === "register" && (
            <p className="text-center">
              {translations.underButtonLabel}
              <StyledLink href="/login" className="ml-2">
                {translations.underButtonLink}
              </StyledLink>
            </p>
          )}
        </form>
      </div>
    </CardContent>
  );
};

export default AuthCardContent;
