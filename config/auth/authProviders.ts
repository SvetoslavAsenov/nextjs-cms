import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Linkedin from "next-auth/providers/linkedin";

import type { Provider } from "next-auth/providers";

const CREDENTIALS_PROVIDER_NAME = "credentials";

export const providersConfig: Provider[] = [
  Credentials({
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize(c) {
      if (c.password !== "password") return null;
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      };
    },
  }),
  Google,
  Linkedin,
];

export const providersMap = providersConfig
  .map((provider: Provider) => {
    return typeof provider === "function" ? provider() : provider;
  })
  .filter((p) => p.id !== CREDENTIALS_PROVIDER_NAME);
