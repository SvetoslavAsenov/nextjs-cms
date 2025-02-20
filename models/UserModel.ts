import { Prisma, User } from "@prisma/client";
import BaseModel from "./BaseModel";
import { prisma } from "@/lib/prisma";
import {
  compareStringWithHash,
  applyPepper,
  hashAString,
} from "@/utils/auth.server";
import { credentialsCreateUserSchema } from "@/schemas/auth";

export type UserRecordWithRole = User & {
  Role: {
    name: string;
    hierarchy: number;
  };
};

export type PaginatedRecordsReturn = {
  data: UserRecordWithRole[];
  pagination: {
    currentPage: number;
    totalPages: number;
    resultsPerPage: number;
    totalCount: number;
  };
};

export type GetManyByIdWithRoleReturn = UserRecordWithRole[];

export default class UserModel extends BaseModel<
  Prisma.UserCreateArgs,
  Prisma.UserDeleteArgs,
  Prisma.UserDeleteManyArgs,
  Prisma.UserFindUniqueArgs,
  Prisma.UserFindFirstArgs,
  Prisma.UserFindManyArgs,
  Prisma.UserUpdateArgs,
  Prisma.UserOrderByWithRelationInput,
  User
> {
  constructor() {
    super(prisma.user);
  }

  public isExistingUser = async (email: string): Promise<boolean> => {
    const result = await this.findUnique({
      where: { email },
    });
    return !!result;
  };

  public setRole = async (userId: string, roleId: string) => {
    await this.update({
      where: { id: userId },
      data: { roleId },
    });
  };

  public validateCredentials = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const user = await this.findFirst({ where: { email } });
    const withPepper = await applyPepper(password);
    return (
      !!user?.password && compareStringWithHash(withPepper, user?.password)
    );
  };

  public createNewUser = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    const validationResult = credentialsCreateUserSchema.safeParse({
      email,
      password,
    });

    if (validationResult.success) {
      const withPepper = await applyPepper(password);
      const hashedPass = await hashAString(withPepper);
      const user = await this.create({
        data: { email, password: hashedPass },
      });
      return user;
    }
    return null;
  };

  public async getPaginatedRecords({
    page,
    resultsPerPage,
    orderBy,
    orderDirection,
  }: {
    page: number;
    resultsPerPage: number;
    orderBy: keyof User | "Role.name";
    orderDirection: "asc" | "desc";
  }) {
    const skip = (page - 1) * resultsPerPage;
    const take = resultsPerPage;

    let orderByObj;
    if (typeof orderBy === "string" && orderBy.includes(".")) {
      const [relation, field] = orderBy.split(".");
      orderByObj = { [relation]: { [field]: orderDirection } };
    } else {
      orderByObj = { [orderBy]: orderDirection };
    }

    const query = {
      skip,
      take,
      orderBy: orderByObj,
      include: { Role: { select: { name: true, hierarchy: true } } },
    };

    const records = (await this.findMany(query)) as (User & {
      Role: { name: string; hierarchy: number };
    })[];
    const totalCount = await this.count();

    return {
      data: records.map(
        (r): UserRecordWithRole => ({
          ...r,
        })
      ),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / resultsPerPage),
        resultsPerPage,
        totalCount,
      },
    };
  }

  public getManyByIdWithRole = async (ids: string[]) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error("Invalid input: ids must be a non-empty array");
    }

    const res = (await this.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: { Role: { select: { name: true, hierarchy: true } } },
    })) as (User & {
      Role: { name: string; hierarchy: number };
    })[];

    return res.map(
      (r): UserRecordWithRole => ({
        ...r,
      })
    );
  };
}
