"use client";

import React, { createContext } from "react";

import type { Permission } from "@/config/authorization/permissions";

type PermissionsContextProps = {
  canAccess: (permission: Permission) => boolean;
};

export type PermissionsProviderProps = {
  permissions?: Permission[];
  isRoleRoot: boolean;
  children: React.ReactNode;
};

export const PermissionsContext = createContext<
  PermissionsContextProps | undefined
>(undefined);

export const PermissionsProvider = ({
  permissions,
  isRoleRoot,
  children,
}: PermissionsProviderProps) => {
  const canAccess = (permission: Permission) => {
    return isRoleRoot || !permissions?.includes?.(permission);
  };

  return (
    <PermissionsContext value={{ canAccess }}>{children}</PermissionsContext>
  );
};
