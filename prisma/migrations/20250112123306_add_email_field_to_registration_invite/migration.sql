/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `RegistrationInvite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RegistrationInvite" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationInvite_email_key" ON "RegistrationInvite"("email");
