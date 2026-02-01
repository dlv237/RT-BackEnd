/*
  Warnings:

  - The values [french,english,pet,socialStudies] on the enum `ClassSubject` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ClassSubject_new" AS ENUM ('mathematics', 'languages', 'physics', 'chemistry', 'biology', 'history', 'spanish', 'studySkills', 'other');
ALTER TABLE "public"."Class" ALTER COLUMN "subject" TYPE "public"."ClassSubject_new" USING ("subject"::text::"public"."ClassSubject_new");
ALTER TYPE "public"."ClassSubject" RENAME TO "ClassSubject_old";
ALTER TYPE "public"."ClassSubject_new" RENAME TO "ClassSubject";
DROP TYPE "public"."ClassSubject_old";
COMMIT;
