import {
  credentialsRegisterSchema,
  credentialsLoginSchema,
} from "@/schemas/auth";
import UserModel from "@/models/UserModel";

const credentialsConfig = {
  async authorize(credentials: Partial<Record<string, unknown>>) {
    // Determine if this is a registration or login
    const isRegistration = credentials?.confirmPassword;

    // Validate the input
    const validationResult = (
      isRegistration ? credentialsRegisterSchema : credentialsLoginSchema
    ).safeParse(credentials);

    if (!validationResult.success) {
      return null;
    }

    const normalizedEmail = (credentials.email as string).toLowerCase();

    // In case of registration, check if such email already exist
    const userModel = new UserModel();
    const existingUser = await userModel.isExistingUser(normalizedEmail);
    const isValidRegistration = isRegistration && !existingUser;

    // In case of login attempt, validate the password
    const isValidLogin =
      !isRegistration &&
      !!existingUser &&
      (await userModel.validatePassword(
        normalizedEmail,
        credentials.password as string
      ));

    return isValidRegistration || isValidLogin
      ? {
          id: "credentials",
          email: normalizedEmail,
        }
      : null;
  },
};

export default credentialsConfig;
