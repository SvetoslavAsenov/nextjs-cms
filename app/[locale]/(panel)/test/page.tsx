"use client";

import { useAuth } from "@/hooks/useAuth";
export default function Test() {
  const { user, logout } = useAuth();
  return (
    <>
      <p onClick={logout} className="cursor-pointer">
        {user?.email}
        <br />
        {user?.roleId}
      </p>
      <p>Test</p>
    </>
  );
}
