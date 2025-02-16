import { Prisma, RegistrationInvite } from "@prisma/client";
import BaseModel from "./BaseModel";
import { prisma } from "@/lib/prisma";

export default class RegistrationInviteModel extends BaseModel<
  Prisma.RegistrationInviteCreateArgs,
  Prisma.RegistrationInviteDeleteArgs,
  Prisma.RegistrationInviteFindUniqueArgs,
  Prisma.RegistrationInviteFindFirstArgs,
  Prisma.RegistrationInviteFindManyArgs,
  Prisma.RegistrationInviteUpdateArgs,
  Prisma.RegistrationInviteOrderByWithRelationInput,
  RegistrationInvite
> {
  constructor() {
    super(prisma.registrationInvite);
  }

  public async findByToken(token: string): Promise<RegistrationInvite | null> {
    return this.findFirst({ where: { token } });
  }

  public async validateToken(token: string): Promise<boolean> {
    const invite = await this.findByToken(token);

    if (!invite || invite.usedAt || new Date() > invite.validitTo) {
      return false;
    }

    return true;
  }

  public setTokenAsUsed = async (
    token: string,
    data: Prisma.RegistrationInviteUpdateInput & { userId?: string }
  ) => {
    const { userId, ...restData } = data;

    await this.update({
      where: {
        token,
      },
      data: {
        usedAt: new Date(),
        ...(userId
          ? {
              user: {
                connect: {
                  id: userId,
                },
              },
            }
          : {}),
        ...restData,
      },
    });
  };

  public setUserByEmail = async (email: string, userId: string) => {
    await this.update({
      where: {
        email,
      },
      data: {
        userId,
      },
    });
  };
}
