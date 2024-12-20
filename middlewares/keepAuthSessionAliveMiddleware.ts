import { auth } from "@/lib/auth";

export default async function keepAuthSessionAliveMiddleware() {
  return await auth();
}
