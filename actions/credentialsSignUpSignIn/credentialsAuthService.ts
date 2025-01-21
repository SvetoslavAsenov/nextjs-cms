import UserModel from "@/models/UserModel";
import RegistrationInviteModel from "@/models/RegistrationInviteModel";
import SessionModel from "@/models/SessionModel";
import AccountModel from "@/models/AccountModel";
import { randomUUID } from "crypto";
import { authConfig } from "../../config/auth/auth";
import { setCookie } from "@/utils/cookies/cookies.server";
import { prisma } from "@/lib/prisma";
import { AUTH_SESSION_COOKIE } from "@/constants/cookies";

type ResultObject = { success: boolean; message?: string };

type CredentialsAuthService = (
  credentials: Record<string, string | undefined>
) => Promise<ResultObject>;

const calculateExpires = (maxAge: number) =>
  new Date(Date.now() + maxAge * 1000);

const credentialsAuthService: CredentialsAuthService = async (credentials) => {
  try {
    await prisma.$transaction(async () => {
      let userRecord;

      // Determine if this is a registration or login
      const isRegistration = credentials?.confirmPassword;

      const normalizedEmail = (credentials?.email as string).toLowerCase();

      // Check if user with such email already exists
      const userModel = new UserModel();
      const existingUser = await userModel.findUnique({
        where: {
          email: credentials?.email as string,
        },
      });

      // In case of login attempt
      if (!isRegistration) {
        // The user must exist in case of login
        if (!isRegistration && !existingUser) {
          throw new Error("invalid_credentials");
        }
        userRecord = existingUser;

        // Validate the credentials
        const credentialsValid = await userModel.validateCredentials(
          normalizedEmail,
          credentials?.password as string
        );
        if (!credentialsValid) {
          throw new Error("invalid_credentials");
        }
      } else {
        // The user must not exist in case of registration
        if (isRegistration && existingUser) {
          throw new Error("email_taken");
        }

        // Check if the registration invite token is valid
        const registrationInviteModel = new RegistrationInviteModel();
        const isValid =
          credentials?.token &&
          (await registrationInviteModel.validateToken(credentials?.token));
        if (!isValid) {
          console.error(
            "Registration error: Invalid registration invite token"
          );
          throw new Error("unexpected_error");
        }

        // Get the token record from the db
        const tokenRecod = await registrationInviteModel.findUnique({
          where: {
            token: credentials.token,
          },
        });

        // Create a new user
        const newUser = await userModel.createNewUser(
          normalizedEmail,
          credentials.password as string
        );
        if (!newUser) {
          console.error("Can't create a new user");
          throw new Error("unexpected_error");
        }
        userRecord = newUser;

        // Set the user role
        userModel.update({
          where: {
            id: newUser.id,
          },
          data: {
            roleId: tokenRecod?.roleId,
          },
        });

        // Create new account and link it to the user
        const accountModel = new AccountModel();
        const newAccount = await accountModel.create({
          data: {
            userId: newUser?.id as string,
            type: "credentials",
            provider: "credentials",
            providerAccountId: newUser?.id as string,
          },
        });
        if (!newAccount) {
          console.error("Can't create new account");
          throw new Error("unexpected_error");
        }

        // Update the registration invite entry in the db.
        // Fill the email and usedAt fields.
        await registrationInviteModel.setTokenAsUsed(
          credentials?.token as string,
          { email: normalizedEmail, userId: userRecord.id }
        );
      }

      // Create the session record and associate it with the user
      const sessionMaxAge = authConfig?.session?.maxAge || 30 * 24 * 60 * 60;
      const expires = calculateExpires(sessionMaxAge);
      const sessionToken = randomUUID();
      const sessionModel = new SessionModel();

      const newSession = await sessionModel.create({
        data: {
          sessionToken,
          userId: userRecord?.id as string,
          expires: expires.toISOString(),
        },
      });

      if (!newSession) {
        console.error("Can't create new session");
        throw new Error("unexpected_error");
      }

      // await authConfig?.adapter?.createSession?.({
      //   sessionToken: sessionToken,
      //   userId: userRecord?.id as string,
      //   expires,
      // });

      setCookie(AUTH_SESSION_COOKIE, sessionToken, {
        maxAge: sessionMaxAge,
        sameSite: "lax",
        httpOnly: true,
        path: "/",
      });
    });

    return {
      success: true,
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err?.message,
    };
  }
};

export default credentialsAuthService;
