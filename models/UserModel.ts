import { Prisma, User } from "@prisma/client";
import BaseModel from "./BaseModel";
import { prisma } from "@/lib/prisma";

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
}
