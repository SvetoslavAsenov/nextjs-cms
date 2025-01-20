"use client";

import { getTranslation } from "@/utils/translations";
import useSetRegistrationInviteToken from "@/hooks/useSetRegistrationInviteToken";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/shadcn/ui/card";
import ChangeLocale from "./ChangeLocale";
import AuthCardContent from "./AuthCardContent";

import type {
  AuthCardTranslations,
  AuthCardProps,
  AuthCardVariant,
} from "./AuthCard.types";
import type { SupportedLocale } from "@/types/locales";

const getTranslations = (
  locale: SupportedLocale,
  variant: AuthCardVariant
): AuthCardTranslations => {
  const keys = {
    title: variant,
    description: `auth_description_${variant}`,
    email: "email",
    passwordInput: variant === "login" ? "password" : "create_password",
    confirmPassword: "confirm_password",
    forgotPassword: "forgot_password",
    buttonLabel: variant,
    underButtonLabel:
      variant === "login" ? "dont_have_an_account" : "already_have_an_account",
    underButtonLink: variant === "login" ? "register" : "login",
    or: "or",
    providerButtonLabel: variant === "login" ? "login_with" : "register_with",
    google: "google",
    linkedin: "linkedin",
    emailTaken: "email_taken",
    invalidPasswordFormat: "invalid_password_format",
    invalidEmail: "invalid_email",
    passwordsDoesNotMatch: "passwords_does_not_match",
    passwordRequirements: "password_requirements",
  };

  const res: AuthCardTranslations = {} as AuthCardTranslations;

  for (const [key, value] of Object.entries(keys)) {
    res[key as keyof AuthCardTranslations] = getTranslation(value, locale);
  }

  return res;
};

const AuthCard = ({ locale, variant, token }: AuthCardProps) => {
  const translations = getTranslations(locale, variant);

  useSetRegistrationInviteToken(token);

  return (
    <Card className="max-w-md mx-auto w-screen">
      <CardHeader className="">
        <ChangeLocale locale={locale} />
        <CardTitle className="text-center">
          <h1 className="text-2xl">
            {getTranslation(translations.title, locale)}
          </h1>
        </CardTitle>
        <CardDescription className="text-center text-base">
          {getTranslation(translations.description, locale)}
        </CardDescription>
      </CardHeader>

      <AuthCardContent
        translations={translations}
        variant={variant}
        token={token}
      />
    </Card>
  );
};

export default AuthCard;
