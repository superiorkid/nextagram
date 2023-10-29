/*
  Warnings:

  - You are about to drop the column `storyViewsId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_storyViewsId_fkey";

-- AlterTable
ALTER TABLE "Stories" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 DAYS';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "storyViewsId";

-- CreateTable
CREATE TABLE "StoryViews" (
    "userId" TEXT NOT NULL,
    "storiesId" TEXT NOT NULL,

    CONSTRAINT "StoryViews_pkey" PRIMARY KEY ("userId","storiesId")
);

-- AddForeignKey
ALTER TABLE "StoryViews" ADD CONSTRAINT "StoryViews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryViews" ADD CONSTRAINT "StoryViews_storiesId_fkey" FOREIGN KEY ("storiesId") REFERENCES "Stories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
