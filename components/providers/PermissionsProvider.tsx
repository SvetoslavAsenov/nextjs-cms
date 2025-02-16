import React from "react";
import { PermissionsProvider as Provider } from "@/providers/permissionsProvider";

import type { PermissionsProviderProps } from "@/providers/permissionsProvider";

const PermissionsProvider = ({
  permissions,
  children,
}: PermissionsProviderProps) => {
  return <Provider permissions={permissions}>{children}</Provider>;
};

export default PermissionsProvider;
