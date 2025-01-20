import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthConfig } from "next-auth";
import { providersConfig } from "./providers/authProviders";
import signIn from "./callbacks/signIn/signIn";
import createUser from "./events/createUser";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: providersConfig,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    signIn,
  },
  events: {
    createUser,
  },
};
