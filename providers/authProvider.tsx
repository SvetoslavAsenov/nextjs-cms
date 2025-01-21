"use client";

import React, { createContext } from "react";
import { signOut } from "next-auth/react";

const LOGIN_URL = "/login";

type AuthProviderUser = {
  id: string;
  email: string | null;
  name?: string | null;
  image?: string | null;
  roleId?: string | null;
};

type AuthContextProps = {
  isLoggedIn: boolean;
  user?: AuthProviderUser;
  logout: () => void;
};

export type AuthProviderProps = {
  user?: AuthProviderUser;
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ user, children }: AuthProviderProps) => {
  const isLoggedIn = !!user?.email;

  const logout = () => {
    signOut({
      redirectTo: LOGIN_URL,
    });
  };

  return (
    <AuthContext value={{ isLoggedIn, logout, user }}>{children}</AuthContext>
  );
};
