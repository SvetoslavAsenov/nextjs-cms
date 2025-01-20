import { useEffect } from "react";
const API_ADDRESS = "/api/set-registration-invite-token";

const useSetRegistrationInviteToken = (token?: string) => {
  useEffect(() => {
    if (token) {
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
    }
  }, [token]);
};

export default useSetRegistrationInviteToken;
