import { Prisma, Session } from "@prisma/client";
import BaseModel from "./BaseModel";
import { prisma } from "@/lib/prisma";

export default class SessionModel extends BaseModel<
  Prisma.SessionCreateArgs,
  Prisma.SessionDeleteArgs,
  Prisma.SessionFindUniqueArgs,
  Prisma.SessionFindFirstArgs,
  Prisma.SessionFindManyArgs,
  Prisma.SessionUpdateArgs,
  Session
> {
  constructor() {
    super(prisma.session);
  }
}
