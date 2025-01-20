import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Linkedin from "next-auth/providers/linkedin";

import type { Provider } from "next-auth/providers";

const CREDENTIALS_PROVIDER_NAME = "credentials";

export const providersConfig: Provider[] = [
  Credentials({
    async authorize() {
      // Note: Auth.js does not fully support using the credentials provider with the database session strategy.
      // Therefore, all login and registration logic for credentials is implemented as custom logic within an action.
      // Auth.js tools should not be directly used for login and registration with credentials,
      // but can still be used for other authentication methods, such as OAuth providers.
      return null;
    },
  }),
  Google({
    allowDangerousEmailAccountLinking: true,
  }),
  Linkedin({
    allowDangerousEmailAccountLinking: true,
  }),
];

export const providersMap = providersConfig
  .map((provider: Provider) => {
    return typeof provider === "function" ? provider() : provider;
  })
  .filter((p) => p.id !== CREDENTIALS_PROVIDER_NAME);
