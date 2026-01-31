/*
  Warnings:

  - You are about to drop the column `link` on the `Project` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "link",
ADD COLUMN     "slug" TEXT NOT NULL;
