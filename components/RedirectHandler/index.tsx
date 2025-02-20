"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectHandler({
  redirectUrl,
}: {
  redirectUrl: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== redirectUrl) {
      router.replace(redirectUrl);
    }
  }, [pathname, router, redirectUrl]);

  return null;
}
