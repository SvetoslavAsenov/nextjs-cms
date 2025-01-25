import { Prisma, Role } from "@prisma/client";
import BaseModel from "./BaseModel";
import { prisma } from "@/lib/prisma";

export default class RoleModel extends BaseModel<
  Prisma.RoleCreateArgs,
  Prisma.RoleDeleteArgs,
  Prisma.RoleFindUniqueArgs,
  Prisma.RoleFindFirstArgs,
  Prisma.RoleFindManyArgs,
  Prisma.RoleUpdateArgs,
  Role
> {
  constructor() {
    super(prisma.role);
  }
}
