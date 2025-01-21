"use client";

import React, { createContext } from "react";
import { signOut } from "next-auth/react";

const LOGIN_URL = "/login";

export type AuthProviderUser = {
  email: string;
  name?: string;
  image?: string;
  roleId?: string;
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
