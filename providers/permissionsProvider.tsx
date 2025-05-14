"use client";

import React, { createContext } from "react";

import type { Permission } from "@/config/authorization/permissions";

type PermissionsContextProps = {
  canAccess: (permissions: Permission[]) => boolean;
  permissions: Permission[];
  isRoleRoot: boolean;
  hierarchy: number;
};

export type PermissionsProviderProps = {
  permissions: Permission[];
  isRoleRoot: boolean;
  children: React.ReactNode;
  hierarchy: number;
};

export const PermissionsContext = createContext<
  PermissionsContextProps | undefined
>(undefined);

export const PermissionsProvider = ({
  permissions: userPermissions,
  isRoleRoot,
  children,
  hierarchy,
}: PermissionsProviderProps) => {
  const canAccess = (permissions: Permission[]) => {
    const hasPermissions = permissions.every((permission) =>
      userPermissions.includes(permission)
    );
    return isRoleRoot || hasPermissions;
  };

  return (
    <PermissionsContext
      value={{ canAccess, isRoleRoot, hierarchy, permissions: userPermissions }}
    >
      {children}
    </PermissionsContext>
  );
};
