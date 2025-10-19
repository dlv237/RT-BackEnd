/*
  Warnings:

  - You are about to drop the column `amount` on the `Fee` table. All the data in the column will be lost.
  - You are about to alter the column `amountToPay` on the `Fee` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `amountToCharge` on the `Fee` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - Added the required column `institutionId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'coordinator', 'tutor', 'parent');

-- AlterTable
ALTER TABLE "public"."Fee" DROP COLUMN "amount",
ALTER COLUMN "amountToPay" SET DATA TYPE INTEGER,
ALTER COLUMN "amountToCharge" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "institutionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "type",
ADD COLUMN     "role" "public"."UserRole" NOT NULL,
ALTER COLUMN "rut" DROP NOT NULL;

-- DropEnum
DROP TYPE "public"."UserType";

-- CreateTable
CREATE TABLE "public"."CoordinatorPayment" (
    "id" SERIAL NOT NULL,
    "institutionId" INTEGER NOT NULL,
    "periodYear" INTEGER NOT NULL,
    "periodMonth" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoordinatorPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ParentTutor" (
    "parentId" INTEGER NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "institutionId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParentTutor_pkey" PRIMARY KEY ("parentId","tutorId","institutionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatorPayment_institutionId_periodYear_periodMonth_key" ON "public"."CoordinatorPayment"("institutionId", "periodYear", "periodMonth");

-- CreateIndex
CREATE INDEX "ParentTutor_tutorId_idx" ON "public"."ParentTutor"("tutorId");

-- CreateIndex
CREATE INDEX "ParentTutor_institutionId_idx" ON "public"."ParentTutor"("institutionId");

-- CreateIndex
CREATE INDEX "Class_institutionId_idx" ON "public"."Class"("institutionId");

-- CreateIndex
CREATE INDEX "Class_tutorId_idx" ON "public"."Class"("tutorId");

-- CreateIndex
CREATE INDEX "Class_studentId_idx" ON "public"."Class"("studentId");

-- CreateIndex
CREATE INDEX "Student_parentId_idx" ON "public"."Student"("parentId");

-- CreateIndex
CREATE INDEX "Student_institutionId_idx" ON "public"."Student"("institutionId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- AddForeignKey
ALTER TABLE "public"."CoordinatorPayment" ADD CONSTRAINT "CoordinatorPayment_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParentTutor" ADD CONSTRAINT "ParentTutor_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParentTutor" ADD CONSTRAINT "ParentTutor_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParentTutor" ADD CONSTRAINT "ParentTutor_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
