-- DropForeignKey
ALTER TABLE "RegistrationInvite" DROP CONSTRAINT "RegistrationInvite_userId_fkey";

-- AlterTable
ALTER TABLE "RegistrationInvite" ALTER COLUMN "usedAt" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RegistrationInvite" ADD CONSTRAINT "RegistrationInvite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
