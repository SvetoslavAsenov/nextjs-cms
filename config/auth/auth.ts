import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthConfig } from "next-auth";
import { providers } from "./providers";
import callbacks from "./callbacks";
import events from "./events";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks,
  events,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
};
