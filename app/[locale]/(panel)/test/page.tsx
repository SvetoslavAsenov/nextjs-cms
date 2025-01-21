"use client";

import { useAuth } from "@/hooks/useAuth";
export default function Test() {
  const { user, logout } = useAuth();
  return (
    <>
      <p onClick={logout}>{user?.email}</p>
      <p>Test</p>
    </>
  );
}
