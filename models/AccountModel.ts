import { Prisma, Account } from "@prisma/client";
import BaseModel from "./BaseModel";
import { prisma } from "@/lib/prisma";

export default class AccountModel extends BaseModel<
  Prisma.AccountCreateArgs,
  Prisma.AccountDeleteArgs,
  Prisma.AccountFindUniqueArgs,
  Prisma.AccountFindFirstArgs,
  Prisma.AccountFindManyArgs,
  Prisma.AccountUpdateArgs,
  Account
> {
  constructor() {
    super(prisma.account);
  }
}
