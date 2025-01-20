import oAuthSignIn from "./oAuth";
import { getCookieValueByKey } from "@/utils/cookies/cookies.server";
import { REGISTRATION_INVITE_TOKEN_COOKIE } from "@/constants/cookies";

import type { User, Account, Profile } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { ReturnedCookieValue } from "@/utils/cookies/cookies.server";

type SignInParams = {
  user: User | AdapterUser;
  account: Account | null;
  credentials?: Profile | undefined;
};

export type SignInWithTokenParams = SignInParams & {
  token: ReturnedCookieValue;
};

export type SignInReturnType = Promise<boolean>;

const signIn = async (params: SignInParams): SignInReturnType => {
  const token = await getCookieValueByKey(REGISTRATION_INVITE_TOKEN_COOKIE);

  if (params?.account?.provider === "credentials") {
    // Note: Auth.js does not fully support using the credentials provider with the database session strategy.
    // Therefore, all login and registration logic for credentials is implemented as custom logic within an action.
    // Auth.js tools should not be directly used for login and registration with credentials,
    // but can still be used for other authentication methods, such as OAuth providers.
    return false;
  }
  return oAuthSignIn({ ...params, token });
};

export default signIn;
