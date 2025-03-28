import type { SupportedLocale } from "@/types/locales";

export interface AuthCardVariantTranslations {
  title: string;
  description: string;
  passwordInput: string;
  buttonLabel: string;
  underButtonLabel: string;
  underButtonLink: string;
  providerButtonLabel: string;
}

export type AuthCardVariant = "login" | "register";

export type AuthCardProps = {
  locale: SupportedLocale;
  variant: AuthCardVariant;
  token?: string;
};

export type AuthCardContentProps = {
  variant: AuthCardVariant;
  translations: AuthCardVariantTranslations;
  token?: string;
};

export type ProviderButtonsProps = {
  translations: AuthCardVariantTranslations;
  isPending: boolean;
};
