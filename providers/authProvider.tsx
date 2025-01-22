"use client";

import React, { createContext } from "react";
import { signOut } from "next-auth/react";

import type { AuthUser, AuthProviderProps } from "@/types/auth";

type AuthContextProps = {
  isLoggedIn: boolean;
  user?: AuthUser;
  logout: () => void;
};

const LOGIN_URL = "/login";

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
