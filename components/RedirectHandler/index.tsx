"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOGIN_URL, REGISTER_URL } from "@/constants/urls";
import { useEffect } from "react";

export default function RedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const registerUrlRegex = new RegExp(`^${REGISTER_URL}`, "igm");
    if (pathname !== LOGIN_URL && !pathname.match(registerUrlRegex)) {
      router.replace(LOGIN_URL);
    }
  }, [pathname, router]);

  return null;
}
