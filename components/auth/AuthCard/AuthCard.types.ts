import type { SupportedLocale } from "@/types/locales";

export interface AuthCardTranslations {
  title: string;
  description: string;
  email: string;
  passwordInput: string;
  confirmPassword: string;
  forgotPassword: string;
  buttonLabel: string;
  underButtonLabel: string;
  underButtonLink: string;
  or: string;
  providerButtonLabel: string;
  google: string;
  linkedin: string;
}

export type AuthCardVariant = "login" | "register";

export type AuthCardProps = {
  locale: SupportedLocale;
  variant: AuthCardVariant;
  token?: string;
};

export type AuthCardContentProps = {
  variant: AuthCardVariant;
  translations: AuthCardTranslations;
};

export type ProviderButtonsProps = {
  translations: AuthCardTranslations;
  isPending: boolean;
};
