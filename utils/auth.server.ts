"use server";

import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import UserModel from "@/models/UserModel";

import type { AuthUser } from "@/types/auth";
import type { User } from "@prisma/client";

type ManipulateString = (target: string) => Promise<string>;
type CompareStringWithHash = (
  candidate: string,
  digest: string
) => Promise<boolean>;
type IsLoggedIn = () => Promise<boolean>;
type GetLoggedUser = () => Promise<
  (AuthUser & { roleHierarchy: number; roleName: string }) | undefined
>;

const SALT_ROUNDS = 10;

export const applyPepper: ManipulateString = async (target) => {
  return target + process.env.PEPPER_SECRET;
};

export const hashAString: ManipulateString = async (target) => {
  return await bcrypt.hash(target, SALT_ROUNDS);
};

export const compareStringWithHash: CompareStringWithHash = async (
  candidate,
  digest
) => {
  return await bcrypt.compare(candidate, digest);
};

export const isLoggedIn: IsLoggedIn = async () => {
  const authResult = await auth();
  const isLogged = !!authResult?.user?.id;
  return isLogged;
};

export const getLoggedUser: GetLoggedUser = async () => {
  const authResult = await auth();
  let user;
  if (authResult?.user?.id) {
    const userModel = new UserModel();
    const userRecord = await userModel.getManyByIdWithRole([
      authResult.user.id,
    ]);
    if (userRecord?.[0]) {
      const { id, email, name, image, roleId } = authResult.user as User;
      user = {
        id,
        email,
        name,
        image,
        roleId,
        roleName: userRecord[0].Role.name,
        roleHierarchy: userRecord[0].Role.hierarchy,
      };
    }
  }
  return user;
};
