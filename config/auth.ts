import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthConfig } from "next-auth";
import { providersConfig } from "./authProviders";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: providersConfig,
  session: {
    strategy: "database",
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (!user?.email) {
        return false;
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      return !!existingUser;
    },
  },
};
