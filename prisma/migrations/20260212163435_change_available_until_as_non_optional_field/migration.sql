/*
  Warnings:

  - Made the column `availableUntil` on table `AdminProfitShare` required. This step will fail if there are existing NULL values in that column.
  - Made the column `availableUntil` on table `CoordinatorProfitShare` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."AdminProfitShare" ALTER COLUMN "availableUntil" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."CoordinatorProfitShare" ALTER COLUMN "availableUntil" SET NOT NULL;
