"use server";

import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const applyPepper = (target: string): string => {
  return target + process.env.PEPPER_SECRET;
};

export const applySalt = (target: string): string => {
  return bcrypt.hashSync(target, SALT_ROUNDS);
};

export const compareStringWithHash = (
  candidate: string,
  digest: string
): boolean => {
  return bcrypt.compareSync(candidate, digest);
};
