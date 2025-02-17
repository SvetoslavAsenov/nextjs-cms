import React from "react";
import { PermissionsProvider as Provider } from "@/providers/permissionsProvider";

import type { PermissionsProviderProps } from "@/providers/permissionsProvider";

const PermissionsProvider = ({
  permissions,
  isRoleRoot,
  children,
}: PermissionsProviderProps) => {
  return (
    <Provider permissions={permissions} isRoleRoot={isRoleRoot}>
      {children}
    </Provider>
  );
};

export default PermissionsProvider;
