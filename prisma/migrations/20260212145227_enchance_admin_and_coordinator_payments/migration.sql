/*
  Warnings:

  - You are about to drop the column `periodMonth` on the `AdminPayment` table. All the data in the column will be lost.
  - You are about to drop the column `periodYear` on the `AdminPayment` table. All the data in the column will be lost.
  - You are about to drop the column `periodMonth` on the `CoordinatorPayment` table. All the data in the column will be lost.
  - You are about to drop the column `periodYear` on the `CoordinatorPayment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[period]` on the table `AdminPayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[institutionId,period]` on the table `CoordinatorPayment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `period` to the `AdminPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `CoordinatorPayment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."AdminPayment_periodYear_periodMonth_idx";

-- DropIndex
DROP INDEX "public"."AdminPayment_periodYear_periodMonth_key";

-- DropIndex
DROP INDEX "public"."CoordinatorPayment_institutionId_periodYear_periodMonth_key";

-- DropIndex
DROP INDEX "public"."CoordinatorPayment_periodYear_periodMonth_idx";

-- AlterTable
ALTER TABLE "public"."AdminPayment" DROP COLUMN "periodMonth",
DROP COLUMN "periodYear",
ADD COLUMN     "period" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."CoordinatorPayment" DROP COLUMN "periodMonth",
DROP COLUMN "periodYear",
ADD COLUMN     "period" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "AdminPayment_period_idx" ON "public"."AdminPayment"("period");

-- CreateIndex
CREATE UNIQUE INDEX "AdminPayment_period_key" ON "public"."AdminPayment"("period");

-- CreateIndex
CREATE INDEX "CoordinatorPayment_period_idx" ON "public"."CoordinatorPayment"("period");

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatorPayment_institutionId_period_key" ON "public"."CoordinatorPayment"("institutionId", "period");
