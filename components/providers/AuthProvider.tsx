import React from "react";
import { AuthProvider as Provider } from "@/providers/authProvider";

import type { AuthProviderProps } from "@/types/auth";

const AuthProvider = ({ user, children }: AuthProviderProps) => {
  return <Provider user={user}>{children}</Provider>;
};

export default AuthProvider;
