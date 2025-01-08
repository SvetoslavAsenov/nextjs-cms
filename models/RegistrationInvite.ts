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
}
