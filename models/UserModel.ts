import { Prisma, User } from "@prisma/client";
import BaseModel from "./BaseModel";
import { prisma } from "@/lib/prisma";
import {
  compareStringWithHash,
  applyPepper,
  hashAString,
} from "@/utils/auth.server";
import { credentialsCreateUserSchema } from "@/schemas/auth";

export default class UserModel extends BaseModel<
  Prisma.UserCreateArgs,
  Prisma.UserDeleteArgs,
  Prisma.UserFindUniqueArgs,
  Prisma.UserFindFirstArgs,
  Prisma.UserFindManyArgs,
  Prisma.UserUpdateArgs,
  User
> {
  constructor() {
    super(prisma.user);
  }

  public isExistingUser = async (email: string): Promise<boolean> => {
    const result = await this.findUnique({
      where: {
        email,
      },
    });

    return !!result;
  };

  public setRole = async (userId: string, roleId: string) => {
    await this.update({
      where: {
        id: userId,
      },
      data: {
        roleId,
      },
    });
  };

  public validateCredentials = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const user = await this.findFirst({
      where: {
        email,
      },
    });
    const withPepper = await applyPepper(password);

    return (
      !!user?.password && compareStringWithHash(withPepper, user?.password)
    );
  };

  public createNewUser = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    const validationResult = credentialsCreateUserSchema.safeParse({
      email,
      password,
    });

    if (validationResult.success) {
      const withPepper = await applyPepper(password);
      const hashedPass = await hashAString(withPepper);
      const user = await this.create({
        data: {
          email,
          password: hashedPass,
        },
      });

      return user;
    }

    return null;
  };
}
