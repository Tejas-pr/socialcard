/*
  Warnings:

  - A unique constraint covering the columns `[cardName]` on the table `userLink` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "userLink" ALTER COLUMN "github" DROP NOT NULL,
ALTER COLUMN "linkedin" DROP NOT NULL,
ALTER COLUMN "leetcode" DROP NOT NULL,
ALTER COLUMN "twitter" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userLink_cardName_key" ON "userLink"("cardName");
