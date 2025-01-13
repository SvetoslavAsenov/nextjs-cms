import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthConfig } from "next-auth";
import { providersConfig } from "./authProviders";
import signIn from "./callbacks/signIn";
import createUser from "./events/createUser";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: providersConfig,
  session: {
    strategy: "database",
  },
  callbacks: {
    signIn,
  },
  events: {
    createUser,
  },
};
