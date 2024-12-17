/*
  Warnings:

  - Added the required column `cardName` to the `userLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userLink" ADD COLUMN     "cardName" TEXT NOT NULL;
