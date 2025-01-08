import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthConfig } from "next-auth";
import providers from "./authProviders";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers,
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
