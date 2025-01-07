import { prisma } from "../lib/prisma";

export default class BaseModel {
  protected static tableName: keyof typeof prisma;

  // Prevent instantiation of the base model class
  protected constructor() {}

  // Prevent direct usage of the methods from outside the class
  private static preventBaseClassUsage() {
    if (this === BaseModel) {
      throw new Error("Static methods of BaseModel cannot be used directly.");
    }
  }

  // Validate that tableName is defined
  protected static checkTableNameExistence() {
    if (!this.tableName) {
      throw new Error("Table name is not defined for the model.");
    }
  }

  // Combine common checks
  private static performBaseChecks() {
    this.preventBaseClassUsage();
    this.checkTableNameExistence();
  }

  // Fetch all records
  public static async getAll() {
    this.performBaseChecks();
    // @ts-expect-error Dynamic key access for Prisma models
    return prisma[this.tableName].findMany();
    return prisma.user.findMany();
  }

  // Find a record by ID
  public static async find(id: number) {
    this.performBaseChecks();
    // @ts-expect-error Dynamic key access for Prisma models
    return prisma[this.tableName].findUnique({
      where: { id },
    });
  }

  // Create a new record
  public static async create(data: Record<string, unknown>) {
    this.performBaseChecks();
    // @ts-expect-error Dynamic key access for Prisma models
    return prisma[this.tableName].create({
      data,
    });
  }

  // Update a record by ID
  public static async update(id: number, data: Record<string, unknown>) {
    this.performBaseChecks();
    // @ts-expect-error Dynamic key access for Prisma models
    return prisma[this.tableName].update({
      where: { id },
      data,
    });
  }

  // Delete a record by ID
  public static async delete(id: number) {
    this.performBaseChecks();
    // @ts-expect-error Dynamic key access for Prisma models
    return prisma[this.tableName].delete({
      where: { id },
    });
  }
}
