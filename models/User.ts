import BaseModel from "./BaseModel";
import { prisma } from "../lib/prisma";

export default class User extends BaseModel {
  protected static tableName: keyof typeof prisma = "user";
}
