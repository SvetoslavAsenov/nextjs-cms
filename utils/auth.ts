import type { Provider } from "next-auth/providers";

const CREDENTIALS_PROVIDER_NAME = "credentials";

export const providersMap = (
  providers: Provider[]
): { id: string; name: string }[] => {
  return providers
    .map((provider) => {
      return typeof provider === "function" ? provider() : provider;
    })
    .filter((p) => p.id !== CREDENTIALS_PROVIDER_NAME);
};
