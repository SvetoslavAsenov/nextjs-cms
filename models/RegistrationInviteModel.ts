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

  public setEmailAndUsedAtByToken = async (email: string, token: string) => {
    await this.update({
      where: {
        token,
      },
      data: {
        email,
        usedAt: new Date(),
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
