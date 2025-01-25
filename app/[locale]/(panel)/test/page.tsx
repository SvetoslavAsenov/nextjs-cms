"use client";

import { useAuth } from "@/hooks/useAuth";
export default function Test() {
  const { user, logout } = useAuth();
  return (
    <>
      <p onClick={logout} className="cursor-pointer">
        {user?.email}
        <br />
        {typeof user}
      </p>
      <p>Test</p>
    </>
  );
}
