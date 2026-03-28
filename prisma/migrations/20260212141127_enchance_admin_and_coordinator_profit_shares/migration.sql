/*
  Warnings:

  - You are about to drop the column `createdAt` on the `CoordinatorProfitShare` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CoordinatorProfitShare` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."CoordinatorProfitShare_coordinatorId_institutionId_key";

-- AlterTable
ALTER TABLE "public"."CoordinatorProfitShare" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "availableSince" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "availableUntil" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."AdminProfitShare" (
    "id" SERIAL NOT NULL,
    "profitShare" DECIMAL(5,2) NOT NULL,
    "availableSince" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "availableUntil" TIMESTAMP(3),

    CONSTRAINT "AdminProfitShare_pkey" PRIMARY KEY ("id")
);
