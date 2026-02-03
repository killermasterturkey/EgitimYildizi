/*
  Warnings:

  - You are about to drop the column `completed` on the `bep_goals` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `bep_goals` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `bep_goals` table. All the data in the column will be lost.
  - Added the required column `category` to the `bep_goals` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `bep_goals` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `academicYear` to the `beps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `beps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `beps` table without a default value. This is not possible if the table is not empty.
  - Made the column `endDate` on table `beps` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BEPStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'ACHIEVED', 'MODIFIED', 'DISCONTINUED');

-- CreateEnum
CREATE TYPE "GoalCategory" AS ENUM ('ACADEMIC', 'SOCIAL', 'COMMUNICATION', 'MOTOR', 'SELF_CARE', 'BEHAVIORAL');

-- DropIndex
DROP INDEX "beps_studentId_key";

-- AlterTable
ALTER TABLE "bep_goals" DROP COLUMN "completed",
DROP COLUMN "completedAt",
DROP COLUMN "title",
ADD COLUMN     "achievedDate" TIMESTAMP(3),
ADD COLUMN     "category" "GoalCategory" NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" "GoalStatus" NOT NULL DEFAULT 'NOT_STARTED',
ADD COLUMN     "successCriteria" TEXT,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "beps" ADD COLUMN     "academicYear" TEXT NOT NULL,
ADD COLUMN     "accommodations" JSONB,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "diagnosis" TEXT,
ADD COLUMN     "interests" TEXT,
ADD COLUMN     "status" "BEPStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "strengths" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "weaknesses" TEXT,
ALTER COLUMN "startDate" DROP DEFAULT,
ALTER COLUMN "endDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "specialization" TEXT;

-- CreateTable
CREATE TABLE "teacher_students" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teacher_students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teacher_students_teacherId_studentId_key" ON "teacher_students"("teacherId", "studentId");

-- AddForeignKey
ALTER TABLE "beps" ADD CONSTRAINT "beps_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_students" ADD CONSTRAINT "teacher_students_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_students" ADD CONSTRAINT "teacher_students_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
