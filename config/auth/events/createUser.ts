import UserModel from "@/models/UserModel";
import RegistrationInviteModel from "@/models/RegistrationInviteModel";

import type { User } from "next-auth";

// After a new user is registered we need to:
// - Set the role to the user account
// - Set the userId to the used registration invite
const createUser = async ({ user }: { user: User }) => {
  if (!user?.email || !user?.id) {
    return;
  }

  const userModel = new UserModel();
  const registrationInviteModel = new RegistrationInviteModel();

  const invite = await registrationInviteModel.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!invite) {
    return;
  }

  // Set the role to the newly created user record
  await userModel.setRole(user.id, invite.roleId);

  // Set the user to the registration invite record
  await registrationInviteModel.setUserByEmail(user.email, user.id);
};

export default createUser;
