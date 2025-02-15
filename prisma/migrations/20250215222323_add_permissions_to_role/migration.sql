/*
  Warnings:

  - Made the column `name` on table `Role` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "permissions" JSONB NOT NULL DEFAULT '[]',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;
