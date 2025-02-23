import React from "react";
import { PermissionsProvider as Provider } from "@/providers/permissionsProvider";

import type { PermissionsProviderProps } from "@/providers/permissionsProvider";

const PermissionsProvider = ({
  permissions,
  isRoleRoot,
  children,
  hierarchy,
}: PermissionsProviderProps) => {
  return (
    <Provider
      permissions={permissions}
      isRoleRoot={isRoleRoot}
      hierarchy={hierarchy}
    >
      {children}
    </Provider>
  );
};

export default PermissionsProvider;
