"use client";

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
  AuthCardVariantTranslations,
  AuthCardProps,
  AuthCardVariant,
} from "./AuthCard.types";
import { useTranslate } from "@/hooks/useTranslate";

const AuthCard = ({ locale, variant, token }: AuthCardProps) => {
  useSetRegistrationInviteToken(token);
  const { translate } = useTranslate();

  const getTranslations = (
    variant: AuthCardVariant
  ): AuthCardVariantTranslations => {
    const keys = {
      title: variant,
      description: `auth_description_${variant}`,
      passwordInput: variant === "login" ? "password" : "create_password",
      buttonLabel: variant,
      underButtonLabel:
        variant === "login"
          ? "dont_have_an_account"
          : "already_have_an_account",
      underButtonLink: variant === "login" ? "register" : "login",
      providerButtonLabel: variant === "login" ? "login_with" : "register_with",
    };

    const res: AuthCardVariantTranslations = {} as AuthCardVariantTranslations;

    for (const [key, value] of Object.entries(keys)) {
      res[key as keyof AuthCardVariantTranslations] = translate(value);
    }

    return res;
  };

  const translations = getTranslations(variant);

  return (
    <Card className="max-w-md mx-auto w-screen">
      <CardHeader>
        <ChangeLocale locale={locale} />
        <CardTitle className="text-center">
          <h1 className="text-2xl">{translations.title}</h1>
        </CardTitle>
        <CardDescription className="text-center text-base">
          {translations.description}
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
