import { Prisma, Role } from "@prisma/client";
import BaseModel from "./BaseModel";
import { prisma } from "@/lib/prisma";

import type { Permission } from "@/config/authorization/permissions";

export default class RoleModel extends BaseModel<
  Prisma.RoleCreateArgs,
  Prisma.RoleDeleteArgs,
  Prisma.RoleDeleteManyArgs,
  Prisma.RoleFindUniqueArgs,
  Prisma.RoleFindFirstArgs,
  Prisma.RoleFindManyArgs,
  Prisma.RoleUpdateArgs,
  Prisma.RoleOrderByWithRelationInput,
  Role
> {
  constructor() {
    super(prisma.role);
  }

  public getRolePermissionsByRole = (role: Role) => {
    return Array.isArray(role?.permissions)
      ? (role.permissions as Permission[])
      : [];
  };

  public getRolePermissionsById = async (roleId: string) => {
    const role = await this.findUnique({
      where: { id: roleId },
      select: { permissions: true },
    });

    return role ? this.getRolePermissionsByRole(role) : [];
  };

  public addPermissions = async (
    roleId: string,
    newPermissions: Permission[]
  ) => {
    const role = await this.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return;
    }

    const existingPermissions = this.getRolePermissionsByRole(role);
    const updatedPermissions = Array.from(
      new Set([...existingPermissions, ...newPermissions])
    );

    return await this.update({
      where: { id: roleId },
      data: { permissions: updatedPermissions },
    });
  };

  public hasPermission = async (roleId: string, permissions: Permission[]) => {
    const existingPermissions = await this.getRolePermissionsById(roleId);

    return permissions.every((permission) =>
      existingPermissions.includes(permission)
    );
  };
}
