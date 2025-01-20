"use server";

import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const applyPepper = async (target: string): Promise<string> => {
  return target + process.env.PEPPER_SECRET;
};

export const hashAString = async (target: string): Promise<string> => {
  return await bcrypt.hash(target, SALT_ROUNDS);
};

export const compareStringWithHash = async (
  candidate: string,
  digest: string
): Promise<boolean> => {
  return await bcrypt.compare(candidate, digest);
};
