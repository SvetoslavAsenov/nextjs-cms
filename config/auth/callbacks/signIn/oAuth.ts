import UserModel from "@/models/UserModel";
import RegistrationInviteModel from "@/models/RegistrationInviteModel";

import type { SignInWithTokenParams, SignInReturnType } from ".";

const oAuthSignIn = async ({
  user,
  token,
}: SignInWithTokenParams): SignInReturnType => {
  try {
    if (!user?.email) {
      return false;
    }

    // Check if registration with this email exist
    const userModel = new UserModel();
    const existingUser = await userModel.isExistingUser(user.email);

    if (!!existingUser) {
      return true;
    } else {
      // Check if there is a registration invite token cookie
      if (!token) {
        return false;
      }

      // Check if the registration invite token is valid
      const registrationInviteModel = new RegistrationInviteModel();
      const isValid = await registrationInviteModel.validateToken(token);
      if (!isValid) {
        return false;
      }

      // Update the registration invite entry in the db.
      // Fill the email and usedAt(automatic) fields.
      await registrationInviteModel.setTokenAsUsed(token, {
        email: user.email,
      });

      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default oAuthSignIn;
