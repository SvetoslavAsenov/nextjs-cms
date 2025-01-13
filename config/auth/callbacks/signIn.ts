import UserModel from "@/models/UserModel";
import RegistrationInviteModel from "@/models/RegistrationInviteModel";
import { getCookieValueByKey } from "@/utils/cookies/cookies.server";
import { REGISTRATION_INVITE_TOKEN_COOKIE } from "@/constants/cookies";

import type { AdapterUser } from "next-auth/adapters";
import type { User } from "next-auth";

type UserParam = User | AdapterUser;

const signIn = async ({ user }: { user: UserParam }) => {
  if (!user?.email) {
    return false;
  }

  // Check if registration with this email exist
  const userModel = new UserModel();
  const existingUser = await userModel.findUnique({
    where: { email: user.email },
  });

  if (!!existingUser) {
    return true;
  } else {
    // Check if there is a registration invite token cookie
    const token = await getCookieValueByKey(REGISTRATION_INVITE_TOKEN_COOKIE);
    if (typeof token !== "string") {
      return false;
    }

    // Check if the registration invite token is valid
    const registrationInviteModel = new RegistrationInviteModel();
    const isValid = await registrationInviteModel.validateToken(token);
    if (!isValid) {
      return false;
    }

    // Update the registration invite entry in the db.
    // Fill the email and usedAt fields.
    await registrationInviteModel.setEmailAndUsedAtByToken(user.email, token);

    return true;
  }
};

export default signIn;
