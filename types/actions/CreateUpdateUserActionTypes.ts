import type { SupportedLocale } from "../locales";

type createUpdateUserActionReturnType = {
  success: boolean;
  message: string;
};

export type createUpdateUserAction = (
  formData: FormData,
  locale: SupportedLocale
) => Promise<createUpdateUserActionReturnType>;
