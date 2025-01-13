"use client";

import { useEffect } from "react";
import { signIn as clientSignIn } from "next-auth/react";

const API_ADDRESS = "/api/set-registration-invite-token";

export default function Test({ token }: { token: string }) {
  const handleSignIn = () => {
    clientSignIn("google");
  };

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      await fetch(`${baseUrl}${API_ADDRESS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include",
      });
    };

    fetchData().catch((error) => {
      console.error("Error setting token:", error);
    });
  }, [token]);

  return <button onClick={handleSignIn}>Sign in with Google</button>;
}
